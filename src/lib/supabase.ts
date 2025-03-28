
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase-types';

// Initialize the Supabase client
const supabaseUrl = 'https://mhizloiugyuqcxgaoiff.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oaXpsb2l1Z3l1cWN4Z2FvaWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDM4MjcsImV4cCI6MjA1ODM3OTgyN30.O8Tf2zhetC8-htKA0fSWllHGhYmYXIIQ2_9Mzpq7cGA';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
