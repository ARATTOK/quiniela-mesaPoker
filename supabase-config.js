import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://tu-id-proyecto.supabase.co';
const supabaseKey = 'tu-anon-key-larga-y-segura'; 

export const supabase = createClient(supabaseUrl, supabaseKey);