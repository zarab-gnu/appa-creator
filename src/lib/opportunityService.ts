
import { supabase } from './supabase';
import { Opportunity } from '@/components/ui/OpportunityCard';
import { fetchData, insertData } from './dataService';

export async function fetchOpportunities() {
  try {
    const data = await fetchData('opportunities', {
      orderBy: { column: 'created_at', ascending: false }
    });
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
    await insertData('opportunity_responses', {
      user_id: userId,
      opportunity_id: opportunityId,
      response_type: response,
      created_at: new Date().toISOString()
    });
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
        created_at: new Date().toISOString()
      })
      .select();
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return { success: false, error };
  }
}
