import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Reveal from "../ui/Reveal";

export default function StrategyCta() {
  return (
    <section className="sec bg-black">
      <Reveal variant="zoom" className="wrap">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-[linear-gradient(120deg,#0d0d0d_30%,#0b2f86_75%,#1163fb)]">
          <div className="grid items-stretch lg:grid-cols-2">
            <div className="flex flex-col justify-between gap-12 p-8 sm:p-12 lg:p-16">
              <div className="flex flex-col gap-4">
                <h2 className="h3 font-semibold">
                  Enterprise technology succeeds when
                  <span className="block text-white/60">architecture, intelligence, and execution align.</span>
                </h2>
                <p className="fs-base max-w-lg font-medium text-white/85">
                  Connect with our consulting and engineering teams to build systems that last, scale responsibly and deliver
                  measurable outcomes.
                </p>
              </div>
              <div>
                <Button variant="white">Discuss Your Technology Strategy</Button>
              </div>
            </div>
            <div className="relative hidden min-h-[380px] lg:block">
              {[
                { label: "Architecture", icon: "layers", cls: "top-12 left-8", d: "float-a" },
                { label: "Intelligence", icon: "spark", cls: "top-36 right-12", d: "float-b" },
                { label: "Execution", icon: "rocket", cls: "bottom-10 left-1/3", d: "float-a" },
              ].map((b) => (
                <div key={b.label} className={`${b.d} absolute ${b.cls} flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-5 backdrop-blur-xl`}>
                  <span className="grid size-11 place-items-center rounded-xl bg-white text-primary">
                    <Icon name={b.icon} className="size-5" />
                  </span>
                  <span className="text-lg font-semibold">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
