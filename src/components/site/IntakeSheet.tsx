import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Github, Linkedin, Instagram } from "lucide-react";
import { spring, tap } from "./motion";
import FlyingButton from "./FlyingButton";
import { KineticText } from "./KineticText";

const field =
  "w-full rounded-2xl border border-input bg-primary-foreground/[0.04] px-4 py-3.5 text-[15px] text-primary-foreground placeholder:text-primary-foreground/40 outline-none transition focus:border-primary-foreground focus:ring-4 focus:ring-ring/15";

export function IntakeSheet() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:tochi.devstudio@gmail.com?subject=${encodeURIComponent("New build — " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="intake" className="px-3 pt-16 pb-3 md:px-5">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={spring}
        className="mx-auto max-w-6xl rounded-[2.5rem] bg-primary p-6 text-primary-foreground shadow-[0_-20px_80px_rgba(0,0,0,0.35)] md:p-12"
      >
        <div className="mx-auto mb-8 h-1.5 w-10 rounded-full bg-primary-foreground/20" />
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="font-mono text-xs tracking-[0.08em] text-primary-foreground/50 uppercase">
              Intake
            </span>
            <KineticText as="h2" className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Let's architect your system.
            </KineticText>
            <p className="mt-4 max-w-sm text-primary-foreground/65">
              Reply within one business day — from the engineer who will build it.
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-3">
            <input required name="name" placeholder="Your Name" className={field} />
            <input required type="email" name="email" placeholder="Work Email" className={field} />
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Describe Your System Architecture"
              className={`${field} resize-none`}
            />
            <motion.button
              whileTap={tap}
              transition={spring}
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-foreground py-4 text-[15px] font-medium text-primary cursor-pointer transition hover:opacity-95"
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" /> Opening your mail app
                </>
              ) : (
                <>
                  Send brief <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Contact & Social Links */}
        <div className="mt-12 flex flex-col gap-6 border-t border-primary-foreground/10 pt-6 text-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="mailto:tochi.devstudio@gmail.com"
              className="text-base font-medium tracking-tight text-primary-foreground transition-opacity hover:opacity-75"
            >
              tochi.devstudio@gmail.com
            </a>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href="https://github.com/antonysojan18"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary-foreground/15 hover:scale-105"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/antonysojan"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary-foreground/15 hover:scale-105"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://www.linkedin.com/company/tochi-studio"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Company LinkedIn"
                className="flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary-foreground/15 hover:scale-105"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>Company LinkedIn</span>
              </a>

              <a
                href="https://www.instagram.com/antonysojan18/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary-foreground/15 hover:scale-105"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-primary-foreground/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[11px] text-primary-foreground/50">
              TOCHI .dev studio © 2026. All rights reserved.
            </span>
            <span className="font-mono text-[11px] text-primary-foreground/50">
              Direct Engineering • High-Craft Systems
            </span>
          </div>
        </div>

        {/* 3D Flying Button over the bottom centre of the contact box */}
        <div className="relative mt-8 sm:mt-10 flex w-full justify-center px-2 sm:px-4" style={{ height: 56 }}>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl flex justify-center pointer-events-none"
            style={{ height: 260, maxWidth: "100%" }}
          >
            <FlyingButton
              theme="burgundy"
              size="medium"
              altitude={160}
              hoverTime={3.2}
              jets={2}
              thrusters
              trigger="hover"
              carryCursor={false}
              smoke={1.2}
              turbulence={1}
              wobble={1}
              ramp={false}
              buttonColor="#6B1124"
              thrustColor="#FF4D36"
              smokeColor="#F4EAEF"
              textColor="#FAF7F2"
              onClick={() => {
                // Do not scroll away while flight is in progress
                setTimeout(() => {
                  const input = document.querySelector<HTMLInputElement>("input[name='name']");
                  input?.focus({ preventScroll: true });
                }, 4500);
              }}
            >
              Start Build
            </FlyingButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

