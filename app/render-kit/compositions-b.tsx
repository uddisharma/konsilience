import type { CSSProperties, ReactNode } from "react";
import type { Entry } from "@/lib/image-registry";
import { BARLOW, Frame, Halftone, Label, Logo, MONO, Slab, tint, u } from "./kit";

// Resource covers and portfolio images. One art direction each (see lib/image-registry.ts).

type P = { e: Entry; og: boolean };

function Meta({ children, color }: { children: ReactNode; color: string }) {
  return <span style={{ fontSize: u(1.5), fontWeight: 500, color }}>{children}</span>;
}

/* ---------- Guides ---------- */

// poster · left-weighted: an oversized "AI" cropped by the bottom edge
function AiReadiness({ e, og }: P) {
  const [, cream, sky] = e.palette;
  return (
    <Frame e={e} og={og} logo="tl">
      <span aria-hidden className="absolute" style={{ left: "4%", bottom: "-16%", fontFamily: BARLOW, fontWeight: 600, fontSize: u(52), lineHeight: 0.8, letterSpacing: "-0.02em", color: cream }}>AI</span>
      <div className="absolute" style={{ left: "58%", top: "12%", right: "6%" }}>
        <Label style={{ color: sky }}>Guide</Label>
        <h2 style={{ fontSize: u(4.4), fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: u(2), color: cream }}>The AI Readiness Guide</h2>
        <div style={{ marginTop: u(3), borderTop: `1px solid ${sky}`, paddingTop: u(1.4) }}>
          <Meta color={tint(cream, 0.6)}>24 pages · Data, teams and processes</Meta>
        </div>
      </div>
    </Frame>
  );
}

// paper-cut · diagonal: four strips stepping down to launch week
function MvpGuide({ e, og }: P) {
  const [bg, navy, blue] = e.palette;
  const steps: [string, string][] = [["Scope", "Weeks 1–2"], ["Design", "Weeks 2–4"], ["Build", "Weeks 4–10"], ["Launch", "Week 12"]];
  return (
    <Frame e={e} og={og} logo="tr">
      {steps.map(([s, w], i) => (
        <div
          key={s}
          className="absolute flex items-start"
          style={{
            left: `${8 + i * 14}%`,
            top: `${38 + i * 12}%`,
            width: "40%",
            height: "16%",
            background: i === 3 ? blue : i % 2 ? navy : bg,
            color: i === 0 || i === 2 ? navy : bg,
            border: i === 0 || i === 2 ? `1px solid ${navy}` : "none",
            boxShadow: `${u(0.6)} ${u(0.6)} 0 ${tint(navy, 0.18)}`,
            padding: `${u(1.1)} ${u(1.6)} 0`,
          }}
        >
          <span style={{ fontSize: u(2), fontWeight: 600 }}>{s}</span>
          <span style={{ fontSize: u(1.4), fontWeight: 500, marginLeft: u(1.2), paddingTop: u(0.55), opacity: 0.75 }}>{w}</span>
        </div>
      ))}
      <div className="absolute" style={{ left: "8%", top: "10%", width: "50%" }}>
        <Label style={{ color: blue }}>Guide</Label>
        <h2 style={{ fontSize: u(4.6), fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: u(1.6), color: navy }}>MVP Development Guide</h2>
        <div style={{ marginTop: u(1.2) }}>
          <Meta color={tint(navy, 0.65)}>18 pages</Meta>
        </div>
      </div>
    </Frame>
  );
}

// blueprint · right-weighted: the checklist itself
function CloudChecklist({ e, og }: P) {
  const [, white, sky] = e.palette;
  const items = ["Inventory workloads", "Map dependencies", "Choose a migration path", "Pilot one service", "Cut over in phases", "Decommission legacy"];
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${tint(sky, 0.16)} 1px, transparent 1px), linear-gradient(90deg, ${tint(sky, 0.16)} 1px, transparent 1px)`, backgroundSize: `${u(3.2)} ${u(3.2)}` }} />
      <ul className="absolute" style={{ left: "46%", right: "6%", top: "12%" }}>
        {items.map((it, i) => (
          <li key={it} className="flex items-center" style={{ gap: u(1.6), borderBottom: `1px solid ${tint(white, 0.35)}`, padding: `${u(1.25)} 0`, fontSize: u(1.9), fontWeight: 500 }}>
            <span className="grid place-items-center" style={{ width: u(2.2), height: u(2.2), border: `1px solid ${white}`, flexShrink: 0 }}>
              {i < 3 && <svg viewBox="0 0 10 10" style={{ width: "80%" }} aria-hidden><path d="M2 5.2 4.2 7.3 8.2 2.8" fill="none" stroke={sky} strokeWidth="1.6" /></svg>}
            </span>
            <span style={{ color: i < 3 ? tint(white, 0.6) : white }}>{it}</span>
          </li>
        ))}
      </ul>
      <div className="absolute" style={{ left: "6%", top: "12%", width: "34%" }}>
        <Label style={{ color: sky }}>Guide</Label>
        <h2 style={{ fontSize: u(4.2), fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: u(1.6) }}>Cloud Migration Checklist</h2>
        <div style={{ marginTop: u(1.2) }}>
          <Meta color={tint(white, 0.65)}>12 pages</Meta>
        </div>
      </div>
    </Frame>
  );
}

// flat geometric · grid: design tokens as shapes
function DesignSystem({ e, og }: P) {
  const [, white, ink] = e.palette;
  const tokens: [string, ReactNode][] = [
    ["color.brand", <div key="a" style={{ width: "100%", height: "100%", background: ink }} />],
    ["radius.lg", <div key="b" style={{ width: "100%", height: "100%", border: `${u(0.4)} solid ${white}`, borderRadius: u(3) }} />],
    ["space.4", <div key="c" className="flex h-full items-center" style={{ gap: u(1) }}>{[1, 2, 3].map((n) => <span key={n} style={{ width: u(1.6), height: "60%", background: white }} />)}</div>],
    ["type.h2", <span key="d" style={{ fontSize: u(7), fontWeight: 600, lineHeight: 1, color: white }}>Aa</span>],
    ["color.surface", <div key="e" style={{ width: "100%", height: "100%", background: white }} />],
    ["grid.12", <div key="f" className="grid h-full grid-cols-12" style={{ gap: u(0.3) }}>{Array.from({ length: 12 }, (_, n) => <span key={n} style={{ background: tint(white, 0.45) }} />)}</div>],
  ];
  return (
    <Frame e={e} og={og} logo="tl">
      <div className="absolute grid grid-cols-3 grid-rows-2" style={{ left: "40%", right: "5%", top: "8%", bottom: "8%", gap: u(1.6) }}>
        {tokens.map(([name, shape]) => (
          <div key={name} className="flex flex-col" style={{ gap: u(1) }}>
            <div className="flex-1">{shape}</div>
            <span style={{ fontFamily: MONO, fontSize: u(1.35), color: ink }}>{name}</span>
          </div>
        ))}
      </div>
      <div className="absolute" style={{ left: "6%", bottom: "9%", width: "30%" }}>
        <Label style={{ color: ink }}>Guide</Label>
        <h2 style={{ fontSize: u(4.2), fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: u(1.6), color: white }}>Design System Starter Kit</h2>
        <div style={{ marginTop: u(1.2) }}>
          <Meta color={ink}>30 pages</Meta>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Whitepapers ---------- */

// mono with one accent · typographic
function AgenticWhitepaper({ e, og }: P) {
  const [, gray, blue] = e.palette;
  return (
    <Frame e={e} og={og} logo="br">
      <div className="absolute" style={{ left: "6%", top: "10%", right: "8%" }}>
        <Label style={{ color: gray }}>Whitepaper</Label>
        <h2 style={{ fontSize: u(8.6), fontWeight: 600, lineHeight: 0.98, letterSpacing: "-0.04em", marginTop: u(2.4), color: gray }}>
          <span style={{ color: blue }}>Agentic AI</span> for growing businesses
        </h2>
      </div>
      <div className="absolute" style={{ left: "6%", bottom: "9%", borderTop: `1px solid ${tint(gray, 0.5)}`, paddingTop: u(1.2), width: "36%" }}>
        <Meta color={gray}>PDF · Coming soon</Meta>
      </div>
    </Frame>
  );
}

// halftone · split: a dense block breaking up toward the right
function LegacyWhitepaper({ e, og }: P) {
  const [, charcoal, blue] = e.palette;
  return (
    <Frame e={e} og={og} logo="tr">
      <Halftone cols={36} rows={32} f={(x, y) => 1.05 - x * 1.25 + Math.sin(y * 9 + x * 4) * 0.08} color={charcoal} className="absolute" style={{ left: 0, top: 0, width: "50%", height: "100%" }} />
      <div className="absolute" style={{ left: "50%", top: 0, bottom: 0, width: "1px", background: blue }} />
      <div className="absolute" style={{ left: "56%", right: "6%", top: "30%" }}>
        <Label style={{ color: blue }}>Whitepaper</Label>
        <h2 style={{ fontSize: u(4.6), fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: u(1.8), color: charcoal }}>The State of Legacy Modernization</h2>
        <div style={{ marginTop: u(2) }}>
          <Meta color={tint(charcoal, 0.7)}>PDF · 2.1 MB</Meta>
        </div>
      </div>
    </Frame>
  );
}

// isometric · asymmetric: policies → controls → tooling
function GovernanceWhitepaper({ e, og }: P) {
  const [bg, cream, blue] = e.palette;
  const layers = ["Tooling", "Controls", "Policies"];
  return (
    <Frame e={e} og={og} logo="tr">
      <svg viewBox="-34 -22 64 52" className="absolute" style={{ left: "-2%", top: "14%", width: "50%" }} aria-hidden>
        {layers.map((l, i) => (
          <Slab key={l} x={0} y={0} z={i * 7} w={26} d={26} h={1.6} top={i === 2 ? blue : bg} left={i === 2 ? tint(blue, 0.7) : bg} right={i === 2 ? tint(blue, 0.85) : bg} stroke={i === 2 ? blue : cream} sw={0.2} />
        ))}
      </svg>
      <ul className="absolute" style={{ left: "44%", top: "16%", fontSize: u(1.6), fontWeight: 500, color: tint(cream, 0.75) }}>
        {layers.slice().reverse().map((l, i) => (
          <li key={l} style={{ marginBottom: u(1.6) }}>
            <span style={{ color: i === 0 ? blue : cream, fontWeight: 600 }}>{l}</span>
          </li>
        ))}
      </ul>
      <div className="absolute" style={{ left: "44%", right: "6%", bottom: "10%" }}>
        <Label style={{ color: blue }}>Whitepaper</Label>
        <h2 style={{ fontSize: u(4.2), fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: u(1.6), color: cream }}>Responsible AI Governance Framework</h2>
        <div style={{ marginTop: u(1.2) }}>
          <Meta color={tint(cream, 0.6)}>PDF · 1.8 MB</Meta>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Press releases ---------- */

// UI fragment · edge-cropped: the real Trasys AI site
function PressTrasys({ e, og }: P) {
  const [, light, blue] = e.palette;
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute overflow-hidden" style={{ left: "40%", top: "22%", right: "-10%", bottom: "-12%", border: `1px solid ${tint(light, 0.25)}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/render-kit/src/trasys-hero-3" alt="" style={{ width: "125%", maxWidth: "none", marginLeft: "-4%", marginTop: "-5%" }} />
      </div>
      <div className="absolute" style={{ left: "6%", top: "22%", width: "32%" }}>
        <Label style={{ color: blue }}>Press release</Label>
        <h2 style={{ fontSize: u(4.4), fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: u(1.8), color: "#FFFFFF" }}>
          Konsilience launches
          <br />
          Trasys AI
        </h2>
        <div style={{ marginTop: u(2), borderTop: `1px solid ${tint(light, 0.3)}`, paddingTop: u(1.2) }}>
          <Meta color={light}>Sep 2026</Meta>
        </div>
      </div>
    </Frame>
  );
}

// poster · right-weighted: the new address as the headline
function PressOffice({ e, og }: P) {
  const [, cream, ink] = e.palette;
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute" style={{ right: "6%", top: "12%", width: "62%", textAlign: "right" }}>
        <Label style={{ color: ink }}>Press release · Jun 2026</Label>
        <h2 style={{ fontSize: u(8.4), fontWeight: 600, lineHeight: 0.96, letterSpacing: "-0.04em", marginTop: u(2.4), color: cream }}>
          Sector 75,
          <br />
          Mohali
        </h2>
        <p style={{ fontSize: u(1.7), fontWeight: 500, lineHeight: 1.55, marginTop: u(3), color: tint(cream, 0.8) }}>
          Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar
          <br />
          Punjab 160071, India
        </p>
      </div>
      <div className="absolute" style={{ left: "6%", top: "12%", bottom: "12%", width: "1px", background: tint(cream, 0.5) }} />
      <span className="absolute" style={{ left: "8%", top: "12%", fontSize: u(1.5), fontWeight: 500, color: cream, writingMode: "vertical-rl" }}>New home for engineering, design and AI</span>
    </Frame>
  );
}

// mono · diagonal: 35 tally marks
function Press35({ e, og }: P) {
  const [, black, sky] = e.palette;
  return (
    <Frame e={e} og={og} logo="tr">
      <svg viewBox="0 0 160 100" className="absolute inset-0 size-full" aria-hidden>
        {Array.from({ length: 7 }, (_, g) => {
          const x = 14 + g * 18;
          const y = 82 - g * 9.5;
          const c = g === 6 ? sky : black;
          return (
            <g key={g} stroke={c} strokeWidth="1.1" strokeLinecap="square">
              {[0, 1, 2, 3].map((k) => <line key={k} x1={x + k * 3} y1={y - 12} x2={x + k * 3} y2={y} />)}
              <line x1={x - 2} y1={y - 2} x2={x + 11} y2={y - 10} />
            </g>
          );
        })}
      </svg>
      <div className="absolute" style={{ left: "6%", top: "10%", width: "44%" }}>
        <Label style={{ color: tint(black, 0.55) }}>Press release · Mar 2026</Label>
        <h2 style={{ fontSize: u(5), fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em", marginTop: u(1.8) }}>35+ projects done and counting</h2>
      </div>
    </Frame>
  );
}

/* ---------- Webinars ---------- */

// UI fragment · split: the retrieval step as code
function WebinarRag({ e, og }: P) {
  const [, white, sky] = e.palette;
  const code = [
    "const chunks = await index.search(question, { topK: 8 });",
    "const context = rerank(question, chunks).slice(0, 4);",
    "const answer = await llm.answer({ question, context });",
    "return { answer, sources: context.map((c) => c.source) };",
  ];
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute" style={{ left: "6%", top: "12%", width: "36%" }}>
        <Label style={{ color: sky }}>Webinar · On-demand · 45 min</Label>
        <h2 style={{ fontSize: u(4.6), fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: u(1.8), color: white }}>Building Production RAG Systems</h2>
      </div>
      <div className="absolute" style={{ left: "48%", top: 0, bottom: 0, right: 0, background: "#000", borderLeft: `1px solid ${tint(white, 0.15)}` }}>
        <pre style={{ fontFamily: MONO, fontSize: u(1.22), lineHeight: 2.2, color: white, margin: 0, padding: `22% 0 0 ${u(2.4)}`, whiteSpace: "pre" }}>
          {code.map((l, i) => (
            <div key={i}>
              <span style={{ color: tint(white, 0.3), marginRight: u(2) }}>{i + 1}</span>
              {l.split(/(await|const|return)/).map((t, k) => (
                <span key={k} style={/^(await|const|return)$/.test(t) ? { color: sky } : undefined}>{t}</span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </Frame>
  );
}

// halftone · left-weighted: one block splitting into services
function WebinarMonolith({ e, og }: P) {
  const [, ink, cream] = e.palette;
  const f = (x: number, y: number) => {
    if (x < 0.42) return 0.9;
    const cell = Math.floor((x - 0.42) * 10) + Math.floor(y * 6);
    return (cell % 3 === 0 ? 0.75 : 0.25) * (1 - (x - 0.42) * 1.2);
  };
  return (
    <Frame e={e} og={og} logo="br">
      <Halftone cols={40} rows={25} f={f} color={ink} className="absolute" style={{ left: 0, top: 0, width: "62%", height: "100%" }} />
      <div className="absolute" style={{ left: "6%", bottom: "10%", width: "36%", background: e.palette[0], padding: u(2) }}>
        <Label style={{ color: cream }}>Webinar · On-demand · 50 min</Label>
        <h2 style={{ fontSize: u(4.4), fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: u(1.4), color: cream }}>From Monolith to Microservices</h2>
      </div>
    </Frame>
  );
}

// duotone · right-weighted: the real AI copilots page, tinted navy/white
function WebinarCopilots({ e, og }: P) {
  const [, white, black] = e.palette;
  return (
    <Frame e={e} og={og} logo="tl">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id="duo-copilots">
          <feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={`${0x0b / 255} 1`} />
            <feFuncG type="table" tableValues={`${0x2f / 255} 1`} />
            <feFuncB type="table" tableValues={`${0x86 / 255} 1`} />
          </feComponentTransfer>
        </filter>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/render-kit/src/copilots-hero" alt="" className="absolute" style={{ left: "-8%", top: "-4%", width: "80%", filter: "url(#duo-copilots)", opacity: 0.55 }} />
      <div className="absolute inset-y-0" style={{ right: 0, width: "42%", background: black }} />
      <div className="absolute" style={{ right: "5%", top: "14%", width: "32%" }}>
        <Label style={{ color: tint(white, 0.7) }}>Webinar · Upcoming · Oct 2026</Label>
        <h2 style={{ fontSize: u(4.6), fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: u(1.8), color: white }}>AI Copilots for Sales Teams</h2>
        <p style={{ fontSize: u(1.55), fontWeight: 500, lineHeight: 1.5, marginTop: u(2), color: tint(white, 0.7) }}>Live demo and Q&A with our AI team</p>
      </div>
    </Frame>
  );
}

/* ---------- Portfolio (real screenshots) ---------- */

function Browser({ src, host, line, bg, style }: { src: string; host: string; line: string; bg: string; style: CSSProperties }) {
  return (
    <div className="absolute overflow-hidden" style={{ border: `1px solid ${line}`, background: bg, borderRadius: u(1.2), ...style }}>
      <div className="flex items-center" style={{ height: u(3.6), gap: u(0.8), padding: `0 ${u(1.4)}`, borderBottom: `1px solid ${line}` }}>
        {[0, 1, 2].map((i) => <span key={i} style={{ width: u(0.9), height: u(0.9), borderRadius: "50%", border: `1px solid ${line}` }} />)}
        <span className="mx-auto" style={{ fontSize: u(1.2), fontWeight: 500, color: line, padding: `${u(0.2)} ${u(4)}`, border: `1px solid ${line}`, borderRadius: u(0.6) }}>{host}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ display: "block", width: "100%" }} />
    </div>
  );
}

// case-study cover: fragment · right-weighted, small logo sign-off (always on)
function CaseTrasys({ e }: P) {
  const [bg, cream, blue] = e.palette;
  return (
    <Frame e={e} og={false} logo="bl">
      <Browser src="/render-kit/src/trasys-hero-3" host="trasys.dev" line={tint(cream, 0.28)} bg="#0b0b0b" style={{ left: "36%", top: "13%", width: "72%" }} />
      <div className="absolute" style={{ left: "6%", top: "13%", width: "25%" }}>
        <Label style={{ color: blue }}>Case study</Label>
        <h2 style={{ fontSize: u(5.4), fontWeight: 600, lineHeight: 1, letterSpacing: "-0.03em", marginTop: u(1.8), color: cream }}>Trasys AI</h2>
        <p style={{ fontSize: u(1.7), fontWeight: 500, lineHeight: 1.5, marginTop: u(1.8), color: tint(cream, 0.7) }}>AI observability platform, built and run by Konsilience</p>
      </div>
      <Logo bg={bg} corner="bl" width={10} />
    </Frame>
  );
}

// card art: fragment · edge-cropped, transparent background (the card supplies its colour)
function CardTrasys({ e }: P) {
  const [, white] = e.palette;
  return (
    <Frame e={e} og={false} logo="bl" grain={0} style={{ background: "transparent" }}>
      <Browser src="/render-kit/src/trasys-hero-3" host="trasys.dev" line={tint(white, 0.3)} bg="#0b0b0b" style={{ left: "7%", top: "4%", width: "106%" }} />
    </Frame>
  );
}

export const otherCompositions: Record<string, (p: P) => ReactNode> = {
  "res-ai-readiness": AiReadiness,
  "res-mvp": MvpGuide,
  "res-cloud-checklist": CloudChecklist,
  "res-design-system": DesignSystem,
  "res-agentic-whitepaper": AgenticWhitepaper,
  "res-legacy-whitepaper": LegacyWhitepaper,
  "res-governance-whitepaper": GovernanceWhitepaper,
  "res-press-trasys": PressTrasys,
  "res-press-office": PressOffice,
  "res-press-35": Press35,
  "res-webinar-rag": WebinarRag,
  "res-webinar-monolith": WebinarMonolith,
  "res-webinar-copilots": WebinarCopilots,
  "case-trasys-ai": CaseTrasys,
  "card-trasys-ai": CardTrasys,
};
