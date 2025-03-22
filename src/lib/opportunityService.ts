
import { supabase } from './supabase';
import { Opportunity } from '@/components/ui/OpportunityCard';

export async function fetchOpportunities() {
  const { data, error } = await supabase
    .from('opportunities')
    .select('*');
    
  if (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
  
  return data as Opportunity[];
}

export async function saveUserResponse(userId: string, opportunityId: string, response: 'accept' | 'skip') {
  const { error } = await supabase
    .from('opportunity_responses')
    .insert({
      user_id: userId,
      opportunity_id: opportunityId,
      response_type: response,
      created_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error saving response:', error);
    return false;
  }
  
  return true;
}
