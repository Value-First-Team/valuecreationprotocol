/**
 * THE TEACH SPACE, for @vf/site-kit/scroll-stage on /teach.
 *
 * One space: the value pairs stand as arches on one ring, in canon's order, every one in view from the opening and
 * again at the close. A pair is never a step, a before and after, or a front and back: each arch is two identical
 * halves leaning into each other, held by a keystone that carries the ↔, so neither half stands alone and taking
 * either away is the whole arch falling. The halves are drawn alike on purpose: nothing in the figure says which
 * half is first, so the arch reads the same from either side and can never be seen inverted.
 *
 * THE ONE STOP THAT MOVES. The pair canon gives the guard to (the pair that can consume the other four) draws its
 * theme literally: its arch, the frame, holds still while the work standing inside it rearranges as the reader
 * scrolls through the stop. The work is as many pieces as canon names things that adapt; nothing else in the space
 * moves unless the camera does, so a still reader costs no redraw. Under reduced motion each step is its own still
 * (the engine cuts between them), so the order is kept and the travel dropped.
 *
 * Holds no words and no canon: the page hands it counts, read from the snapshot (`lib/teach.ts`). Every colour is
 * a palette role the stage resolves from the page's tokens and re-reads when the theme changes (`TEACH_STAGE_TOKENS`;
 * on this site the stage's roles are the VCP identity, bridged in `styles/vcp-stage.css`).
 */
import type * as ThreeNS from 'three';
import type { StageSceneFactory, StageTokenMap, StageView } from '@vf/site-kit/scroll-stage';

export interface TeachSceneData {
  /** How many pairs canon defines, in its order. */
  pairs: number;
  /** The place, among the pairs, of the one whose work moves inside its frame. */
  moving: number;
  /** How many things canon names as the work that adapts. */
  adapts: number;
  /** The moving pair's stop, by its section id: its work moves as the reader scrolls through it. */
  movingId: string;
  /** How many arrangements the work passes through on that stop (its steps beside the scene). */
  arrangements: number;
}

/** The anchor at the foot of pair k's arch: a phone's first step on a stop starts below it (ScrollStageStop `fill`). */
export const footAnchor = (k: number) => `foot-${k}`;

/** Role -> token. Inside `.vcp-stage` these tokens carry this site's own identity (see vcp-stage.css). */
export const TEACH_STAGE_TOKENS: StageTokenMap = {
  bg: '--vf-bg',
  surface: '--vf-surface',
  elevated: '--vf-elevated',
  border: '--vf-border',
  text: '--vf-text',
  muted: '--vf-text-muted',
  brand: '--vf-brand',
  accent: '--vf-accent',
};

/* ---------- the arch, in world units ---------- */
const RING = 20; // the radius the arches stand on
const SPREAD = 120; // the arc they span, degrees, centred on the far side of the ring
const R_IN = 2.2;
const R_OUT = 3.2;
const PIER = 2.6;
const DEPTH = 1.1;
const CROWN = (11 * Math.PI) / 180; // half the keystone's angle
const JOINT = 0.014; // the joint either side of the keystone, radians
const ARCH_H = PIER + R_OUT;

/** The distance at which a box of half-size (hw, hh), seen square on, fills the free area by `fill`. */
function fit(hw: number, hh: number, aspect: number, view: StageView | undefined, fill: number): number {
  const t = Math.tan((((view?.fovDeg ?? 40) / 2) * Math.PI) / 180);
  const tw = view && view.height > 0 ? (t * (view.free.x1 - view.free.x0)) / view.height : t * aspect;
  const th = view && view.height > 0 ? (t * (view.free.y1 - view.free.y0)) / view.height : t;
  return Math.max(hw / (tw * fill), hh / (th * fill));
}

const smooth = (x: number) => { const t = Math.max(0, Math.min(1, x)); return t * t * (3 - 2 * t); };

export function teachScene(d: TeachSceneData): StageSceneFactory {
  return (ctx) => {
    const { THREE, scene, materials, palette } = ctx;
    const n = Math.max(1, d.pairs);
    const owned: { dispose: () => void }[] = [];
    const own = <T extends { dispose: () => void }>(x: T) => (owned.push(x), x);
    let movingFrame: ThreeNS.Group | null = null;

    const angle = (k: number) => ((90 + SPREAD / 2 - (n === 1 ? SPREAD / 2 : (k * SPREAD) / (n - 1))) * Math.PI) / 180;
    const footOf = (k: number) => new THREE.Vector3(RING * Math.cos(angle(k)), 0, -RING * Math.sin(angle(k)));
    const inwardOf = (k: number) => new THREE.Vector3(-Math.cos(angle(k)), 0, Math.sin(angle(k)));

    /* ---------- the ground the space stands on, fading into the page's own ground ---------- */
    scene.fog = new THREE.Fog(palette().get('bg'), 120, 340);
    const ground = new THREE.Mesh(own(new THREE.CircleGeometry(420, 96)), materials.lit('surface', { roughness: 0.96 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // the ring the pairs stand on: one line through every arch's foot
    const ringHolder = new THREE.Group();
    ringHolder.rotation.y = ((90 - SPREAD / 2 - 12) * Math.PI) / 180;
    const ring = new THREE.Mesh(own(new THREE.TorusGeometry(RING, 0.06, 8, 160, ((SPREAD + 24) * Math.PI) / 180)), materials.glow('brand', { level: 0.55 }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    ringHolder.add(ring);
    scene.add(ringHolder);

    /* ---------- one arch: two halves, a keystone, the ↔ ---------- */
    const half = (side: -1 | 1) => {
      const s = new THREE.Shape();
      const a0 = side < 0 ? Math.PI : 0, a1 = Math.PI / 2 - side * CROWN;
      // the half's outline, foot to crown and back: the pier, the outer curve, the joint, the inner curve
      s.moveTo(side * R_OUT, 0);
      s.lineTo(side * R_OUT, PIER);
      s.absarc(0, PIER, R_OUT, a0, a1, side < 0);
      s.lineTo(R_IN * Math.cos(a1), PIER + R_IN * Math.sin(a1));
      s.absarc(0, PIER, R_IN, a1, a0, side > 0);
      s.lineTo(side * R_IN, 0);
      s.closePath();
      const g = own(new THREE.ExtrudeGeometry(s, { depth: DEPTH, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 2, curveSegments: 40 }));
      g.translate(0, 0, -DEPTH / 2);
      return g;
    };
    const keystoneShape = () => {
      const s = new THREE.Shape();
      const a = Math.PI / 2 - CROWN + JOINT, b = Math.PI / 2 + CROWN - JOINT, ri = R_IN - 0.14, ro = R_OUT + 0.3;
      s.moveTo(ro * Math.cos(a), PIER + ro * Math.sin(a));
      s.absarc(0, PIER, ro, a, b, false);
      s.lineTo(ri * Math.cos(b), PIER + ri * Math.sin(b));
      s.absarc(0, PIER, ri, b, a, true);
      s.closePath();
      const depth = DEPTH + 0.26;
      const g = own(new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 2, curveSegments: 24 }));
      g.translate(0, 0, -depth / 2);
      // the mark stands just proud of the face, past the bevel
      return { g, face: depth / 2 + 0.04 + 0.03, mid: PIER + (ri + ro) / 2 };
    };
    // ↔, drawn: a shaft with a head at each end, as wide as the keystone allows
    const arrowsGeo = (() => {
      const L = 0.43, hw = 0.17, hl = 0.19, t = 0.055;
      const s = new THREE.Shape();
      s.moveTo(-L, 0); s.lineTo(-L + hl, hw); s.lineTo(-L + hl, t); s.lineTo(L - hl, t); s.lineTo(L - hl, hw);
      s.lineTo(L, 0); s.lineTo(L - hl, -hw); s.lineTo(L - hl, -t); s.lineTo(-L + hl, -t); s.lineTo(-L + hl, -hw); s.closePath();
      const g = own(new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: false }));
      g.translate(0, 0, -0.025);
      return g;
    })();

    const leftGeo = half(-1), rightGeo = half(1), key = keystoneShape();
    const halfMat = materials.lit('brand', { roughness: 0.5 });
    const keyMat = materials.lit('elevated', { roughness: 0.55 });
    const markMat = materials.glow('brand');
    const workMat = materials.lit('muted', { roughness: 0.7 });

    const mesh = (g: ThreeNS.BufferGeometry, m: ThreeNS.Material) => { const o = new THREE.Mesh(g, m); o.castShadow = true; o.receiveShadow = true; return o; };

    const anchors: { id: string; object: ThreeNS.Object3D }[] = [];
    for (let k = 0; k < n; k++) {
      const G = new THREE.Group();
      G.position.copy(footOf(k));
      const inn = inwardOf(k);
      G.rotation.y = Math.atan2(inn.x, inn.z); // the arch faces the middle of the ring
      G.add(mesh(leftGeo, halfMat), mesh(rightGeo, halfMat), mesh(key.g, keyMat));
      for (const z of [key.face, -key.face]) {
        const mark = new THREE.Mesh(arrowsGeo, markMat);
        mark.position.set(0, key.mid, z);
        G.add(mark);
      }
      // the foot of the arch, at its front edge on the ground
      const foot = new THREE.Object3D();
      foot.position.set(0, 0, DEPTH / 2 + 0.1);
      G.add(foot);
      anchors.push({ id: footAnchor(k), object: foot });
      scene.add(G);
      if (k === d.moving) movingFrame = G;
    }

    /* ---------- the work inside the moving pair's frame ---------- */
    const count = Math.max(1, d.adapts);
    const span = 2 * (R_IN - 0.62);
    const slotX = (s: number) => (count === 1 ? 0 : -span / 2 + (s * span) / (count - 1));
    const HEIGHTS = [0.75, 1.55, 1.1, 1.95, 1.3];
    const work = Array.from({ length: count }, () => {
      const box = mesh(own(new THREE.BoxGeometry(0.6, 1, 0.6)), workMat);
      movingFrame?.add(box);
      return box;
    });
    /** Where piece i stands in layout L: each step reorders the pieces and changes their heights; the frame never moves. */
    const layout = (i: number, L: number) => {
      const slot = L % 2 === 0 ? (i + L) % count : (count - 1 - i + L) % count;
      const h = HEIGHTS[(i + 2 * L) % HEIGHTS.length];
      const turn = (L % 2 ? 0.42 : -0.18) * (i % 2 ? 1 : -1);
      return { x: slotX(slot), h, turn };
    };
    // HOW FAR THROUGH ITS STOP THE READER IS, read from the page: the stop's own section, where the stage parks it (its
    // top under the header) and where it leaves (its foot at the screen's foot). Read only near the stop, so the rest of
    // the page costs nothing; the stage's own step count would not do, since a phone pages the stop rather than step it.
    const steps = Math.max(2, d.arrangements);
    let shown = Number.NaN;
    const progress = (): number => {
      const el = document.getElementById(d.movingId);
      if (!el) return 0;
      const top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vf-stage-top')) || 0;
      const docTop = el.getBoundingClientRect().top + window.scrollY;
      const rest = docTop - top, leave = docTop + el.offsetHeight - window.innerHeight;
      return leave > rest ? Math.max(0, Math.min(1, (window.scrollY - rest) / (leave - rest))) : 0;
    };
    /** Lay the work out at a place through the stop: each arrangement holds a while, and the change between two is eased. */
    const placeWork = (at: number) => {
      const raw = at * (steps - 1);
      // under reduced motion an arrangement changes at once, in order; otherwise it travels
      const local = ctx.reducedMotion ? Math.round(raw) : Math.floor(raw) + smooth((raw - Math.floor(raw) - 0.2) / 0.6);
      if (local === shown) return false;
      shown = local;
      const L0 = Math.min(steps - 1, Math.floor(local)), L1 = Math.min(steps - 1, L0 + 1), f = local - L0;
      work.forEach((box, i) => {
        const p = layout(i, L0), q = layout(i, L1);
        const h = p.h + (q.h - p.h) * f;
        box.scale.set(1, h, 1);
        box.position.set(p.x + (q.x - p.x) * f, h / 2, 0);
        box.rotation.y = p.turn + (q.turn - p.turn) * f;
      });
      return true;
    };
    placeWork(0);

    /* ---------- where the camera stands ---------- */
    const feet = Array.from({ length: n }, (_, k) => footOf(k));
    const xs = feet.map((p) => p.x), zs = feet.map((p) => p.z);
    const whole = {
      centre: new THREE.Vector3(0, ARCH_H * 0.42, (Math.min(...zs) + Math.max(...zs)) / 2),
      hw: Math.max(...xs.map(Math.abs)) + R_OUT + 1,
      hd: (Math.max(...zs) - Math.min(...zs)) / 2 + R_OUT,
    };
    const overview = (elevDeg: number, aspect: number, view?: StageView) => {
      const e = (elevDeg * Math.PI) / 180;
      const hh = whole.hd * Math.sin(e) + (ARCH_H / 2) * Math.cos(e) + 0.6;
      const dist = fit(whole.hw, hh, aspect, view, 0.9);
      const dir = new THREE.Vector3(0, Math.sin(e), Math.cos(e));
      return { pos: whole.centre.clone().addScaledVector(dir, dist), target: whole.centre.clone() };
    };

    return {
      anchors,
      pose: (k, aspect, view) => {
        const i = Math.max(0, Math.min(n + 1, Math.round(k)));
        // the opening and the close both hold every pair in view: low enough to read the arches, high enough to read the ring
        if (i === 0) return overview(32, aspect, view);
        if (i === n + 1) return overview(56, aspect, view);
        const j = i - 1;
        const centre = footOf(j).add(new THREE.Vector3(0, ARCH_H / 2, 0));
        const dist = Math.min(RING * 0.88, fit(R_OUT + 0.4, ARCH_H / 2 + 0.4, aspect, view, 0.66));
        return {
          pos: centre.clone().addScaledVector(inwardOf(j), dist).add(new THREE.Vector3(0, dist * 0.09, 0)),
          target: centre.clone().add(new THREE.Vector3(0, -0.15, 0)),
        };
      },
      // the work answers the scroll only around its own stop; the frame it stands in never moves
      update: (pos) => (Math.abs(pos - (d.moving + 1)) < 1.25 ? placeWork(progress()) : placeWork(pos < d.moving + 1 ? 0 : 1)),
      retheme: (p) => { (scene.fog as ThreeNS.Fog).color.copy(p.get('bg')); },
      dispose: () => { for (const x of owned) x.dispose(); },
    };
  };
}

