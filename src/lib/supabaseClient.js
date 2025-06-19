import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbHpqa2RpdGtzcHhmZ2tubHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDIyNzgsImV4cCI6MjA2NTg3ODI3OH0.4WASLOAHtYI4cwPERowN6CTOcscVD4P1xqFujdNV5sk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
