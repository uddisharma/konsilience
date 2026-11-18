"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, fmtDate } from "./api";
import { Button, Input, Notice } from "./fields";

export type MediaItem = { id: string; url: string; filename: string; contentType: string; size: number; alt: string; uploadedAt: string; uploadedBy: string };

export async function uploadFile(file: File, alt = ""): Promise<MediaItem> {
  const form = new FormData();
  form.append("file", file);
  form.append("alt", alt);
  const { media } = await api<{ media: MediaItem }>("/api/admin/media", { method: "POST", body: form });
  return media;
}

function useMedia() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState("");
  const load = useCallback(() => {
    api<{ media: MediaItem[] }>("/api/admin/media")
      .then((r) => setItems(r.media))
      .catch((e) => setError(e.message));
  }, []);
  useEffect(load, [load]);
  return { items, setItems, error, setError, reload: load };
}

function UploadButton({ onUploaded, label = "Upload image" }: { onUploaded: (m: MediaItem) => void; label?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        hidden
        multiple
        onChange={async (e) => {
          const files = [...(e.target.files ?? [])];
          e.target.value = "";
          setBusy(true);
          setErr("");
          try {
            for (const f of files) onUploaded(await uploadFile(f));
          } catch (x) {
            setErr((x as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      />
      <Button variant="outline" onClick={() => ref.current?.click()} disabled={busy}>
        {busy ? "Uploading…" : label}
      </Button>
      {err && <span className="text-xs text-red-400">{err}</span>}
    </>
  );
}

/** Modal grid of uploaded images. */
export function MediaPicker({ onPick, onClose }: { onPick: (m: MediaItem) => void; onClose: () => void }) {
  const { items, setItems, error } = useMedia();
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4" onClick={onClose}>
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-[#111]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 border-b border-line p-4">
          <h2 className="font-semibold">Media library</h2>
          <div className="flex items-center gap-2">
            <UploadButton onUploaded={(m) => setItems((l) => [m, ...(l ?? [])])} />
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
        <div className="overflow-y-auto p-4">
          {error && <Notice tone="error">{error}</Notice>}
          {!items ? (
            <p className="text-sm text-muted">Loading…</p>
          ) : items.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">No images yet. Upload one.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {items.map((m) => (
                <button key={m.id} type="button" onClick={() => onPick(m)} className="group overflow-hidden rounded-xl border border-line text-left hover:border-primary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt={m.alt} className="aspect-[4/3] w-full bg-black object-cover" loading="lazy" />
                  <span className="block truncate px-2 py-1.5 text-[11px] text-muted group-hover:text-white">{m.filename}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** URL input + upload + pick from library, with a thumbnail. */
export function ImageField({ value, onChange, onAlt }: { value: string | undefined; onChange: (url: string) => void; onAlt?: (alt: string) => void }) {
  const [picking, setPicking] = useState(false);
  const pick = (m: MediaItem) => {
    onChange(m.url);
    if (m.alt && onAlt) onAlt(m.alt);
    setPicking(false);
  };
  return (
    <div className="flex flex-col gap-2">
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="max-h-48 w-full rounded-lg border border-line bg-black object-contain" />
      )}
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="https://… or pick / upload" />
      <div className="flex flex-wrap items-center gap-2">
        <UploadButton onUploaded={pick} label="Upload" />
        <Button variant="outline" onClick={() => setPicking(true)}>
          Library
        </Button>
        {value && (
          <Button variant="danger" onClick={() => onChange("")}>
            Remove
          </Button>
        )}
      </div>
      {picking && <MediaPicker onPick={pick} onClose={() => setPicking(false)} />}
    </div>
  );
}

/** Full media library page. */
export function MediaLibrary() {
  const { items, setItems, error, setError } = useMedia();
  const [copied, setCopied] = useState("");
  const remove = async (m: MediaItem) => {
    if (!confirm(`Delete ${m.filename}? Posts that use it will show a broken image.`)) return;
    try {
      await api(`/api/admin/media/${m.id}`, { method: "DELETE" });
      setItems((l) => l?.filter((x) => x.id !== m.id) ?? null);
    } catch (e) {
      setError((e as Error).message);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <UploadButton onUploaded={(m) => setItems((l) => [m, ...(l ?? [])])} label="Upload images" />
        <span className="text-xs text-muted">PNG, JPEG, WebP, GIF or AVIF, up to 4 MB each.</span>
      </div>
      {error && <Notice tone="error">{error}</Notice>}
      {!items ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {items.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-xl border border-line bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.alt} className="aspect-[4/3] w-full bg-black object-cover" loading="lazy" />
              <div className="flex flex-col gap-1 p-3 text-xs">
                <span className="truncate font-semibold">{m.filename}</span>
                <span className="text-muted">
                  {(m.size / 1024).toFixed(0)} KB · {fmtDate(m.uploadedAt)}
                </span>
                <div className="mt-1 flex gap-1">
                  <Button
                    className="!px-2 !py-1 text-xs"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(new URL(m.url, location.origin).toString());
                      setCopied(m.id);
                    }}
                  >
                    {copied === m.id ? "Copied" : "Copy URL"}
                  </Button>
                  <Button className="!px-2 !py-1 text-xs" variant="danger" onClick={() => remove(m)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
