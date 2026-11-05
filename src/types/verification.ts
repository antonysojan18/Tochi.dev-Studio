export type TrackType =
  "AI_WEB_DEV" | "GEN_UIUX" | "AUTOMATION" | "FULL_STACK" | "ML_AI" | "AI_TOOLS";
export type FellowStatus = "APPLIED" | "OFFER_SENT" | "IN_SPRINT" | "SUBMITTED" | "CERTIFIED";

export interface VerifiedCandidate {
  id: string;
  student_id: string;
  full_name: string;
  track: TrackType;
  status: FellowStatus;
  cohort_start_date: string;
  cohort_end_date: string;
  qr_verify_hash: string;
  college?: string | null;
  has_certificate: boolean;
  has_offer: boolean;
}

export const TRACK_DETAILS: Record<
  TrackType,
  { label: string; badgeBg: string; badgeText: string; border: string }
> = {
  AI_WEB_DEV: {
    label: "AI Web Development",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-900",
    border: "border-emerald-200",
  },
  GEN_UIUX: {
    label: "Generative UI & UX Architecture",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-900",
    border: "border-amber-200",
  },
  AUTOMATION: {
    label: "Automation Engineering & Agents",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-900",
    border: "border-sky-200",
  },
  FULL_STACK: {
    label: "Full Stack Systems & Cloud",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-900",
    border: "border-purple-200",
  },
  ML_AI: {
    label: "Machine Learning & Neural Architectures",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-900",
    border: "border-rose-200",
  },
  AI_TOOLS: {
    label: "Applied AI Workflow & Tooling",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-900",
    border: "border-teal-200",
  },
};

export const STATUS_DETAILS: Record<
  FellowStatus,
  { label: string; bg: string; text: string; dot: string; border: string }
> = {
  APPLIED: {
    label: "Application Received",
    bg: "bg-stone-50",
    text: "text-stone-700",
    dot: "bg-stone-500",
    border: "border-stone-200",
  },
  OFFER_SENT: {
    label: "Offer Letter Dispatched",
    bg: "bg-blue-50",
    text: "text-blue-800",
    dot: "bg-blue-600",
    border: "border-blue-200",
  },
  IN_SPRINT: {
    label: "Active in Internship",
    bg: "bg-amber-50",
    text: "text-amber-900",
    dot: "bg-amber-600",
    border: "border-amber-200",
  },
  SUBMITTED: {
    label: "Project Submitted",
    bg: "bg-purple-50",
    text: "text-purple-900",
    dot: "bg-purple-600",
    border: "border-purple-200",
  },
  CERTIFIED: {
    label: "Internship Completed & Certified",
    bg: "bg-emerald-50",
    text: "text-emerald-900",
    dot: "bg-emerald-600",
    border: "border-emerald-200",
  },
};
