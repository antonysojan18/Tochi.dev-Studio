import { motion } from "motion/react";
import headerLogo from "@/assets/Tochi .dev Studio.png";
import { spring, tap } from "./motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...spring, delay: 0.2 }}
      className="glass-ivory fixed top-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 items-center justify-between gap-2 rounded-full py-1.5 pr-1.5 pl-3 shadow-lg md:top-6 md:py-2 md:pr-2 md:pl-4"
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

      {/* Action button at the end: "Start a Build" on desktop, "Build" on mobile */}
      <motion.a
        href="#intake"
        whileTap={tap}
        whileHover={{ scale: 1.03 }}
        transition={spring}
        className="rounded-full bg-header-ink px-4 py-1.5 text-sm font-medium text-header-cream shadow-sm"
      >
        <span className="hidden md:inline">Start a Build</span>
        <span className="md:hidden">Build</span>
      </motion.a>
    </motion.header>
  );
}
