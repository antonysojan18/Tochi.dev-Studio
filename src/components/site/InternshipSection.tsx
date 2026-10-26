import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { TiltSurface } from "./TiltSurface";
import { KineticText } from "./KineticText";
import { spring, tap } from "./motion";

export function InternshipSection() {
  return (
    <section
      id="internship"
      className="relative z-10 mx-auto max-w-6xl px-3 sm:px-5 py-12 sm:py-16 md:py-24 scroll-mt-28 md:scroll-mt-32"
    >
      {/* Section Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <KineticText
          as="h2"
          className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
        >
          JOIN OUR TEAM AS INTERN?
        </KineticText>
        <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
          Step inside TOCHI .dev studio's 1-month high-velocity internship program. Free real-world
          engineering experience with senior code reviews, production capstones, and MSME-verified credentials.
        </p>
      </div>

      {/* THE BOX: "JOIN OUR INTERN SQUAD" -> Redirects to /labs */}
      <TiltSurface className="overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-lift">
        <motion.div whileTap={tap} whileHover={{ scale: 1.01 }} transition={spring}>
          <Link
            to="/labs"
            className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-header-cream/25 bg-gradient-to-r from-[#8A1C36] via-[#540B1A] to-[#2B050D] p-6 sm:p-9 md:p-12 text-header-cream shadow-2xl transition-all hover:border-header-cream/50 hover:shadow-[0_16px_50px_rgba(138,28,54,0.4)]"
          >
            {/* Ambient specular highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-60"
            />

            <div className="relative z-10 space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-header-cream">
                JOIN OUR INTERN SQUAD
              </h3>
              <p className="max-w-xl text-xs sm:text-sm md:text-base text-header-cream/80 leading-relaxed">
                Explore the 6 specialized curriculum tracks, view capstone projects, and submit your free application on our dedicated <span className="font-semibold text-header-cream underline underline-offset-2">/Labs</span> portal.
              </p>
            </div>

            {/* Visual Action Button inside the Box */}
            <div className="relative z-10 flex items-center gap-2 self-stretch sm:self-center justify-center shrink-0 rounded-full bg-header-cream px-6 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-bold text-header-ink shadow-lg transition-transform group-hover:scale-105 active:scale-95">
              <span>Enter /Labs</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </motion.div>
      </TiltSurface>
    </section>
  );
}
