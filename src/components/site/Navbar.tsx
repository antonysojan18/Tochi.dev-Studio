import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import headerLogo from "@/assets/Tochi .dev Studio.png";
import { spring, tap } from "./motion";

const links = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "process", label: "Process" },
];

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...spring, delay: 0.2 }}
      className="glass-ivory fixed top-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 items-center justify-between gap-2 rounded-full py-1.5 pr-1.5 pl-3 md:top-6 md:py-2 md:pr-2 md:pl-4"
    >
      <a
        href="#top"
        aria-label="TOCHI .dev studio — back to top"
        className="shrink-0 flex items-center"
      >
        <motion.img
          src={headerLogo}
          alt="TOCHI .dev studio"
          draggable={false}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.35 }}
          whileHover={{ scale: 1.04 }}
          whileTap={tap}
          className="h-8 w-auto select-none object-contain md:h-9"
        />
      </a>

      <nav className="hidden items-center md:flex" aria-label="Primary">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === l.id ? "text-header-cream" : "text-header-ink-muted hover:text-header-ink"}`}
          >
            {active === l.id && (
              <motion.span
                layoutId="nav-pill"
                transition={spring}
                className="absolute inset-0 rounded-full bg-header-ink"
              />
            )}
            <span className="relative">{l.label}</span>
          </a>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-1.5 md:hidden">
        <motion.button
          type="button"
          whileTap={tap}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-8 w-8 place-items-center rounded-full border border-header-ink/10 bg-header-ink/5 text-header-ink"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </motion.button>
        <motion.a
          href="#intake"
          whileTap={tap}
          whileHover={{ scale: 1.03 }}
          transition={spring}
          className="rounded-full bg-header-ink px-3.5 py-1.5 text-sm font-medium text-header-cream"
        >
          Build
        </motion.a>
      </div>

      <motion.a
        href="#intake"
        whileTap={tap}
        whileHover={{ scale: 1.03 }}
        transition={spring}
        className="hidden shrink-0 rounded-full bg-header-ink px-4 py-1.5 text-sm font-medium text-header-cream md:inline-flex"
      >
        Start a Build
      </motion.a>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={spring}
            className="glass-ivory absolute top-[calc(100%+0.5rem)] right-0 left-0 rounded-2xl p-1.5 shadow-[0_16px_40px_oklch(0_0_0/25%)] md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-header-ink transition-colors hover:bg-header-ink/5"
              >
                {l.label}
                <span className="text-header-ink-muted">→</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
