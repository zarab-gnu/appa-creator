
import { supabase } from './supabase';
import { Opportunity, VolunteerSignup } from '@/types/database';

export async function fetchOpportunities() {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data as Opportunity[];
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
}

export async function fetchOpportunity(id: string) {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as Opportunity;
  } catch (error) {
    console.error('Error fetching opportunity details:', error);
    return null;
  }
}

export async function saveUserResponse(userId: string, opportunityId: string, response: 'accept' | 'skip') {
  try {
    if (response === 'accept') {
      // Create volunteer signup record
      const { error } = await supabase
        .from('volunteer_signups')
        .insert({
          user_id: userId,
          opportunity_id: opportunityId,
          status: 'pending',
        });
        
      if (error) throw error;
    }
    // We could add a table to track skipped opportunities if needed
    
    return true;
  } catch (error) {
    console.error('Error saving response:', error);
    return false;
  }
}

export async function createOpportunity(opportunityData: Partial<Opportunity>) {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .insert({
        ...opportunityData,
        status: 'active'
      })
      .select();
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return { success: false, error };
  }
}

export async function getVolunteerSignups(opportunityId: string) {
  try {
    const { data, error } = await supabase
      .from('volunteer_signups')
      .select(`
        *,
        profiles:user_id(*)
      `)
      .eq('opportunity_id', opportunityId);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching volunteer signups:', error);
    return [];
  }
}

export async function updateSignupStatus(signupId: string, status: VolunteerSignup['status']) {
  try {
    const { data, error } = await supabase
      .from('volunteer_signups')
      .update({ status })
      .eq('id', signupId)
      .select();
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating signup status:', error);
    return { success: false, error };
  }
}
