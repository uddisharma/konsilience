import { readImage } from "@/lib/server/media";

/* Serves images from the media library. Ids never change, so responses cache for a year. */
export async function GET(_req: Request, ctx: RouteContext<"/api/media/[id]">) {
  try {
    const img = await readImage((await ctx.params).id);
    if (!img) return new Response("Not found", { status: 404 });
    return new Response(new Uint8Array(img.data), {
      headers: {
        "Content-Type": img.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Security-Policy": "default-src 'none'",
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
    });
  } catch (err) {
    console.error("[media]", err);
    return new Response("Unavailable", { status: 503 });
  }
}
