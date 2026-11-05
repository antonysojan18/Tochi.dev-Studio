import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (
      searchParams.get("hash") ||
      searchParams.get("id") ||
      searchParams.get("q") ||
      ""
    ).trim();

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Student ID or verification hash is required" },
        { status: 400 },
      );
    }

    const { data: fellow, error } = await supabase
      .from("fellows")
      .select("*")
      .or(`qr_verify_hash.eq.${query},student_id.eq.${query}`)
      .maybeSingle();

    if (error || !fellow) {
      return NextResponse.json(
        { success: false, error: "No verified record found matching that ID or hash" },
        { status: 404 },
      );
    }

    return NextResponse.json({
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
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification lookup failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
