"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Award,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Building2,
  FileText,
  Loader2,
  ExternalLink,
  ArrowLeft,
  IdCard,
  QrCode,
} from "lucide-react";
import { TRACK_DETAILS, STATUS_DETAILS, VerifiedCandidate } from "@/types/verification";
import tochiStudioLogo from "@/assets/Tochi .dev Studio.png";

const rawAdminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.tochidevstudio.in";
const ADMIN_URL = rawAdminUrl.replace(/\/+$/, "");

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialQuery =
    searchParams.get("hash") || searchParams.get("id") || searchParams.get("q") || "";
  const initialMode = searchParams.get("hash") ? "hash" : "id";

  const [searchMode, setSearchMode] = useState<"id" | "hash">(initialMode);
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [record, setRecord] = useState<VerifiedCandidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const performLookup = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsLoading(true);
    setErrorMessage(null);
    setHasSearched(true);

    try {
      const res = await fetch(`/api/verify?hash=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setRecord(null);
        setErrorMessage(
          data.error || "Record could not be verified in the Tochi .dev Studio registry.",
        );
      } else {
        setRecord(data.data);
      }
    } catch (err: unknown) {
      setRecord(null);
      const message =
        err instanceof Error ? err.message : "Error communicating with verification node.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      if (searchParams.get("hash")) setSearchMode("hash");
      else if (searchParams.get("id")) setSearchMode("id");
      performLookup(initialQuery);
    }
  }, [initialQuery, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(inputQuery);
  };

  const trackMeta = record?.track ? TRACK_DETAILS[record.track] : null;
  const statusMeta = record?.status ? STATUS_DETAILS[record.status] : null;

  return (
    <div className="min-h-screen bg-[#3A111F] text-[#FAF6F0] flex flex-col justify-between selection:bg-[#FAF6F0] selection:text-[#541228]">
      {/* Top Navbar */}
      <nav className="w-full border-b border-[#FAF6F0]/10 bg-[#3A111F]/80 backdrop-blur-md py-3.5 px-6 sm:px-12 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img
            src={tochiStudioLogo}
            alt="TOCHI .dev studio"
            className="h-7 w-auto select-none object-contain md:h-8"
          />
        </a>

        <div className="flex items-center gap-3">
          <a
            href="/labs"
            className="text-xs font-mono text-[#FAF6F0]/70 hover:text-[#FAF6F0] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Back to Labs</span>
          </a>
        </div>
      </nav>

      {/* Main Body — Centered vertically on mobile & desktop */}
      <main className="flex-1 flex flex-col justify-center items-center w-full max-w-xl mx-auto px-4 py-12 sm:py-16 my-auto">
        <div className="w-full text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FAF6F0] font-sans">
            Verify Internship Credential
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/70 max-w-md mx-auto mt-2 leading-relaxed px-2">
            Tamper-proof authenticity check for official Tochi .dev Studio offer letters and
            certificates.
          </p>
        </div>

        {/* Centered Search Tabs */}
        <div className="w-full flex flex-col items-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-inner mb-3.5 gap-1">
            <button
              type="button"
              onClick={() => setSearchMode("id")}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                searchMode === "id"
                  ? "bg-[#FAF6F0] text-[#541228] font-bold shadow-xs scale-100"
                  : "text-[#FAF6F0]/60 hover:text-[#FAF6F0]"
              }`}
            >
              <IdCard className="h-3.5 w-3.5" />
              <span>Student ID</span>
            </button>

            <button
              type="button"
              onClick={() => setSearchMode("hash")}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                searchMode === "hash"
                  ? "bg-[#FAF6F0] text-[#541228] font-bold shadow-xs scale-100"
                  : "text-[#FAF6F0]/60 hover:text-[#FAF6F0]"
              }`}
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>QR Hash</span>
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl p-1.5 bg-white/5 border border-white/10 backdrop-blur-md shadow-lg focus-within:border-[#FAF6F0]/40 transition-all gap-2 sm:gap-0">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3.5 h-4 w-4 text-[#FAF6F0]/50 pointer-events-none" />
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={
                    searchMode === "id"
                      ? "Enter Student ID (e.g. TCL-26Q4-WEB-0001)..."
                      : "Enter or paste QR verification hash..."
                  }
                  className="w-full bg-transparent pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#FAF6F0] placeholder:text-[#FAF6F0]/40 outline-none font-mono"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-white text-[#541228] font-bold text-xs font-mono transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-sm shrink-0"
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
          </form>
        </div>

        {/* Verification Result Card - WARM IVORY BOX */}
        {record ? (
          <div className="w-full rounded-2xl border border-[#E7DFD3] bg-[#FAF6F0] text-[#1C181B] p-5 sm:p-8 shadow-xl relative overflow-hidden animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E7DFD3] gap-3.5 sm:gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-800 uppercase block">
                    Official Authenticity Verified
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-[#1C181B] mt-0.5 break-words">
                    {record.full_name}
                  </h3>
                </div>
              </div>

              <div className="font-mono text-xs sm:text-right bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-[#E7DFD3] sm:border-none">
                <div className="text-[10px] text-[#9E959B]">STUDENT ID:</div>
                <div className="text-xs sm:text-sm font-bold text-[#541228] break-all">
                  {record.student_id}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-[#E7DFD3] text-xs">
              <div>
                <span className="text-[#9E959B] block mb-1">INTERNSHIP DOMAIN:</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${trackMeta?.badgeBg || "bg-stone-50"} ${trackMeta?.badgeText || "text-stone-900"} ${trackMeta?.border || "border-stone-200"}`}
                >
                  {trackMeta?.label || record.track}
                </span>
                {record.college && (
                  <p className="text-[11px] text-[#665E64] mt-1.5">{record.college}</p>
                )}
              </div>

              <div>
                <span className="text-[#9E959B] block mb-1">STATUS:</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusMeta?.bg || "bg-stone-50"} ${statusMeta?.text || "text-stone-900"} ${statusMeta?.border || "border-stone-200"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusMeta?.dot || "bg-stone-500"}`}
                  />
                  <span>{statusMeta?.label || record.status}</span>
                </span>
                <div className="flex items-center gap-1.5 mt-2 text-[#665E64] font-mono text-[11px]">
                  <Calendar className="h-3.5 w-3.5 text-[#9E959B]" />
                  <span>
                    {record.cohort_start_date} to {record.cohort_end_date}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer & Document Links */}
            <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#665E64]">
                  <Building2 className="h-3.5 w-3.5 text-[#541228]" />
                  <span>
                    Issued by: <strong>Tochi .dev Studio</strong>
                  </span>
                </div>
                <div className="font-mono text-[11px] text-[#9E959B]">
                  Founder: <span className="text-[#1C181B] font-semibold">Antony Sojan</span> &bull;{" "}
                  <span className="text-emerald-800 font-semibold">MSME Registered</span>
                </div>
                <div className="font-mono text-[10px] text-[#9E959B] truncate max-w-xs">
                  Hash: {record.qr_verify_hash}
                </div>
              </div>

              {/* PDF Document Viewers */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                {record.has_certificate && (
                  <a
                    href={`${ADMIN_URL}/api/pdf/certificate/${record.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#541228] hover:bg-[#6B1733] text-white transition-all shadow-sm"
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
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-stone-50 text-[#1C181B] border border-[#E7DFD3] transition-all"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#541228]" />
                    <span>Offer Letter</span>
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : hasSearched && !isLoading ? (
          <div className="w-full rounded-2xl border border-rose-800/40 bg-rose-950/40 p-5 sm:p-6 text-center my-4 backdrop-blur-md">
            <AlertTriangle className="h-6 w-6 text-rose-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-rose-200">Verification Failed</h3>
            <p className="text-xs text-rose-300 mt-1 max-w-sm mx-auto">
              {errorMessage ||
                "No student record found matching that Student ID or Verification Hash."}
            </p>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-4 text-center text-xs text-[#FAF6F0]/50 font-mono">
        Tochi .dev Studio // MSME Registered
      </footer>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#3A111F] flex items-center justify-center font-mono text-xs text-[#FAF6F0]">
          Loading verification engine...
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
