import type { CSSProperties, ReactNode } from "react";
import type { Entry } from "@/lib/image-registry";
import { BARLOW, Frame, Halftone, Label, MONO, Slab, iso, pts, tint, u } from "./kit";

// Industry heroes: /industries and every /industries/[slug]. One art direction each (see lib/image-registry.ts).
// Content comes from the industry's own solutions in lib/catalog.ts; sample UI data is illustrative, never a metric.

type P = { e: Entry; og: boolean };

function Title({ children, size = 6, color, style }: { children: ReactNode; size?: number; color?: string; style?: CSSProperties }) {
  return <h2 style={{ fontSize: u(size), fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em", color, ...style }}>{children}</h2>;
}

/* ---------- Overview: typographic index of every industry ---------- */
function IndustriesOverview({ e, og }: P) {
  const [, cream, blue] = e.palette;
  const names = ["Healthcare", "Finance", "Retail & Ecommerce", "Logistics", "Education", "Real Estate", "eMobility", "Wearables", "Energy", "Agriculture", "Gaming", "OTT & Media", "On-Demand", "Food Delivery", "Travel", "Aviation", "Telecom", "Startups"];
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "6%", top: "8%", width: "60%" }}>
        <Label style={{ color: blue }}>Industries we serve</Label>
        <Title size={6.6} style={{ marginTop: u(2.2), lineHeight: 1 }}>
          Domain depth
          <br />
          in every sector
        </Title>
      </div>
      <ol className="absolute grid grid-cols-3" style={{ left: "6%", right: "6%", bottom: "8%", columnGap: u(3), fontSize: u(1.9), fontWeight: 500 }}>
        {names.map((n, i) => (
          <li key={n} className="flex items-baseline" style={{ borderTop: `1px solid ${tint(cream, 0.22)}`, padding: `${u(1.05)} 0`, gap: u(1.4) }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 600, color: blue, width: u(2.6) }}>{String(i + 1).padStart(2, "0")}</span>
            {n}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ---------- Healthcare: flat geometric cross and circle, asymmetric ---------- */
function Healthcare({ e, og }: P) {
  const [, ink, blue] = e.palette;
  const items = ["Telemedicine", "EHR / EMR integration", "Remote patient monitoring"];
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute rounded-full" style={{ right: "-16%", top: "-22%", width: u(62), height: u(62), background: blue }} />
      <div className="absolute rounded-full" style={{ right: "34%", bottom: "-20%", width: u(30), height: u(30), border: `1px solid ${ink}` }} />
      <div className="absolute" style={{ right: "6%", bottom: "-6%", width: u(24), height: u(24), background: tint(blue, 0.14) }} />
      {/* the cross: two flat bars, overlapping the circle */}
      <div className="absolute" style={{ right: "14%", top: "20%", width: u(30), height: u(30) }}>
        <div className="absolute" style={{ left: "35%", top: 0, width: "30%", height: "100%", background: ink }} />
        <div className="absolute" style={{ top: "35%", left: 0, height: "30%", width: "100%", background: ink }} />
      </div>
      <div className="absolute" style={{ left: "6%", top: "8%", width: "50%" }}>
        <Label style={{ color: blue }}>Healthcare</Label>
        <Title size={6.2} color={ink} style={{ marginTop: u(2) }}>
          Care that
          <br />
          reaches the
          <br />
          patient
        </Title>
      </div>
      <ul className="absolute flex flex-col" style={{ left: "6%", bottom: og ? "16%" : "9%", gap: u(1.4) }}>
        {items.map((t) => (
          <li key={t} className="flex items-center" style={{ gap: u(1.4), fontSize: u(2.1), fontWeight: 600, color: ink }}>
            <span style={{ width: u(1.4), height: u(1.4), background: blue }} />
            {t}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ---------- Finance: blueprint grid of six platforms ---------- */
function Finance({ e, og }: P) {
  const [, white, sky] = e.palette;
  const cells = ["Digital Banking", "Lending Platforms", "Payment Gateways", "WealthTech", "InsurTech", "Fraud Detection"];
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${tint(sky, 0.1)} 1px, transparent 1px), linear-gradient(90deg, ${tint(sky, 0.1)} 1px, transparent 1px)`, backgroundSize: `${u(4)} ${u(4)}` }} />
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: sky }}>Finance</Label>
        <Title size={6.4} color={white} style={{ marginTop: u(2) }}>
          Built for
          <br />
          regulated money
        </Title>
      </div>
      <div className="absolute grid grid-cols-3 grid-rows-2" style={{ left: "6%", right: "6%", top: og ? "48%" : "44%", bottom: "8%", border: `1px solid ${tint(sky, 0.55)}` }}>
        {cells.map((c, i) => {
          const hot = i === 5;
          return (
            <div key={c} className="relative flex flex-col justify-between" style={{ padding: u(2), borderLeft: i % 3 ? `1px solid ${tint(sky, 0.55)}` : "none", borderTop: i > 2 ? `1px solid ${tint(sky, 0.55)}` : "none", background: hot ? tint(sky, 0.12) : "transparent", outline: hot ? `1.5px solid ${sky}` : "none" }}>
              <span style={{ fontFamily: MONO, fontSize: u(1.4), color: sky }}>{String(i + 1).padStart(2, "0")}</span>
              {hot && (
                <div style={{ fontFamily: MONO, fontSize: u(1.35), color: white, lineHeight: 1.6 }}>
                  <div>card •••• 4821 · $940.00</div>
                  <div className="flex items-center" style={{ gap: u(0.8) }}>
                    new device
                    <span style={{ background: sky, color: e.palette[0], padding: `0 ${u(0.6)}`, fontWeight: 700 }}>HOLD</span>
                  </div>
                </div>
              )}
              <span style={{ fontSize: u(2), fontWeight: 600, color: white }}>{c}</span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------- Retail: duotone storefront, split ---------- */
function Retail({ e, og }: P) {
  const [blue, cream, navy] = e.palette;
  const products: [string, string, ReactNode][] = [
    ["Trail runner", "$129", <path key="s" d="M8 30 C 10 20, 16 18, 22 20 L 30 24 C 34 26, 36 30, 34 32 L 10 32 Z" />],
    ["Steel bottle", "$32", <path key="b" d="M17 6 h6 v4 c4 2 5 5 5 9 v13 h-16 v-13 c0-4 1-7 5-9 z" />],
    ["Canvas tote", "$45", <path key="t" d="M9 14 h22 l-2 19 h-18 z M15 14 c0-7 10-7 10 0" />],
    ["Ceramic mug", "$18", <path key="m" d="M10 12 h17 v16 c0 3-2 5-5 5 h-7 c-3 0-5-2-5-5 z M27 16 c6 0 6 9 0 9" />],
  ];
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute" style={{ left: "6%", top: "8%", width: "38%" }}>
        <Label style={{ color: tint(cream, 0.7) }}>Retail & Ecommerce</Label>
        <Title size={5.8} color={cream} style={{ marginTop: u(2) }}>
          Every channel,
          <br />
          one cart
        </Title>
        <ul className="flex flex-col items-start" style={{ marginTop: u(4), gap: u(1.2) }}>
          {["Headless commerce", "Loyalty apps", "Omnichannel POS"].map((c) => (
            <li key={c} style={{ fontSize: u(1.8), fontWeight: 600, color: cream, border: `1px solid ${tint(cream, 0.6)}`, borderRadius: 999, padding: `${u(0.5)} ${u(1.6)}` }}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="absolute" style={{ left: "48%", top: 0, right: 0, bottom: 0, background: cream, padding: og ? "5% 4%" : "8% 5%" }}>
        <div className="flex items-baseline justify-between" style={{ color: navy }}>
          <span style={{ fontSize: u(2.2), fontWeight: 600 }}>Recommended for you</span>
          <span style={{ fontSize: u(1.4), fontWeight: 500, color: tint(navy, 0.55) }}>Based on your last order</span>
        </div>
        <div className="grid grid-cols-2" style={{ marginTop: u(2.4), gap: u(2) }}>
          {products.map(([name, price, shape], i) => (
            <div key={name}>
              <div className="relative overflow-hidden" style={{ aspectRatio: og ? "16/7" : "1", background: tint(blue, 0.12) }}>
                {/* duotone: the navy print and the blue print, offset and multiplied */}
                <svg viewBox="0 0 40 40" className="absolute inset-0 size-full" aria-hidden>
                  <g fill={navy} transform="translate(-1.2 1.2)">{shape}</g>
                  <g fill={blue} style={{ mixBlendMode: "multiply" }} opacity={0.85}>{shape}</g>
                </svg>
                {i === 0 && <span className="absolute" style={{ left: u(1), top: u(1), background: navy, color: cream, fontSize: u(1.2), fontWeight: 600, padding: `${u(0.3)} ${u(0.8)}` }}>Back in stock</span>}
              </div>
              <div className="flex justify-between" style={{ marginTop: u(0.8), fontSize: u(1.6), fontWeight: 600, color: navy }}>
                <span>{name}</span>
                <span>{price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Logistics: halftone route on the diagonal ---------- */
function Logistics({ e, og }: P) {
  const [bg, ink, blue] = e.palette;
  const f = (x: number, y: number) => 0.85 - Math.abs(y - (1.05 - x)) * (og ? 5 : 3.6);
  const stops: [number, number, string][] = [[14, 91, "Warehouse"], [38, 67, "Sort hub"], [62, 43, "Out for delivery"], [86, 19, "Delivered"]];
  return (
    <Frame e={e} og={og} logo="br" grain={0.03}>
      <Halftone cols={60} rows={45} f={f} color={tint(ink, 0.82)} className="absolute inset-0 size-full" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <polyline points={stops.map(([x, y]) => `${x},${y}`).join(" ")} fill="none" stroke={blue} strokeWidth={3} vectorEffect="non-scaling-stroke" />
      </svg>
      {stops.map(([x, y, t], i) => (
        <div key={t} className="absolute flex items-center" style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-${u(1.1)}, -50%)`, gap: u(1.2) }}>
          <span style={{ width: u(2.2), height: u(2.2), borderRadius: 999, background: i === 3 ? blue : bg, border: `${u(0.45)} solid ${i === 3 ? blue : ink}` }} />
          <span style={{ background: i === 3 ? blue : ink, color: bg, fontSize: u(1.8), fontWeight: 600, padding: `${u(0.4)} ${u(1.1)}`, whiteSpace: "nowrap" }}>{t}</span>
        </div>
      ))}
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: blue }}>Logistics</Label>
        <Title size={6.6} color={ink} style={{ marginTop: u(2) }}>
          Every parcel,
          <br />
          in sight
        </Title>
      </div>
      {!og && (
        <p className="absolute" style={{ right: "6%", bottom: "8%", fontSize: u(1.7), fontWeight: 600, color: ink, textAlign: "right" }}>
          Fleet · Dispatch · Last mile
        </p>
      )}
    </Frame>
  );
}

/* ---------- Education: editorial poster, a cropped "Learn" ---------- */
function Education({ e, og }: P) {
  const [, white, sky] = e.palette;
  const items = ["LMS platforms", "Virtual classrooms", "Assessment tools", "Tutoring marketplaces", "Student information systems", "Adaptive learning AI"];
  return (
    <Frame e={e} og={og} logo="tr">
      <span aria-hidden className="absolute" style={{ right: "-5%", top: "5%", writingMode: "vertical-rl", fontFamily: BARLOW, fontWeight: 600, fontSize: u(og ? 18 : 24), lineHeight: 0.8, letterSpacing: "-0.02em", color: "transparent", WebkitTextStroke: `1.5px ${tint(sky, 0.55)}` }}>
        Learn
      </span>
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: sky }}>Education</Label>
        <Title size={7} color={white} style={{ marginTop: u(2), lineHeight: 0.98 }}>
          Classrooms
          <br />
          <span style={{ color: sky }}>without walls</span>
        </Title>
      </div>
      <ol className="absolute" style={{ left: "6%", bottom: "8%", width: "46%", fontSize: u(1.9), fontWeight: 500, color: white }}>
        {items.map((t, i) => (
          <li key={t} className="flex" style={{ borderTop: `1px solid ${tint(white, 0.22)}`, padding: `${u(0.95)} 0`, gap: u(2) }}>
            <span style={{ color: sky, width: u(2.4) }}>0{i + 1}</span>
            {t}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ---------- Real Estate: isometric building, left-weighted ---------- */
function RealEstate({ e, og }: P) {
  const [bg, navy, cobalt] = e.palette;
  const units: [string, string, boolean][] = [["Unit 4B", "Leased", false], ["Unit 3A", "Viewing Sat 11:00", true], ["Unit 2C", "Maintenance · Plumbing", false], ["Unit 1A", "Leased", false]];
  const floors = 5;
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "6%", top: "8%", width: "52%" }}>
        <Label style={{ color: cobalt }}>Real Estate</Label>
        <Title size={6.4} color={navy} style={{ marginTop: u(2) }}>
          Every unit,
          <br />
          one dashboard
        </Title>
      </div>
      <ul className="absolute" style={{ left: "6%", bottom: "9%", width: "48%" }}>
        {units.map(([unit, status, hot]) => (
          <li key={unit} className="flex justify-between" style={{ borderTop: `1px solid ${tint(navy, 0.35)}`, padding: `${u(1.2)} 0`, fontSize: u(1.9), fontWeight: 600, color: hot ? cobalt : navy }}>
            <span>{unit}</span>
            <span style={{ fontWeight: 500 }}>{status}</span>
          </li>
        ))}
      </ul>
      <svg viewBox="-16 -38 36 58" className="absolute" style={{ right: "4%", bottom: "6%", width: "38%", height: "auto" }} aria-hidden>
        {Array.from({ length: floors }, (_, i) => {
          const hot = i === 2;
          return <Slab key={i} x={0} y={0} z={i * 6} w={18} d={12} h={5.4} top={i === floors - 1 ? tint(navy, 0.12) : bg} left={hot ? cobalt : bg} right={hot ? tint(cobalt, 0.75) : bg} stroke={navy} sw={0.18} />;
        })}
        {/* window rows on the left face */}
        {Array.from({ length: floors }, (_, f) =>
          [3, 7, 11, 15].map((x) => {
            const a = iso(x, 12, f * 6 + 1.6);
            const b = iso(x + 2, 12, f * 6 + 1.6);
            const c = iso(x + 2, 12, f * 6 + 3.8);
            const d = iso(x, 12, f * 6 + 3.8);
            return <polygon key={`${f}-${x}`} points={pts(a, b, c, d)} fill={f === 2 ? bg : tint(navy, 0.85)} />;
          }),
        )}
      </svg>
    </Frame>
  );
}

/* ---------- eMobility: EV charging app fragment, right-weighted ---------- */
function EMobility({ e, og }: P) {
  const [, sky, white] = e.palette;
  const rows: [string, string][] = [["Connector", "CCS2 · 60 kW"], ["Energy delivered", "23.4 kWh"], ["Started", "14:02"], ["Full by", "14:41"], ["Price", "$0.32 / kWh"]];
  const line = `1px solid ${tint(sky, 0.28)}`;
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute" style={{ left: "6%", top: "8%", width: "36%" }}>
        <Label style={{ color: sky }}>eMobility</Label>
        <Title size={6} color={white} style={{ marginTop: u(2) }}>
          Charge,
          <br />
          track,
          <br />
          bill
        </Title>
      </div>
      <div className="absolute" style={{ left: "44%", right: "-14%", top: "12%", bottom: og ? "-10%" : "12%", border: line, background: tint(white, 0.04) }}>
        <div className="flex justify-between" style={{ borderBottom: line, padding: `${u(1.3)} ${u(2.4)}`, fontSize: u(1.6), fontWeight: 600, color: sky }}>
          <span>Charging session · Charger 07</span>
        </div>
        <div style={{ padding: `${u(2.6)} ${u(2.4)}` }}>
          <div className="flex items-end" style={{ gap: u(1.4) }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 600, fontSize: u(11), lineHeight: 0.8, color: white }}>68%</span>
            <span style={{ fontSize: u(1.7), fontWeight: 500, color: sky, paddingBottom: u(0.4) }}>Charging</span>
          </div>
          <div style={{ marginTop: u(2.4), height: u(1.2), background: tint(sky, 0.2), width: "72%" }}>
            <div style={{ width: "68%", height: "100%", background: sky }} />
          </div>
          <dl style={{ marginTop: u(3), width: "72%" }}>
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between" style={{ borderTop: line, padding: `${u(1.1)} 0`, fontSize: u(1.75), fontWeight: 500 }}>
                <dt style={{ color: sky }}>{k}</dt>
                <dd style={{ color: white, fontFamily: MONO }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Wearables: paper-cut type strips ---------- */
function Wearables({ e, og }: P) {
  const [navy, sky, white] = e.palette;
  const strips: [string, string, string, number][] = [
    ["Steps", white, navy, -2.4],
    ["Sleep", sky, navy, 1.6],
    ["Heart rate", tint(white, 0.12), white, -1],
  ];
  return (
    <Frame e={e} og={og} logo="br">
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: sky }}>Wearables</Label>
        <Title size={4.4} color={white} style={{ marginTop: u(1.6) }}>Your body&rsquo;s data, in one app</Title>
      </div>
      <div className="absolute flex flex-col" style={{ left: "-2%", right: "-4%", top: og ? "34%" : "30%", gap: u(og ? 1.2 : 2.6) }}>
        {strips.map(([word, fill, color, rot], i) => (
          <div key={word} style={{ background: fill, color, transform: `rotate(${rot}deg)`, marginLeft: `${[8, 20, 4][i]}%`, width: "fit-content", padding: `${u(0.4)} ${u(3)} ${u(1.2)}`, boxShadow: `${u(0.9)} ${u(0.9)} 0 ${tint("#020615", 0.45)}` }}>
            <span style={{ fontFamily: BARLOW, fontWeight: 600, fontSize: u(og ? 8 : 12), lineHeight: 1, letterSpacing: "-0.01em" }}>{word}</span>
          </div>
        ))}
      </div>
      {!og && (
        <p className="absolute" style={{ left: "6%", bottom: "7%", fontSize: u(1.7), fontWeight: 600, color: sky }}>
          BLE sync · Firmware OTA · Health data platforms
        </p>
      )}
    </Frame>
  );
}

/* ---------- Energy: mono line chart, one accent ---------- */
function Energy({ e, og }: P) {
  const [, ink, cobalt] = e.palette;
  // one illustrative day, 24 hourly points (0–1)
  const demand = [0.42, 0.38, 0.36, 0.35, 0.36, 0.42, 0.55, 0.68, 0.7, 0.66, 0.62, 0.6, 0.6, 0.58, 0.57, 0.6, 0.68, 0.8, 0.88, 0.86, 0.78, 0.66, 0.55, 0.47];
  const solar = demand.map((_, h) => Math.max(0, Math.sin(((h - 6) / 13) * Math.PI)) * 0.78);
  const W = 100;
  const H = 46;
  const xy = (v: number[]) => v.map((y, h) => `${((h / 23) * W).toFixed(2)},${(H - y * H).toFixed(2)}`).join(" ");
  return (
    <Frame e={e} og={og} logo="tl">
      <div className="absolute" style={{ right: "6%", top: "8%", textAlign: "right" }}>
        <Label style={{ color: cobalt }}>Energy</Label>
        <Title size={6} color={ink} style={{ marginTop: u(2) }}>
          Supply and demand,
          <br />
          seen live
        </Title>
      </div>
      <div className="absolute" style={{ left: "6%", right: "16%", top: og ? "44%" : "40%", bottom: "9%" }}>
        <div className="flex" style={{ gap: u(3), fontSize: u(1.6), fontWeight: 600, marginBottom: u(2) }}>
          <span className="flex items-center" style={{ gap: u(0.8) }}><span style={{ width: u(2.6), height: 2, background: ink }} />Demand</span>
          <span className="flex items-center" style={{ gap: u(0.8), color: cobalt }}><span style={{ width: u(2.6), height: u(0.5), background: cobalt }} />Solar generation</span>
        </div>
        <svg viewBox={`0 -2 ${W} ${H + 2}`} preserveAspectRatio="none" className="w-full" style={{ height: "78%", overflow: "visible" }} aria-hidden>
          {[0.25, 0.5, 0.75, 1].map((g) => <line key={g} x1={0} x2={W} y1={H - g * H} y2={H - g * H} stroke={tint(ink, 0.12)} strokeWidth={1} vectorEffect="non-scaling-stroke" />)}
          <line x1={0} x2={W} y1={H} y2={H} stroke={ink} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <polygon points={`0,${H} ${xy(solar)} ${W},${H}`} fill={tint(cobalt, 0.12)} />
          <polyline points={xy(solar)} fill="none" stroke={cobalt} strokeWidth={4} vectorEffect="non-scaling-stroke" />
          <polyline points={xy(demand)} fill="none" stroke={ink} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="flex justify-between" style={{ marginTop: u(1), fontFamily: MONO, fontSize: u(1.4), color: tint(ink, 0.6) }}>
          {["00:00", "06:00", "12:00", "18:00", "24:00"].map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Agriculture: geometric grid of field plots ---------- */
function Agriculture({ e, og }: P) {
  const [bg, ink, blue] = e.palette;
  const plots = Array.from({ length: 12 }, (_, i) => i);
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: blue }}>Agriculture</Label>
        <Title size={6.2} color={ink} style={{ marginTop: u(2) }}>
          Farms, managed
          <br />
          row by row
        </Title>
      </div>
      <div className="absolute grid grid-cols-4 grid-rows-3" style={{ left: "6%", right: "6%", top: og ? "46%" : "40%", bottom: "7%", gap: u(1.2) }}>
        {plots.map((i) => {
          const hot = i === 6;
          const angle = [0, 90, 45, 135][i % 4];
          const c = hot ? bg : tint(ink, [0.85, 0.55, 0.7, 0.4][(i * 7) % 4]);
          return (
            <div key={i} className="relative" style={{ background: hot ? blue : "transparent", backgroundImage: hot ? undefined : `repeating-linear-gradient(${angle}deg, ${c} 0 ${u(0.45)}, transparent ${u(0.45)} ${u(1.3)})` }}>
              <span className="absolute" style={{ left: u(0.8), top: u(0.8), background: hot ? ink : bg, color: hot ? bg : ink, fontFamily: MONO, fontSize: u(1.3), padding: `${u(0.2)} ${u(0.6)}` }}>P{String(i + 1).padStart(2, "0")}</span>
              {hot && <span className="absolute" style={{ left: u(0.8), bottom: u(0.8), fontSize: u(1.7), fontWeight: 600, color: bg }}>Irrigate today</span>}
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------- Gaming: blueprint multiplayer backend, split ---------- */
function Gaming({ e, og }: P) {
  const [, sky, cream] = e.palette;
  const line = { stroke: sky, strokeWidth: 0.25, fill: "none" };
  const servers = ["eu-west", "us-east", "ap-south"];
  return (
    <Frame e={e} og={og} logo="bl">
      <div className="absolute inset-y-0" style={{ left: "44%", right: 0, backgroundImage: `linear-gradient(${tint(sky, 0.12)} 1px, transparent 1px), linear-gradient(90deg, ${tint(sky, 0.12)} 1px, transparent 1px)`, backgroundSize: `${u(4)} ${u(4)}`, borderLeft: `1px solid ${sky}` }} />
      <div className="absolute" style={{ left: "6%", top: "8%", width: "34%" }}>
        <Label style={{ color: sky }}>Gaming</Label>
        <Title size={5.6} color={cream} style={{ marginTop: u(2) }}>
          Backends
          <br />
          that hold
          <br />
          on launch day
        </Title>
      </div>
      <svg viewBox="0 0 56 75" preserveAspectRatio="xMidYMid meet" className="absolute" style={{ left: "44%", top: 0, width: "56%", height: "100%" }} aria-hidden>
        <text x="5" y="10" fill={sky} fontSize="1.7" fontWeight="600" letterSpacing=".25">MULTIPLAYER BACKEND</text>
        {/* players */}
        {[0, 1, 2].map((i) => <circle key={i} cx={10 + i * 5} cy={18} r={1.6} {...line} />)}
        <text x="25" y="18.7" fill={sky} fontSize="1.6">players</text>
        <path d="M15 20.5 V26" {...line} />
        {/* matchmaker */}
        <rect x="5" y="26" width="20" height="6" fill={cream} />
        <text x="7" y="29.8" fill={e.palette[0]} fontSize="1.8" fontWeight="600">matchmaker</text>
        <path d="M15 32 V37 M8 37 H48 M8 37 V41 M26 37 V41 M44 37 V41" {...line} />
        {servers.map((s, i) => (
          <g key={s}>
            <rect x={2 + i * 18} y={41} width={14} height={9} {...line} />
            <text x={3.5 + i * 18} y={44.6} fill={sky} fontSize="1.5" fontFamily={MONO}>{s}</text>
            <text x={3.5 + i * 18} y={47.6} fill={tint(sky, 0.6)} fontSize="1.3">game server</text>
          </g>
        ))}
        <path d="M9 50 V56 H45 M27 56 V60 M9 56 V60 M45 56 V60" {...line} strokeDasharray="0.8 0.6" />
        {["leaderboards", "economy", "live-ops"].map((s, i) => (
          <g key={s}>
            <rect x={2 + i * 18} y={60} width={14} height={6} {...line} />
            <text x={3.5 + i * 18} y={63.8} fill={sky} fontSize="1.5" fontFamily={MONO}>{s}</text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* ---------- OTT & Media: duotone "continue watching" rail on a diagonal ---------- */
function OttMedia({ e, og }: P) {
  const [bg, white, blue] = e.palette;
  const tiles: [string, number, ReactNode][] = [
    ["S2 · E4", 0.62, <><circle cx="28" cy="12" r="7" /><rect x="0" y="26" width="40" height="14" /></>],
    ["Live · Match day", 1, <><rect x="4" y="18" width="32" height="18" /><circle cx="20" cy="27" r="5" /></>],
    ["Documentary", 0.35, <><path d="M0 40 L14 14 L24 30 L30 22 L40 40 Z" /><circle cx="31" cy="9" r="4" /></>],
    ["Kids · Ep 12", 0.8, <><circle cx="14" cy="22" r="10" /><circle cx="28" cy="22" r="10" /></>],
    ["Trailer", 0.15, <><path d="M12 10 L32 22 L12 34 Z" /></>],
  ];
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: blue }}>OTT & Media</Label>
        <Title size={6.4} color={white} style={{ marginTop: u(2) }}>
          Stream to
          <br />
          every screen
        </Title>
      </div>
      <div className="absolute" style={{ left: "-6%", top: og ? "56%" : "58%", width: "120%", transform: "rotate(-14deg)", transformOrigin: "left center" }}>
        <p style={{ fontSize: u(1.7), fontWeight: 600, color: white, marginLeft: "14%", marginBottom: u(1.2) }}>Continue watching</p>
        <div className="flex" style={{ gap: u(1.6), marginLeft: "14%" }}>
          {tiles.map(([name, progress, art]) => (
            <div key={name} style={{ width: u(19), flexShrink: 0 }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", background: blue }}>
                <svg viewBox="0 0 40 40" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
                  <g fill={white} opacity={0.9} style={{ mixBlendMode: "screen" }}>{art}</g>
                  <g fill={bg} opacity={0.35} transform="translate(2 2)">{art}</g>
                </svg>
              </div>
              <div style={{ height: u(0.5), background: tint(white, 0.25), marginTop: u(0.8) }}>
                <div style={{ width: `${progress * 100}%`, height: "100%", background: progress === 1 ? white : blue }} />
              </div>
              <p style={{ fontSize: u(1.5), fontWeight: 600, color: white, marginTop: u(0.8) }}>{name}</p>
            </div>
          ))}
        </div>
      </div>
      {!og && <p className="absolute" style={{ right: "6%", bottom: "6%", fontSize: u(1.7), fontWeight: 600, color: tint(white, 0.7) }}>Smart TV · Mobile · Web</p>}
    </Frame>
  );
}

/* ---------- On-Demand: halftone map, edge-cropped, live route ---------- */
function OnDemand({ e, og }: P) {
  const [, navy, white] = e.palette;
  // city density: a few clusters, empty top-left for the headline
  const blobs: [number, number, number][] = [[0.75, 0.3, 0.32], [0.55, 0.75, 0.3], [0.95, 0.85, 0.3], [0.2, 0.95, 0.22]];
  const f = (x: number, y: number) => {
    const d = Math.max(...blobs.map(([bx, by, r]) => 1 - Math.hypot(x - bx, (y - by) * 0.75) / r));
    return d * 0.9 + 0.08;
  };
  return (
    <Frame e={e} og={og} logo="tr" grain={0.03}>
      <Halftone cols={64} rows={48} f={f} color={tint(navy, 0.55)} className="absolute inset-0 size-full" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 75" preserveAspectRatio="none" aria-hidden>
        <path d="M84 16 V34 H64 V50 H46 V62" fill="none" stroke={white} strokeWidth={4} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
      {/* provider and customer pins */}
      <span className="absolute" style={{ left: "84%", top: "21%", width: u(2.6), height: u(2.6), transform: "translate(-50%,-50%)", borderRadius: 999, background: navy, border: `${u(0.5)} solid ${white}` }} />
      <span className="absolute" style={{ left: "46%", top: "83%", width: u(3), height: u(3), transform: "translate(-50%,-50%)", background: white, border: `${u(0.5)} solid ${navy}` }} />
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: navy }}>On-Demand</Label>
        <Title size={6.6} color={navy} style={{ marginTop: u(2) }}>
          Booked
          <br />
          in a tap
        </Title>
      </div>
      <div className="absolute" style={{ left: "6%", bottom: og ? "10%" : "8%", width: "34%", background: white, color: navy, padding: u(2), boxShadow: `${u(0.7)} ${u(0.7)} 0 ${navy}` }}>
        <p style={{ fontSize: u(1.4), fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: tint(navy, 0.6) }}>Live tracking</p>
        <p style={{ fontSize: u(2.2), fontWeight: 600, marginTop: u(0.8) }}>Plumber on the way</p>
        <p style={{ fontSize: u(1.7), fontWeight: 500, marginTop: u(0.4) }}>Arrives in 8 min · Verified pro</p>
      </div>
    </Frame>
  );
}

/* ---------- Food Delivery: typographic poster, left-weighted ---------- */
function FoodDelivery({ e, og }: P) {
  const [, blue, ink] = e.palette;
  const steps: [string, string][] = [["7:02 pm", "Order placed"], ["7:03 pm", "Restaurant accepted"], ["7:21 pm", "Rider picked up"], ["7:38 pm", "Delivered"]];
  return (
    <Frame e={e} og={og} logo="br">
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: ink }}>Food Delivery</Label>
        <p style={{ fontFamily: BARLOW, fontWeight: 600, fontSize: u(og ? 11 : 15), lineHeight: 0.86, letterSpacing: "-0.01em", marginTop: u(2.4), color: blue }}>
          Hot food.
          <br />
          <span style={{ color: ink }}>On time.</span>
        </p>
      </div>
      <ol className="absolute" style={{ left: "6%", bottom: "8%", width: og ? "40%" : "56%" }}>
        {steps.map(([t, s], i) => (
          <li key={s} className="flex items-baseline" style={{ borderTop: `1px solid ${i === 3 ? blue : tint(ink, 0.3)}`, padding: `${u(1.1)} 0`, gap: u(3), fontSize: u(1.95), fontWeight: 600, color: i === 3 ? blue : ink }}>
            <span style={{ fontFamily: MONO, fontWeight: 500, width: u(10) }}>{t}</span>
            {s}
          </li>
        ))}
      </ol>
      <div className="absolute" style={{ right: "6%", top: "8%", bottom: "8%", borderLeft: `1px solid ${tint(ink, 0.3)}` }} />
    </Frame>
  );
}

/* ---------- Travel: isometric itinerary, right-weighted ---------- */
function Travel({ e, og }: P) {
  const [, white, navy] = e.palette;
  const days: [string, string, number, number][] = [["Day 1", "Lisbon", 0, 0], ["Day 2", "Sintra", 16, -10], ["Day 3", "Porto", 32, -20]];
  return (
    <Frame e={e} og={og} logo="tl">
      <div className="absolute" style={{ left: "6%", bottom: "8%", width: "40%" }}>
        <Label style={{ color: white }}>Travel</Label>
        <Title size={5.8} color={white} style={{ marginTop: u(2) }}>
          Trips that
          <br />
          plan themselves
        </Title>
      </div>
      <svg viewBox="-13 -6 72 32" className="absolute" style={{ right: "4%", top: og ? "8%" : "12%", width: og ? "54%" : "74%", height: "auto" }} aria-hidden>
        {days.map(([d, , x, y], i) => (
          <g key={d}>
            <Slab x={x} y={y} z={0} w={12} d={12} h={2.4} top={i === 1 ? white : tint(white, 0.14)} left={navy} right={tint(navy, 0.7)} stroke={white} sw={0.12} />
            <circle cx={iso(x + 6, y + 6, 2.4)[0]} cy={iso(x + 6, y + 6, 2.4)[1]} r={0.9} fill={i === 1 ? navy : white} />
          </g>
        ))}
        {/* dotted route between tile centres, then labels under each tile's front corner */}
        <polyline points={pts(...days.map(([, , x, y]) => iso(x + 6, y + 6, 2.4)))} fill="none" stroke={white} strokeWidth={0.45} strokeDasharray="0.2 1.2" strokeLinecap="round" />
        {days.map(([d, city, x, y]) => {
          const [lx, ly] = iso(x + 12, y + 12, 0);
          return (
            <g key={city}>
              <text x={lx} y={ly + 3.4} fill={white} fontSize={2.3} fontWeight={600} textAnchor="middle">{city}</text>
              <text x={lx} y={ly + 5.8} fill={tint(white, 0.7)} fontSize={1.7} fontWeight={500} textAnchor="middle">{d}</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ---------- Aviation: departures board fragment, typographic ---------- */
function Aviation({ e, og }: P) {
  const [bg, cobalt, ink] = e.palette;
  const flights: [string, string, string, string, string][] = [
    ["KN 214", "Delhi", "12", "07:40", "Boarding"],
    ["KN 508", "Dubai", "4", "08:15", "On time"],
    ["KN 731", "Singapore", "9", "09:05", "On time"],
    ["KN 122", "Mumbai", "2", "09:30", "Gate change"],
    ["KN 640", "London", "15", "10:10", "On time"],
  ];
  const cols = [u(12), u(18), u(7), u(10), "auto"];
  return (
    <Frame e={e} og={og} logo="tr">
      <p className="absolute" style={{ left: "6%", top: "7%", fontFamily: BARLOW, fontWeight: 600, fontSize: u(og ? 10 : 13), lineHeight: 0.85, color: ink, letterSpacing: "-0.01em" }}>
        Departures
      </p>
      <p className="absolute" style={{ left: "6%", top: og ? "30%" : "25%", fontSize: u(2.4), fontWeight: 600, color: cobalt }}>Airline operations, on time</p>
      <div className="absolute" style={{ left: "6%", right: "-8%", top: og ? "42%" : "38%", fontFamily: MONO, color: cobalt }}>
        <div className="flex" style={{ fontSize: u(1.4), color: tint(cobalt, 0.6), letterSpacing: ".12em", paddingBottom: u(1), borderBottom: `2px solid ${ink}` }}>
          {["FLIGHT", "TO", "GATE", "TIME", "STATUS"].map((h, i) => <span key={h} style={{ width: cols[i], flexShrink: 0 }}>{h}</span>)}
        </div>
        {flights.map((f, r) => (
          <div key={f[0]} className="flex items-center" style={{ fontSize: u(2.1), padding: `${u(og ? 0.7 : 1.25)} 0`, borderBottom: `1px solid ${tint(cobalt, 0.25)}`, background: r === 0 ? tint(cobalt, 0.08) : undefined }}>
            {f.map((c, i) => (
              <span key={i} style={{ width: cols[i], flexShrink: 0 }}>
                {i === 4 && r === 0 ? <span style={{ background: ink, color: bg, padding: `${u(0.2)} ${u(0.8)}` }}>{c}</span> : c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ---------- Telecom: paper-cut coverage rings, asymmetric ---------- */
function Telecom({ e, og }: P) {
  const [bg, grey, blue] = e.palette;
  const rings: [string, string, string][] = [
    ["Billing systems", tint(grey, 0.1), grey],
    ["Self-care apps", tint(grey, 0.2), grey],
    ["eSIM platforms", tint(blue, 0.55), grey],
    ["5G solutions", blue, bg],
  ];
  return (
    <Frame e={e} og={og} logo="tl">
      {rings.map(([name, fill], i) => {
        const size = 118 - i * 24;
        return <div key={name} className="absolute rounded-full" style={{ right: u(-size / 2), bottom: u(-size / 2), width: u(size), height: u(size), background: fill, boxShadow: `${u(-0.7)} ${u(-0.7)} 0 ${tint("#020615", 0.5)}` }} />;
      })}
      {/* labels sit on top, in the middle of each ring's visible band, following its curve at 45° */}
      {rings.map(([name, , color], i) => {
        const outer = (118 - i * 24) / 2;
        const mid = i === rings.length - 1 ? outer * 0.55 : outer - 6;
        return (
          <span key={name} className="absolute" style={{ right: u(mid * 0.707), bottom: u(mid * 0.707), transform: "translate(50%, 50%) rotate(-45deg)", fontSize: u(2), fontWeight: 600, color, whiteSpace: "nowrap" }}>
            {name}
          </span>
        );
      })}
      <div className="absolute" style={{ left: "6%", top: og ? "26%" : "10%", width: "44%" }}>
        <Label style={{ color: blue }}>Telecom</Label>
        <Title size={5.8} color={grey} style={{ marginTop: u(2) }}>
          Networks your
          <br />
          customers feel
        </Title>
      </div>
    </Frame>
  );
}

/* ---------- Startups: mono grid of engagement stages ---------- */
function Startups({ e, og }: P) {
  const [, white, sky] = e.palette;
  const cells: [string, string][] = [
    ["Product discovery", "Find the problem worth solving"],
    ["MVP development", "Launch a real product in weeks"],
    ["Fundraising demos", "Show investors a working build"],
    ["Scale-up engineering", "Harden it for real traffic"],
    ["Fractional CTO", "Senior technical leadership"],
    ["Growth analytics", "Know what moves the numbers"],
  ];
  return (
    <Frame e={e} og={og} logo="tr">
      <div className="absolute" style={{ left: "6%", top: "8%" }}>
        <Label style={{ color: sky }}>Startups</Label>
        <Title size={6.4} color={white} style={{ marginTop: u(2) }}>
          From idea
          <br />
          to Series B
        </Title>
      </div>
      <div className="absolute grid grid-cols-3" style={{ left: "6%", right: "6%", bottom: "8%", borderTop: `1px solid ${white}` }}>
        {cells.map(([t, d], i) => {
          const hot = i === 1;
          return (
            <div key={t} style={{ padding: `${u(2)} ${u(2)} ${u(2.4)} ${i % 3 ? u(2) : 0}`, borderLeft: i % 3 ? `1px solid ${tint(white, 0.25)}` : "none", borderBottom: i < 3 ? `1px solid ${tint(white, 0.25)}` : "none" }}>
              <span style={{ fontFamily: BARLOW, fontWeight: 600, fontSize: u(3.6), lineHeight: 1, color: hot ? sky : tint(white, 0.5) }}>0{i + 1}</span>
              <p style={{ fontSize: u(2), fontWeight: 600, marginTop: u(1), color: hot ? sky : white }}>{t}</p>
              {!og && <p style={{ fontSize: u(1.55), fontWeight: 500, marginTop: u(0.5), color: tint(white, 0.6) }}>{d}</p>}
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

export const industryCompositions: Record<string, (p: P) => ReactNode> = {
  "industries-overview": IndustriesOverview,
  "ind-healthcare": Healthcare,
  "ind-finance": Finance,
  "ind-retail": Retail,
  "ind-logistics": Logistics,
  "ind-education": Education,
  "ind-real-estate": RealEstate,
  "ind-emobility": EMobility,
  "ind-wearables": Wearables,
  "ind-energy": Energy,
  "ind-agriculture": Agriculture,
  "ind-gaming": Gaming,
  "ind-ott-media": OttMedia,
  "ind-on-demand": OnDemand,
  "ind-food-delivery": FoodDelivery,
  "ind-travel": Travel,
  "ind-aviation": Aviation,
  "ind-telecom": Telecom,
  "ind-startups": Startups,
};
