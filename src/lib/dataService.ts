
import { supabase } from './supabase';

// Generic function to fetch data from any table
export async function fetchData(table: string, query: any = {}) {
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
  
  return data;
}

// Generic function to insert data into any table
export async function insertData(table: string, data: any) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  
  if (error) {
    console.error(`Error inserting data into ${table}:`, error);
    throw error;
  }
  
  return result;
}

// Generic function to update data in any table
export async function updateData(table: string, id: string, data: any, idColumn = 'id') {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq(idColumn, id)
    .select();
  
  if (error) {
    console.error(`Error updating data in ${table}:`, error);
    throw error;
  }
  
  return result;
}

// Generic function to delete data from any table
export async function deleteData(table: string, id: string, idColumn = 'id') {
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

// Example of a specific function for opportunities
export async function fetchOpportunities(filters = {}) {
  return fetchData('opportunities', { 
    filters,
    orderBy: { column: 'created_at', ascending: false }
  });
}

// Example of a specific function for user profiles
export async function fetchUserProfile(userId: string, userType: 'volunteer' | 'organizer') {
  const table = userType === 'organizer' ? 'organizer_profiles' : 'volunteer_profiles';
  
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error(`Error fetching user profile from ${table}:`, error);
    throw error;
  }
  
  return data;
}

// Function to handle user responses to opportunities
export async function saveOpportunityResponse(userId: string, opportunityId: string, response: 'accept' | 'skip') {
  return insertData('opportunity_responses', {
    user_id: userId,
    opportunity_id: opportunityId,
    response_type: response,
    created_at: new Date().toISOString()
  });
}
