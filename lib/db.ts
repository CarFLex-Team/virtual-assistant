import { createClient } from "@supabase/supabase-js";

// Use environment variables for security
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize the client
export const db = createClient(SUPABASE_URL, SUPABASE_KEY);
