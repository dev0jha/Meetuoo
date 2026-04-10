import { createClient } from "@supabase/supabase-js";

// Service role client — bypasses Row Level Security.
// NEVER expose this on the client side.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export { supabaseAdmin };
