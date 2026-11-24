import type { ReactNode } from "react";
import type { Entry } from "@/lib/image-registry";
import { BARLOW, Frame, Halftone, Label, MONO, Slab, iso, tint, u } from "./kit";

// Section images: services, AI solutions, company pages. One art direction each (see lib/image-registry.ts).

type P = { e: Entry; og: boolean };

/* ---------- Services: editorial typographic poster, left-weighted ---------- */
function ServicesOverview({ e, og }: P) {
  const [, ink, ac] = e.palette;
  const practices: [string, number][] = [["Product Engineering", 7], ["Digital Marketing & Growth", 6], ["Digital Transformation", 6], ["Data & Managed IT", 5], ["Consulting", 4]];
  return (
    <Frame e={e} og={og} logo="br">
      <div className="absolute flex flex-col" style={{ left: "7%", top: "9%", width: "58%", bottom: "9%" }}>
        <Label style={{ color: tint(ink, 0.55) }}>Konsilience · Services</Label>
        <h2 style={{ fontSize: u(7.4), fontWeight: 600, lineHeight: 1, letterSpacing: "-0.035em", marginTop: u(3), whiteSpace: "nowrap" }}>
          Five practices.
          <br />
          <span style={{ color: ac }}>28</span> services.
        </h2>
        <ol className="mt-auto" style={{ fontSize: u(1.9), fontWeight: 500 }}>
          {practices.map(([name, n], i) => (
            <li key={name} className="flex items-baseline justify-between" style={{ borderTop: `1px solid ${tint(ink, 0.85)}`, padding: `${u(1.25)} 0` }}>
              <span>
                <span style={{ color: tint(ink, 0.45), marginRight: u(2) }}>0{i + 1}</span>
                {name}
              </span>
              <span style={{ fontFamily: BARLOW, fontWeight: 600, fontSize: u(2.6) }}>{n}</span>
            </li>
          ))}
        </ol>
      </div>
      {/* off-grid crop: the 28 bleeding off the right edge */}
      <span aria-hidden className="absolute" style={{ right: "-6%", top: "6%", fontFamily: BARLOW, fontWeight: 600, fontSize: u(46), lineHeight: 0.8, color: "transparent", WebkitTextStroke: `1px ${tint(ink, 0.22)}` }}>
        28
      </span>
    </Frame>
  );
}

/* ---------- Product Engineering: isometric stack, right-weighted ---------- */
function ProductEngineering({ e, og }: P) {
  const [bg, ink, ac] = e.palette;
  const layers = ["DevOps & cloud", "QA & testing", "Custom software", "Web & mobile apps", "UI/UX design"];
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <h2 style={{ fontSize: u(6.4), fontWeight: 600, lineHeight: 1, letterSpacing: "-0.03em" }}>Design to deploy</h2>
      </div>
      <svg viewBox="-100 -34 132 72" className="absolute" style={{ right: "-2%", top: "29%", width: "90%", height: "auto", fontFamily: "inherit" }} aria-hidden>
        {layers.map((l, i) => {
          const top = i === layers.length - 1;
          const [lx, ly] = iso(0, 34, i * 7 + 2.2);
          return (
            <g key={l}>
              <Slab x={0} y={0} z={i * 7} w={34} d={34} h={2.2} top={top ? ac : bg} left={top ? tint(ac, 0.7) : bg} right={top ? tint(ac, 0.85) : bg} stroke={top ? ac : ink} sw={0.22} />
              <line x1={-62} y1={ly} x2={lx - 1} y2={ly} stroke={tint(ink, 0.4)} strokeWidth={0.15} />
              <text x={-96} y={ly + 1} fontSize={3} fontWeight={top ? 600 : 500} fill={top ? ac : ink}>{l}</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ---------- Digital Marketing: halftone band on a diagonal ---------- */
function DigitalMarketing({ e, og }: P) {
  const [, ink, ac] = e.palette;
  const channels = ["SEO", "Paid search", "Social", "Content", "Email", "CRO"];
  // distance to the line y = 1 - x (bottom-left → top-right), dots grow toward it
  const f = (x: number, y: number) => 1 - Math.abs(y - (1.05 - x)) * (og ? 4.6 : 3.2);
  return (
    <Frame e={e} og={og} logo="br" grain={0.03}>
      <Halftone cols={56} rows={42} f={f} color={ink} className="absolute inset-0 size-full" />
      <div className="absolute" style={{ left: "6%", top: "7%" }}>
        <h2 style={{ fontSize: u(8.2), fontWeight: 600, lineHeight: 0.96, letterSpacing: "-0.035em", color: ac }}>
          Get found.
          <br />
          Get chosen.
        </h2>
      </div>
      <ul className="absolute flex" style={{ left: "50%", top: "52%", transform: "translate(-50%,-50%) rotate(-36.9deg)", gap: u(2.6), whiteSpace: "nowrap" }}>
        {channels.map((c) => (
          <li key={c} style={{ fontSize: u(2.1), fontWeight: 600, background: ac, color: ink, padding: `${u(0.5)} ${u(1.3)}` }}>
            {c}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ---------- Digital Transformation: blueprint strangler-fig, split ---------- */
function DigitalTransformation({ e, og }: P) {
  const [, sky, cream] = e.palette;
  const mods = ["Billing", "Orders", "Customers", "Reports"];
  const line = { stroke: sky, strokeWidth: 0.25, fill: "none" };
  return (
    <Frame e={e} og={og} logo="bl">
      {/* blueprint grid */}
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${tint(sky, 0.13)} 1px, transparent 1px), linear-gradient(90deg, ${tint(sky, 0.13)} 1px, transparent 1px)`, backgroundSize: `${u(4)} ${u(4)}` }} />
      <svg viewBox="0 0 100 75" className="absolute inset-0 size-full" aria-hidden style={{ fontFamily: "inherit" }}>
        {/* legacy monolith (left half) */}
        <rect x="6" y="30" width="34" height="38" {...line} strokeDasharray="1.2 .8" />
        <text x="6" y="27.5" fill={sky} fontSize="1.7" fontWeight="600" letterSpacing=".25">LEGACY MONOLITH</text>
        {mods.map((m, i) => (
          <g key={m}>
            <rect x="9" y={33 + i * 8.6} width="28" height="6.4" {...line} />
            <text x="11" y={37.1 + i * 8.6} fill={i === 0 ? tint(sky, 0.4) : sky} fontSize="1.9" fontWeight="500" textDecoration={i === 0 ? "line-through" : undefined}>{m}</text>
          </g>
        ))}
        {/* gateway */}
        <line x1="50" y1="26" x2="50" y2="72" stroke={sky} strokeWidth=".25" />
        <text x="51" y="29" fill={sky} fontSize="1.5" fontWeight="600" letterSpacing=".25">API GATEWAY</text>
        {/* new services (right half) */}
        {["billing-service", "orders-service", "customers-service"].map((s, i) => (
          <g key={s}>
            <rect x="60" y={33 + i * 11} width="32" height="7.5" fill={i === 0 ? cream : "none"} stroke={i === 0 ? cream : sky} strokeWidth=".25" />
            <text x="62" y={37.8 + i * 11} fill={i === 0 ? e.palette[0] : sky} fontSize="1.9" fontWeight="500" fontFamily={MONO}>{s}</text>
            <line x1="50" y1={36.75 + i * 11} x2="60" y2={36.75 + i * 11} stroke={i === 0 ? cream : sky} strokeWidth={i === 0 ? 0.45 : 0.25} />
          </g>
        ))}
        {/* traffic moved: from Billing to billing-service */}
        <path d="M37 36.2 H50" stroke={cream} strokeWidth=".45" fill="none" />
        <text x="60" y="70" fill={tint(sky, 0.7)} fontSize="1.5" fontWeight="500">Reports moves next. No downtime.</text>
      </svg>
      <div className="absolute" style={{ left: "6%", top: "7%" }}>
        <h2 style={{ fontSize: u(6.2), fontWeight: 600, lineHeight: 1, letterSpacing: "-0.03em", color: cream }}>
          Modernize without
          <br />
          downtime
        </h2>
      </div>
    </Frame>
  );
}

/* ---------- Consulting: paper-cut layers, asymmetric ---------- */
function Consulting({ e, og }: P) {
  const [bg, navy, blue] = e.palette;
  const layers: [string, string, string][] = [
    ["IT Consulting", tint(navy, 0.08), navy],
    ["Software Consulting", tint(blue, 0.22), navy],
    ["Mobile App Consulting", blue, bg],
    ["FinTech Consulting", navy, bg],
  ];
  return (
    <Frame e={e} og={og} logo="tr">
      {layers.map(([name, fill, text], i) => (
        <div
          key={name}
          className="absolute flex items-start"
          style={{
            left: `${22 + i * 9}%`,
            right: "-4%",
            top: `${30 + i * 15}%`,
            bottom: "-10%",
            background: fill,
            borderTopLeftRadius: u(0.6),
            clipPath: ["none", "polygon(0 6%, 18% 0, 100% 0, 100% 100%, 0 100%)", "polygon(0 0, 72% 0, 100% 9%, 100% 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 12%)"][i],
            boxShadow: `${u(-0.6)} ${u(-0.6)} 0 ${tint("#020615", 0.14)}`,
            padding: `${u(2.2)} ${u(3)}`,
          }}
        >
          <span style={{ fontSize: u(2), fontWeight: 600, color: text }}>{name}</span>
        </div>
      ))}
      <div className="absolute" style={{ left: "6%", top: "8%", width: "60%" }}>
        <h2 style={{ fontSize: u(7), fontWeight: 600, lineHeight: 1, letterSpacing: "-0.03em", color: navy }}>
          Decide before
          <br />
          you build
        </h2>
      </div>
    </Frame>
  );
}

/* ---------- Data & Managed IT: flat geometric grid ---------- */
function DataManagedIt({ e, og }: P) {
  const [, white, black] = e.palette;
  const glyph: Record<string, ReactNode> = {
    "Big Data": (
      <g fill="none" stroke={white} strokeWidth="1.2">
        <ellipse cx="20" cy="9" rx="13" ry="4" />
        <path d="M7 9 v18 a13 4 0 0 0 26 0 v-18" />
        <path d="M7 18 a13 4 0 0 0 26 0" />
      </g>
    ),
    "Data Analytics": (
      <g fill={white}>
        <path d="M6 32 A26 26 0 0 1 32 6 V32 Z" />
        <path d="M18 32 A14 14 0 0 1 32 18 V32 Z" fill={black} />
      </g>
    ),
    "Business Intelligence": (
      <g fill={white}>
        <rect x="6" y="20" width="7" height="12" />
        <rect x="16" y="13" width="7" height="19" />
        <rect x="26" y="5" width="7" height="27" />
      </g>
    ),
    "Managed IT Services": (
      <g fill="none" stroke={white} strokeWidth="1.2">
        <rect x="5" y="5" width="28" height="28" />
        <rect x="12" y="12" width="14" height="14" fill={white} />
      </g>
    ),
    "Dedicated Teams": (
      <g fill={white}>
        <circle cx="9" cy="19" r="5" />
        <circle cx="20" cy="19" r="5" />
        <circle cx="31" cy="19" r="5" fill="none" stroke={white} strokeWidth="1.2" />
      </g>
    ),
  };
  const names = Object.keys(glyph);
  return (
    <Frame e={e} og={og} logo="br">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2" style={{ padding: og ? "5% 5% 14%" : "5%" }}>
        {names.map((n, i) => (
          <div key={n} className="relative flex flex-col justify-between" style={{ borderTop: `1px solid ${tint(white, 0.5)}`, borderLeft: i % 3 ? `1px solid ${tint(white, 0.5)}` : "none", padding: u(2.4) }}>
            <svg viewBox="0 0 38 38" style={{ width: u(9), height: u(9), marginLeft: i === 1 ? u(-4.4) : 0 }} aria-hidden>
              {glyph[n]}
            </svg>
            <span style={{ fontSize: u(2), fontWeight: 600, color: white }}>{n}</span>
          </div>
        ))}
        <div className="flex flex-col justify-end" style={{ background: black, padding: u(2.6), borderTop: `1px solid ${black}` }}>
          <h2 style={{ fontSize: u(3.7), fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.025em", color: white, whiteSpace: "nowrap" }}>
            Data in,
            <br />
            decisions out.
          </h2>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- AI overview: code fragment close-up, edge-cropped ---------- */
const kw = (s: string, c: string) => <span style={{ color: c }}>{s}</span>;
function AiOverview({ e, og }: P) {
  const [, cream, sky] = e.palette;
  const str = (s: string) => <span style={{ color: tint(cream, 0.62) }}>{s}</span>;
  const lines: ReactNode[] = [
    <>{kw("import", sky)} {"{ defineAgent }"} {kw("from", sky)} {str('"./agents"')};</>,
    <>{kw("import", sky)} {"{ lookupOrder, issueRefund, replyToCustomer }"} {kw("from", sky)} {str('"./tools"')};</>,
    <></>,
    <>{kw("export const", sky)} refundAgent = defineAgent{"({"}</>,
    <>{"  "}goal: {str('"Resolve refund requests end to end"')},</>,
    <>{"  "}tools: [lookupOrder, issueRefund, replyToCustomer],</>,
    <>{"  "}limits: {"{"} maxSteps: 8, maxSpendUsd: 0.5 {"}"},</>,
    <>{"  "}approval: {"{"} required: (order) {kw("=>", sky)} order.total {">"} 200 {"}"},</>,
    <>{"  "}trace: {str('"trasys"')},</>,
    <>{"})"};</>,
  ];
  return (
    <Frame e={e} og={og} logo="bl" grain={0.05}>
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: sky }}>AI solutions</Label>
        <h2 style={{ fontSize: u(6), fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em", marginTop: u(1.6) }}>
          Agents with
          <br />
          guardrails
        </h2>
      </div>
      {/* editor fragment bleeding off the right and bottom edges */}
      <div className="absolute" style={{ left: "16%", top: "38%", right: "-30%", bottom: "-8%", border: `1px solid ${tint(cream, 0.16)}`, background: "#000" }}>
        <div className="flex" style={{ borderBottom: `1px solid ${tint(cream, 0.16)}`, fontSize: u(1.45), fontFamily: MONO }}>
          <span style={{ padding: `${u(1)} ${u(2)}`, borderRight: `1px solid ${tint(cream, 0.16)}`, color: cream }}>refund-agent.ts</span>
          <span style={{ padding: `${u(1)} ${u(2)}`, color: tint(cream, 0.4) }}>tools.ts</span>
        </div>
        <pre style={{ fontFamily: MONO, fontSize: u(2.05), lineHeight: 1.75, padding: `${u(2)} 0`, margin: 0, color: cream }}>
          {lines.map((l, i) => (
            <div key={i} className="flex" style={i === 7 ? { background: tint(sky, 0.12) } : undefined}>
              <span style={{ width: u(5), textAlign: "right", paddingRight: u(2), color: tint(cream, 0.3) }}>{i + 1}</span>
              <span style={{ whiteSpace: "pre" }}>{l}</span>
            </div>
          ))}
        </pre>
      </div>
    </Frame>
  );
}

/* ---------- Agentic AI: terminal, mono with one accent, right-weighted ---------- */
function AgenticAi({ e, og }: P) {
  const [, gray, blue] = e.palette;
  const rows: [string, string, string?, string?][] = [
    ["plan", "lookup → policy → refund → reply"],
    ["tool", 'orders.lookup("4821")', "ok", "212 ms"],
    ["tool", 'policy.check("refund", order)', "ok", "95 ms"],
    ["tool", 'payments.refund("4821")', "ok", "640 ms"],
    ["tool", "email.reply(customer)", "ok", "180 ms"],
  ];
  return (
    <Frame e={e} og={og} logo="tl" grain={0.05}>
      <div className="absolute" style={{ left: "6%", bottom: "8%" }}>
        <h2 style={{ fontSize: u(5.4), fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.03em", color: "#CECECE" }}>
          Agents that
          <br />
          finish the job
        </h2>
      </div>
      <pre className="absolute" style={{ left: "40%", right: "5%", top: "14%", fontFamily: MONO, fontSize: u(1.85), lineHeight: 2.1, color: gray, margin: 0 }}>
        <div style={{ color: "#CECECE" }}>$ agent run refund-request --ticket 4821</div>
        {rows.map(([k, v, s, t], i) => (
          <div key={i} className="flex" style={{ gap: u(2) }}>
            <span style={{ width: u(4.5) }}>{k}</span>
            <span className="flex-1" style={{ whiteSpace: "pre" }}>{v}</span>
            {s && <span style={{ width: u(3) }}>{s}</span>}
            {t && <span style={{ width: u(6.5), textAlign: "right" }}>{t}</span>}
          </div>
        ))}
        <div className="flex" style={{ gap: u(2), color: blue }}>
          <span style={{ width: u(4.5) }}>done</span>
          <span>ticket 4821 resolved, 4 tool calls</span>
        </div>
        <div style={{ marginTop: u(1) }}>$ <span style={{ display: "inline-block", width: u(1), height: u(2), background: gray, verticalAlign: "middle" }} /></div>
      </pre>
      <div className="absolute" style={{ left: "40%", top: "9%", right: 0, borderTop: `1px solid ${tint(gray, 0.4)}` }} />
    </Frame>
  );
}

/* ---------- Generative AI: typographic split, question / grounded answer ---------- */
function GenerativeAi({ e, og }: P) {
  const [bg, ink, white] = e.palette;
  const cite = (n: number) => <sup style={{ fontSize: "0.62em", fontWeight: 600, background: white, color: ink, padding: "0 .3em", marginLeft: ".15em" }}>{n}</sup>;
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute" style={{ left: "6%", top: "8%", width: "40%" }}>
        <Label style={{ color: white }}>Ask your documents</Label>
        <p style={{ fontSize: u(5.6), fontWeight: 600, lineHeight: 1.06, letterSpacing: "-0.03em", marginTop: u(3) }}>What is our refund window for annual plans?</p>
      </div>
      <div className="absolute" style={{ left: "52%", top: 0, bottom: 0, right: 0, background: ink, color: bg, padding: `8% 6%` }}>
        <p style={{ fontSize: u(2.3), fontWeight: 500, lineHeight: 1.55, color: "#F8F7F4" }}>
          Annual plans can be refunded in full within 30 days of purchase{cite(1)}. After that, refunds are pro-rated for the unused months{cite(2)}. Enterprise contracts follow the
          signed order form{cite(3)}.
        </p>
        <ol style={{ marginTop: u(5), fontSize: u(1.6), fontWeight: 500, color: tint("#F8F7F4", 0.7) }}>
          {["Refund policy.pdf · page 2", "Pricing FAQ · Annual plans", "Master services agreement · §7"].map((s, i) => (
            <li key={s} className="flex" style={{ gap: u(1.6), borderTop: `1px solid ${tint("#F8F7F4", 0.18)}`, padding: `${u(1.1)} 0` }}>
              <span style={{ color: bg }}>{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

/* ---------- AI Copilots: line-art email draft with margin suggestion, asymmetric ---------- */
function AiCopilots({ e, og }: P) {
  const [, black, blue] = e.palette;
  const rule = `1px solid ${black}`;
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "-3%", top: "16%", width: "62%", height: "70%", border: rule }}>
        <div className="flex justify-between" style={{ borderBottom: rule, padding: `${u(1.2)} ${u(2)} ${u(1.2)} ${u(5)}`, fontSize: u(1.5), fontWeight: 500 }}>
          <span>Reply · Pricing follow-up</span>
          <span style={{ color: tint(black, 0.5) }}>Draft</span>
        </div>
        <div style={{ padding: `${u(2.4)} ${u(3)} 0 ${u(5)}`, fontSize: u(1.85), fontWeight: 500, lineHeight: 1.75 }}>
          <p style={{ color: tint(black, 0.5) }}>To: Northwind Logistics</p>
          <p style={{ marginTop: u(1.6) }}>Thanks for the call on Tuesday. The pricing we discussed is in the attached proposal.</p>
          <p style={{ marginTop: u(1.2), textDecoration: `line-through ${blue}`, textDecorationThickness: "2px", color: tint(black, 0.55) }}>Let us know if you have any thoughts at some point.</p>
          <p style={{ marginTop: u(1.2), color: blue }}>Could we book 30 minutes with your CTO this week to agree the rollout?</p>
        </div>
      </div>
      {/* margin note connected by a 1px line */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 75" preserveAspectRatio="none" aria-hidden>
        <path d="M59 37.6 H69.5" fill="none" stroke={blue} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute" style={{ left: "70%", top: "48.5%", width: "24%", borderTop: `2px solid ${blue}`, paddingTop: u(1.2) }}>
        <Label style={{ color: blue }}>Copilot</Label>
        <p style={{ fontSize: u(1.7), fontWeight: 500, lineHeight: 1.5, marginTop: u(0.8) }}>Ask for a specific next step. Their CTO joined the last call.</p>
      </div>
      <div className="absolute" style={{ left: "66%", top: "16%", width: "30%" }}>
        <h2 style={{ fontSize: u(5.2), fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
          A second
          <br />
          pair of eyes
        </h2>
      </div>
    </Frame>
  );
}

/* ---------- Computer Vision: halftone bottles, edge-cropped, crisp detection boxes ---------- */
function ComputerVision({ e, og }: P) {
  const [, cobalt, ink] = e.palette;
  // bottle silhouette: neck + shoulder + body, shaded darker on the left
  const bottle = (x: number, y: number) => {
    const cx = 0.5;
    const dx = Math.abs(x - cx);
    const inBody = y > 0.38 && dx < 0.36;
    const inShoulder = y > 0.24 && y <= 0.38 && dx < 0.12 + ((y - 0.24) / 0.14) * 0.24;
    const inNeck = y > 0.06 && y <= 0.24 && dx < 0.12;
    if (!(inBody || inShoulder || inNeck)) return 0;
    return 0.35 + (cx - x) * 1.1;
  };
  const labelled = (x: number, y: number) => bottle(x, y) + (Math.abs(x - 0.5) < 0.36 && y > 0.55 && y < 0.78 ? 0.3 : 0);
  const bottles = [
    { left: 8, cap: true, label: true },
    { left: 34, cap: false, label: true },
    { left: 60, cap: true, label: false },
    { left: 86, cap: true, label: true },
  ];
  return (
    <Frame e={e} og={og} logo="tl">
      {/* conveyor line */}
      <div className="absolute" style={{ left: 0, right: 0, top: "93%", borderTop: `1px solid ${ink}` }} />
      {bottles.map((b, i) => (
        <div key={i} className="absolute" style={{ left: `${b.left}%`, top: "32%", width: "22%", height: "61%" }}>
          <Halftone cols={22} rows={52} f={b.label ? labelled : bottle} color={cobalt} className="absolute inset-0 size-full" />
          {b.cap && <div className="absolute" style={{ left: "37%", width: "26%", top: "1%", height: "6%", background: cobalt }} />}
        </div>
      ))}
      {/* detections (1px, no glow) */}
      {[
        { left: 32.5, top: 29, w: 25, h: 66, text: "cap missing" },
        { left: 58.5, top: 29, w: 25, h: 66, text: "label missing" },
      ].map((d) => (
        <div key={d.text} className="absolute" style={{ left: `${d.left}%`, top: `${d.top}%`, width: `${d.w}%`, height: `${d.h}%`, border: `1.5px solid ${ink}` }}>
          <span className="absolute" style={{ left: -1.5, top: u(-3), background: ink, color: e.palette[0], fontSize: u(1.45), fontWeight: 600, padding: `${u(0.35)} ${u(0.9)}`, whiteSpace: "nowrap" }}>{d.text}</span>
        </div>
      ))}
      <div className="absolute" style={{ right: "5%", top: "7%", textAlign: "right" }}>
        <h2 style={{ fontSize: u(5.6), fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em", color: ink }}>
          Every unit,
          <br />
          inspected
        </h2>
      </div>
    </Frame>
  );
}

/* ---------- Conversational AI: paper-cut chat bubbles, right-weighted ---------- */
function ConversationalAi({ e, og }: P) {
  const [bg, cream, sky] = e.palette;
  const msgs: [boolean, string][] = [
    [false, "Can I move my delivery to Saturday?"],
    [true, "Yes. Saturday has slots from 10am to 2pm. Which suits you?"],
    [false, "11am, please."],
    [true, "Done. Your delivery is now on Saturday at 11am."],
  ];
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute flex flex-col" style={{ right: "6%", top: "9%", width: "52%", gap: u(2.4) }}>
        {msgs.map(([ai, t], i) => (
          <p
            key={i}
            style={{
              alignSelf: ai ? "flex-start" : "flex-end",
              maxWidth: "86%",
              background: ai ? cream : sky,
              color: ai ? bg : "#020615",
              fontSize: u(2.05),
              fontWeight: 500,
              lineHeight: 1.45,
              padding: `${u(1.5)} ${u(2.2)}`,
              borderRadius: ai ? `${u(2.6)} ${u(2.6)} ${u(2.6)} 0` : `${u(2.6)} ${u(2.6)} 0 ${u(2.6)}`,
              boxShadow: `${u(0.7)} ${u(0.7)} 0 #031432`,
              transform: `rotate(${[-1.2, 0.8, -0.6, 1][i]}deg)`,
            }}
          >
            {t}
          </p>
        ))}
      </div>
      <div className="absolute" style={{ left: "6%", top: "9%", width: "32%" }}>
        <Label style={{ color: sky }}>WhatsApp · Web · Voice</Label>
        <h2 style={{ fontSize: u(5.4), fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.03em", color: cream, marginTop: u(2) }}>
          Answers at
          <br />
          any hour
        </h2>
      </div>
    </Frame>
  );
}

/* ---------- About: duotone crop of the real home page, edge-cropped (16:9) ---------- */
function About({ e, og }: P) {
  const [ink, cream, sky] = e.palette;
  return (
    <Frame e={e} og={og} logo="bl">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id="duo-about">
          <feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={`${0x02 / 255} ${0x5e / 255}`} />
            <feFuncG type="table" tableValues={`${0x06 / 255} ${0x96 / 255}`} />
            <feFuncB type="table" tableValues={`${0x15 / 255} ${0xfe / 255}`} />
          </feComponentTransfer>
        </filter>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/render-kit/src/home-hero" alt="" className="absolute" style={{ left: "40%", top: 0, height: "100%", width: "auto", maxWidth: "none", filter: "url(#duo-about)", opacity: 0.9 }} />
      <div className="absolute inset-y-0" style={{ left: 0, width: "40%", background: ink }} />
      <div className="absolute" style={{ left: "6%", top: "12%" }}>
        <Label style={{ color: sky }}>One team</Label>
        <p style={{ fontSize: u(5.4), fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.03em", color: cream, marginTop: u(2.4) }}>
          Strategy.
          <br />
          Design.
          <br />
          Engineering.
          <br />
          <span style={{ color: sky }}>AI.</span>
        </p>
      </div>
    </Frame>
  );
}

/* ---------- Careers: typographic grid of the six benefits ---------- */
function Careers({ e, og }: P) {
  const [, black, cobalt] = e.palette;
  const benefits = ["Health & wellbeing", "Learning budget", "Flexible work", "Career growth", "AI-first tooling", "Great people"];
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "6%", top: "8%", width: "62%" }}>
        <h2 style={{ fontSize: u(7.4), fontWeight: 600, lineHeight: 0.98, letterSpacing: "-0.035em" }}>
          Do your best
          <br />
          work here
        </h2>
      </div>
      <div className="absolute grid grid-cols-3" style={{ left: "6%", right: "6%", bottom: "8%", borderTop: `1px solid ${black}` }}>
        {benefits.map((b, i) => (
          <div key={b} style={{ padding: `${u(2)} ${u(2)} ${u(2.6)} ${i % 3 ? u(2) : 0}`, borderLeft: i % 3 ? `1px solid ${tint(black, 0.25)}` : "none", borderBottom: i < 3 ? `1px solid ${tint(black, 0.25)}` : "none" }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 600, fontSize: u(4.2), color: cobalt, lineHeight: 1 }}>0{i + 1}</span>
            <p style={{ fontSize: u(2), fontWeight: 600, marginTop: u(1.2) }}>{b}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ---------- Security: mono checklist grid, one accent ---------- */
function Security({ e, og }: P) {
  const [, ink, cobalt] = e.palette;
  const controls: [string, string][] = [
    ["Data protection", "Encryption in transit and at rest, strict data segregation per client."],
    ["Access control", "SSO, MFA, least-privilege access and quarterly access reviews."],
    ["Secure SDLC", "Threat modelling, SAST/DAST, dependency scanning and code review."],
    ["Monitoring", "24/7 logging, alerting and incident response playbooks."],
  ];
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <h2 style={{ fontSize: u(7), fontWeight: 600, lineHeight: 1, letterSpacing: "-0.035em" }}>
          Secure by
          <br />
          default
        </h2>
      </div>
      <div className="absolute grid grid-cols-2" style={{ left: "6%", right: "6%", top: "42%", bottom: "7%" }}>
        {controls.map(([t, d], i) => (
          <div key={t} style={{ borderTop: `1px solid ${ink}`, borderLeft: i % 2 ? `1px solid ${tint(ink, 0.2)}` : "none", padding: `${u(2.2)} ${u(2.4)} 0 ${i % 2 ? u(2.4) : 0}` }}>
            <div className="flex items-center" style={{ gap: u(1.2) }}>
              <svg viewBox="0 0 12 12" style={{ width: u(2), height: u(2) }} aria-hidden>
                <rect x=".5" y=".5" width="11" height="11" fill="none" stroke={ink} />
                <path d="M3 6.2 5.1 8.2 9 3.8" fill="none" stroke={cobalt} strokeWidth="1.6" />
              </svg>
              <span style={{ fontSize: u(2.2), fontWeight: 600 }}>{t}</span>
            </div>
            <p style={{ fontSize: u(1.65), fontWeight: 500, lineHeight: 1.55, marginTop: u(1), color: tint(ink, 0.7), maxWidth: "92%" }}>{d}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export const sectionCompositions: Record<string, (p: P) => ReactNode> = {
  "services-overview": ServicesOverview,
  "svc-product-engineering": ProductEngineering,
  "svc-digital-marketing": DigitalMarketing,
  "svc-digital-transformation": DigitalTransformation,
  "svc-consulting": Consulting,
  "svc-data-managed-it": DataManagedIt,
  "ai-overview": AiOverview,
  "ai-agentic": AgenticAi,
  "ai-generative": GenerativeAi,
  "ai-copilots": AiCopilots,
  "ai-vision": ComputerVision,
  "ai-conversational": ConversationalAi,
  about: About,
  careers: Careers,
  security: Security,
};

