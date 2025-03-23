
// Database schema types for Supabase

export interface Opportunity {
  id: string;
  title: string;
  organization_name: string;
  organization_id: string;
  location: string;
  description?: string;
  date: string;
  time: string;
  image_url?: string;
  skills: string[];
  created_at: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface VolunteerProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  bio?: string;
  profile_image_url?: string;
  skills?: string[];
  interests?: string[];
  created_at: string;
}

export interface OrganizerProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  organization_name: string;
  organization_description?: string;
  logo_url?: string;
  website?: string;
  created_at: string;
}

export interface OpportunityResponse {
  id: string;
  user_id: string;
  opportunity_id: string;
  response_type: 'accept' | 'skip';
  created_at: string;
}
