
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mmegtvjshpkpcjirsbnc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tZWd0dmpzaHBrcGNqaXJzYm5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjkzNzEsImV4cCI6MjA1ODI0NTM3MX0.VWURnJEKD5JA1wVM1g_9WXydY-W7W1YvsYAxZKL21G8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
