import "server-only";

/* Helpers shared by the platform adapters. */

const MS_PER_SECOND = 1000;
const REQUEST_TIMEOUT_SECONDS = 20;

/** Every platform request gives up after this long, so one slow site cannot hang the publish. */
export const requestSignal = (): AbortSignal => AbortSignal.timeout(REQUEST_TIMEOUT_SECONDS * MS_PER_SECOND);

/** A required environment variable, or a clear error naming it. */
export function env(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

/** The JSON body of a response, or an empty object when it is not JSON. */
export async function parseBody(res: Response): Promise<Record<string, unknown>> {
  const data: unknown = await res.json().catch(() => ({}));
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
}
