import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Returns null if unset, invalid, or malformed — never throws (avoids bad Vercel env crashing /api/register). */
function resolveSupabaseConfig(): { url: string; key: string } | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!rawUrl || !key) return null;
  try {
    const u = new URL(rawUrl);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    if (!u.hostname) return null;
    return { url: u.origin, key };
  } catch {
    return null;
  }
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const config = resolveSupabaseConfig();
  if (!config) return null;
  try {
    return createClient(config.url, config.key, { auth: { persistSession: false } });
  } catch {
    return null;
  }
}
