import { createClient } from "@supabase/supabase-js";

// Admin client uses service_role key — bypasses ALL RLS
// Only use inside /app/api routes — NEVER in client components!
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
