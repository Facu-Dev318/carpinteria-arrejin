import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  location: string;
  typology: string;
  year: number;
  description: string;
  images: string[];
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  cv_url?: string;
  status?: string;
  created_at?: string;
}
