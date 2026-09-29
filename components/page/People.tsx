import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";

const hues = [220, 260, 190];

// Founder portrait card. Initials on a gradient until a real photo is added.
export function FounderCard({ name, role, i }: { name: string; role: string; i: number }) {
  return (
    <Reveal delay={i * 100}>
      <div className="group overflow-hidden rounded-3xl border border-line bg-card transition-colors duration-500 hover:border-primary">
        <div
          className="relative grid aspect-[4/3] place-items-center overflow-hidden"
          style={{ background: `radial-gradient(80% 70% at 50% 30%, hsl(${hues[i % hues.length]} 80% 45% / .5), #0b0b0b 75%)` }}
        >
          <span className="text-6xl font-bold text-white/85 transition-transform duration-700 group-hover:scale-110">
            {name.split(" ").map((p) => p[0]).join("")}
          </span>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
        </div>
        <div className="p-6">
          <p className="subtitle">{name}</p>
          <p className="fs-para font-medium text-muted">{role}</p>
        </div>
      </div>
    </Reveal>
  );
}

// Team role card: headcount, role and what they own.
export function RoleCard({ role, count, icon, text, i }: { role: string; count: number; icon: string; text: string; i: number }) {
  return (
    <Reveal delay={(i % 4) * 90} className="h-full">
      <div className="group flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-card p-7 transition-colors duration-500 hover:border-primary">
        <div className="flex items-start justify-between">
          <span className="grid size-14 place-items-center rounded-2xl bg-black text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
            <Icon name={icon} className="size-7" strokeWidth={1.5} />
          </span>
          <span className="font-condensed text-6xl leading-none font-medium text-white/15 transition-colors duration-500 group-hover:text-white">
            {String(count).padStart(2, "0")}
          </span>
        </div>
        <div>
          <p className="subtitle">{role}</p>
          <p className="fs-para mt-2 font-medium text-muted">{text}</p>
        </div>
      </div>
    </Reveal>
  );
}
