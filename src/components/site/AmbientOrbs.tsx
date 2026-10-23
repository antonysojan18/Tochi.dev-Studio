'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export function AmbientOrbs() {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 60 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (reducedMotion) return;
    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 50;
      const y = (e.clientY / innerHeight - 0.5) * 50;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY, reducedMotion]);

  if (reducedMotion) {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[15%] left-[8%] h-[360px] w-[360px] rounded-full bg-[#6B1124]/20 blur-[130px]" />
        <div className="absolute top-[50%] right-[10%] h-[420px] w-[420px] rounded-full bg-[#4A0815]/25 blur-[150px]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Orb 1: Upper left rich burgundy glow */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -35, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[12%] -left-[5%] h-[480px] w-[480px] rounded-full bg-gradient-to-br from-[#7E162B]/22 to-[#540B1A]/10 blur-[140px] will-change-transform"
      />

      {/* Orb 2: Mid-right deep wine velvet specular pool */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          x: [0, -40, 25, 0],
          y: [0, 45, -30, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[42%] -right-[8%] h-[560px] w-[560px] rounded-full bg-gradient-to-tr from-[#6B1124]/25 via-[#3D0612]/30 to-transparent blur-[160px] will-change-transform"
      />

      {/* Orb 3: Lower ruby ember accent */}
      <motion.div
        animate={{
          x: [0, 25, -30, 0],
          y: [0, -25, 35, 0],
          opacity: [0.12, 0.22, 0.14, 0.12],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-[72%] left-[18%] h-[380px] w-[380px] rounded-full bg-gradient-to-r from-[#FF4D36]/15 via-[#A82544]/12 to-transparent blur-[130px] will-change-transform"
      />
    </div>
  );
}

export default AmbientOrbs;
