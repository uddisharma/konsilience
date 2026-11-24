import { readFile } from "node:fs/promises";
import { join } from "node:path";

// DEV-ONLY: serves screenshots captured into .render-cache/ (real pages only) to the render canvas.
export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  if (process.env.NODE_ENV === "production") return new Response("Not found", { status: 404 });
  const name = (await params).name.replace(/[^a-z0-9-]/gi, "");
  try {
    const buf = await readFile(join(process.cwd(), ".render-cache", `${name}.png`));
    return new Response(new Uint8Array(buf), { headers: { "Content-Type": "image/png", "Cache-Control": "no-store" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
