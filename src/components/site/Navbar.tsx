import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import headerLogo from "@/assets/Tochi .dev Studio.png";
import { spring, tap } from "./motion";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 flex-col items-center pointer-events-none md:top-6">
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.2 }}
        className="glass-ivory pointer-events-auto flex w-full items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 pl-3 shadow-lg md:py-2 md:pr-2 md:pl-4"
      >
        <Link
          to="/"
          hash="top"
          aria-label="TOCHI .dev studio — home"
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
            className="h-7 w-auto select-none object-contain md:h-8"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 text-xs font-semibold text-header-ink-muted md:flex">
          <a href="/#top" className="transition-colors hover:text-header-ink">
            Home
          </a>
          <a href="/#services" className="transition-colors hover:text-header-ink">
            Services
          </a>
          <a href="/#portfolio" className="transition-colors hover:text-header-ink">
            Portfolio
          </a>
          <Link to="/labs" className="transition-colors hover:text-header-ink">
            Internship
          </Link>
        </nav>

        {/* Right Action: /Labs Button + Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5">
          <motion.div whileTap={tap} whileHover={{ scale: 1.03 }} transition={spring}>
            <Link
              to="/labs"
              className="inline-flex items-center gap-1 rounded-full bg-header-ink px-4 py-1.5 text-xs md:text-sm font-semibold text-header-cream shadow-sm transition-all hover:bg-header-ink/90 active:scale-95"
            >
              <span>/Labs</span>
            </Link>
          </motion.div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-header-ink/15 text-header-ink transition-colors hover:bg-header-ink/10 md:hidden"
          >
            {mobileOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={spring}
            className="glass-ivory pointer-events-auto mt-2 flex w-full flex-col gap-1 rounded-2xl p-3 shadow-xl md:hidden"
          >
            <a
              href="/#top"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-header-ink transition-colors hover:bg-header-ink/10"
            >
              <span>Home</span>
              <span className="font-mono text-[10px] text-header-ink-muted">01</span>
            </a>
            <a
              href="/#services"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-header-ink transition-colors hover:bg-header-ink/10"
            >
              <span>Services</span>
              <span className="font-mono text-[10px] text-header-ink-muted">02</span>
            </a>
            <a
              href="/#portfolio"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-header-ink transition-colors hover:bg-header-ink/10"
            >
              <span>Portfolio</span>
              <span className="font-mono text-[10px] text-header-ink-muted">03</span>
            </a>
            <Link
              to="/labs"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-xl bg-header-ink px-3 py-2 text-xs font-semibold text-header-cream transition-opacity hover:opacity-95"
            >
              <span>Internship (/Labs)</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
