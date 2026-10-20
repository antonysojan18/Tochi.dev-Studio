import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { spring, tap } from "./motion";

const links = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "process", label: "Process" },
];

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);

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
      className="glass-thin fixed top-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 items-center justify-between gap-2 rounded-full py-1.5 pr-1.5 pl-4 md:top-6"
    >
      <a href="#top" className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold tracking-[0.12em]">TOCHI</span>
        <span className="hidden font-mono text-[10px] text-tertiary sm:inline">.dev studio</span>
      </a>

      <nav className="hidden items-center md:flex">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {active === l.id && (
              <motion.span layoutId="nav-pill" transition={spring} className="absolute inset-0 rounded-full border border-hairline bg-accent" />
            )}
            <span className="relative">{l.label}</span>
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-2 rounded-full border border-hairline px-3 py-1 font-mono text-[11px] text-muted-foreground lg:flex">
          <span className="led h-1.5 w-1.5 rounded-full bg-emerald" /> Open for Q4
        </span>
        <motion.a
          href="#intake"
          whileTap={tap}
          transition={spring}
          className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[0.98]"
        >
          Start a Build
        </motion.a>
      </div>
    </motion.header>
  );
}
