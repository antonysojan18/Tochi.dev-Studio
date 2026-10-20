import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const projects = [
  { title: "Ledgerline", cat: "Fintech operations platform", tags: ["Next.js", "Supabase", "Tailwind"], m: [["<45ms", "response time"], ["3.2×", "faster close"]], hue: "from-amber/30" },
  { title: "Kiln AI", cat: "Document intelligence engine", tags: ["Python", "FastAPI", "pgvector"], m: [["99.4%", "precision"], ["1.2M", "docs / month"]], hue: "from-emerald/25" },
  { title: "Fleetdeck", cat: "Internal logistics tooling", tags: ["React", "Postgres", "Workers"], m: [["−68%", "manual ops"], ["24/7", "live tracking"]], hue: "from-foreground/20" },
  { title: "Atelier OS", cat: "Boutique commerce & CMS", tags: ["Next.js", "Stripe", "Tailwind"], m: [["100", "lighthouse"], ["+41%", "conversion"]], hue: "from-amber/20" },
];

function Card({ p, i, total, progress }: { p: (typeof projects)[number]; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const end = (i + 1) / total;
  const scale = useTransform(progress, [start, end], [1, i === total - 1 ? 1 : 0.94]);
  const opacity = useTransform(progress, [start, end], [1, i === total - 1 ? 1 : 0.6]);
  const filter = useTransform(progress, [start, end], ["blur(0px)", i === total - 1 ? "blur(0px)" : "blur(4px)"]);

  return (
    <div className="md:sticky md:top-28" style={{ zIndex: i }}>
      <motion.article style={{ scale, opacity, filter }}
        className="glass glass-sheen mb-6 origin-top overflow-hidden rounded-[2rem] p-5 md:mb-[12vh] md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_1.3fr] md:gap-10">
          <div className="flex flex-col">
            <span className="caps">0{i + 1} / {p.cat}</span>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{p.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-hairline bg-muted px-3 py-1 font-mono text-[11px] text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="mt-auto grid grid-cols-2 gap-4 pt-8">
              {p.m.map(([v, k]) => (
                <div key={k}>
                  <div className="text-4xl font-semibold tracking-[-0.04em] tabular-nums md:text-5xl">{v}</div>
                  <div className="caps mt-1">{k}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-hairline bg-linear-to-br ${p.hue} to-transparent`}>
            <div className="absolute inset-x-0 top-0 flex h-8 items-center gap-1.5 border-b border-hairline px-3">
              {[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 rounded-full bg-foreground/20" />)}
              <span className="ml-3 h-4 flex-1 rounded-full bg-foreground/5" />
            </div>
            <div className="absolute inset-0 top-8 grid grid-cols-[30%_1fr] gap-3 p-3">
              <div className="space-y-2 rounded-xl bg-foreground/5 p-3">
                {[70, 50, 85, 40, 60].map((w, k) => <div key={k} className="h-2 rounded-full bg-foreground/15" style={{ width: `${w}%` }} />)}
              </div>
              <div className="grid grid-rows-[auto_1fr] gap-3">
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((k) => <div key={k} className="h-12 rounded-xl border border-hairline bg-foreground/5" />)}
                </div>
                <div className="flex items-end gap-1.5 rounded-xl border border-hairline bg-foreground/5 p-3">
                  {[40, 65, 50, 80, 55, 90, 70, 95, 60, 85].map((h, k) => <div key={k} className="flex-1 rounded-t bg-foreground/25" style={{ height: `${h}%` }} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function ScrollStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <span className="caps">Selected Works</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">Systems in production.</h2>
        </div>
        <span className="caps hidden md:block">2024 — 2026</span>
      </div>
      <div ref={ref}>
        {projects.map((p, i) => <Card key={p.title} p={p} i={i} total={projects.length} progress={scrollYProgress} />)}
      </div>
    </section>
  );
}
