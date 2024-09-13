import { createClient } from "@supabase/supabase-js";
const key = import.meta.env.VITE_SUPABASE_API_KEY
console.log(key);
export const supabaseUrl = "https://vfzdiqevbnahvqigtnvl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmemRpcWV2Ym5haHZxaWd0bnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MDg4NzUsImV4cCI6MjA0MTQ4NDg3NX0.Bt_Umdlk5L0j9A1QnsuVqV2gdlahb_BYf9xzx68uADI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
