import { supabase } from "./supabase";
import type { VerifiedCandidate } from "@/types/verification";

export interface VerifyResultSuccess {
  success: true;
  data: VerifiedCandidate;
  status: 200;
}

export interface VerifyResultError {
  success: false;
  error: string;
  status: 400 | 404 | 500 | 503;
}

export type VerifyResult = VerifyResultSuccess | VerifyResultError;

const rawAdminUrl =
  (typeof process !== "undefined" && process.env?.["NEXT_PUBLIC_ADMIN_URL"]) ||
  (import.meta.env && (import.meta.env["NEXT_PUBLIC_ADMIN_URL"] as string | undefined)) ||
  (import.meta.env && (import.meta.env["VITE_ADMIN_URL"] as string | undefined)) ||
  "https://admin.tochidevstudio.in";

const ADMIN_URL = rawAdminUrl.replace(/\/+$/, "");

export async function verifyCandidate(query: string): Promise<VerifyResult> {
  const clean = query.trim();
  if (!clean) {
    return {
      success: false,
      error: "Student ID or verification hash is required",
      status: 400,
    };
  }

  let dbError: { message: string; details?: string } | null = null;

  // 1. Primary: Direct Supabase PostgreSQL query (case-insensitive for student_id)
  try {
    const { data: fellow, error } = await supabase
      .from("fellows")
      .select("*")
      .or(`qr_verify_hash.eq.${clean},student_id.ilike.${clean}`)
      .maybeSingle();

    if (error) {
      dbError = { message: error.message, details: error.details };
    } else if (fellow) {
      return {
        success: true,
        data: {
          id: fellow.id,
          student_id: fellow.student_id,
          full_name: fellow.full_name,
          track: fellow.track,
          status: fellow.status,
          cohort_start_date: fellow.cohort_start_date,
          cohort_end_date: fellow.cohort_end_date,
          qr_verify_hash: fellow.qr_verify_hash,
          college: fellow.college,
          has_certificate: fellow.status === "CERTIFIED",
          has_offer: fellow.status !== "APPLIED",
        },
        status: 200,
      };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    dbError = { message };
  }

  // 2. Secondary: If direct Supabase connection had an issue, fallback to Admin API
  if (ADMIN_URL) {
    try {
      const adminUrl = clean.toUpperCase().startsWith("TCL-")
        ? `${ADMIN_URL}/api/verify?id=${encodeURIComponent(clean)}`
        : `${ADMIN_URL}/api/verify?hash=${encodeURIComponent(clean)}`;

      const adminRes = await fetch(adminUrl, {
        headers: { Accept: "application/json" },
      });

      const adminData = (await adminRes.json().catch(() => null)) as {
        success?: boolean;
        data?: VerifiedCandidate;
      } | null;

      if (adminRes.ok && adminData?.success && adminData.data) {
        return {
          success: true,
          data: adminData.data,
          status: 200,
        };
      }
    } catch {
      // Admin API fallback unreachable
    }
  }

  // 3. Transparent diagnostics if database connection failed
  if (dbError) {
    const combined = `${dbError.message} ${dbError.details ?? ""}`.toLowerCase();
    if (
      combined.includes("enotfound") ||
      combined.includes("fetch failed") ||
      combined.includes("failed to fetch")
    ) {
      return {
        success: false,
        error:
          "Database node unreachable (lfrgpiohvjilxkgvfdhr.supabase.co). The Supabase database appears to be paused in your Supabase Dashboard. Please log in to https://supabase.com/dashboard/project/lfrgpiohvjilxkgvfdhr and click 'Restore project' to resume real-time verification.",
        status: 503,
      };
    }

    if (combined.includes("permission denied") || combined.includes("row-level security")) {
      return {
        success: false,
        error:
          "Database permission error: Row Level Security (RLS) is restricting public access on table 'fellows'.",
        status: 500,
      };
    }

    return {
      success: false,
      error: `Database connection error: ${dbError.message}`,
      status: 500,
    };
  }

  return {
    success: false,
    error: "No verified record found matching that Student ID or Verification Hash.",
    status: 404,
  };
}
