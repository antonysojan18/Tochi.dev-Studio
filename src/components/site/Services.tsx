import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  Palette,
  Globe,
  ShoppingBag,
  LayoutGrid,
  Workflow,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TiltSurface } from "./TiltSurface";
import { Button } from "@/components/ui/button";
import { spring, tap } from "./motion";

function Tile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileTap={tap}
      transition={spring}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className={`group ${className}`}
    >
      <TiltSurface className="glass flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2rem] p-3 sm:p-5 md:p-7 transition-colors hover:border-primary/40">
        {children}
      </TiltSurface>
    </motion.div>
  );
}

function CardHeader({
  icon,
  number,
  title,
}: {
  icon: ReactNode;
  number: string;
  title: string;
}) {
  return (
    <div className="mt-2.5 sm:mt-5 md:mt-8 pt-2 sm:pt-3.5 border-t border-hairline/60">
      <div className="mb-1 sm:mb-2 md:mb-3.5 flex items-center justify-between">
        <div className="flex h-6 w-6 sm:h-8 sm:w-8 md:h-11 md:w-11 items-center justify-center rounded-full bg-accent text-header-cream shadow-sm">
          {icon}
        </div>
        <span className="font-mono text-[8px] sm:text-[11px] md:text-xs font-semibold tracking-wider text-header-cream/70">
          {number}
        </span>
      </div>
      <h3 className="font-heading text-[11px] sm:text-base md:text-xl lg:text-[1.55rem] font-bold tracking-tight text-foreground leading-[1.25]">
        {title}
      </h3>
    </div>
  );
}

export function Services() {
  const [saasActive, setSaasActive] = useState(true);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState(0);

  const swatches = [
    { name: "Cream Onyx", hex: "oklch(0.24 0.065 355)" },
    { name: "Ivory Sheen", hex: "oklch(0.97 0.025 88)" },
    { name: "Amber Glow", hex: "oklch(0.79 0.17 66)" },
    { name: "Obsidian", hex: "oklch(0.18 0.04 355)" },
  ];

  return (
    <section id="services" className="relative z-10 mx-auto max-w-6xl px-3 sm:px-5 pt-12 pb-20 sm:pt-16 sm:pb-24 md:py-28 scroll-mt-28 md:scroll-mt-32">
      {/* Section Header: Clean and bold */}
      <div className="mb-6 sm:mb-10 md:mb-14">
        <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
          Our Services
        </h2>
      </div>

      {/* Grid: 3-column on mobile and desktop alike (Top 2 tiles, Bottom 3 tiles) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3.5 md:gap-5">
        {/* ROW 1 — Tile 1 (1 col): Brand Identity & Visual Designs */}
        <Tile className="col-span-1">
          <div className="space-y-1.5 sm:space-y-3 rounded-xl sm:rounded-2xl border border-hairline bg-muted/40 p-2 sm:p-3.5 md:p-4">
            <div className="flex items-center justify-between text-[8px] sm:text-xs font-mono text-muted-foreground">
              <span className="truncate">Palettes</span>
              <Sparkles className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-amber shrink-0" />
            </div>

            {/* Interactive Swatches */}
            <div className="flex items-center gap-1 sm:gap-2">
              {swatches.map((s, idx) => (
                <button
                  key={s.name}
                  type="button"
                  aria-label={`Select ${s.name}`}
                  onClick={() => setActiveColor(idx)}
                  className={`h-3.5 w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full border border-hairline transition-all ${
                    activeColor === idx
                      ? "scale-110 ring-1 sm:ring-2 ring-header-cream"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: s.hex }}
                />
              ))}
            </div>

            {/* Specimen Box */}
            <div className="rounded-lg sm:rounded-xl border border-hairline/80 bg-background/60 p-1.5 sm:p-2.5">
              <div className="flex items-baseline justify-between">
                <span className="font-heading text-sm sm:text-lg md:text-2xl font-bold text-foreground">
                  Aa
                </span>
                <span className="font-mono text-[7px] sm:text-[10px] md:text-[11px] text-header-cream/80 truncate max-w-[45px] sm:max-w-none">
                  {swatches[activeColor].name}
                </span>
              </div>
              <div className="mt-1 flex gap-1">
                <div className="h-0.5 sm:h-1 flex-1 rounded-full bg-foreground/25" />
                <div className="h-0.5 sm:h-1 flex-1 rounded-full bg-foreground/45" />
                <div className="h-0.5 sm:h-1 flex-1 rounded-full bg-header-cream/80" />
              </div>
            </div>
          </div>

          <CardHeader
            icon={<Palette className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
            number="01"
            title="Brand Identity & Visual Designs"
          />
        </Tile>

        {/* ROW 1 — Tile 2 (2 cols): Modern Websites */}
        <Tile className="col-span-2">
          <div className="space-y-1.5 sm:space-y-3 rounded-xl sm:rounded-2xl border border-hairline bg-muted/40 p-2 sm:p-3.5 md:p-4">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between gap-1.5 pb-1 sm:pb-2 border-b border-hairline/50">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-destructive/70" />
                <span className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-amber/70" />
                <span className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full bg-header-cream/70" />
              </div>

              <div className="flex items-center gap-1 rounded-full border border-hairline bg-background/80 px-2 py-0.5 font-mono text-[8px] sm:text-[10px] md:text-[11px] text-muted-foreground">
                <ShieldCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-header-cream shrink-0" />
                <span className="truncate">tochi.studio</span>
              </div>

              {/* Viewport switcher */}
              <div className="flex rounded-full border border-hairline bg-background/60 p-0.5 text-[8px] sm:text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("desktop")}
                  className={`rounded-full px-1.5 sm:px-2.5 py-0.5 transition-colors ${
                    viewMode === "desktop"
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  Desk
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("mobile")}
                  className={`rounded-full px-1.5 sm:px-2.5 py-0.5 transition-colors ${
                    viewMode === "mobile"
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  Mob
                </button>
              </div>
            </div>

            {/* Viewport Frame */}
            <motion.div
              layout
              transition={spring}
              className={`mx-auto rounded-lg sm:rounded-xl border border-hairline/70 bg-background/50 p-1.5 sm:p-2.5 transition-all ${
                viewMode === "mobile" ? "max-w-[120px] sm:max-w-[180px]" : "w-full"
              }`}
            >
              <div className="flex items-center justify-between pb-1">
                <div className="h-1 sm:h-2 w-8 sm:w-16 rounded-full bg-foreground/30" />
                <div className="flex gap-1">
                  <div className="h-1 sm:h-2 w-2.5 sm:w-5 rounded-full bg-foreground/20" />
                  <div className="h-1 sm:h-2 w-2.5 sm:w-5 rounded-full bg-foreground/20" />
                </div>
              </div>
              <div className="h-4 sm:h-7 md:h-10 rounded bg-gradient-to-r from-header-cream/20 via-primary/10 to-amber/20" />
              <div className="mt-1 sm:mt-1.5 grid grid-cols-3 gap-1">
                <div className="h-2.5 sm:h-4 md:h-5 rounded bg-foreground/10" />
                <div className="h-2.5 sm:h-4 md:h-5 rounded bg-foreground/10" />
                <div className="h-2.5 sm:h-4 md:h-5 rounded bg-foreground/10" />
              </div>
            </motion.div>

            <div className="flex items-center justify-between font-mono text-[8px] sm:text-[10px] md:text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1 text-header-cream font-medium">
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-header-cream" /> 100% Speed
              </span>
              <span className="hidden sm:inline">Edge Deployed</span>
            </div>
          </div>

          <CardHeader
            icon={<Globe className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
            number="02"
            title="Modern Websites"
          />
        </Tile>

        {/* ROW 2 — Tile 3 (1 col): E-Commerce Platforms & Stores */}
        <Tile className="col-span-1">
          <div className="space-y-1.5 sm:space-y-3 rounded-xl sm:rounded-2xl border border-hairline bg-muted/40 p-2 sm:p-3.5 md:p-4">
            <div className="flex items-center justify-between text-[8px] sm:text-xs font-mono text-muted-foreground">
              <span className="truncate">Store</span>
              <span className="rounded-full bg-header-cream/15 px-1 py-0.5 text-header-cream font-semibold text-[7px] sm:text-[10px]">
                +41%
              </span>
            </div>

            <div className="rounded-lg sm:rounded-xl border border-hairline bg-background/60 p-1.5 sm:p-2.5 space-y-1.5">
              <div className="flex items-center justify-between gap-1">
                <div className="truncate">
                  <div className="text-[9px] sm:text-xs font-semibold text-foreground truncate">
                    Drop 01
                  </div>
                </div>
                <div className="font-mono text-[8px] sm:text-xs font-bold text-foreground shrink-0">
                  ${(qty * 145).toFixed(0)}
                </div>
              </div>

              {/* Stepper & Instant Pay Pill */}
              <div className="flex items-center justify-between gap-1 pt-1 border-t border-hairline/60">
                <div className="flex items-center rounded border border-hairline bg-muted/50 px-1 py-0.5 text-[8px] sm:text-xs">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-0.5 text-muted-foreground hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-1 font-mono font-semibold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="px-0.5 text-muted-foreground hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-0.5 rounded bg-foreground px-1 sm:px-2 py-0.5 text-[7px] sm:text-[10px] font-semibold text-background">
                  <Check className="h-2 w-2 sm:h-3 sm:w-3" /> Pay
                </div>
              </div>
            </div>
          </div>

          <CardHeader
            icon={<ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
            number="03"
            title="E-Commerce Platforms & Stores"
          />
        </Tile>

        {/* ROW 2 — Tile 4 (1 col): Custom Web Applications & SaaS */}
        <Tile className="col-span-1">
          <div className="space-y-1.5 sm:space-y-3 rounded-xl sm:rounded-2xl border border-hairline bg-muted/40 p-2 sm:p-3.5 md:p-4">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[8px] sm:text-xs font-semibold text-foreground truncate">
                Engine
              </span>
              <Button
                variant="ghost"
                aria-pressed={saasActive}
                aria-label="Toggle SaaS Engine"
                onClick={() => setSaasActive(!saasActive)}
                className={`flex h-4 w-7 sm:h-6 sm:w-11 md:h-8 md:w-14 shrink-0 items-center rounded-full p-0.5 sm:p-1 transition-colors ${
                  saasActive ? "bg-header-cream/90 text-background" : "bg-foreground/20"
                }`}
              >
                <motion.span
                  layout
                  transition={spring}
                  className={`h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 rounded-full shadow ${
                    saasActive ? "ml-auto bg-background" : "bg-foreground"
                  }`}
                />
              </Button>
            </div>

            {/* Dynamic Telemetry Bars */}
            <div className="rounded-lg sm:rounded-xl border border-hairline bg-background/60 p-1.5 sm:p-2.5">
              <div className="flex h-5 sm:h-8 md:h-11 items-end justify-between gap-0.5 sm:gap-1 pt-0.5">
                {[45, 80, 65, 95, 82, 100, saasActive ? 92 : 20].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: `${saasActive ? h : 18}%` }}
                    transition={spring}
                    className={`w-full rounded-[1px] sm:rounded-sm ${
                      i === 6 ? "bg-header-cream" : "bg-foreground/20"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-1 flex items-center justify-between font-mono text-[7px] sm:text-[9px] md:text-[10px] text-muted-foreground">
                <span>99.9%</span>
                <span className="hidden sm:inline">Edge</span>
              </div>
            </div>
          </div>

          <CardHeader
            icon={<LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
            number="04"
            title="Custom Web Applications & SaaS"
          />
        </Tile>

        {/* ROW 2 — Tile 5 (1 col): Intelligent Automation & System Integrations */}
        <Tile className="col-span-1">
          <div className="space-y-1.5 sm:space-y-3 rounded-xl sm:rounded-2xl border border-hairline bg-muted/40 p-2 sm:p-3.5 md:p-4">
            <div className="flex items-center justify-between text-[8px] sm:text-xs font-mono text-muted-foreground">
              <span className="truncate">Mesh</span>
              <span className="flex items-center gap-0.5 text-header-cream font-medium text-[7px] sm:text-[10px]">
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-header-cream animate-pulse" />
                Live
              </span>
            </div>

            {/* SVG Pipeline */}
            <div className="rounded-lg sm:rounded-xl border border-hairline bg-background/60 p-1 sm:p-2">
              <svg viewBox="0 0 160 45" className="h-5 sm:h-8 md:h-11 w-full overflow-visible" fill="none">
                <path
                  d="M10 22 C45 22 45 8 80 8 S115 36 150 22"
                  stroke="var(--amber)"
                  strokeWidth="1.5"
                  className="flow"
                />
                {[10, 80, 150].map((x, k) => (
                  <circle
                    key={x}
                    cx={x}
                    cy={k === 1 ? 8 : 22}
                    r="3.5"
                    fill="var(--background)"
                    stroke="var(--foreground)"
                    strokeOpacity=".7"
                  />
                ))}
              </svg>
              <div className="flex items-center justify-between font-mono text-[7px] sm:text-[9px] md:text-[10px] text-muted-foreground pt-0.5">
                <span>Hook</span>
                <span>AI</span>
                <span>DB</span>
              </div>
            </div>
          </div>

          <CardHeader
            icon={<Workflow className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />}
            number="05"
            title="Intelligent Automation & System Integrations"
          />
        </Tile>
      </div>
    </section>
  );
}
