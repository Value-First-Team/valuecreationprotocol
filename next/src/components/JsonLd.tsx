/**
 * JsonLd — renders a schema.org JSON-LD <script>. React port of the Astro
 * `<script type="application/ld+json" set:html={JSON.stringify(...)} />`
 * pattern used across the site. Server-safe.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
