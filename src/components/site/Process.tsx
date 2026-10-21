import { motion } from "motion/react";
import { spring } from "./motion";

const steps = [
  ["Discover", "A 45-minute call. We map the system, constraints and the metric that matters."],
  ["Architect", "A written blueprint with scope, stack and a fixed timeline — before any code."],
  ["Build", "Weekly staging drops. You see real software, not status decks."],
  ["Hand over", "Docs, tests and a codebase your next hire will thank you for."],
];

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <span className="caps">Process</span>
      <h2 className="mt-3 mb-12 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">
        Four steps. No friction.
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([t, d], i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.06 }}
            className="glass rounded-[2rem] p-6"
          >
            <span className="caps">0{i + 1}</span>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
