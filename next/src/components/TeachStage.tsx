'use client';
/**
 * /teach's stage: the shared scroll stage (`@vf/site-kit/scroll-stage`) with this page's scene module. A client
 * component only because the scene is a function; every word on a stop is the server's, passed in as children.
 * `.vcp-stage` is where this site's identity reaches the stage's palette (styles/vcp-stage.css).
 */
import { useMemo, type ReactNode } from 'react';
import { ScrollStage, type StageStopSpec } from '@vf/site-kit/scroll-stage';
import { TEACH_STAGE_TOKENS, teachScene, type TeachSceneData } from '@/scene/teach-scene';

export function TeachStage({ stops, data, children }: { stops: StageStopSpec[]; data: TeachSceneData; children: ReactNode }) {
  const scene = useMemo(() => teachScene(data), [data]);
  return (
    <div className="vcp-stage">
      <ScrollStage scene={scene} stops={stops} tokens={TEACH_STAGE_TOKENS} holds>
        {children}
      </ScrollStage>
    </div>
  );
}
