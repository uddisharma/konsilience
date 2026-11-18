"use client";

import { useState } from "react";
import type { Block, BlockType } from "@/lib/blog/schema";
import { newBlockId } from "@/lib/blog/utils";
import { AutoTextarea, Button, Field, Input, inputCls, RichText, Select } from "./fields";
import { ImageField } from "./Media";

type B<T extends BlockType> = Extract<Block, { type: T }>;
type Update = (b: Block) => void;

export const BLOCK_TYPES: { type: BlockType; label: string; hint: string; make: () => Block }[] = [
  { type: "paragraph", label: "Paragraph", hint: "Rich text", make: () => ({ id: newBlockId(), type: "paragraph", text: "" }) },
  { type: "heading", label: "Heading", hint: "Section title (H2-H4)", make: () => ({ id: newBlockId(), type: "heading", level: 2, text: "" }) },
  { type: "list", label: "List", hint: "Bullets, numbers, steps, checks", make: () => ({ id: newBlockId(), type: "list", style: "bullet", items: [""] }) },
  { type: "image", label: "Image", hint: "Photo with caption", make: () => ({ id: newBlockId(), type: "image", url: "", alt: "", size: "content" }) },
  { type: "gallery", label: "Gallery", hint: "Grid of images", make: () => ({ id: newBlockId(), type: "gallery", columns: 2, images: [] }) },
  { type: "quote", label: "Quote", hint: "Pull quote", make: () => ({ id: newBlockId(), type: "quote", text: "" }) },
  { type: "callout", label: "Callout", hint: "Tip, note or warning box", make: () => ({ id: newBlockId(), type: "callout", tone: "tip", text: "" }) },
  { type: "code", label: "Code", hint: "Code snippet", make: () => ({ id: newBlockId(), type: "code", code: "", language: "ts" }) },
  { type: "table", label: "Table", hint: "Comparison table", make: () => ({ id: newBlockId(), type: "table", headers: ["Column 1", "Column 2"], rows: [["", ""]] }) },
  { type: "stats", label: "Stats", hint: "Key numbers", make: () => ({ id: newBlockId(), type: "stats", items: [{ value: "", label: "" }] }) },
  { type: "faq", label: "FAQ", hint: "Questions (adds FAQ schema)", make: () => ({ id: newBlockId(), type: "faq", title: "Frequently asked questions", items: [{ q: "", a: "" }] }) },
  { type: "cta", label: "Call to action", hint: "Button box", make: () => ({ id: newBlockId(), type: "cta", title: "", label: "Book a 15-min call", href: "/contact#book", style: "card" }) },
  { type: "embed", label: "Video / embed", hint: "YouTube, Vimeo, Loom", make: () => ({ id: newBlockId(), type: "embed", url: "", aspect: "16/9" }) },
  { type: "divider", label: "Divider", hint: "Horizontal rule", make: () => ({ id: newBlockId(), type: "divider" }) },
];

const label = (t: BlockType) => BLOCK_TYPES.find((x) => x.type === t)?.label ?? t;

/** Editable list of strings with add / remove / reorder. */
function StringList({ items, onChange, placeholder, rich }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string; rich?: boolean }) {
  const set = (i: number, v: string) => onChange(items.map((x, j) => (j === i ? v : x)));
  const move = (i: number, d: number) => {
    const n = [...items];
    const j = i + d;
    if (j < 0 || j >= n.length) return;
    [n[i], n[j]] = [n[j], n[i]];
    onChange(n);
  };
  return (
    <div className="flex flex-col gap-2">
      {items.map((t, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-2 w-5 text-right text-xs text-muted">{i + 1}</span>
          <div className="flex-1">
            {rich ? <RichText value={t} onChange={(v) => set(i, v)} placeholder={placeholder} /> : <Input value={t} onChange={(e) => set(i, e.target.value)} placeholder={placeholder} />}
          </div>
          <div className="flex flex-col">
            <button type="button" className="px-1 text-xs text-muted hover:text-white" onClick={() => move(i, -1)} title="Move up">▲</button>
            <button type="button" className="px-1 text-xs text-muted hover:text-white" onClick={() => move(i, 1)} title="Move down">▼</button>
          </div>
          <button type="button" className="mt-1.5 px-1 text-muted hover:text-red-400" onClick={() => onChange(items.filter((_, j) => j !== i))} title="Remove">
            ✕
          </button>
        </div>
      ))}
      <Button variant="outline" className="w-fit !py-1 text-xs" onClick={() => onChange([...items, ""])}>
        + Add item
      </Button>
    </div>
  );
}

function BlockFields({ block: b, update }: { block: Block; update: Update }) {
  const set = <T extends Block>(patch: Partial<T>) => update({ ...b, ...patch } as Block);

  switch (b.type) {
    case "paragraph":
      return <RichText value={b.text} onChange={(text) => set({ text })} placeholder="Write a paragraph… (select text and use the toolbar for bold, links…)" />;
    case "heading":
      return (
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={String(b.level)} onChange={(v) => set<B<"heading">>({ level: Number(v) as 2 | 3 | 4 })} options={[["2", "H2 · section"], ["3", "H3 · sub-section"], ["4", "H4"]]} className="sm:w-40" />
          <Input value={b.text} onChange={(e) => set({ text: e.target.value })} placeholder="Heading text" className="text-base font-semibold" />
          <Input value={b.anchor ?? ""} onChange={(e) => set({ anchor: e.target.value || undefined })} placeholder="#anchor (auto)" className="sm:w-40" />
        </div>
      );
    case "list":
      return (
        <div className="flex flex-col gap-3">
          <Select value={b.style} onChange={(v) => set<B<"list">>({ style: v as B<"list">["style"] })} options={[["bullet", "• Bullets"], ["numbered", "1. Numbered"], ["steps", "Step cards"], ["check", "✓ Checklist"]]} className="w-48" />
          <StringList items={b.items} onChange={(items) => set({ items })} placeholder="List item" rich />
        </div>
      );
    case "image":
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <ImageField value={b.url} onChange={(url) => set({ url })} onAlt={(alt) => !b.alt && set({ alt })} />
          <div className="flex flex-col gap-3">
            <Field label="Alt text" hint="Describe the image for screen readers and Google.">
              <Input value={b.alt} onChange={(e) => set({ alt: e.target.value })} />
            </Field>
            <Field label="Caption">
              <Input value={b.caption ?? ""} onChange={(e) => set({ caption: e.target.value || undefined })} />
            </Field>
            <Field label="Width" hint="Wide and full only break out in the centred layout.">
              <Select value={b.size} onChange={(v) => set<B<"image">>({ size: v as B<"image">["size"] })} options={[["content", "Text width"], ["wide", "Wide"], ["full", "Full"]]} />
            </Field>
            <Field label="Link (optional)">
              <Input value={b.link ?? ""} onChange={(e) => set({ link: e.target.value || undefined })} />
            </Field>
          </div>
        </div>
      );
    case "gallery":
      return (
        <div className="flex flex-col gap-3">
          <Select value={String(b.columns)} onChange={(v) => set<B<"gallery">>({ columns: Number(v) as 2 | 3 })} options={[["2", "2 columns"], ["3", "3 columns"]]} className="w-40" />
          <div className="grid gap-3 md:grid-cols-2">
            {b.images.map((m, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg border border-line p-3">
                <ImageField value={m.url} onChange={(url) => set({ images: b.images.map((x, j) => (j === i ? { ...x, url } : x)) })} />
                <Input value={m.alt} onChange={(e) => set({ images: b.images.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)) })} placeholder="Alt text" />
                <Input value={m.caption ?? ""} onChange={(e) => set({ images: b.images.map((x, j) => (j === i ? { ...x, caption: e.target.value } : x)) })} placeholder="Caption" />
                <Button variant="danger" className="w-fit !py-1 text-xs" onClick={() => set({ images: b.images.filter((_, j) => j !== i) })}>
                  Remove image
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-fit text-xs" onClick={() => set({ images: [...b.images, { url: "", alt: "" }] })}>
            + Add image
          </Button>
        </div>
      );
    case "quote":
      return (
        <div className="flex flex-col gap-2">
          <RichText value={b.text} onChange={(text) => set({ text })} placeholder="Quote" />
          <Input value={b.cite ?? ""} onChange={(e) => set({ cite: e.target.value || undefined })} placeholder="Who said it (optional)" />
        </div>
      );
    case "callout":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Select value={b.tone} onChange={(v) => set<B<"callout">>({ tone: v as B<"callout">["tone"] })} options={[["info", "Note"], ["tip", "Tip"], ["warning", "Warning"], ["success", "Success"]]} className="w-36" />
            <Input value={b.title ?? ""} onChange={(e) => set({ title: e.target.value || undefined })} placeholder="Title (optional)" />
          </div>
          <RichText value={b.text} onChange={(text) => set({ text })} placeholder="Callout text" />
        </div>
      );
    case "code":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input value={b.language ?? ""} onChange={(e) => set({ language: e.target.value || undefined })} placeholder="Language (ts, py, bash…)" className="w-48" />
            <Input value={b.filename ?? ""} onChange={(e) => set({ filename: e.target.value || undefined })} placeholder="Filename (optional)" />
          </div>
          <AutoTextarea value={b.code} onChange={(e) => set({ code: e.target.value })} className="font-mono text-xs" spellCheck={false} placeholder="// code" />
        </div>
      );
    case "table": {
      const cols = b.headers.length;
      const setCell = (r: number, c: number, v: string) => set({ rows: b.rows.map((row, i) => (i === r ? row.map((x, j) => (j === c ? v : x)) : row)) });
      return (
        <div className="flex flex-col gap-2">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1">
              <thead>
                <tr>
                  {b.headers.map((h, c) => (
                    <th key={c}>
                      <input className={`${inputCls} font-semibold`} value={h} onChange={(e) => set({ headers: b.headers.map((x, j) => (j === c ? e.target.value : x)) })} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r}>
                    {Array.from({ length: cols }, (_, c) => (
                      <td key={c}>
                        <input className={inputCls} value={row[c] ?? ""} onChange={(e) => setCell(r, c, e.target.value)} />
                      </td>
                    ))}
                    <td>
                      <button type="button" className="px-1 text-muted hover:text-red-400" onClick={() => set({ rows: b.rows.filter((_, i) => i !== r) })}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="!py-1 text-xs" onClick={() => set({ rows: [...b.rows, Array(cols).fill("")] })}>+ Row</Button>
            <Button variant="outline" className="!py-1 text-xs" onClick={() => set({ headers: [...b.headers, `Column ${cols + 1}`], rows: b.rows.map((r) => [...r, ""]) })}>+ Column</Button>
            {cols > 1 && (
              <Button variant="outline" className="!py-1 text-xs" onClick={() => set({ headers: b.headers.slice(0, -1), rows: b.rows.map((r) => r.slice(0, cols - 1)) })}>− Last column</Button>
            )}
            <Input value={b.caption ?? ""} onChange={(e) => set({ caption: e.target.value || undefined })} placeholder="Caption (optional)" className="max-w-xs !py-1 text-xs" />
          </div>
        </div>
      );
    }
    case "stats":
      return (
        <div className="flex flex-col gap-2">
          {b.items.map((s, i) => (
            <div key={i} className="flex gap-2">
              <Input value={s.value} onChange={(e) => set({ items: b.items.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)) })} placeholder="42%" className="w-32" />
              <Input value={s.label} onChange={(e) => set({ items: b.items.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })} placeholder="What it means" />
              <button type="button" className="px-1 text-muted hover:text-red-400" onClick={() => set({ items: b.items.filter((_, j) => j !== i) })}>✕</button>
            </div>
          ))}
          <Button variant="outline" className="w-fit !py-1 text-xs" onClick={() => set({ items: [...b.items, { value: "", label: "" }] })}>+ Stat</Button>
        </div>
      );
    case "faq":
      return (
        <div className="flex flex-col gap-3">
          <Input value={b.title ?? ""} onChange={(e) => set({ title: e.target.value || undefined })} placeholder="Section title (optional)" />
          {b.items.map((q, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-line p-3">
              <div className="flex gap-2">
                <Input value={q.q} onChange={(e) => set({ items: b.items.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)) })} placeholder="Question" className="font-semibold" />
                <button type="button" className="px-1 text-muted hover:text-red-400" onClick={() => set({ items: b.items.filter((_, j) => j !== i) })}>✕</button>
              </div>
              <RichText value={q.a} onChange={(a) => set({ items: b.items.map((x, j) => (j === i ? { ...x, a } : x)) })} placeholder="Answer" />
            </div>
          ))}
          <Button variant="outline" className="w-fit !py-1 text-xs" onClick={() => set({ items: [...b.items, { q: "", a: "" }] })}>+ Question</Button>
        </div>
      );
    case "cta":
      return (
        <div className="grid gap-2 md:grid-cols-2">
          <Input value={b.title} onChange={(e) => set({ title: e.target.value })} placeholder="Title" />
          <Select value={b.style} onChange={(v) => set<B<"cta">>({ style: v as B<"cta">["style"] })} options={[["card", "Card"], ["banner", "Banner"]]} />
          <Input value={b.text ?? ""} onChange={(e) => set({ text: e.target.value || undefined })} placeholder="Supporting text (optional)" className="md:col-span-2" />
          <Input value={b.label} onChange={(e) => set({ label: e.target.value })} placeholder="Button label" />
          <Input value={b.href} onChange={(e) => set({ href: e.target.value })} placeholder="/contact#book or https://…" />
        </div>
      );
    case "embed":
      return (
        <div className="grid gap-2 md:grid-cols-[1fr_200px_120px]">
          <Input value={b.url} onChange={(e) => set({ url: e.target.value })} placeholder="https://www.youtube.com/watch?v=…" />
          <Input value={b.title ?? ""} onChange={(e) => set({ title: e.target.value || undefined })} placeholder="Title" />
          <Select value={b.aspect} onChange={(v) => set<B<"embed">>({ aspect: v as B<"embed">["aspect"] })} options={["16/9", "4/3", "1/1"]} />
        </div>
      );
    case "divider":
      return <hr className="border-line" />;
  }
}

function AddMenu({ onAdd, compact }: { onAdd: (b: Block) => void; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {compact ? (
        <div className="group flex h-4 items-center">
          <div className="h-px flex-1 bg-transparent group-hover:bg-line" />
          <button type="button" onClick={() => setOpen((o) => !o)} className="mx-2 grid size-6 place-items-center rounded-full border border-line bg-black text-sm text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:border-primary hover:text-white focus:opacity-100" title="Insert block here">
            +
          </button>
          <div className="h-px flex-1 bg-transparent group-hover:bg-line" />
        </div>
      ) : (
        <button type="button" onClick={() => setOpen((o) => !o)} className="w-full rounded-2xl border border-dashed border-line py-4 text-sm font-semibold text-muted hover:border-primary hover:text-white">
          + Add block
        </button>
      )}
      {open && (
        <div className="absolute left-1/2 z-30 mt-2 grid w-[min(92vw,560px)] -translate-x-1/2 grid-cols-2 gap-1 rounded-xl border border-line bg-[#141414] p-2 shadow-2xl sm:grid-cols-3">
          {BLOCK_TYPES.map((t) => (
            <button
              key={t.type}
              type="button"
              onClick={() => {
                onAdd(t.make());
                setOpen(false);
              }}
              className="rounded-lg p-2.5 text-left hover:bg-white/10"
            >
              <span className="block text-sm font-semibold">{t.label}</span>
              <span className="block text-[11px] text-muted">{t.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlockEditor({ blocks, onChange }: { blocks: Block[]; onChange: (b: Block[]) => void }) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const ids = blocks.map((b, i) => b.id ?? `i${i}`);

  const update = (i: number, b: Block) => onChange(blocks.map((x, j) => (j === i ? b : x)));
  const insert = (i: number, b: Block) => onChange([...blocks.slice(0, i), b, ...blocks.slice(i)]);
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= blocks.length) return;
    const n = [...blocks];
    [n[i], n[j]] = [n[j], n[i]];
    onChange(n);
  };
  const toggle = (id: string) =>
    setCollapsed((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const ctrl = "grid size-7 place-items-center rounded text-xs text-muted hover:bg-white/10 hover:text-white disabled:opacity-30";
  return (
    <div className="flex flex-col">
      {blocks.length === 0 && <p className="mb-4 rounded-2xl border border-line bg-card p-6 text-center text-sm text-muted">The body is empty. Add a block, or paste Markdown in the “Markdown” tab.</p>}
      {blocks.map((b, i) => {
        const id = ids[i];
        const isCollapsed = collapsed.has(id);
        return (
          <div key={id}>
            {i > 0 && <AddMenu compact onAdd={(nb) => insert(i, nb)} />}
            <div className={`rounded-2xl border bg-card ${b.type === "heading" ? "border-primary/40" : "border-line"}`}>
              <div className="flex items-center gap-1 border-b border-line/60 px-3 py-1.5">
                <button type="button" onClick={() => toggle(id)} className="mr-auto flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60 uppercase hover:text-white">
                  <span className={`transition-transform ${isCollapsed ? "-rotate-90" : ""}`}>▾</span>
                  {label(b.type)}
                  {b.type === "heading" && <span className="font-normal normal-case">H{b.level}</span>}
                  {isCollapsed && "text" in b && <span className="max-w-[40ch] truncate font-normal normal-case text-muted">{b.text}</span>}
                </button>
                <button type="button" className={ctrl} onClick={() => move(i, -1)} disabled={i === 0} title="Move up">▲</button>
                <button type="button" className={ctrl} onClick={() => move(i, 1)} disabled={i === blocks.length - 1} title="Move down">▼</button>
                <button type="button" className={ctrl} onClick={() => insert(i + 1, { ...structuredClone(b), id: newBlockId() })} title="Duplicate">⧉</button>
                <button type="button" className={`${ctrl} hover:!text-red-400`} onClick={() => onChange(blocks.filter((_, j) => j !== i))} title="Delete block">✕</button>
              </div>
              {!isCollapsed && (
                <div className="p-3">
                  <BlockFields block={b} update={(nb) => update(i, nb)} />
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div className="mt-4">
        <AddMenu onAdd={(b) => onChange([...blocks, b])} />
      </div>
    </div>
  );
}
