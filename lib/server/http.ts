import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { DbNotConfiguredError } from "./db";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function zodMessage(err: ZodError) {
  return err.issues.map((i) => `${i.path.join(".") || "input"}: ${i.message}`).join("; ");
}

/** Turns thrown errors into JSON responses so route handlers stay short. */
export function toErrorResponse(err: unknown) {
  if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
  if (err instanceof ZodError) return NextResponse.json({ error: zodMessage(err), issues: err.issues }, { status: 400 });
  if (err instanceof DbNotConfiguredError) return NextResponse.json({ error: err.message }, { status: 503 });
  console.error("[api]", err);
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}

export function route<A extends unknown[]>(fn: (...args: A) => Promise<Response>) {
  return async (...args: A) => {
    try {
      return await fn(...args);
    } catch (err) {
      return toErrorResponse(err);
    }
  };
}

export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new HttpError(400, "Body must be valid JSON");
  }
}
