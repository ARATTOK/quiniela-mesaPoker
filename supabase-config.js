import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://TU_PROYECTO.supabase.co';
const supabaseKey = 'TU_ANON_KEY'; // Usa tu 'anon' public key

export const supabase = createClient(supabaseUrl, supabaseKey);