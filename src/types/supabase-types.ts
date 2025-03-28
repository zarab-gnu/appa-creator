
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          bio: string | null;
          profile_image_url: string | null;
          user_type: string;
          interests: string[] | null;
          skills: string[] | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email?: string | null;
          bio?: string | null;
          profile_image_url?: string | null;
          user_type: string;
          interests?: string[] | null;
          skills?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          bio?: string | null;
          profile_image_url?: string | null;
          user_type?: string;
          interests?: string[] | null;
          skills?: string[] | null;
          created_at?: string;
        };
      };
      opportunities: {
        Row: {
          id: string;
          title: string;
          organization_name: string | null;
          organization_id: string | null;
          location: string;
          description: string | null;
          date: string;
          time: string | null;
          image_url: string | null;
          skills: string[] | null;
          created_at: string;
          status: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          organization_name?: string | null;
          organization_id?: string | null;
          location: string;
          description?: string | null;
          date: string;
          time?: string | null;
          image_url?: string | null;
          skills?: string[] | null;
          created_at?: string;
          status?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          organization_name?: string | null;
          organization_id?: string | null;
          location?: string;
          description?: string | null;
          date?: string;
          time?: string | null;
          image_url?: string | null;
          skills?: string[] | null;
          created_at?: string;
          status?: string | null;
        };
      };
      volunteer_signups: {
        Row: {
          id: string;
          user_id: string;
          opportunity_id: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          opportunity_id: string;
          status: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          opportunity_id?: string;
          status?: string;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          read: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          read?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          content?: string;
          read?: boolean | null;
          created_at?: string;
        };
      };
      feedback: {
        Row: {
          id: string;
          user_id: string;
          opportunity_id: string;
          rating: number;
          comments: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          opportunity_id: string;
          rating: number;
          comments?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          opportunity_id?: string;
          rating?: number;
          comments?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
