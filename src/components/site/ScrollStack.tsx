import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TiltSurface } from "./TiltSurface";
import { DeviceMockup } from "./DeviceMockup";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import bobaLiveImg from "@/assets/BobaLive Careers.png";
import luahImg from "@/assets/Luah E commerce.png";
import stradoImg from "@/assets/Strado design.png";

const projects = [
  {
    title: "BobaLive Careers",
    cat: "Automated HR recruitment system",
    tags: ["Recruitment Tech", "AI Screening", "Workflow Automation", "Analytics"],
    m: [
      ["10×", "faster screening"],
      ["Automated", "lead pipeline"],
    ],
    image: bobaLiveImg,
    hue: "from-[#8A1C36]/30",
  },
  {
    title: "Luah",
    cat: "Jewellery e-commerce platform",
    tags: ["E-Commerce", "Shopify / Headless", "Anti-Tarnish Luxury", "Direct-to-Consumer"],
    m: [
      ["100%", "waterproof craft"],
      ["18K Gold", "premium catalog"],
    ],
    image: luahImg,
    hue: "from-amber/25",
  },
  {
    title: "Strado Design",
    cat: "Brand website & media agency",
    tags: ["Media Agency", "Brand Identity", "Motion & Web", "Production"],
    m: [
      ["360°", "brand production"],
      ["Bespoke", "creative studio"],
    ],
    image: stradoImg,
    url: "https://stradodesign.com/",
    hue: "from-foreground/20",
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
              <div className="mt-1.5 sm:mt-3 flex items-center gap-2 sm:gap-3 flex-wrap">
                <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${p.title} live website`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline/80 bg-muted/60 px-3 py-1 font-mono text-[10px] sm:text-xs text-foreground transition-all hover:bg-foreground hover:text-background hover:scale-105"
                  >
                    <span>Visit website</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                )}
              </div>
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
            <DeviceMockup title={p.title} index={i} image={p.image} url={p.url} />
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
