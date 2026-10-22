import { motion } from "motion/react";
import { Compass, Cpu, GitBranch, ShieldCheck } from "lucide-react";
import { TiltSurface } from "./TiltSurface";
import { spring, tap } from "./motion";

const steps = [
  {
    num: "01",
    title: "Discover",
    icon: Compass,
  },
  {
    num: "02",
    title: "Architect",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Build",
    icon: GitBranch,
  },
  {
    num: "04",
    title: "Handover",
    icon: ShieldCheck,
  },
];

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-3 sm:px-5 py-14 sm:py-20 md:py-28 scroll-mt-28 md:scroll-mt-32">
      {/* Header: Clean, bold and consistent */}
      <div className="mb-6 sm:mb-10 md:mb-14">
        <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
          Our Process
        </h2>
      </div>

      {/* Grid: 2 tabs in a row on mobile, 4 tabs in a row on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              whileTap={tap}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="group h-full"
            >
              <TiltSurface className="glass flex h-full min-h-[115px] sm:min-h-[140px] md:min-h-[160px] flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2rem] p-4 sm:p-5 md:p-6 transition-colors hover:border-primary/40">
                {/* Top: Icon */}
                <div className="pb-3 sm:pb-5">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-accent text-header-cream border border-hairline/60 shadow-sm transition-transform group-hover:scale-105">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>

                {/* Title: Only title, nothing else */}
                <h3 className="font-heading text-base sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
                  {s.title}
                </h3>
              </TiltSurface>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
