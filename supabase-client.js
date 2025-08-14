const { createClient } = supabase;
const { supabaseUrl, supabaseKey } = window.SUPABASE_CONFIG;
const _supabase = createClient(supabaseUrl, supabaseKey);