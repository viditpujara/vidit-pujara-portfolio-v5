type Json = Record<string, unknown>;

/**
 * JSON-LD emitter. Accepts one graph object or several, and escapes the
 * closing script sequence so a string in the data cannot break out.
 */
export function StructuredData({ data }: { data: Json | Json[] }) {
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // The payload is built from typed content in src/content, never user input.
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
