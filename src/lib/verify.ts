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
  status: 400 | 404 | 500;
}

export type VerifyResult = VerifyResultSuccess | VerifyResultError;

export async function verifyCandidate(query: string): Promise<VerifyResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      success: false,
      error: "Student ID or verification hash is required",
      status: 400,
    };
  }

  try {
    const { data: fellow, error } = await supabase
      .from("fellows")
      .select("*")
      .or(`qr_verify_hash.eq.${trimmed},student_id.eq.${trimmed}`)
      .maybeSingle();

    if (error || !fellow) {
      return {
        success: false,
        error: "No verified record found matching that ID or hash",
        status: 404,
      };
    }

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification lookup failed";
    return {
      success: false,
      error: message,
      status: 500,
    };
  }
}
