import Icon from "./Icon";

// Placeholder product visuals drawn in CSS. Replace with real imagery (next/image) when available.

export function PhoneArt({ accent, dark = false, className = "" }: { accent: string; dark?: boolean; className?: string }) {
  const surface = dark ? "bg-[#111]" : "bg-white";
  const bar = dark ? "bg-white/15" : "bg-black/10";
  return (
    <div className={`relative flex items-end justify-center gap-3 ${className}`}>
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`${i === 0 ? "z-10 w-[46%]" : "mb-6 w-[40%] opacity-90"} aspect-[9/18] rounded-[1.6rem] border-[5px] ${dark ? "border-[#2a2a2a]" : "border-[#1b1b1b]"} ${surface} p-2 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2`}
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <div className={`mx-auto h-1.5 w-8 rounded-full ${bar}`} />
          <div className="mt-2 h-[34%] rounded-xl" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }} />
          <div className="mt-2 space-y-1.5">
            <div className={`h-1.5 w-full rounded ${bar}`} />
            <div className={`h-1.5 w-2/3 rounded ${bar}`} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className={`aspect-square rounded-lg ${bar}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardArt({ hue, className = "" }: { hue: number; className?: string }) {
  const c1 = `hsl(${hue} 90% 60%)`;
  const c2 = `hsl(${(hue + 40) % 360} 90% 55%)`;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `radial-gradient(120% 90% at 80% 0%, hsl(${hue} 80% 30% / .9), #0b0b0b 65%)` }}>
      <div className="absolute inset-x-5 top-5 bottom-0 rounded-t-xl border border-white/10 bg-white/[.04] p-3 backdrop-blur">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-white/25" />
          ))}
        </div>
        <div className="mt-3 flex h-[55%] items-end gap-1.5">
          {[45, 70, 38, 82, 60, 95, 72, 88].map((h, i) => (
            <span key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `linear-gradient(to top, ${c1}, ${c2})`, opacity: 0.35 + i * 0.08 }} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 rounded-md bg-white/[.06]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SceneArt({ hue, icon, label, className = "" }: { hue: number; icon: string; label?: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(160deg, hsl(${hue} 70% 18%), #050505 70%)` }}
    >
      <div className="absolute -top-1/4 -right-1/4 size-[80%] rounded-full blur-3xl" style={{ background: `hsl(${hue} 90% 55% / .45)` }} />
      <div className="absolute -bottom-1/3 -left-1/4 size-[70%] rounded-full blur-3xl" style={{ background: `hsl(${(hue + 50) % 360} 90% 50% / .3)` }} />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(circle at 50% 50%, #000 20%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid size-28 place-items-center rounded-[2rem] border border-white/15 bg-white/[.06] backdrop-blur-xl sm:size-36">
          <span className="absolute inset-0 rounded-[2rem] border border-white/20" style={{ animation: "ping-soft 2.8s ease-out infinite" }} />
          <Icon name={icon} className="size-12 text-white sm:size-16" strokeWidth={1.3} />
        </div>
      </div>
      {label && (
        <span className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
