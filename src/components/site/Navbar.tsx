import { useEffect, useState } from "react";
import { motion } from "motion/react";
import headerLogo from "@/assets/tochi-header.png.asset.json";
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
      className="glass-thin fixed top-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 items-center justify-between gap-2 rounded-full py-1.5 pr-1.5 pl-2.5 md:top-6"
    >
      <a href="#top" aria-label="TOCHI .dev studio — back to top" className="shrink-0">
        <motion.img
          src={headerLogo.url}
          alt="TOCHI .dev studio"
          draggable={false}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.35 }}
          whileHover={{ scale: 1.04 }}
          whileTap={tap}
          className="h-8 w-auto select-none object-contain brightness-110 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] md:h-9"
        />
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

      <motion.a
        href="#intake"
        whileTap={tap}
        whileHover={{ scale: 1.03 }}
        transition={spring}
        className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
      >
        Start a Build
      </motion.a>
    </motion.header>
  );
}
