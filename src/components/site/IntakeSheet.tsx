import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { spring, tap } from "./motion";

const field =
  "w-full rounded-2xl border border-input bg-primary-foreground/[0.04] px-4 py-3.5 text-[15px] text-primary-foreground placeholder:text-primary-foreground/40 outline-none transition focus:border-primary-foreground focus:ring-4 focus:ring-ring/15";

const GitHub = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
);
const LinkedIn = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" /></svg>
);

export function IntakeSheet() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:antony@tochistudio.com?subject=${encodeURIComponent("New build — " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="intake" className="px-3 pt-16 pb-3 md:px-5">
      <motion.div initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={spring}
        className="mx-auto max-w-6xl rounded-[2.5rem] bg-primary p-6 text-primary-foreground shadow-[0_-20px_80px_rgba(0,0,0,0.35)] md:p-12">
        <div className="mx-auto mb-8 h-1.5 w-10 rounded-full bg-primary-foreground/20" />
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="font-mono text-xs tracking-[0.08em] text-primary-foreground/50 uppercase">Intake</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Let's architect your system.</h2>
            <p className="mt-4 max-w-sm text-primary-foreground/65">Reply within one business day — from the engineer who will build it.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-3">
            <input required name="name" placeholder="Your Name" className={field} />
            <input required type="email" name="email" placeholder="Work Email" className={field} />
            <textarea required name="message" rows={5} placeholder="Describe Your System Architecture" className={`${field} resize-none`} />
            <motion.button whileTap={tap} transition={spring} type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-foreground py-4 text-[15px] font-medium text-primary">
              {sent ? <><Check className="h-4 w-4" /> Opening your mail app</> : <>Send brief <ArrowUpRight className="h-4 w-4" /></>}
            </motion.button>
          </form>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <a href="mailto:antony@tochistudio.com" className="font-medium hover:opacity-70">antony@tochistudio.com</a>
          <div className="flex items-center gap-4">
            <a href="https://github.com" aria-label="GitHub" className="hover:opacity-70"><GitHub /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:opacity-70"><LinkedIn /></a>
          </div>
          <span className="font-mono text-[11px] text-primary-foreground/50">TOCHI (.dev studio) © 2026. All rights reserved.</span>
        </div>
      </motion.div>
    </section>
  );
}
