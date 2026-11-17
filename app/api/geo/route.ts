// Returns the visitor's country (from Vercel's edge geolocation header) so the cookie banner can
// apply opt-in rules for EU/EEA/UK/CH visitors. Nothing is stored or logged.
export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
  const country = request.headers.get("x-vercel-ip-country") ?? "";
  return Response.json({ country }, { headers: { "cache-control": "private, no-store" } });
}
