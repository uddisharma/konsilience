import Icon from "./Icon";
import { Phone, flushScreens, makeTheme, phoneScreens } from "./PhoneMockups";

// Product visuals drawn in code: realistic app screens per portfolio project (see PhoneMockups).

export function PhoneArt({ slug, accent, dark = false, className = "" }: { slug: string; accent: string; dark?: boolean; className?: string }) {
  const pair = phoneScreens[slug] ?? phoneScreens["omnichannel-helpdesk"];
  const t = makeTheme(accent, dark);
  return (
    <div className={`@container relative ${className}`} aria-hidden>
      <div className="relative flex items-start justify-center gap-[4cqw]">
        {(["front", "back"] as const).map((k, i) => (
          <Phone
            key={k}
            t={t}
            flush={flushScreens.has(`${slug}:${k}`)}
            className={`${i === 0 ? "z-10 w-[50%]" : "mt-[10cqw] w-[43%]"} transition-transform duration-700 group-hover:-translate-y-2`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {pair[k](t)}
          </Phone>
        ))}
      </div>
      {/* floating notification */}
      <div
        className="float-b absolute top-[16cqw] -left-[3cqw] z-20 flex items-center gap-[.6em] rounded-[1.1em] px-[.85em] py-[.65em] text-[2.7cqw] shadow-[0_1em_2.5em_-.6em_rgba(0,0,0,.45)] backdrop-blur-xl"
        style={{ background: dark ? "rgba(20,20,22,.88)" : "rgba(255,255,255,.92)", border: `1px solid ${dark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.06)"}` }}
      >
        <span className="grid size-[2.2em] shrink-0 place-items-center rounded-full" style={{ background: t.a, color: t.on }}>
          <Icon name={pair.toast.icon} className="size-[1.1em]" strokeWidth={2.2} />
        </span>
        <span className="leading-tight">
          <span className="block font-bold whitespace-nowrap" style={{ color: dark ? "#fff" : "#0f0f12" }}>{pair.toast.title}</span>
          <span className="block text-[.82em] font-medium whitespace-nowrap" style={{ color: dark ? "rgba(255,255,255,.6)" : "rgba(15,15,18,.55)" }}>{pair.toast.sub}</span>
        </span>
      </div>
    </div>
  );
}

export function DashboardArt({ hue, className = "" }: { hue: number; className?: string }) {
  const c1 = `hsl(${hue} 90% 62%)`;
  const c2 = `hsl(${(hue + 40) % 360} 85% 60%)`;
  const pts = [22, 30, 26, 38, 34, 46, 42, 55, 50, 62, 58, 72];
  const d = pts.map((v, i) => `${(i / (pts.length - 1)) * 100},${80 - v}`).join(" L");
  return (
    <div className={`@container relative overflow-hidden ${className}`} style={{ background: `radial-gradient(120% 90% at 85% 0%, hsl(${hue} 80% 32% / .9), #0b0b0b 62%)` }} aria-hidden>
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <div className="absolute inset-x-[5%] top-[7%] bottom-[-4%] flex overflow-hidden rounded-t-[1.4cqw] border border-white/10 bg-[#0e0f12]/90 text-[1.35cqw] text-white shadow-[0_4cqw_10cqw_-3cqw_rgba(0,0,0,.7)] backdrop-blur-xl">
        {/* sidebar */}
        <div className="flex w-[16%] flex-col gap-[.9em] border-r border-white/[.07] bg-white/[.02] p-[1em]">
          <div className="flex gap-[.35em]">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="size-[.65em] rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="mt-[.4em] flex items-center gap-[.5em]">
            <span className="grid size-[1.7em] place-items-center rounded-[.45em]" style={{ background: c1 }}>
              <Icon name="spark" className="size-[1em]" />
            </span>
            <span className="font-bold">Acme</span>
          </div>
          {[["grid", "Overview", 1], ["chart", "Analytics", 0], ["users", "Customers", 0], ["cloud", "Deploys", 0], ["shield", "Security", 0]].map(([ic, l, on]) => (
            <span key={l as string} className="flex items-center gap-[.5em] rounded-[.5em] px-[.5em] py-[.35em]" style={on ? { background: "rgba(255,255,255,.08)" } : { color: "rgba(255,255,255,.5)" }}>
              <Icon name={ic as string} className="size-[1em]" />
              <span className="text-[.85em] font-semibold">{l}</span>
            </span>
          ))}
        </div>
        {/* main */}
        <div className="flex flex-1 flex-col gap-[1em] p-[1.3em]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[.75em] text-white/50">Good morning, Sam</p>
              <p className="text-[1.35em] font-bold tracking-tight">Overview</p>
            </div>
            <div className="flex items-center gap-[.6em]">
              <span className="flex items-center gap-[.4em] rounded-[.6em] border border-white/10 px-[.7em] py-[.35em] text-[.8em] text-white/60">
                <Icon name="search" className="size-[1em]" /> Search
              </span>
              <span className="grid size-[2em] place-items-center rounded-full text-[.8em] font-bold" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>SM</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[.8em]">
            {[["Active users", "24.8k", "+12.4%"], ["Conversion", "4.6%", "+0.8%"], ["Revenue", "$182k", "+18.2%"]].map(([l, v, dlt], i) => (
              <div key={l} className="rounded-[.8em] border border-white/[.07] bg-white/[.03] p-[.9em]" style={i === 2 ? { borderColor: `hsl(${hue} 90% 60% / .4)`, background: `hsl(${hue} 90% 60% / .1)` } : undefined}>
                <p className="text-[.72em] font-semibold tracking-wide text-white/50 uppercase">{l}</p>
                <div className="mt-[.3em] flex items-baseline justify-between">
                  <span className="text-[1.5em] font-bold tracking-tight">{v}</span>
                  <span className="text-[.75em] font-semibold text-emerald-300">{dlt}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-[1.6fr_1fr] gap-[.8em]">
            <div className="flex flex-col rounded-[.8em] border border-white/[.07] bg-white/[.03] p-[.9em]">
              <div className="flex justify-between text-[.8em]">
                <span className="font-semibold">Revenue</span>
                <span className="text-white/50">Last 12 months</span>
              </div>
              <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="mt-[.6em] w-full flex-1">
                <defs>
                  <linearGradient id={`da-${hue}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={c1} stopOpacity=".45" />
                    <stop offset="1" stopColor={c1} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 40, 60].map((y) => (
                  <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(255,255,255,.06)" vectorEffect="non-scaling-stroke" />
                ))}
                <path d={`M0,80 L${d} L100,80 Z`} fill={`url(#da-${hue})`} />
                <path d={`M${d}`} fill="none" stroke={c1} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-[.5em] rounded-[.8em] border border-white/[.07] bg-white/[.03] p-[.9em]">
              <span className="text-[.8em] font-semibold">Deploys</span>
              {[["api-gateway", "Passed", "#34d399"], ["web-app", "Passed", "#34d399"], ["ml-worker", "Running", c2], ["billing", "Passed", "#34d399"]].map(([n, st, c]) => (
                <div key={n} className="flex items-center justify-between border-t border-white/[.06] pt-[.45em] text-[.75em]">
                  <span className="font-mono text-white/75">{n}</span>
                  <span className="flex items-center gap-[.35em] font-semibold" style={{ color: c }}>
                    <span className="size-[.5em] rounded-full" style={{ background: c }} />
                    {st}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
