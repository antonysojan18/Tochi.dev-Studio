import React, { useState, useEffect, useCallback } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Award,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Building2,
  FileText,
  ArrowLeft,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { TRACK_DETAILS, STATUS_DETAILS, type VerifiedCandidate } from "@/types/verification";
import { verifyCandidate } from "@/lib/verify";
import { supabase } from "@/lib/supabase";
import { TiltSurface } from "@/components/site/TiltSurface";
import tochiStudioLogo from "@/assets/Tochi .dev Studio.png";

const spring = { type: "spring" as const, stiffness: 350, damping: 30 };

const rawAdminUrl =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ADMIN_URL) ||
  import.meta.env?.NEXT_PUBLIC_ADMIN_URL ||
  import.meta.env?.VITE_ADMIN_URL ||
  "https://admin.tochidevstudio.in";

const ADMIN_URL = rawAdminUrl.replace(/\/+$/, "");

export const Route = createFileRoute("/verify")({
  validateSearch: (search: Record<string, unknown>): { hash?: string; id?: string; q?: string } => {
    return {
      hash: typeof search.hash === "string" ? search.hash : undefined,
      id: typeof search.id === "string" ? search.id : undefined,
      q: typeof search.q === "string" ? search.q : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Public Internship Verification Portal — TOCHI .dev Studio" },
      {
        name: "description",
        content:
          "Official cryptographic credential verification portal for TOCHI .Labs internship certificates and offer letters. Real-time MSME-recognized validation.",
      },
      { property: "og:title", content: "Internship Verification Registry — TOCHI .dev Studio" },
      {
        property: "og:description",
        content:
          "Verify the authenticity of TOCHI .Labs internship credentials, student records, and capstone completions in real time.",
      },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const search = Route.useSearch();
  const router = useRouter();

  const urlQuery = search.hash || search.id || search.q || "";

  const [inputQuery, setInputQuery] = useState(urlQuery);
  const [record, setRecord] = useState<VerifiedCandidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const performLookup = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setErrorMessage(null);
    setHasSearched(true);

    try {
      // 1. Try local server endpoint first
      let foundRecord: VerifiedCandidate | null = null;
      let localErr: string | null = null;
      try {
        const res = await fetch(`/api/verify?hash=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            foundRecord = data.data;
          } else if (data.error) {
            localErr = data.error;
          }
        }
      } catch {
        // Network or local endpoint fallback
      }

      // 2. Direct Supabase fallback if local endpoint did not resolve
      if (!foundRecord && !localErr) {
        const directResult = await verifyCandidate(trimmed);
        if (directResult.success) {
          foundRecord = directResult.data;
        } else {
          localErr = directResult.error;
        }
      }

      if (foundRecord) {
        setRecord(foundRecord);
        setErrorMessage(null);
      } else {
        setRecord(null);
        setErrorMessage(
          localErr || "No verified record found matching that Student ID or Verification Hash.",
        );
      }
    } catch (err: unknown) {
      setRecord(null);
      const message =
        err instanceof Error ? err.message : "Error communicating with verification registry.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (urlQuery) {
      setInputQuery(urlQuery);
      performLookup(urlQuery);
    }
  }, [urlQuery, performLookup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    // Update URL query parameters for shareability
    router.navigate({
      to: "/verify",
      search: { hash: inputQuery.trim() },
    });

    performLookup(inputQuery);
  };

  const trackMeta = record?.track ? TRACK_DETAILS[record.track] : null;
  const statusMeta = record?.status ? STATUS_DETAILS[record.status] : null;

  return (
    <div className="atmosphere min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#FAF6F0] selection:text-[#541228]">
      {/* Header / Nav */}
      <div className="fixed top-2.5 md:top-3.5 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none w-[calc(100%-1.5rem)] max-w-2xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.15 }}
          className="pointer-events-auto flex items-center gap-2"
        >
          <Link
            to="/labs"
            aria-label="Back to TOCHI .Labs"
            className="group inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-background/85 px-3 py-1 font-mono text-[11px] font-medium text-foreground/80 backdrop-blur-md transition-all hover:bg-background hover:text-foreground hover:border-primary-foreground/45 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to /Labs</span>
          </Link>
          <Link
            to="/"
            aria-label="Return to TOCHI .dev studio homepage"
            className="group inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-background/85 px-3 py-1 font-mono text-[11px] font-medium text-foreground/80 backdrop-blur-md transition-all hover:bg-background hover:text-foreground hover:border-primary-foreground/45 active:scale-95 shadow-sm"
          >
            <span>Studio Home</span>
          </Link>
        </motion.div>

        {/* Studio-style header */}
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.2 }}
          className="glass-ivory pointer-events-auto flex w-full items-center justify-between gap-3 rounded-full py-1.5 pr-2 pl-3.5 shadow-lg md:py-2 md:pr-3 md:pl-4"
        >
          <Link to="/" aria-label="TOCHI .dev studio — home" className="flex items-center shrink-0">
            <motion.img
              src={tochiStudioLogo}
              alt="TOCHI .dev studio"
              draggable={false}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="h-7 w-auto select-none object-contain md:h-8"
            />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/labs"
              className="inline-flex items-center gap-1 rounded-full bg-header-ink px-4 py-1.5 text-xs md:text-sm font-semibold text-header-cream shadow-sm transition-all hover:bg-header-ink/90 active:scale-95"
            >
              <span>/Labs</span>
            </Link>
          </div>
        </motion.header>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        {/* Title & Introduction */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.25 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading"
          >
            Verify Internship Credential
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
            className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed"
          >
            Tamper-proof authenticity check for official Tochi .dev Studio offer letters and
            completion certificates.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="mb-8"
        >
          <div className="relative flex items-center rounded-2xl p-1 bg-white/5 border border-white/10 backdrop-blur-md shadow-lg focus-within:border-[#FAF6F0]/40 transition-all">
            <Search className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Enter Student ID (e.g. TCL-26Q4-WEB-0001) or QR Hash..."
              className="w-full bg-transparent pl-11 pr-28 py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 outline-none font-mono"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-white text-[#541228] font-bold text-xs font-mono transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Verify</span>
              )}
            </button>
          </div>
        </motion.form>

        {/* Loading state indicator */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-xs font-mono text-muted-foreground gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-[#FAF6F0]" />
            <span>Consulting TOCHI .dev Studio Supabase Node...</span>
          </div>
        )}

        {/* Verification Result Card - THE WARM IVORY BOX */}
        <AnimatePresence mode="wait">
          {!isLoading && record && (
            <motion.div
              key="verified-record"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={spring}
            >
              <TiltSurface className="rounded-3xl shadow-2xl">
                <div className="rounded-3xl border border-[#E7DFD3] bg-[#FAF6F0] text-[#1C181B] p-6 sm:p-9 shadow-2xl relative overflow-hidden">
                  {/* Subtle decorative watermark */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-[#541228]/5 blur-2xl"
                  />

                  {/* Top Bar: Verification Status & Student ID */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7DFD3] gap-4">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="h-11 w-11 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 shadow-xs">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-800 uppercase block">
                          Official Authenticity Verified
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#1C181B] mt-0.5 tracking-tight">
                          {record.full_name}
                        </h2>
                      </div>
                    </div>

                    <div className="font-mono text-xs sm:text-right bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-[#E7DFD3] sm:border-none">
                      <div className="text-[10px] tracking-wider text-[#9E959B] uppercase font-semibold">
                        STUDENT ID:
                      </div>
                      <div className="text-sm font-bold text-[#541228] mt-0.5">
                        {record.student_id}
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-6 border-b border-[#E7DFD3] text-xs">
                    <div>
                      <span className="text-[#9E959B] font-mono text-[10px] uppercase tracking-wider block mb-1.5 font-semibold">
                        INTERNSHIP DOMAIN
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                          trackMeta?.badgeBg || "bg-stone-100"
                        } ${trackMeta?.badgeText || "text-stone-900"} ${trackMeta?.border || "border-stone-200"}`}
                      >
                        {trackMeta?.label || record.track}
                      </span>
                      {record.college && (
                        <p className="text-[11px] text-[#665E64] mt-2 font-sans font-medium">
                          {record.college}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="text-[#9E959B] font-mono text-[10px] uppercase tracking-wider block mb-1.5 font-semibold">
                        CREDENTIAL STATUS
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                          statusMeta?.bg || "bg-stone-100"
                        } ${statusMeta?.text || "text-stone-900"} ${statusMeta?.border || "border-stone-200"}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusMeta?.dot || "bg-stone-500"}`}
                        />
                        <span>{statusMeta?.label || record.status}</span>
                      </span>
                      <div className="flex items-center gap-1.5 mt-2.5 text-[#665E64] font-mono text-[11px]">
                        <Calendar className="h-3.5 w-3.5 text-[#9E959B]" />
                        <span>
                          {record.cohort_start_date} to {record.cohort_end_date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Issuing Metadata & Official PDF Document Buttons */}
                  <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[#1C181B] font-medium">
                        <Building2 className="h-3.5 w-3.5 text-[#541228]" />
                        <span>
                          Issued by:{" "}
                          <strong className="font-semibold text-[#541228]">
                            Tochi .dev Studio
                          </strong>
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-[#665E64]">
                        Founder: <span className="text-[#1C181B] font-semibold">Antony Sojan</span>{" "}
                        &bull;{" "}
                        <span className="text-emerald-800 font-semibold">MSME Registered</span>
                      </div>
                      <div className="font-mono text-[10px] text-[#9E959B] truncate max-w-xs pt-0.5">
                        Hash: {record.qr_verify_hash}
                      </div>
                    </div>

                    {/* Official Document Downloads / Viewers */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {record.has_certificate && (
                        <a
                          href={`${ADMIN_URL}/api/pdf/certificate/${record.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#541228] hover:bg-[#6B1733] text-white transition-all shadow-md active:scale-95"
                        >
                          <Award className="h-3.5 w-3.5" />
                          <span>Certificate PDF</span>
                          <ExternalLink className="h-3 w-3 opacity-70" />
                        </a>
                      )}

                      {record.has_offer && (
                        <a
                          href={`${ADMIN_URL}/api/pdf/offer-letter/${record.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-white/80 text-[#1C181B] border border-[#E7DFD3] transition-all shadow-xs active:scale-95"
                        >
                          <FileText className="h-3.5 w-3.5 text-[#541228]" />
                          <span>Offer Letter</span>
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltSurface>
            </motion.div>
          )}

          {/* Failure State */}
          {!isLoading && hasSearched && !record && (
            <motion.div
              key="verification-failed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={spring}
              className="rounded-2xl border border-rose-800/40 bg-rose-950/40 p-6 text-center my-6 backdrop-blur-md"
            >
              <AlertTriangle className="h-6 w-6 text-rose-400 mx-auto mb-2.5" />
              <h3 className="text-sm font-bold text-rose-200 font-mono tracking-tight">
                Verification Failed
              </h3>
              <p className="text-xs text-rose-300/80 mt-1.5 max-w-sm mx-auto leading-relaxed">
                {errorMessage ||
                  "No student record found matching that Student ID or Verification Hash."}
              </p>
              <p className="text-[11px] text-rose-300/60 mt-3 font-mono">
                Please double-check the ID or re-scan the QR code printed on the official document.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-hairline/40 py-5 text-center text-xs text-muted-foreground font-mono">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span>TOCHI .dev Studio // Official Public Registry</span>
          <span className="hidden sm:inline-block text-hairline">&bull;</span>
          <span>Government of India MSME Registered</span>
        </div>
      </footer>
    </div>
  );
}
