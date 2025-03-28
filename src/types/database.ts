
// Database schema types for Supabase

export interface Opportunity {
  id: string;
  title: string;
  organization_name?: string;
  organization_id?: string;
  location: string;
  description?: string;
  date: string;
  time?: string;
  image_url?: string;
  skills?: string[];
  created_at: string;
  status?: 'active' | 'completed' | 'cancelled';
}

export interface Profile {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  profile_image_url?: string;
  user_type: 'volunteer' | 'organizer';
  interests?: string[];
  skills?: string[];
  created_at?: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read?: boolean;
}

export interface Feedback {
  id: string;
  user_id: string;
  opportunity_id: string;
  rating: number;
  comments?: string;
  created_at?: string;
}

export interface VolunteerSignup {
  id: string;
  user_id: string;
  opportunity_id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}
