import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/server/auth";
import { HttpError, readJson, route } from "@/lib/server/http";
import { getPost } from "@/lib/server/posts";
import { eligibility, PLATFORMS, platformStatus, syndicatePost } from "@/lib/server/syndication";
import { listSyndications } from "@/lib/server/syndication/store";

// Up to four platforms run in parallel; each has a request timeout of 20 seconds.
export const maxDuration = 60;

type Ctx = { params: Promise<{ id: string }> };

const HTTP_BAD_REQUEST = 400;

const body = z.object({
  platforms: z.array(z.enum(PLATFORMS)).min(1).max(PLATFORMS.length),
  force: z.boolean().optional(),
});

/** Where this post already is on each platform, and whether it can be cross-posted now. */
export const GET = route(async (req: Request, ctx: Ctx) => {
  await requireAdmin(req);
  const id = (await ctx.params).id;
  const post = await getPost(id);
  return NextResponse.json({
    platforms: platformStatus(),
    records: await listSyndications(id),
    eligibility: eligibility(post),
  });
});

/** Cross-posts a live Konsilience post to the chosen platforms. */
export const POST = route(async (req: Request, ctx: Ctx) => {
  const admin = await requireAdmin(req);
  const id = (await ctx.params).id;
  const { platforms, force } = body.parse(await readJson(req));
  const post = await getPost(id);
  const check = eligibility(post);
  if (!check.ok) throw new HttpError(HTTP_BAD_REQUEST, check.reason ?? "This post cannot be cross-posted yet.");
  const existing = await listSyndications(id);
  const results = await syndicatePost(post, [...new Set(platforms)], admin.name, force ?? false, existing);
  return NextResponse.json({ results });
});
