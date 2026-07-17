import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — avoids throwing at module load time during build when env vars aren't set
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars not configured');
  _client = createClient(url, key);
  return _client;
}

// Convenience alias — server-side only, never expose SUPABASE_SERVICE_ROLE_KEY client-side
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return getSupabase()[prop as keyof SupabaseClient];
  },
});

export type ContactStatus = 'new' | 'read' | 'archived';
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'commission';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

export interface JobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: EmploymentType;
  is_commission_based: boolean;
  description: string;
  requirements: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  applicant_name: string;
  email: string;
  phone: string;
  resume_url: string;
  cover_note: string;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  highlight: string;
  link: string | null;
  is_external: boolean;
  icon: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}
