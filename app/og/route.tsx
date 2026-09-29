import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/routes";

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/og-image.png", request.url), 307);
}
