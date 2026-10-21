import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/IMG_1048.PNG";
import { spring, tap } from "./motion";

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
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * 1.16;
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, -(w - cw) * 0.3, -(h - ch) * 0.3, w, h);
  };

  useEffect(() => {
    const isMob = window.matchMedia("(max-width: 767px), (orientation: portrait)").matches;
    const set = isMob ? SETS.mob : SETS.web;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < set.count; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = src(set.path, i);
      if (i === 0)
        img.onload = () => {
          setReady(true);
          draw(0);
        };
      else
        img.onload = () => {
          if (Math.abs(i - currentRef.current) < 3) draw(currentRef.current);
        };
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
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // Staggered scroll reveals with smooth exit as next section approaches
  // 1. Headline reveals first
  const headlineOpacity = useTransform(scrollYProgress, [0.18, 0.3, 0.85, 0.96], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.18, 0.3, 0.85, 0.96], [44, 0, 0, -25]);
  const headlineBlur = useTransform(
    scrollYProgress,
    [0.18, 0.3, 0.85, 0.96],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(6px)"],
  );

  // 2. Subheading reveals next
  const subheadOpacity = useTransform(scrollYProgress, [0.26, 0.38, 0.85, 0.96], [0, 1, 1, 0]);
  const subheadY = useTransform(scrollYProgress, [0.26, 0.38, 0.85, 0.96], [32, 0, 0, -20]);
  const subheadBlur = useTransform(
    scrollYProgress,
    [0.26, 0.38, 0.85, 0.96],
    ["blur(6px)", "blur(0px)", "blur(0px)", "blur(5px)"],
  );

  // 3. At last, the action buttons appear
  const ctaOpacity = useTransform(scrollYProgress, [0.36, 0.48, 0.85, 0.96], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.36, 0.48, 0.85, 0.96], [28, 0, 0, -15]);
  const ctaScale = useTransform(scrollYProgress, [0.36, 0.48], [0.94, 1]);

  // Transition to next section: dynamic zero-offset drop shadow and ambient elevation veil
  const transitionShadowOpacity = useTransform(scrollYProgress, [0.78, 0.92, 1], [0, 1, 1]);
  const heroExitScale = useTransform(scrollYProgress, [0.88, 1], [1, 0.98]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[420vh]">
      <motion.div
        style={{ scale: heroExitScale }}
        className="sticky top-0 h-[100svh] w-full overflow-hidden origin-bottom"
      >
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        />
        <div className="hero-fade pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="light-leak light-leak-hero pointer-events-none absolute inset-0"
        />

        {/* Brand mark */}
        <motion.div
          style={{ opacity: logoOpacity, scale: logoScale, filter: logoBlur }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
        >
          <motion.img
            src={heroImg}
            alt="TOCHI .dev studio"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 0.1 }}
            className="w-[58vw] max-w-[340px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="caps absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          Scroll to enter
        </motion.div>

        {/* Copy */}
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center gap-10 px-5 pt-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-2xl">
            <div
              aria-hidden="true"
              className="hero-scrim pointer-events-none absolute -inset-x-12 -inset-y-20 -z-10 sm:-inset-x-10 sm:-inset-y-14"
            />
            <motion.h1
              style={{ opacity: headlineOpacity, y: headlineY, filter: headlineBlur }}
              className="hero-copy text-5xl font-semibold tracking-[-0.035em] md:text-7xl"
            >
              Modern software infused with Obsessive craft.
            </motion.h1>
            <motion.p
              style={{ opacity: subheadOpacity, y: subheadY, filter: subheadBlur }}
              className="hero-copy mt-6 text-base leading-relaxed tracking-[-0.01em] text-foreground/90 md:text-xl"
            >
              An independent engineering studio crafting modern web interfaces and high-leverage
              internal platforms.
            </motion.p>
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.a
                href="#intake"
                whileTap={tap}
                whileHover={{ scale: 1.02 }}
                transition={spring}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_oklch(var(--primary)/25%)]"
              >
                Start a Build <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#work"
                whileTap={tap}
                whileHover={{ scale: 1.02 }}
                transition={spring}
                className="glass inline-flex items-center rounded-full px-6 py-3.5 text-sm font-medium hover:border-primary/40"
              >
                View selected work
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Butter-smooth Zero Drop Shadow Ambient Transition Veil */}
        <motion.div
          style={{ opacity: transitionShadowOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/60 to-transparent"
        >
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hairline/30 to-transparent shadow-[0_0_60px_30px_oklch(0_0_0/90%)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
