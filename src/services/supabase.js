import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vfzdiqevbnahvqigtnvl.supabase.co";
const supabaseKey = import.meta.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
