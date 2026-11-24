import type { ReactNode } from "react";
import type { Entry } from "@/lib/image-registry";
import { BARLOW, Frame, Halftone, Label, MONO, Slab, iso, tint, u } from "./kit";

// Blog covers (16:10), one per post. Each carries the post's category and the idea of the article, not
// its full title (the card prints the title right under the image). One art direction each.

type P = { e: Entry; og: boolean };

function Head({ children, color, size = 5.6 }: { children: ReactNode; color?: string; size?: number }) {
  return <h2 style={{ fontSize: u(size), fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em", color, marginTop: u(1.8) }}>{children}</h2>;
}

/* ---------- Agentic AI playbook: mono checklist, right-weighted ---------- */
function AgenticPlaybook({ e, og }: P) {
  const [, cream, blue] = e.palette;
  const steps = ["Pick one workflow", "Give the agent tools", "Set step and spend limits", "Add human approval", "Measure, then widen"];
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute" style={{ left: "6%", top: "10%", width: "36%" }}>
        <Label style={{ color: blue }}>AI · Playbook</Label>
        <Head color={cream}>
          Pilot to
          <br />
          production
        </Head>
      </div>
      <ol className="absolute" style={{ left: "46%", right: "6%", top: "12%", fontFamily: MONO, fontSize: u(2.05), color: tint(cream, 0.8) }}>
        {steps.map((s, i) => (
          <li key={s} className="flex items-center" style={{ gap: u(2), padding: `${u(og ? 1 : 2.3)} 0`, borderTop: `1px solid ${tint(cream, 0.16)}`, color: i === 4 ? blue : undefined }}>
            <span style={{ width: u(2.4), height: u(2.4), border: `1px solid ${i === 4 ? blue : tint(cream, 0.5)}`, display: "grid", placeItems: "center", fontSize: u(1.5) }}>{i < 4 ? "✓" : ""}</span>
            <span style={{ width: u(2) }}>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ---------- Legacy modernization: blueprint proxy, split ---------- */
function LegacyModernization({ e, og }: P) {
  const [bg, ink, blue] = e.palette;
  const line = { stroke: ink, strokeWidth: 0.25, fill: "none" };
  const mods: [string, boolean][] = [["orders", true], ["billing", true], ["reports", false]];
  return (
    <Frame e={e} og={og} logo="tl">
      <div className="absolute inset-y-0" style={{ left: "44%", right: 0, backgroundImage: `linear-gradient(${tint(ink, 0.07)} 1px, transparent 1px), linear-gradient(90deg, ${tint(ink, 0.07)} 1px, transparent 1px)`, backgroundSize: `${u(3.6)} ${u(3.6)}`, borderLeft: `1px solid ${ink}` }} />
      <div className="absolute" style={{ left: "6%", bottom: "12%", width: "34%" }}>
        <Label style={{ color: blue }}>Engineering</Label>
        <Head color={ink}>
          Rebuild while
          <br />
          it runs
        </Head>
      </div>
      <svg viewBox="0 0 56 62.5" preserveAspectRatio="xMidYMid meet" className="absolute" style={{ left: "44%", top: 0, width: "56%", height: "100%" }} aria-hidden>
        <rect x="18" y="8" width="20" height="7" fill={ink} />
        <text x="28" y="12.6" fill={bg} fontSize="2" fontWeight="600" textAnchor="middle" fontFamily={MONO}>proxy</text>
        <text x="4" y="27" fill={ink} fontSize="1.6" fontWeight="600" letterSpacing=".2">LEGACY</text>
        <text x="40" y="27" fill={blue} fontSize="1.6" fontWeight="600" letterSpacing=".2">NEW SERVICES</text>
        <rect x="4" y="29" width="16" height="26" {...line} strokeDasharray="1 .7" />
        {mods.map(([m, moved], i) => {
          const y = 31.5 + i * 7.6;
          return (
            <g key={m}>
              <text x="6" y={y + 2.6} fill={moved ? tint(ink, 0.35) : ink} fontSize="1.9" fontFamily={MONO} textDecoration={moved ? "line-through" : undefined}>{m}</text>
              <rect x="36" y={y} width="17" height="4.6" fill={moved ? blue : "none"} stroke={moved ? blue : tint(ink, 0.4)} strokeWidth={0.25} strokeDasharray={moved ? undefined : "1 .7"} />
              <text x="38" y={y + 3} fill={moved ? bg : tint(ink, 0.45)} fontSize="1.8" fontFamily={MONO}>{m}-svc</text>
              <path d={`M28 15 V${y + 2.3} H${moved ? 36 : 20}`} stroke={moved ? blue : ink} strokeWidth={moved ? 0.45 : 0.25} fill="none" />
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ---------- Design systems: geometric grid of tokens and components ---------- */
function DesignSystems({ e, og }: P) {
  const [bg, navy, blue] = e.palette;
  const cell = { border: `1px solid ${tint(navy, 0.35)}`, padding: u(1.8) } as const;
  return (
    <Frame e={e} og={og} logo="br">
      <div className="absolute grid grid-cols-4 grid-rows-3" style={{ inset: og ? "6% 6% 14%" : "6%", gap: 0 }}>
        <div className="col-span-2 row-span-2 flex flex-col justify-end" style={{ ...cell, background: navy }}>
          <Label style={{ color: tint(bg, 0.8) }}>Design</Label>
          <h2 style={{ fontSize: u(5), fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em", color: bg, marginTop: u(1.4) }}>
            One system,
            <br />
            every squad
          </h2>
        </div>
        {[navy, blue, "#FFFFFF", tint(navy, 0.3)].map((c, i) => (
          <div key={i} className="flex flex-col justify-between" style={cell}>
            <span style={{ width: u(5), height: u(5), background: c, borderRadius: i === 1 ? 999 : 0, border: c === "#FFFFFF" ? `1px solid ${tint(navy, 0.3)}` : "none" }} />
            <span style={{ fontFamily: MONO, fontSize: u(1.35), color: navy }}>{["color.ink", "color.accent", "color.surface", "color.muted"][i]}</span>
          </div>
        ))}
        <div className="col-span-2 flex items-end" style={{ ...cell, gap: u(2), color: navy }}>
          {[6, 4, 2.6, 1.8].map((s) => <span key={s} style={{ fontSize: u(s), fontWeight: 600, lineHeight: 1 }}>Aa</span>)}
        </div>
        <div className="flex items-center justify-center" style={cell}>
          <span style={{ background: blue, color: "#FFFFFF", fontSize: u(1.7), fontWeight: 600, padding: `${u(1)} ${u(2.2)}`, borderRadius: 999 }}>Button</span>
        </div>
        <div className="flex items-center justify-center" style={cell}>
          <span className="relative" style={{ width: u(7), height: u(3.6), borderRadius: 999, background: navy }}>
            <span className="absolute" style={{ right: u(0.5), top: u(0.5), width: u(2.6), height: u(2.6), borderRadius: 999, background: bg }} />
          </span>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Cloud cost: halftone bills stepping down a diagonal ---------- */
function CloudCost({ e, og }: P) {
  const [, white, navy] = e.palette;
  const bars: [number, string][] = [[0.92, ""], [0.8, "Rightsize"], [0.66, "Commit"], [0.5, "Re-architect"]];
  return (
    <Frame e={e} og={og} logo="tl" grain={0.03}>
      <div className="absolute flex items-end" style={{ left: "40%", right: "6%", top: "10%", bottom: "10%", gap: u(2) }}>
        {bars.map(([h, label], i) => (
          <div key={i} className="relative flex-1" style={{ height: `${h * 100}%` }}>
            <Halftone cols={14} rows={Math.round(40 * h)} f={(x, y) => 0.95 - y * 0.55 + (i === 3 ? 0.1 : 0)} color={i === 3 ? white : tint(white, 0.75)} className="absolute inset-0 size-full" />
            {label && <span className="absolute" style={{ left: 0, top: u(-3.6), background: navy, color: white, fontSize: u(1.6), fontWeight: 600, padding: `${u(0.3)} ${u(0.9)}`, whiteSpace: "nowrap" }}>{label}</span>}
          </div>
        ))}
      </div>
      <div className="absolute" style={{ left: "6%", bottom: "12%", width: "32%" }}>
        <Label style={{ color: navy }}>Cloud</Label>
        <Head color={white}>
          Spend less,
          <br />
          run the same
        </Head>
      </div>
    </Frame>
  );
}

/* ---------- App cost: typographic poster, left-weighted ---------- */
function AppCost({ e, og }: P) {
  const [, ink, cobalt] = e.palette;
  const drivers: [string, string][] = [["Complexity", "Features, integrations, AI"], ["Platforms", "Web, iOS, Android"], ["Team model", "Fixed bid or dedicated team"], ["Region", "Where the team sits"]];
  return (
    <Frame e={e} og={og} logo="tr">
      <span aria-hidden className="absolute" style={{ right: "3%", bottom: "-8%", fontFamily: BARLOW, fontWeight: 600, fontSize: u(46), lineHeight: 0.8, color: "transparent", WebkitTextStroke: `1.5px ${tint(cobalt, 0.35)}` }}>$</span>
      <div className="absolute" style={{ left: "6%", top: "9%", width: "60%" }}>
        <Label style={{ color: cobalt }}>Business</Label>
        <Head color={ink} size={5.4}>What an app really costs</Head>
      </div>
      <ol className="absolute" style={{ left: "6%", bottom: "9%", width: "58%" }}>
        {drivers.map(([t, d], i) => (
          <li key={t} className="flex items-baseline justify-between" style={{ borderTop: `1px solid ${tint(ink, 0.3)}`, padding: `${u(og ? 0.8 : 1.15)} 0`, fontSize: u(2), fontWeight: 600, color: ink }}>
            <span>
              <span style={{ color: cobalt, marginRight: u(1.6) }}>0{i + 1}</span>
              {t}
            </span>
            <span style={{ fontSize: u(1.6), fontWeight: 500, color: tint(ink, 0.6) }}>{d}</span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ---------- RAG patterns: isometric pipeline, asymmetric ---------- */
function RagPatterns({ e, og }: P) {
  const [bg, grey, sky] = e.palette;
  const layers = ["Documents", "Chunks + embeddings", "Vector store", "Retriever + rerank", "LLM answer"];
  return (
    <Frame e={e} og={og} logo="bl">
      <svg viewBox="-60 -42 106 64" className="absolute" style={{ right: "2%", bottom: "4%", width: og ? "56%" : "70%", height: "auto" }} aria-hidden>
        {layers.map((l, i) => {
          const top = i === layers.length - 1;
          const x = i * 3;
          const y = -i * 3;
          const [lx, ly] = iso(x, y + 22, i * 6.5 + 1.6);
          return (
            <g key={l}>
              <Slab x={x} y={y} z={i * 6.5} w={22} d={22} h={1.6} top={top ? sky : bg} left={top ? tint(sky, 0.7) : bg} right={top ? tint(sky, 0.85) : bg} stroke={top ? sky : grey} sw={0.2} />
              <line x1={-50} y1={ly} x2={lx - 1} y2={ly} stroke={tint(grey, 0.35)} strokeWidth={0.15} />
              <text x={-58} y={ly + 0.9} fontSize={2.6} fontWeight={top ? 600 : 500} fill={top ? sky : grey}>{l}</text>
            </g>
          );
        })}
      </svg>
      <div className="absolute" style={{ left: "6%", top: "9%" }}>
        <Label style={{ color: sky }}>AI · Architecture</Label>
        <Head color={grey}>
          7 RAG patterns
          <br />
          that hold up
        </Head>
      </div>
    </Frame>
  );
}

/* ---------- DevOps & observability: trace waterfall fragment, edge-cropped ---------- */
function DevopsObservability({ e, og }: P) {
  const [, grey, sky] = e.palette;
  const spans: [string, number, number, boolean][] = [
    ["GET /checkout", 0, 100, false],
    ["auth.verify", 1, 5, false],
    ["cart.load", 6, 16, false],
    ["db.query orders", 22, 51, true],
    ["payments.authorize", 74, 23, false],
  ];
  const ms = [412, 18, 64, 210, 96];
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "6%", top: "9%" }}>
        <Label style={{ color: sky }}>Engineering · DevOps</Label>
        <Head color={grey}>See every request</Head>
      </div>
      <div className="absolute" style={{ left: "14%", right: "-10%", top: og ? "42%" : "38%", bottom: "-6%", border: `1px solid ${tint(grey, 0.25)}`, background: tint(grey, 0.04) }}>
        <div className="flex justify-between" style={{ borderBottom: `1px solid ${tint(grey, 0.25)}`, padding: `${u(1)} ${u(2)}`, fontFamily: MONO, fontSize: u(1.4), color: tint(grey, 0.7) }}>
          <span>trace 7f3a…c21 · 5 spans</span>
        </div>
        <div style={{ padding: `${u(1.2)} ${u(2)}` }}>
          {spans.map(([name, start, width, slow], i) => (
            <div key={name} className="flex items-center" style={{ fontFamily: MONO, fontSize: u(1.6), padding: `${u(og ? 0.45 : 0.8)} 0`, color: slow ? sky : grey }}>
              <span style={{ width: u(24), paddingLeft: u(i ? 2 : 0), flexShrink: 0 }}>{name}</span>
              <span className="relative flex-1" style={{ height: u(2) }}>
                <span className="absolute inset-y-0" style={{ left: `${start * 0.62}%`, width: `${width * 0.62}%`, background: slow ? sky : tint(grey, 0.4) }} />
                <span className="absolute" style={{ left: `${(start + width) * 0.62 + 1}%`, top: "50%", transform: "translateY(-50%)", fontSize: u(1.4), whiteSpace: "nowrap" }}>{ms[i]} ms</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export const blogCompositions: Record<string, (p: P) => ReactNode> = {
  "blog-agentic-ai-enterprise-playbook": AgenticPlaybook,
  "blog-modernize-legacy-without-downtime": LegacyModernization,
  "blog-design-systems-that-scale": DesignSystems,
  "blog-cloud-cost-optimization-guide": CloudCost,
  "blog-app-development-cost-2026": AppCost,
  "blog-rag-architecture-patterns": RagPatterns,
  "blog-devops-observability-consulting": DevopsObservability,
};
