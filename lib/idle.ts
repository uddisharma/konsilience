// Run non-critical work (chat, analytics) after the page is interactive without risking it never
// running: requestIdleCallback with a hard cap, or the visitor's first interaction, whichever is first.
// The cap matters: the animated home hero keeps desktop browsers busy, so idle time may never come.

const DEFAULT_MAX_WAIT_MS = 5000;
const FIRST_INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

/** Run `start` once, when idle (at most `maxWaitMs` later) or on first interaction. Returns a cancel function. */
export function runWhenIdle(start: () => void, maxWaitMs: number = DEFAULT_MAX_WAIT_MS): () => void {
  let done = false;
  const run = (): void => {
    if (done) return;
    done = true;
    cancel();
    start();
  };
  FIRST_INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }));
  const idleId = window.requestIdleCallback?.(run, { timeout: maxWaitMs });
  const timerId = idleId === undefined ? window.setTimeout(run, maxWaitMs) : undefined;
  function cancel(): void {
    FIRST_INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, run));
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timerId !== undefined) window.clearTimeout(timerId);
    done = true;
  }
  return cancel;
}

/** Inject an external script once (matched by id). Resolves on load, rejects on error. */
export function loadScript(id: string, src: string, attrs: Readonly<Record<string, string>> = {}): Promise<void> {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  if (existing) {
    return existing.dataset.loaded === "true"
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(new Error(`${src} failed`)), { once: true });
        });
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.id = id;
    s.src = src;
    s.async = true;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    s.onload = () => {
      s.dataset.loaded = "true";
      resolve();
    };
    s.onerror = () => {
      s.remove(); // allow a retry
      reject(new Error(`${src} failed to load`));
    };
    document.head.appendChild(s);
  });
}

/**
 * Open connections to third-party origins ahead of use (DNS + TLS), once per origin.
 * `anonymous` must match how the origin is later fetched (e.g. a script with crossorigin), or the
 * browser opens a second connection and the warm one is wasted.
 */
export function preconnect(origins: readonly string[], { anonymous = false }: { readonly anonymous?: boolean } = {}): void {
  origins.forEach((origin) => {
    if (document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    if (anonymous) link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
}

/** Run `start` once, on the visitor's first scroll, tap, click or key press. Returns a cancel function. */
export function runOnFirstInteraction(start: () => void): () => void {
  const run = (): void => {
    cancel();
    start();
  };
  function cancel(): void {
    FIRST_INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, run));
  }
  FIRST_INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }));
  return cancel;
}
