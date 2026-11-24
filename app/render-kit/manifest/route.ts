import { registry } from "@/lib/image-registry";

// DEV-ONLY: every image the render script should produce.
export function GET() {
  if (process.env.NODE_ENV === "production") return new Response("Not found", { status: 404 });
  return Response.json(registry.map(({ id, file, size, og, palette }) => ({ id, file, size, og: Boolean(og), transparent: size === "card", bg: palette[0] })));
}
