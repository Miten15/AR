import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
// In a real application, these values would be stored in environment variables
// Replace these with your actual Supabase URL and anon key after creating your project
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);