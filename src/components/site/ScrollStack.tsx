import { useEffect, useRef } from "react";
import { TiltSurface } from "./TiltSurface";
import { DeviceMockup } from "./DeviceMockup";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";

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
      <motion.article style={{ scale, opacity, filter }} className="mb-6 origin-top md:mb-[12vh]">
        <TiltSurface className="glass glass-sheen rounded-[2rem] p-5 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_1.3fr] md:gap-10">
            <div className="flex flex-col">
              <span className="caps">
                0{i + 1} / {p.cat}
              </span>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                {p.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline bg-muted px-3 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto grid grid-cols-2 gap-4 pt-8">
                {p.m.map(([v, k]) => (
                  <div key={k}>
                    <div className="text-4xl font-semibold tracking-[-0.04em] tabular-nums md:text-5xl">
                      {v}
                    </div>
                    <div className="caps mt-1">{k}</div>
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
  const containerRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const haloRef = useRef<SVGPathElement>(null);
  const rimRef = useRef<SVGPathElement>(null);

  // Entrance transition from Hero section: starts rising smoothly before Hero scroll finishes
  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 10%"],
  });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // 1. Straight first, then bends with the scroll
  // enterProgress 0.02 -> 0.55: bend morphs from 0 (straight line) to 1 (circular dome)
  const bendProgress = useTransform(enterProgress, [0.02, 0.55], [0, 1]);

  // Zero drop shadow animation:
  // Starts with elevation shadow as straight edge enters,
  // softens as it curves, and settles to zero drop shadow as it fills the portion!
  const archFilter = useTransform(
    enterProgress,
    [0, 0.45, 0.85],
    [
      "drop-shadow(0 -36px 54px oklch(0 0 0 / 95%)) drop-shadow(0 0 30px oklch(0 0 0 / 75%))",
      "drop-shadow(0 -16px 24px oklch(0 0 0 / 45%)) drop-shadow(0 0 10px oklch(0 0 0 / 25%))",
      "drop-shadow(0 0 0px oklch(0 0 0 / 0%))",
    ],
  );

  const glowOpacity = useTransform(bendProgress, [0, 1], [0.2, 1]);

  const updateCurve = (bend: number) => {
    const b = Math.max(0, Math.min(1, bend));
    // When b = 0 -> cy = 200 (completely straight horizontal line across viewBox)
    // When b = 1 -> cy = -220 (pronounced circular dome apex at y = -10)
    const cy = 200 - b * 420;
    const dStroke = `M 0,200 Q 720,${cy.toFixed(1)} 1440,200`;
    if (haloRef.current) haloRef.current.setAttribute("d", dStroke);
    if (rimRef.current) rimRef.current.setAttribute("d", dStroke);

    // Update clipPath for Silk background so it flows directly inside the circular dome
    const clipEl = document.getElementById("silk-clip-path");
    if (clipEl) {
      const W = window.innerWidth || 1440;
      const H = crestRef.current?.offsetHeight || 160;
      const clipCy = H - b * (H * 1.5);
      const dClip = `M 0,${H} Q ${(W / 2).toFixed(1)},${clipCy.toFixed(1)} ${W},${H} L ${W},99999 L 0,99999 Z`;
      clipEl.setAttribute("d", dClip);
    }
  };

  useMotionValueEvent(bendProgress, "change", updateCurve);

  useEffect(() => {
    updateCurve(bendProgress.get());
    const handleResize = () => updateCurve(bendProgress.get());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [bendProgress]);

  return (
    <div ref={containerRef} className="relative z-20 w-full">
      {/* Circle top bend with zero drop shadow animation */}
      <motion.div style={{ filter: archFilter }} className="relative w-full">
        {/* Ambient atmospheric backlight behind the circular arc */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute -top-20 left-1/2 h-44 w-[75vw] max-w-4xl -translate-x-1/2 rounded-full bg-amber/20 blur-3xl"
        />

        {/* Circular dome crest SVG: straight first, then bends with scroll */}
        <div
          ref={crestRef}
          className="relative w-full overflow-hidden leading-none pointer-events-none"
        >
          <svg
            viewBox="0 0 1440 200"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-20 sm:h-28 md:h-40 lg:h-52 -mb-[2px] block overflow-visible"
          >
            <defs>
              <linearGradient id="circle-arc-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--amber)" stopOpacity="0" />
                <stop offset="20%" stopColor="var(--amber)" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="80%" stopColor="var(--amber)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Soft luminous halo */}
            <path
              ref={haloRef}
              d="M 0,200 Q 720,200 1440,200"
              fill="none"
              stroke="var(--amber)"
              strokeWidth="4"
              strokeOpacity="0.25"
              className="blur-[2px]"
            />
            {/* Luminous circular arc edge */}
            <path
              ref={rimRef}
              d="M 0,200 Q 720,200 1440,200"
              fill="none"
              stroke="url(#circle-arc-glow)"
              strokeWidth="2"
              className="opacity-95"
            />
          </svg>
        </div>

        {/* Section body with transparent background allowing Silk to flow through */}
        <section id="work" ref={sectionRef} className="pt-4 pb-24 md:pb-32 px-5 scroll-mt-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <span className="caps">Selected Works</span>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">
                  Systems in production.
                </h2>
              </div>
              <span className="caps hidden md:block">2024 — 2026</span>
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
      </motion.div>
    </div>
  );
}
