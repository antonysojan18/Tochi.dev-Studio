import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TiltSurface } from "./TiltSurface";
import { DeviceMockup } from "./DeviceMockup";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import bobaLiveImg from "@/assets/BobaLive Careers.png";
import luahImg from "@/assets/Luah E commerce.png";
import stradoImg from "@/assets/Strado design.png";
import dimeVideo from "@/assets/DiMe Innovation Scroll Animation website.mp4";

const projects = [
  {
    title: "BobaLive Careers",
    cat: "Automated HR recruitment system",
    tags: ["Recruitment Tech", "AI Screening", "Workflow Automation", "Analytics"],
    image: bobaLiveImg,
    hue: "from-[#8A1C36]/30",
  },
  {
    title: "Luah",
    cat: "Jewellery e-commerce platform",
    tags: ["E-Commerce", "Shopify / Headless", "Anti-Tarnish Luxury", "Direct-to-Consumer"],
    image: luahImg,
    hue: "from-amber/25",
  },
  {
    title: "Strado Design",
    cat: "Brand website & media agency",
    tags: ["Media Agency", "Brand Identity", "Motion & Web", "Production"],
    image: stradoImg,
    url: "https://stradodesign.com/",
    hue: "from-foreground/20",
  },
  {
    title: "DiMe Innovation",
    cat: "Scroll animation website",
    tags: ["Scroll Experience", "Motion Design", "Interactive 3D", "Creative Engineering"],
    video: dimeVideo,
    hue: "from-[#8A1C36]/25",
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
  const scale = useTransform(progress, [start, end], [1, i === total - 1 ? 1 : 0.95]);
  const opacity = useTransform(progress, [start, end], [1, i === total - 1 ? 1 : 0.65]);
  const filter = useTransform(
    progress,
    [start, end],
    ["blur(0px)", i === total - 1 ? "blur(0px)" : "blur(3px)"],
  );

  return (
    <div className="md:sticky md:top-24 lg:top-28" style={{ zIndex: i }}>
      <motion.article style={{ scale, opacity, filter }} className="mb-4 sm:mb-5 origin-top md:mb-10">
        <TiltSurface className="glass glass-sheen rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-[0.9fr_1.3fr] md:items-center md:gap-6 lg:gap-8">
            <div className="flex flex-col justify-center">
              <span className="caps text-[9px] sm:text-[10px] text-muted-foreground/80">
                0{i + 1} / {p.cat}
              </span>
              <div className="mt-1 sm:mt-1.5 flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${p.title} live website`}
                    className="inline-flex items-center gap-1 rounded-full border border-hairline/80 bg-muted/60 px-2 sm:px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] text-foreground transition-all hover:bg-foreground hover:text-background hover:scale-105"
                  >
                    <span>Visit website</span>
                    <ArrowUpRight className="size-2.5 sm:size-3" />
                  </a>
                )}
              </div>
              <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline bg-muted/60 px-2 sm:px-2.5 py-0.5 font-mono text-[8.5px] sm:text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <DeviceMockup title={p.title} index={i} image={p.image} video={p.video} url={p.url} />
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
    <section id="portfolio" className="bg-background py-10 sm:py-14 md:py-20 px-3 sm:px-5 scroll-mt-28 md:scroll-mt-32">
      <div id="work" />
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 sm:mb-6 md:mb-8 flex items-end justify-between gap-6">
          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-widest text-header-cream/80">
              Portfolio
            </span>
            <h2 className="font-heading mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
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
