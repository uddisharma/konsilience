"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "./fields";

/*
 * A confirmation modal, used instead of window.confirm():
 *
 *   const [confirm, dialog] = useConfirm();
 *   if (await confirm({ title: "Unpublish?", body: "...", action: "Unpublish", danger: true })) { ... }
 *   return <>{...}{dialog}</>;
 *
 * Rendered in a portal on <body>, marked data-admin-modal so menus can tell its clicks are not "outside".
 */

export type ConfirmOptions = { title: string; body?: ReactNode; action: string; danger?: boolean };

function ConfirmModal({ opts, onClose }: { opts: ConfirmOptions; onClose: (ok: boolean) => void }) {
  const actionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    actionRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose(false);
      }
    };
    // Capture phase, so Escape closes this modal before any menu underneath reacts to it.
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return createPortal(
    <div data-admin-modal className="fixed inset-0 z-[200] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={() => onClose(false)}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-[0_30px_80px_rgba(0,0,0,.7)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="text-lg font-semibold text-white">{opts.title}</h2>
        {opts.body && <div className="mt-2 text-sm leading-relaxed text-white/70">{opts.body}</div>}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onClose(false)}>Cancel</Button>
          <Button
            ref={actionRef}
            variant={opts.danger ? "danger" : "primary"}
            className={opts.danger ? "!bg-red-500/15 !text-red-300 hover:!bg-red-500/25" : ""}
            onClick={() => onClose(true)}
          >
            {opts.action}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function useConfirm(): [(opts: ConfirmOptions) => Promise<boolean>, ReactNode] {
  const [pending, setPending] = useState<{ opts: ConfirmOptions; resolve: (ok: boolean) => void } | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => new Promise<boolean>((resolve) => setPending({ opts, resolve })), []);

  const close = useCallback(
    (ok: boolean) => {
      pending?.resolve(ok);
      setPending(null);
    },
    [pending],
  );

  return [confirm, pending ? <ConfirmModal opts={pending.opts} onClose={close} /> : null];
}
