import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { HttpError, route } from "@/lib/server/http";
import { listMedia, uploadImage } from "@/lib/server/media";

export const GET = route(async (req: Request) => {
  await requireAdmin(req);
  return NextResponse.json({ media: await listMedia() });
});

export const POST = route(async (req: Request) => {
  const admin = await requireAdmin(req);
  const form = await req.formData().catch(() => {
    throw new HttpError(400, "Send the image as multipart form data");
  });
  const file = form.get("file");
  if (!(file instanceof File)) throw new HttpError(400, "No file in the upload");
  const media = await uploadImage(file, String(form.get("alt") ?? ""), admin.name);
  return NextResponse.json({ media }, { status: 201 });
});
