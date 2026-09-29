"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { applyBrand, BRAND_KEY, DEFAULT_BRAND, presets } from "@/lib/theme";
import Icon from "./ui/Icon";

// Floating colour picker for trying brand colours live. Remove <ThemePicker /> from app/layout.tsx once a colour is chosen.
function ThemePickerContent() {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(DEFAULT_BRAND);

  // Sync with the colour the boot script applied from localStorage.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BRAND_KEY);
      if (saved) setColor(saved); // eslint-disable-line react-hooks/set-state-in-effect
    } catch {}
  }, []);

  const pick = (hex: string) => {
    setColor(hex);
    applyBrand(hex);
    try {
      if (hex === DEFAULT_BRAND) localStorage.removeItem(BRAND_KEY);
      else localStorage.setItem(BRAND_KEY, hex);
    } catch {}
  };

  if (!isEditMode) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 print:hidden">
      {open && (
        <div className="anim-fade-up absolute bottom-16 left-0 w-72 rounded-3xl border border-line bg-card/95 p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Brand colour</p>
            <button onClick={() => setOpen(false)} aria-label="Close colour picker" className="text-white/60 hover:text-white">
              <Icon name="close" className="size-4" />
            </button>
          </div>
          <p className="mt-1 text-xs text-muted">Try an accent. It applies across the whole site.</p>

          <div className="mt-4 grid grid-cols-6 gap-2.5">
            {presets.map((p) => (
              <button
                key={p.hex}
                onClick={() => pick(p.hex)}
                title={p.name}
                aria-label={p.name}
                className={`aspect-square rounded-full transition-transform hover:scale-110 ${color.toLowerCase() === p.hex ? "ring-2 ring-white ring-offset-2 ring-offset-card" : ""}`}
                style={{ backgroundColor: p.hex }}
              />
            ))}
            <label
              title="Custom colour"
              className="relative grid aspect-square cursor-pointer place-items-center overflow-hidden rounded-full border border-dashed border-white/30 text-white/70 hover:border-white"
            >
              <Icon name="plus" className="size-4" />
              <input type="color" value={color} onChange={(e) => pick(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" aria-label="Custom colour" />
            </label>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs">
            <span className="flex items-center gap-2 font-mono text-white/70">
              <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
              {color.toUpperCase()}
              {presets.find((p) => p.hex === color.toLowerCase()) && <span className="font-sans text-muted">· {presets.find((p) => p.hex === color.toLowerCase())!.name}</span>}
            </span>
            <button onClick={() => pick(DEFAULT_BRAND)} className="font-semibold text-white/70 hover:text-white">Reset</button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change brand colour"
        className="grid size-14 place-items-center rounded-full border border-line bg-card shadow-2xl transition-transform hover:scale-105"
      >
        <span
          className="size-7 rounded-full"
          style={{ background: `conic-gradient(${presets.map((p) => p.hex).join(",")},${presets[0].hex})` }}
        />
      </button>
    </div>
  );
}

export default function ThemePicker() {
  return (
    <Suspense fallback={null}>
      <ThemePickerContent />
    </Suspense>
  );
}
