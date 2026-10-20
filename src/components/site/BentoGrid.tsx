import { useState, type ReactNode } from "react";
import { TiltSurface } from "./TiltSurface";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Bot, GitBranch, LayoutGrid, Workflow } from "lucide-react";
import { spring, tap } from "./motion";

function Tile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div whileTap={tap} transition={spring}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      className={`group ${className}`}>
      <TiltSurface className="glass overflow-hidden rounded-[2rem] p-6">
      <div className="relative flex h-full flex-col">{children}</div>
      </TiltSurface>
    </motion.div>
  );
}

function Head({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="mt-auto pt-6">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent">{icon}</div>
      <h3 className="text-xl font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

export function BentoGrid() {
  const [on, setOn] = useState(true);
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <span className="caps">Architecture & Capabilities</span>
      <h2 className="mt-3 mb-12 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">One engineer. Full control center.</h2>

      <div className="grid auto-rows-[minmax(280px,auto)] gap-4 md:grid-cols-3">
        <Tile className="md:col-span-2">
          <div className="flex items-start justify-between">
            <div className="w-full max-w-xs space-y-2 rounded-2xl border border-hairline bg-muted p-3">
              <div className="h-2 w-1/2 rounded-full bg-foreground/20" />
              <motion.div animate={{ opacity: on ? 1 : 0.3 }} className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((k) => <div key={k} className="h-10 rounded-lg bg-foreground/10" />)}
              </motion.div>
            </div>
            <Button variant="ghost" aria-pressed={on} aria-label="Toggle preview" onClick={() => setOn(!on)}
              className={`flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors ${on ? "bg-emerald" : "bg-foreground/20"}`}>
              <motion.span layout transition={spring} className={`h-6 w-6 rounded-full bg-foreground shadow ${on ? "ml-auto" : ""}`} />
            </Button>
          </div>
          <Head icon={<LayoutGrid className="h-5 w-5" />} title="Full-Stack SaaS & Web" sub="Production apps from schema to pixel, shipped on the edge." />
        </Tile>

        <Tile>
          <svg viewBox="0 0 200 60" className="h-16 w-full">
            <path d="M20 30 C60 30 60 12 100 12 S140 48 180 30" fill="none" stroke="var(--amber)" strokeWidth="1.5" className="flow" />
            {[20, 100, 180].map((x, k) => <circle key={x} cx={x} cy={k === 1 ? 12 : 30} r="6" fill="var(--background)" stroke="var(--foreground)" strokeOpacity=".5" />)}
          </svg>
          <Head icon={<Workflow className="h-5 w-5" />} title="Workflow Automations" sub="Pipelines that remove the busywork from your team." />
        </Tile>

        <Tile>
          <div className="flex h-16 items-center gap-1">
            {Array.from({ length: 18 }).map((_, k) => (
              <motion.span key={k} className="w-1.5 flex-1 rounded-full bg-emerald"
                animate={{ height: ["20%", "90%", "35%"] }} transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: k * 0.07 }} />
            ))}
          </div>
          <Head icon={<Bot className="h-5 w-5" />} title="Intelligent AI Systems" sub="Retrieval, agents and evals — measured, not guessed." />
        </Tile>

        <Tile className="md:col-span-2">
          <div className="space-y-2 font-mono text-xs text-muted-foreground">
            <div><span className="text-emerald">✓</span> git push origin main</div>
            <div><span className="text-emerald">✓</span> staging.tochi.dev — deployed in 41s</div>
            <div><span className="text-amber">●</span> you ↔ principal engineer · no account managers</div>
          </div>
          <Head icon={<GitBranch className="h-5 w-5" />} title="Direct Engineering Access" sub="Zero agency bloat. Your repo, your staging, daily." />
        </Tile>
      </div>
    </section>
  );
}
