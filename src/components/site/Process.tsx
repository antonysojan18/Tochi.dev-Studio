import { motion } from "motion/react";
import { Compass, Cpu, GitBranch, ShieldCheck } from "lucide-react";
import { TiltSurface } from "./TiltSurface";
import { KineticText } from "./KineticText";
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
      {/* Header with Kinetic Text Reveal */}
      <div className="mb-8 sm:mb-12 md:mb-16">
        <KineticText
          as="h2"
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
        >
          Our Process
        </KineticText>
      </div>

      {/* Circuit bus container */}
      <div className="relative">
        {/* Sequential Pulse Circuit line connecting all 4 cards (Desktop) */}
        <div aria-hidden="true" className="hidden lg:block absolute -top-6 left-12 right-12 h-px bg-gradient-to-r from-hairline/10 via-hairline/40 to-hairline/10 pointer-events-none z-10">
          {/* Traveling energy beam */}
          <motion.div
            className="absolute -top-[1px] h-[3px] w-36 rounded-full bg-gradient-to-r from-transparent via-[#FF4D36] to-transparent shadow-[0_0_14px_#FF4D36]"
            animate={{ left: ["-10%", "110%"] }}
            transition={{
              repeat: Infinity,
              duration: 4.2,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Grid: 2 tabs in a row on mobile, 4 tabs in a row on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                whileTap={tap}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...spring, delay: i * 0.1 }}
                className="group relative h-full"
              >
                {/* Circuit connector node on desktop */}
                <div
                  aria-hidden="true"
                  className="hidden lg:flex absolute -top-[30px] left-1/2 -translate-x-1/2 items-center justify-center pointer-events-none z-20"
                >
                  <div className="h-2 w-2 rounded-full border border-hairline/80 bg-background transition-colors duration-300 group-hover:border-[#FF4D36] group-hover:bg-[#FF4D36] group-hover:shadow-[0_0_10px_#FF4D36]" />
                  <div className="absolute h-4 w-px bg-hairline/40 top-2" />
                </div>

                <TiltSurface className="glass flex h-full min-h-[120px] sm:min-h-[145px] md:min-h-[165px] flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2rem] p-4 sm:p-5 md:p-6 transition-colors hover:border-primary/40">
                  {/* Top row: Icon and step number */}
                  <div className="flex items-center justify-between pb-3 sm:pb-5">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-accent text-header-cream border border-hairline/60 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-[#FF4D36]/40 group-hover:shadow-[0_0_16px_rgba(255,77,54,0.25)]">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-muted-foreground/60 transition-colors duration-300 group-hover:text-[#FF8559]">
                      {s.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-base sm:text-xl md:text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-[#FAF7F2]">
                    {s.title}
                  </h3>
                </TiltSurface>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
