'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

export interface KineticTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
}

export function KineticText({
  children,
  as: Component = 'h2',
  className = '',
  delay = 0,
  stagger = 0.04
}: KineticTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reducedMotion = useReducedMotion();

  const words = children.split(' ');

  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component ref={ref as any} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden py-[0.06em] leading-tight">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '115%', opacity: 0, rotateZ: 2 }}
            animate={isInView ? { y: '0%', opacity: 1, rotateZ: 0 } : { y: '115%', opacity: 0, rotateZ: 2 }}
            transition={{
              type: 'spring',
              damping: 26,
              stiffness: 150,
              delay: delay + i * stagger
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

export default KineticText;
