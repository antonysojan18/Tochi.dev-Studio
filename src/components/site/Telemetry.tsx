import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { spring } from "./motion";

const EVENTS = [
  "compiled app/router.tsx",
  "edge deploy · fra1 ✓",
  "db migration 0042 applied",
  "type-check passed · 0 errors",
  "cache warm · 312 routes",
  "ai pipeline · 1.2k tok/s",
  "lighthouse 100 · perf",
];

export function Telemetry() {
  const [log, setLog] = useState<{ id: number; t: string }[]>([]);
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 24 }, (_, i) => 30 + ((i * 37) % 60)));
  const [lat, setLat] = useState(38);

  useEffect(() => {
    let id = 0;
    const iv = setInterval(() => {
      id++;
      setLog((l) => [{ id, t: EVENTS[id % EVENTS.length] }, ...l].slice(0, 4));
      setBars((b) => [...b.slice(1), 20 + Math.random() * 75]);
      setLat(30 + Math.round(Math.random() * 14));
    }, 1400);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="glass glass-sheen rounded-[2rem] p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        </div>
        <span className="caps">Engine Telemetry</span>
        <span className="led h-2 w-2 rounded-full bg-emerald" />
      </div>

      <div className="mt-4 grid grid-cols-3 divide-x divide-hairline border-y border-hairline py-3 text-center">
        {[
          [`${lat}ms`, "p50"],
          ["99.98%", "uptime"],
          ["0", "errors"],
        ].map(([v, k]) => (
          <div key={k}>
            <div className="text-lg font-semibold tracking-tight tabular-nums">{v}</div>
            <div className="caps text-[10px]">{k}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex h-14 items-end gap-[3px]">
        {bars.map((h, i) => (
          <motion.div key={i} animate={{ height: `${h}%` }} transition={spring}
            className={`flex-1 rounded-full ${i === bars.length - 1 ? "bg-amber" : "bg-foreground/25"}`} />
        ))}
      </div>

      <ul className="mt-4 space-y-1.5 font-mono text-[11px] text-muted-foreground">
        <AnimatePresence initial={false}>
          {log.map((e) => (
            <motion.li key={e.id} layout initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={spring}
              className="flex items-center gap-2 border-b border-hairline pb-1.5 last:border-0">
              <span className="text-emerald">›</span> {e.t}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
