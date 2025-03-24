import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Profile } from '@/types/database';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  userProfile: Profile | null;
  loading: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: any }>;
  signUp: (credentials: { email: string; password: string; name: string; userType: 'volunteer' | 'organizer' }) => 
    Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<{ success: boolean; error?: any }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      setUserProfile(data as Profile);
      return data as Profile;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
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
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        navigate('/home');
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        title: "Sign in failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
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
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name,
            email,
            user_type: userType
          });
          
        if (profileError) throw profileError;

        toast({
          title: "Account created!",
          description: "Your account has been successfully created.",
        });
        navigate('/home');
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        title: "Sign up failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      navigate('/');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (profile: Partial<Profile>) => {
    try {
      if (!user) throw new Error("No authenticated user");
      
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id);
        
      if (error) throw error;
      
      await fetchUserProfile(user);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Profile update failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userProfile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
