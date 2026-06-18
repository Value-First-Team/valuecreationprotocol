/**
 * Diagram — inline figure for the SVG diagrams in /public/diagrams.
 * React port of Diagram.astro. Diagrams are responsive viewBox SVGs.
 * Server-safe.
 */
export interface DiagramProps {
  name: 'protocol-stack' | 'encoding-stack' | 'three-org' | 'value-path';
  alt: string;
  caption?: string;
  maxWidth?: number;
}

export function Diagram({ name, alt, caption, maxWidth = 880 }: DiagramProps) {
  const src = `/diagrams/${name}.svg`;
  return (
    <figure className="my-10 mx-auto" style={{ maxWidth: `${maxWidth}px` }}>
      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
      </div>
      {caption && (
        <figcaption className="text-sm text-stone-500 mt-3 text-center italic">{caption}</figcaption>
      )}
    </figure>
  );
}
