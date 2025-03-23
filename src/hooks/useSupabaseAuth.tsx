
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export type AuthUser = User | null;

export function useSupabaseAuth() {
  const [user, setUser] = useState<AuthUser>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Initial session fetch
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (user: User) => {
    const userType = user.user_metadata.user_type;
    const table = userType === 'organizer' ? 'organizer_profiles' : 'volunteer_profiles';
    
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', user.id)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    setUserProfile(data);
    return data;
  };

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        await fetchUserProfile(data.user);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing in:', error);
      return { success: false, error };
    }
  };

  const signUp = async ({ email, password, userType, name }: { 
    email: string; 
    password: string;
    userType: 'volunteer' | 'organizer';
    name: string;
  }) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            user_type: userType
          }
        }
      });
      
      if (error) throw error;
      
      if (data?.user) {
        // Create a profile record in the appropriate table
        const profileTable = userType === 'organizer' ? 'organizer_profiles' : 'volunteer_profiles';
        
        const { error: profileError } = await supabase
          .from(profileTable)
          .insert({
            user_id: data.user.id,
            name,
            email
          });
          
        if (profileError) throw profileError;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing up:', error);
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUserProfile(null);
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error };
    }
  };

  return {
    user,
    session,
    loading,
    userProfile,
    signIn,
    signUp,
    signOut,
    fetchUserProfile,
  };
}
