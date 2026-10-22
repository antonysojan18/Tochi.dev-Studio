import { useRef } from "react";
import { TiltSurface } from "./TiltSurface";
import { DeviceMockup } from "./DeviceMockup";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const projects = [
  {
    title: "Ledgerline",
    cat: "Fintech operations platform",
    tags: ["Next.js", "Supabase", "Tailwind"],
    m: [
      ["<45ms", "response time"],
      ["3.2×", "faster close"],
    ],
    hue: "from-amber/30",
  },
  {
    title: "Kiln AI",
    cat: "Document intelligence engine",
    tags: ["Python", "FastAPI", "pgvector"],
    m: [
      ["99.4%", "precision"],
      ["1.2M", "docs / month"],
    ],
    hue: "from-emerald/25",
  },
  {
    title: "Fleetdeck",
    cat: "Internal logistics tooling",
    tags: ["React", "Postgres", "Workers"],
    m: [
      ["−68%", "manual ops"],
      ["24/7", "live tracking"],
    ],
    hue: "from-foreground/20",
  },
  {
    title: "Atelier OS",
    cat: "Boutique commerce & CMS",
    tags: ["Next.js", "Stripe", "Tailwind"],
    m: [
      ["100", "lighthouse"],
      ["+41%", "conversion"],
    ],
    hue: "from-amber/20",
  },
];

function Card({
  p,
  i,
  total,
  progress,
}: {
  p: (typeof projects)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = i / total;
  const end = (i + 1) / total;
  const scale = useTransform(progress, [start, end], [1, i === total - 1 ? 1 : 0.94]);
  const opacity = useTransform(progress, [start, end], [1, i === total - 1 ? 1 : 0.6]);
  const filter = useTransform(
    progress,
    [start, end],
    ["blur(0px)", i === total - 1 ? "blur(0px)" : "blur(4px)"],
  );

  return (
    <div className="md:sticky md:top-28" style={{ zIndex: i }}>
      <motion.article style={{ scale, opacity, filter }} className="mb-4 sm:mb-6 origin-top md:mb-[12vh]">
        <TiltSurface className="glass glass-sheen rounded-2xl sm:rounded-3xl md:rounded-[2rem] p-3.5 sm:p-5 md:p-8">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr_1.3fr] md:gap-10">
            <div className="flex flex-col">
              <span className="caps text-[9px] sm:text-[11px]">
                0{i + 1} / {p.cat}
              </span>
              <h3 className="mt-1.5 sm:mt-3 text-xl sm:text-2xl md:text-4xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <div className="mt-2.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline bg-muted px-2 sm:px-3 py-0.5 font-mono text-[9px] sm:text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 sm:mt-6 md:mt-auto grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-5 md:pt-8 border-t border-hairline/40 md:border-0">
                {p.m.map(([v, k]) => (
                  <div key={k}>
                    <div className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight tabular-nums">
                      {v}
                    </div>
                    <div className="caps mt-0.5 text-[8px] sm:text-[10px]">{k}</div>
                  </div>
                ))}
              </div>
            </div>
            <DeviceMockup title={p.title} index={i} />
          </div>
        </TiltSurface>
      </motion.article>
    </div>
  );
}

export function ScrollStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className="bg-background py-14 sm:py-20 md:py-32 px-3 sm:px-5 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 sm:mb-10 md:mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-widest text-header-cream/80">
              Portfolio
            </span>
            <h2 className="font-heading mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Selected Works
            </h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground hidden md:block">2024 — 2026</span>
        </div>
        <div ref={ref}>
          {projects.map((p, i) => (
            <Card
              key={p.title}
              p={p}
              i={i}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
