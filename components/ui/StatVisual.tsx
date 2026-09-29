import Icon, { Laurel } from "./Icon";

// Monochrome line illustrations for the stat cards (white/grey only).

const frame = "relative h-full overflow-hidden border-t border-line bg-[#111]";
const dots = {
  backgroundImage: "radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px)",
  backgroundSize: "18px 18px",
};

function Timeline() {
  const years = ["2021", "2022", "2023", "2024", "2025", "2026"];
  return (
    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
      <div className="h-px bg-white/25" />
      <div className="-mt-[5px] flex justify-between">
        {years.map((y, i) => (
          <div key={y} className="flex flex-col items-center gap-3">
            <span className={`size-2.5 rounded-full border border-white ${i === years.length - 1 ? "bg-white" : "bg-[#111]"}`} />
            <span className="font-condensed text-sm text-white/60">{y}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function People() {
  return (
    <div className="absolute inset-0 grid grid-cols-6 content-center gap-3 px-8">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className={`grid aspect-square place-items-center rounded-full border ${i === 0 ? "border-white bg-white text-black" : "border-white/20 text-white/40"}`}>
          <Icon name="users" className="size-1/2" strokeWidth={1.5} />
        </span>
      ))}
    </div>
  );
}

function Devices() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-4 px-6">
      <div className="h-[80%] w-[52%] rounded-t-xl border border-b-0 border-white/40 p-3">
        <div className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-white/30" />)}</div>
        <div className="mt-3 space-y-2">
          <div className="h-2 w-2/3 rounded bg-white/40" />
          <div className="h-2 w-full rounded bg-white/15" />
          <div className="h-2 w-5/6 rounded bg-white/15" />
          <div className="mt-3 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-8 rounded-md border border-white/20" />)}</div>
        </div>
      </div>
      <div className="h-[92%] w-[24%] rounded-t-2xl border border-b-0 border-white/70 p-2">
        <div className="mx-auto h-1 w-6 rounded-full bg-white/30" />
        <div className="mt-3 h-10 rounded-md border border-white/40" />
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 rounded bg-white/15" />
          <div className="h-1.5 w-2/3 rounded bg-white/15" />
        </div>
      </div>
    </div>
  );
}

function Network() {
  const nodes = [[12, 35], [30, 75], [50, 18], [68, 68], [88, 38], [26, 18], [80, 86], [50, 50]];
  const edges = [[0, 7], [1, 7], [2, 7], [3, 7], [4, 3], [5, 0], [6, 3], [2, 4], [1, 6], [5, 2]];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 size-full">
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(255,255,255,.25)" strokeWidth=".4" vectorEffect="non-scaling-stroke" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 7 ? 4 : 2} fill={i === 7 ? "#fff" : "#111"} stroke="#fff" strokeWidth=".5" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

function Industries() {
  const icons = ["heart", "chart", "cart", "truck", "book", "home", "plane", "bolt", "leaf", "play", "food", "shield"];
  return (
    <div className="absolute inset-0 grid grid-cols-6 content-center gap-3 px-6">
      {icons.map((ic, i) => (
        <span key={ic} className={`grid aspect-square place-items-center rounded-xl border ${i === 4 ? "border-white bg-white text-black" : "border-white/20 text-white/50"}`}>
          <Icon name={ic} className="size-1/2" strokeWidth={1.4} />
        </span>
      ))}
    </div>
  );
}

function Award() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2 text-white/70">
      <Laurel className="h-24" />
      <span className="grid size-20 place-items-center rounded-full border border-white/40 text-white">
        <Icon name="trophy" className="size-9" strokeWidth={1.3} />
      </span>
      <Laurel flip className="h-24" />
    </div>
  );
}

const visuals = { timeline: Timeline, people: People, devices: Devices, network: Network, industries: Industries, award: Award };

export type StatVisualName = keyof typeof visuals;

export default function StatVisual({ name, className = "" }: { name: StatVisualName; className?: string }) {
  const V = visuals[name];
  return (
    <div className={`${frame} ${className}`}>
      <div className="absolute inset-0" style={dots} />
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <V />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-card to-transparent" />
    </div>
  );
}
