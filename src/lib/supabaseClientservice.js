import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabseServiceKey);
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };  // Named export
