/**
 * Extracts student ID or verification hash from scanned QR content
 * Supports full verification URLs, query strings, and raw code strings.
 */
export function extractHashOrId(decodedText: string): string {
  const trimmed = decodedText.trim();
  if (!trimmed) return "";

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      const url = new URL(trimmed);
      const hash = url.searchParams.get("hash");
      if (hash) return hash.trim();

      const id = url.searchParams.get("id");
      if (id) return id.trim();

      const q = url.searchParams.get("q");
      if (q) return q.trim();

      const segments = url.pathname.split("/").filter(Boolean);
      const last = segments[segments.length - 1];
      if (last && last !== "verify") {
        return decodeURIComponent(last).trim();
      }
    }
  } catch {
    // Treat as raw string
  }

  return trimmed;
}
