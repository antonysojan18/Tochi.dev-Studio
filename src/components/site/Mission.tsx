import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { spring } from "./motion";

export function Mission() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGPathElement>(null);
  const rimRef = useRef<SVGPathElement>(null);

  // Entrance transition from Hero section: starts rising smoothly before Hero scroll finishes
  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 10%"],
  });

  // Straight first, then bends with the scroll
  // enterProgress 0.02 -> 0.55: bend morphs from 0 (straight line) to 1 (circular dome)
  const bendProgress = useTransform(enterProgress, [0.02, 0.55], [0, 1]);

  // Zero drop shadow animation:
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
    // When b = 0 -> cy = 200 (straight horizontal line)
    // When b = 1 -> cy = -220 (pronounced circular dome apex)
    const cy = 200 - b * 420;
    const dFill = `M 0,200 Q 720,${cy.toFixed(1)} 1440,200 L 1440,200 L 0,200 Z`;
    const dStroke = `M 0,200 Q 720,${cy.toFixed(1)} 1440,200`;
    if (pathRef.current) pathRef.current.setAttribute("d", dFill);
    if (haloRef.current) haloRef.current.setAttribute("d", dStroke);
    if (rimRef.current) rimRef.current.setAttribute("d", dStroke);
  };

  useMotionValueEvent(bendProgress, "change", updateCurve);

  useEffect(() => {
    updateCurve(bendProgress.get());
  }, [bendProgress]);

  return (
    <div ref={containerRef} className="relative z-20 -mt-[52vh] md:-mt-[62vh] w-full">
      {/* Circle top bend with zero drop shadow animation */}
      <motion.div style={{ filter: archFilter }} className="relative w-full">
        {/* Ambient atmospheric backlight behind the circular arc */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute -top-20 left-1/2 h-44 w-[75vw] max-w-4xl -translate-x-1/2 rounded-full bg-amber/20 blur-3xl"
        />

        {/* Circular dome crest SVG: straight first, then bends with scroll */}
        <div className="relative w-full overflow-hidden leading-none pointer-events-none">
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
            {/* Solid dome fill uniting with background */}
            <path
              ref={pathRef}
              d="M 0,200 Q 720,200 1440,200 L 1440,200 L 0,200 Z"
              className="fill-background"
            />
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

        {/* Mission section body */}
        <section
          id="mission"
          className="bg-background pt-2 pb-10 md:pt-6 md:pb-24 px-5 scroll-mt-28 md:scroll-mt-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring}
            className="mx-auto max-w-4xl text-center flex flex-col items-center"
          >
            {/* Big, bold Our Mission title */}
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Our Mission
            </h2>

            {/* Mission Statement */}
            <p className="mt-8 max-w-3xl text-center text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-normal leading-[1.4] tracking-[-0.015em] text-foreground/80">
              To build <span className="font-semibold text-foreground">fast, beautiful websites</span>,{" "}
              <span className="font-semibold text-foreground">online stores</span>, and{" "}
              <span className="font-semibold text-foreground">custom software</span> from the ground up with{" "}
              <span className="font-semibold text-foreground">sharp design</span>,{" "}
              <span className="font-semibold text-foreground">modern architecture</span>, and{" "}
              <span className="font-semibold text-foreground">direct engineering</span>.
            </p>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
