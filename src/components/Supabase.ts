// supabase.ts (Revised for Web)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nlmnwbuwuwpslmqtqzcy.supabase.co'; // Aapka Project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sbW53YnV3dXdwc2xtcXRxemN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMjU4MjUsImV4cCI6MjA3MjkwMTgyNX0.2i5wbd3Janf8m5BEZ_oe_f8UZcsNyoGKx1mZULdEQss'; // Aapka Anon Key

// createClient ko is tarah se use karein
export const supabase = createClient(supabaseUrl, supabaseAnonKey);