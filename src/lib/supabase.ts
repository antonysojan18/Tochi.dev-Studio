import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (typeof process !== "undefined" && process.env?.["NEXT_PUBLIC_SUPABASE_URL"]) ||
  (import.meta.env && (import.meta.env["NEXT_PUBLIC_SUPABASE_URL"] as string | undefined)) ||
  (import.meta.env && (import.meta.env["VITE_SUPABASE_URL"] as string | undefined)) ||
  "https://lfrgpiohvjilxkgvfdhr.supabase.co";

const supabaseAnonKey =
  (typeof process !== "undefined" && process.env?.["NEXT_PUBLIC_SUPABASE_ANON_KEY"]) ||
  (import.meta.env && (import.meta.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] as string | undefined)) ||
  (import.meta.env && (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined)) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcmdwaW9odmppbHhrZ3ZmZGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyNTE0OTcsImV4cCI6MjEwODgyNzQ5N30.7VGvHA4GsTwHm8Xb3nzyUYi5_ebXnbTeG7hdVleJRqk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
