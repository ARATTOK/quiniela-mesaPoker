import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Reemplaza estos valores con los de tu Dashboard de Supabase (Project Settings > API)
const supabaseUrl = 'https://gvoadjrnrlzhgeqsdhyi.supabase.co';
const supabaseKey = 'sb_publishable_XiqzVY4Sh3VTQsqGEu6eHA_akxwyJZK';

export const supabase = createClient(supabaseUrl, supabaseKey);