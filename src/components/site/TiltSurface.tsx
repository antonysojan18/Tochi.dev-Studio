import { useRef, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export function TiltSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    el.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    el.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
    el.style.setProperty("--sheen-x", `${x * 100}%`);
    el.style.setProperty("--sheen-y", `${y * 100}%`);
    el.dataset["active"] = "true";
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.dataset["active"] = "false";
  };

  return (
    <div
      className="tilt-perspective h-full"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <div ref={ref} className={`tilt-surface relative h-full ${className}`}>
        {children}
        <div
          aria-hidden="true"
          className="holographic-sheen pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      </div>
    </div>
  );
}
