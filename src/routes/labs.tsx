import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Code2,
  Layers,
  Workflow,
  Server,
  Brain,
  Sparkles,
  X,
  ShieldCheck,
  QrCode,
  ArrowLeft,
  Award,
  Users,
  Briefcase,
  BookOpen,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { useState, type MouseEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import tochiLabs1 from "@/assets/Tochi Labs 1.png";
import tochiLabs2 from "@/assets/Tochi Labs 2.png";
import certificateImg from "@/assets/TOCHI internship certificate.png";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "TOCHI .Labs — 1-Month Production Internship" },
      {
        name: "description",
        content:
          "A one-month production internship with TOCHI principal engineers. Six courses, MSME-verified credentials.",
      },
      { property: "og:title", content: "TOCHI .Labs — 1-Month Production Internship" },
      {
        property: "og:description",
        content: "No synthetic tutorials. Ship real software to production in one month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LabsPage,
});

const APPLY_URL = "https://forms.gle/LxtzXSBZzybcXLb58";

const spring = { type: "spring" as const, stiffness: 350, damping: 30 };

const courses = [
  {
    n: "01",
    icon: Code2,
    title: "AI Web Development",
    popular: true,
    desc: "High-performance web platforms built with AI developer workflows, component generators and prompt-driven architectures.",
    stack: ["Next.js 15", "TypeScript", "Tailwind", "Cursor", "v0"],
    capstone: "A responsive web platform deployed to production with a dynamic CMS and sub-second load times.",
  },
  {
    n: "02",
    icon: Layers,
    title: "Generative UI UX Design",
    popular: true,
    desc: "Tactile, context-aware interfaces combining glassmorphism, fluid typography and generative design tools.",
    stack: ["Figma", "Design Tokens", "Midjourney", "Framer Motion", "Spline"],
    capstone: "A multi-platform design system plus an interactive high-fidelity prototype.",
  },
  {
    n: "03",
    icon: Workflow,
    title: "Intelligent Automation",
    popular: false,
    desc: "Autonomous business pipelines, multi-step LLM routing, webhooks and automated operational backends.",
    stack: ["Python", "FastAPI", "LangChain", "Webhooks", "PostgreSQL"],
    capstone: "A workflow engine that parses documents, extracts data and routes it to production databases.",
  },
  {
    n: "04",
    icon: Server,
    title: "Full Stack Development",
    popular: false,
    desc: "Relational schema design, secure authentication, edge APIs and reactive frontends, end to end.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "GraphQL", "Tailwind"],
    capstone: "A multi-tenant SaaS MVP with role-based auth, real-time subscriptions and cloud deployment.",
  },
  {
    n: "05",
    icon: Brain,
    title: "Machine Learning with AI",
    popular: false,
    desc: "Model training, dataset hygiene, risk evaluation and RESTful model deployment.",
    stack: ["Python", "Scikit-Learn", "CatBoost", "Flask", "OpenCV"],
    capstone: "A predictive modeling service exposing trained ML inference endpoints for live data.",
  },
  {
    n: "06",
    icon: Sparkles,
    title: "Master in AI Tools",
    popular: false,
    desc: "The modern AI toolchain, used to multiply engineering and creative output across design, code and docs.",
    stack: ["Claude Code", "Cursor", "Lovable", "OpenAI APIs", "Perplexity"],
    capstone: "A personal workflow engine combining coding agents, API tool calls and asset pipelines.",
  },
];
type Course = (typeof courses)[number];

const curriculum = [
  "Week 1 — Scoping & architecture",
  "Week 2 — Core build",
  "Week 3 — Hardening & code review",
  "Week 4 — Deployment & demo day",
];

function LabsPage() {
  const [active, setActive] = useState<Course | null>(null);

  return (
    <div className="atmosphere min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <Hero />
        <section id="courses" className="scroll-mt-28 py-12 md:py-20">
          <Eyebrow>[ THE SIX COURSES ]</Eyebrow>
          <h2 className="mt-2.5 max-w-2xl font-display text-2xl font-semibold tracking-tight md:mt-4 md:text-5xl">
            Pick a course. Ship a capstone.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:gap-5 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.n} c={c} onOpen={() => setActive(c)} />
            ))}
          </div>
        </section>
        <Certification />
        <Features />
        <FAQ />
      </main>
      <LabsFooter />
      <AnimatePresence>
        {active && <CourseDrawer c={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
      {children}
    </p>
  );
}

function Nav() {
  return (
    <div className="fixed top-2.5 md:top-3.5 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none w-[calc(100%-1.5rem)] max-w-xl">
      {/* Back to Studio button placed outside and above the header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.15 }}
        className="pointer-events-auto"
      >
        <Link
          to="/"
          aria-label="Back to TOCHI .dev studio"
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-background/85 px-3 py-1 font-mono text-[11px] font-medium text-foreground/80 backdrop-blur-md transition-all hover:bg-background hover:text-foreground hover:border-primary-foreground/45 active:scale-95 shadow-sm"
          title="Return to TOCHI .dev studio"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Studio</span>
        </Link>
      </motion.div>

      {/* Main Studio-style header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.2 }}
        className="glass-ivory pointer-events-auto flex w-full items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 pl-3.5 shadow-lg md:py-2 md:pr-2 md:pl-4"
      >
        <Link to="/labs" className="flex items-center shrink-0">
          <motion.img
            src={tochiLabs2}
            alt="TOCHI /LABS"
            draggable={false}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="h-7 w-auto select-none object-contain md:h-8"
          />
        </Link>

        <div className="hidden items-center gap-5 text-xs font-medium text-header-ink-muted md:flex">
          <a href="#courses" className="transition-colors hover:text-header-ink">
            Courses
          </a>
          <a href="#certification" className="transition-colors hover:text-header-ink">
            Certification
          </a>
          <a href="#features" className="transition-colors hover:text-header-ink">
            Features
          </a>
          <a href="#faq" className="transition-colors hover:text-header-ink">
            FAQ
          </a>
        </div>

        {/* Highlighted Apply button */}
        <motion.a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={spring}
          className="relative inline-flex items-center gap-1.5 rounded-full bg-header-ink px-4 py-1.5 text-xs md:text-sm font-semibold text-header-cream shadow-md transition-all hover:bg-header-ink/90 hover:shadow-lg active:scale-95"
        >
          <span>Apply</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </motion.a>
      </motion.header>
    </div>
  );
}

function Hero() {
  const metrics = ["Free Internship", "1 Month", "6 Courses", "MSME Verified"];
  return (
    <section id="overview" className="scroll-mt-28 pb-12 pt-32 md:pt-40">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="mb-6 inline-flex items-center"
        >
          <img
            src={tochiLabs1}
            alt="TOCHI /LABS — 1-Month Internship Program"
            draggable={false}
            className="h-9 w-auto select-none object-contain md:h-11"
          />
        </motion.div>
        <h1 className="mt-2 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          A new way to learn,
          <span className="block text-muted-foreground">in the new world of AI.</span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          One month, one mission, Free E-Learning Experience with Real world Internships.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-95"
          >
            Apply for Free <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#courses"
            className="inline-flex items-center rounded-full border border-border px-7 py-3 text-sm transition-colors hover:bg-secondary"
          >
            See courses
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...spring, delay: 0.2 }}
        className="glass mt-16 grid grid-cols-2 divide-border rounded-3xl md:grid-cols-4 md:divide-x"
      >
        {metrics.map((m) => (
          <div key={m} className="p-5 text-sm font-medium md:p-6">
            {m}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function CourseCard({ c, onOpen }: { c: Course; onOpen: () => void }) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), spring);
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), spring);

  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const Icon = c.icon;

  return (
    <motion.div
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: reducedMotion ? 0 : rx,
        rotateY: reducedMotion ? 0 : ry,
        transformPerspective: 900,
      }}
      whileHover={reducedMotion ? {} : { y: -6 }}
      transition={spring}
      className="glass-cream relative flex w-full flex-col overflow-hidden rounded-xl p-3 text-primary-foreground transition-shadow hover:shadow-lift md:rounded-3xl md:p-6"
    >
      {c.popular && (
        <span className="absolute top-0 left-0 z-10 rounded-tl-[inherit] rounded-br-lg md:rounded-br-xl bg-amber-400 px-2 py-0.5 md:px-2.5 md:py-1 font-mono text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-950 shadow-sm">
          Popular
        </span>
      )}
      <div className={`flex items-start justify-between ${c.popular ? "pt-3.5 md:pt-3" : ""}`}>
        <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-1 md:rounded-2xl md:p-2.5">
          <Icon className="h-3.5 w-3.5 md:h-5 md:w-5" />
        </div>
        <span className="font-mono text-[9px] opacity-75 md:text-xs">{c.n}</span>
      </div>
      <h3 className="mt-2 font-display text-xs font-semibold leading-tight line-clamp-2 md:mt-4 md:text-xl md:line-clamp-none">
        {c.title}
      </h3>
      <p className="mt-1 flex-1 text-[11px] leading-snug opacity-80 line-clamp-3 md:mt-3 md:text-sm md:leading-relaxed md:line-clamp-none">
        {c.desc}
      </p>
      <div className="mt-2 flex flex-wrap gap-0.5 md:mt-5 md:gap-1.5">
        {c.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-primary-foreground/25 px-1.5 py-0.5 font-mono text-[8px] opacity-90 md:px-2.5 md:py-1 md:text-[10px]"
          >
            {s}
          </span>
        ))}
      </div>
      <a
        href={APPLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-header-ink px-3.5 py-1.5 text-[11px] font-semibold text-header-cream shadow-sm transition-all hover:bg-header-ink/90 active:scale-95 md:mt-6 md:px-4 md:py-2 md:text-xs cursor-pointer"
      >
        <span>Join Now</span>
        <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
      </a>
    </motion.div>
  );
}

function CourseDrawer({ c, onClose }: { c: Course; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/60 p-0 backdrop-blur-sm md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={c.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={spring}
        className="glass max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl p-7 md:rounded-3xl"
      >
        <div className="flex items-start justify-between">
          <p className="font-mono text-[10px] tracking-[0.2em] text-subtle">COURSE {c.n}</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-border p-1.5 hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold">{c.title}</h3>
        <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-subtle">1-MONTH PROGRAM</p>
        <ol className="mt-3 space-y-2">
          {curriculum.map((item) => (
            <li key={item} className="border-b border-border pb-2 text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-2xl border border-border bg-secondary p-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-subtle">CAPSTONE</p>
          <p className="mt-2 text-sm leading-relaxed">{c.capstone}</p>
        </div>
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-95"
        >
          Apply for this course <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>
    </motion.div>
  );
}

function Certification() {
  return (
    <section id="certification" className="scroll-mt-28 py-20">
      <div className="glass grid items-center gap-10 rounded-3xl p-7 md:grid-cols-2 md:p-12">
        <div>
          <Eyebrow>[ CERTIFICATION ]</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Official credentials
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Fellows who deploy their capstone receive a Certificate of Internship Completion from
            TOCHI (.dev studio), verifiable under Government of India MSME (Udyam) registration
            with a public Certificate ID.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5" /> MSME / Udyam
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
              <BadgeCheck className="h-3.5 w-3.5" /> Public Certificate ID
            </span>
          </div>
        </div>
        <motion.div
          whileHover={{ rotate: -0.5, scale: 1.02 }}
          transition={spring}
          className="relative overflow-hidden rounded-2xl border border-border bg-background/80 p-2 shadow-lift md:rounded-3xl md:p-3"
        >
          <img
            src={certificateImg}
            alt="Official TOCHI Internship Completion Certificate with MSME Government of India Verification"
            className="w-full h-auto rounded-xl object-contain shadow-sm md:rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  {
    n: "01",
    icon: Award,
    title: "Verified Certificates",
    desc: "Get Verified Certificates to prove your hard work!",
  },
  {
    n: "02",
    icon: Users,
    title: "Networking",
    desc: "Tap into our network and increase your chances of placements.",
  },
  {
    n: "03",
    icon: Briefcase,
    title: "Hands-on experience",
    desc: "Gain practical experience by working on real-world projects.",
  },
  {
    n: "04",
    icon: BookOpen,
    title: "High Quality Content",
    desc: "Great Content to prepare students for their future careers.",
  },
];

function Features() {
  return (
    <section id="features" className="scroll-mt-28 py-10 md:py-20">
      <Eyebrow>[ FEATURES ]</Eyebrow>
      <h2 className="mt-2.5 max-w-2xl font-display text-2xl font-semibold tracking-tight md:mt-4 md:text-5xl">
        Features of our Internships
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-2.5 md:mt-12 md:gap-6 lg:grid-cols-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.n}
              whileHover={{ y: -6 }}
              transition={spring}
              className="glass relative flex flex-col justify-between rounded-xl p-3 transition-shadow hover:shadow-lift md:rounded-3xl md:p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="rounded-lg border border-border bg-secondary p-1.5 text-foreground md:rounded-2xl md:p-3">
                    <Icon className="h-3.5 w-3.5 md:h-5 md:w-5" />
                  </div>
                  <span className="font-mono text-[9px] opacity-60 md:text-xs">{f.n}</span>
                </div>
                <h3 className="mt-2.5 font-display text-xs font-semibold tracking-tight md:mt-6 md:text-lg">
                  {f.title}
                </h3>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground md:mt-2.5 md:text-sm md:leading-relaxed">
                  {f.desc}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 font-mono text-[9px] text-muted-foreground/70 md:mt-6 md:text-[11px]">
                <CheckCircle2 className="h-3 w-3 text-primary md:h-3.5 md:w-3.5" />
                <span className="truncate">Production ready</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What is the duration of Internship?",
    a: "All our internships are for a period of 1 month only.",
  },
  {
    q: "Can I complete multiple tracks together?",
    a: "We believe to provide an actual learning environment, we have limited our internship offerings to 1 track per month for each student. This allows students to explore the choosen track in-depth and get quality results.",
  },
  {
    q: "Is there any fees for the internship?",
    a: "The internship is completely free. However, a documentation fee of ₹129 must be paid to cover the processing charges.",
  },
  {
    q: "When will I receive the Offer Letter?",
    a: "We process the Offer Letters at the mid & end of month in batches. We request you to please wait in the mean time.\n\nIf you have received the Task Submission Email, we request you to review your spam folder for the Offer Letter. Kindly contact us via email if you are unable to find it.",
  },
  {
    q: "How to submit Tasks?",
    a: "A Submission Form will be mailed to you 10-15 days after you receive your Offer Letter.\n\n• For batches starting on the 1st of the month, the form will be mailed between the 11th and 14th.\n• For batches starting on the 15th of the month, the form will be mailed between the 26th and 29th.",
  },
  {
    q: "What is the criteria for selection?",
    a: "Determination to learn and grow is all what is needed.",
  },
  {
    q: "When does the internships starts?",
    a: "Each batch starts at the start or mid of the month and ends on start or mid of next month respectively.",
  },
  {
    q: "Is the internship Offline or Online?",
    a: "All our internships are conducted in Virtual mode (Online).",
  },
  {
    q: "When will I get the Certificate?",
    a: "The Certificate of Completion is sent after the end date on the Offer Letter.\n\n• For batches starting on the 1st of the month, the Certificate is sent from 1st of next month.\n• For batches starting on the 15th of the month, the Certificate is sent from 16th of next month.\n\nNote: New Submission may take upto 3 days to process.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="scroll-mt-28 py-8 md:py-20">
      <div className="glass rounded-xl p-3.5 sm:p-5 md:rounded-3xl md:p-14">
        <div className="flex items-center gap-1.5 md:gap-2">
          <HelpCircle className="h-3 w-3 text-primary md:h-4 md:w-4" />
          <Eyebrow>[ FAQ ]</Eyebrow>
        </div>
        <h2 className="mt-1 font-display text-lg font-semibold tracking-tight md:mt-4 md:text-5xl">
          Any Questions?
        </h2>
        <p className="mt-1 max-w-xl text-[11px] leading-snug text-muted-foreground md:mt-4 md:text-base md:leading-relaxed">
          Everything you need to know about the internship format, timelines, task submissions, and credentials.
        </p>

        <Accordion type="single" collapsible className="mt-3.5 space-y-1.5 md:mt-10 md:space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="rounded-lg border border-border/70 bg-background/40 px-3 py-0 md:rounded-2xl md:px-5 md:py-1 backdrop-blur-md transition-colors data-[state=open]:border-primary/50 data-[state=open]:bg-secondary/40"
            >
              <AccordionTrigger className="text-left font-display text-[11px] sm:text-xs font-semibold text-foreground hover:no-underline py-2 md:py-4 md:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[10px] md:text-sm leading-relaxed text-muted-foreground whitespace-pre-line pt-0.5 pb-2 md:pt-1 md:pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function LabsFooter() {
  return (
    <footer className="mt-16 sm:mt-24 w-full border-t border-hairline/80 bg-[oklch(0.96_0.02_88)] text-header-ink py-6 md:py-8 shadow-inner">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div className="flex items-center gap-3">
          <Link to="/labs" className="shrink-0 flex items-center">
            <img
              src={tochiLabs2}
              alt="TOCHI /LABS"
              className="h-6 md:h-7 w-auto select-none object-contain"
              draggable={false}
            />
          </Link>
          <span className="h-3 w-px bg-header-ink/20 hidden sm:block" />
          <span className="font-mono text-[11px] md:text-xs text-header-ink-muted">
            © 2026 TOCHI .Labs • 1-Month Fellowship
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-header-ink px-4 py-1.5 font-mono text-[11px] font-semibold text-header-cream shadow-xs transition-transform hover:scale-105 active:scale-95"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-1 font-mono text-[11px] text-header-ink-muted hover:text-header-ink transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Back to Studio</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
