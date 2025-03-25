
import { supabase } from './supabase';
import { Profile, Opportunity, Message, Feedback, VolunteerSignup } from '@/types/database';

// Generic function to fetch data from any table
export async function fetchData<T>(table: 'opportunities' | 'profiles' | 'volunteer_signups' | 'messages' | 'feedback', query: any = {}) {
  let queryBuilder = supabase.from(table).select('*');
  
  // Apply filters if provided
  if (query.filters) {
    Object.entries(query.filters).forEach(([key, value]) => {
      queryBuilder = queryBuilder.eq(key, value);
    });
  }
  
  // Apply order if provided
  if (query.orderBy) {
    queryBuilder = queryBuilder.order(query.orderBy.column, { 
      ascending: query.orderBy.ascending 
    });
  }
  
  // Apply pagination if provided
  if (query.range) {
    queryBuilder = queryBuilder.range(query.range.from, query.range.to);
  }
  
  const { data, error } = await queryBuilder;
  
  if (error) {
    console.error(`Error fetching data from ${table}:`, error);
    throw error;
  }
  
  return data as T[];
}

// Generic function to insert data into any table
export async function insertData<T>(
  table: 'opportunities' | 'profiles' | 'volunteer_signups' | 'messages' | 'feedback', 
  data: any
) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  
  if (error) {
    console.error(`Error inserting data into ${table}:`, error);
    throw error;
  }
  
  return result as T[];
}

// Generic function to update data in any table
export async function updateData<T>(
  table: 'opportunities' | 'profiles' | 'volunteer_signups' | 'messages' | 'feedback', 
  id: string, 
  data: any, 
  idColumn = 'id'
) {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq(idColumn, id)
    .select();
  
  if (error) {
    console.error(`Error updating data in ${table}:`, error);
    throw error;
  }
  
  return result as T[];
}

// Generic function to delete data from any table
export async function deleteData(
  table: 'opportunities' | 'profiles' | 'volunteer_signups' | 'messages' | 'feedback', 
  id: string, 
  idColumn = 'id'
) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq(idColumn, id);
  
  if (error) {
    console.error(`Error deleting data from ${table}:`, error);
    throw error;
  }
  
  return true;
}

// Function to fetch user profile
export async function fetchUserProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error(`Error fetching user profile:`, error);
      throw error;
    }
    
    return data as Profile;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return null;
  }
}

// Function to fetch messages
export async function fetchMessages(userId: string): Promise<Message[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching messages:`, error);
      throw error;
    }
    
    return data as Message[];
  } catch (error) {
    console.error('Error in fetchMessages:', error);
    return [];
  }
}

// Function to send a message
export async function sendMessage(senderId: string, receiverId: string, content: string): Promise<Message | null> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        content,
        read: false
      })
      .select()
      .single();
    
    if (error) {
      console.error(`Error sending message:`, error);
      throw error;
    }
    
    return data as Message;
  } catch (error) {
    console.error('Error in sendMessage:', error);
    return null;
  }
}

// Function to create or update feedback
export async function saveFeedback(
  userId: string, 
  opportunityId: string, 
  rating: number, 
  comments?: string
): Promise<Feedback | null> {
  try {
    // Check if feedback already exists
    const { data: existingFeedback } = await supabase
      .from('feedback')
      .select('*')
      .eq('user_id', userId)
      .eq('opportunity_id', opportunityId)
      .maybeSingle();
    
    let result;
    
    if (existingFeedback) {
      // Update existing feedback
      const { data, error } = await supabase
        .from('feedback')
        .update({ rating, comments })
        .eq('id', existingFeedback.id)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    } else {
      // Create new feedback
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          user_id: userId,
          opportunity_id: opportunityId,
          rating,
          comments
        })
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    }
    
    return result as Feedback;
  } catch (error) {
    console.error('Error in saveFeedback:', error);
    return null;
  }
}

// Function to fetch volunteer signups for a user
export async function fetchUserSignups(userId: string): Promise<(VolunteerSignup & { opportunity: Opportunity })[]> {
  try {
    const { data, error } = await supabase
      .from('volunteer_signups')
      .select(`
        *,
        opportunity:opportunity_id(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching user signups:`, error);
      throw error;
    }
    
    return data as unknown as (VolunteerSignup & { opportunity: Opportunity })[];
  } catch (error) {
    console.error('Error in fetchUserSignups:', error);
    return [];
  }
}
