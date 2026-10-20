import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import wordmark from "@/assets/tochi-wordmark.png.asset.json";
import { spring, tap } from "./motion";
import { Telemetry } from "./Telemetry";

const SETS = {
  web: { count: 210, path: "/hero/web/" },
  mob: { count: 180, path: "/hero/mob/" },
};
const src = (path: string, i: number) => `${path}${String(i + 1).padStart(3, "0")}.webp`;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentRef = useRef(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // fall back to nearest loaded frame
    let img: HTMLImageElement | undefined;
    for (let d = 0; d < 30 && !img; d++) {
      const a = framesRef.current[index - d];
      const b = framesRef.current[index + d];
      if (a?.complete && a.naturalWidth) img = a;
      else if (b?.complete && b.naturalWidth) img = b;
    }
    if (!img) return;
    const { width: cw, height: ch } = canvas;
    // cover + slight overscan to hide edge watermark
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * 1.08;
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2 - (w - cw) * 0.1, (ch - h) / 2 - (h - ch) * 0.1, w, h);
  };

  useEffect(() => {
    const isMob = window.matchMedia("(max-width: 767px), (orientation: portrait)").matches;
    const set = isMob ? SETS.mob : SETS.web;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < set.count; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = src(set.path, i);
      if (i === 0) img.onload = () => { setReady(true); draw(0); };
      else img.onload = () => { if (Math.abs(i - currentRef.current) < 3) draw(currentRef.current); };
      imgs.push(img);
    }
    framesRef.current = imgs;

    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      draw(currentRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = framesRef.current.length;
    if (!n) return;
    const idx = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    if (idx !== currentRef.current) {
      currentRef.current = idx;
      requestAnimationFrame(() => draw(idx));
    }
  });

  const logoOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const logoBlur = useTransform(scrollYProgress, [0.08, 0.2], ["blur(0px)", "blur(12px)"]);
  const copyOpacity = useTransform(scrollYProgress, [0.22, 0.34, 0.9, 1], [0, 1, 1, 0.9]);
  const copyY = useTransform(scrollYProgress, [0.22, 0.36], [40, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.42, 0.55], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.42, 0.58], [60, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[420vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} />
        <div className="hero-fade pointer-events-none absolute inset-0" />

        {/* Brand mark */}
        <motion.div style={{ opacity: logoOpacity, scale: logoScale, filter: logoBlur }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <motion.img
            src={wordmark.url}
            alt="TOCHI .dev studio"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 0.1 }}
            className="w-[58vw] max-w-[340px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        <motion.div style={{ opacity: hintOpacity }} className="caps absolute bottom-8 left-1/2 -translate-x-1/2">
          Scroll to enter
        </motion.div>

        {/* Copy */}
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center gap-10 px-5 pt-20 lg:flex-row lg:items-center lg:justify-between">
          <motion.div style={{ opacity: copyOpacity, y: copyY }} className="max-w-xl">
            <span className="caps inline-flex items-center gap-2 rounded-full border border-hairline bg-muted px-3 py-1 backdrop-blur-md">
              <Sparkles className="h-3 w-3" /> iOS-Grade Precision • High-Velocity Systems
            </span>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.035em] md:text-7xl">
              Software crafted with discipline.
            </h1>
            <p className="mt-5 text-base leading-relaxed tracking-[-0.01em] text-foreground/70 md:text-lg">
              Bespoke web applications, internal operational tools, and intelligent systems. No agency friction. Direct access to your principal engineer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a href="#intake" whileTap={tap} whileHover={{ scale: 1.02 }} transition={spring}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
                Start a Build <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#work" whileTap={tap} transition={spring}
                className="glass inline-flex items-center rounded-full px-6 py-3 text-sm font-medium">
                View selected work
              </motion.a>
            </div>
          </motion.div>

          <motion.div style={{ opacity: cardOpacity, y: cardY }} className="hidden w-full max-w-sm sm:block">
            <Telemetry />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
