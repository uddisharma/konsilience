import Reveal from "../ui/Reveal";

const hues = [220, 260, 190, 280, 160, 30, 340, 200];

// Portrait card with a gradient placeholder; swap the initials block for a real <Image> later.
export function LeaderCard({ name, role, i }: { name: string; role: string; i: number }) {
  const h = hues[i % hues.length];
  return (
    <Reveal delay={(i % 4) * 90}>
      <div className="group overflow-hidden rounded-3xl border border-line bg-card">
        <div
          className="relative grid aspect-[4/5] place-items-center overflow-hidden"
          style={{ background: `radial-gradient(80% 70% at 50% 30%, hsl(${h} 80% 45% / .55), #0b0b0b 75%)` }}
        >
          <span className="text-6xl font-bold text-white/85 transition-transform duration-700 group-hover:scale-110">
            {name.split(" ").map((p) => p[0]).join("")}
          </span>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
        </div>
        <div className="flex items-end justify-between gap-4 p-6">
          <div>
            <p className="subtitle">{name}</p>
            <p className="fs-para font-medium text-muted">{role}</p>
          </div>
          <a href="#" aria-label={`${name} on LinkedIn`} className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-xs font-bold transition-colors hover:border-primary hover:bg-primary">
            in
          </a>
        </div>
      </div>
    </Reveal>
  );
}
