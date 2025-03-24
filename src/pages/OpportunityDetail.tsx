
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Opportunity } from '@/types/database';

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOpportunity = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('opportunities')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setOpportunity(data as Opportunity);
      } catch (error: any) {
        console.error('Error fetching opportunity details:', error);
        toast({
          title: "Couldn't load opportunity",
          description: error.message || "An error occurred",
          variant: "destructive"
        });
        
        // Fallback to sample data
        setOpportunity(opportunityDetails as unknown as Opportunity);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOpportunity();
  }, [id, toast]);
  
  const handleSignUp = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please sign in to sign up for this opportunity",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    if (!opportunity) return;
    
    try {
      const { error } = await supabase
        .from('volunteer_signups')
        .insert({
          user_id: user.id,
          opportunity_id: opportunity.id,
          status: 'pending'
        });
        
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "You've signed up for this opportunity",
      });
      
      navigate(`/chat/${opportunity.organization_id || 'org1'}`);
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        title: "Couldn't sign up",
        description: error.message || "An error occurred",
        variant: "destructive"
      });
    }
  };
  
  // Sample data as fallback
  const opportunityDetails = {
    id: '1',
    title: 'Beach Cleanup Drive',
    organizationName: 'Ocean Conservancy',
    organizationLogo: 'https://placehold.co/100x100?text=OC',
    location: 'Miami Beach, FL',
    fullAddress: '1234 Beach Avenue, Miami Beach, FL 33139',
    date: 'Aug 15, 2023',
    time: '9:00 AM - 12:00 PM',
    duration: '3 hours',
    imageUrl: 'https://placehold.co/600x400?text=Beach+Cleanup',
    description: 'Join us for a beach cleanup event to help protect our oceans and marine life. We will be collecting trash and plastic waste from the beautiful Miami Beach. All cleaning equipment will be provided. Please wear comfortable clothes and bring sunscreen!',
    skills: ['Environment', 'Physical Labor', 'Teamwork'],
    requirements: ['Comfortable working outdoors', 'Ability to bend and lift light items', 'Sunscreen recommended'],
    volunteersNeeded: 25,
    volunteersJoined: 18
  };
  
  const currentOpportunity = opportunity || opportunityDetails as unknown as Opportunity;
  
  return (
    <MobileLayout hideNav>
      <div className="relative -mx-4 -mt-4">
        <AspectRatio ratio={16/9} className="bg-muted">
          <img 
            src={currentOpportunity.image_url || opportunityDetails.imageUrl} 
            alt={currentOpportunity.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <Button 
              size="icon"
              variant="ghost" 
              className="h-9 w-9 rounded-full bg-black/20 text-white hover:bg-black/40"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="absolute top-4 right-4">
            <Button 
              size="icon"
              variant="ghost" 
              className="h-9 w-9 rounded-full bg-black/20 text-white hover:bg-black/40"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </AspectRatio>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading opportunity details...</p>
        </div>
      ) : (
        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-2">{currentOpportunity.title}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src={opportunityDetails.organizationLogo} 
                alt={currentOpportunity.organization_name || opportunityDetails.organizationName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">{currentOpportunity.organization_name || opportunityDetails.organizationName}</span>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{currentOpportunity.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{currentOpportunity.date}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>{currentOpportunity.time || opportunityDetails.time} ({opportunityDetails.duration})</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>{opportunityDetails.volunteersJoined} / {opportunityDetails.volunteersNeeded} volunteers</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">About this opportunity</h2>
            <p className="text-sm text-muted-foreground">{currentOpportunity.description || opportunityDetails.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Skills needed</h2>
            <div className="flex flex-wrap gap-1">
              {(currentOpportunity.skills || opportunityDetails.skills).map((skill, index) => (
                <span key={index} className="skill-badge px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Requirements</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {opportunityDetails.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
          
          <div className="sticky bottom-4 pt-4 bg-background">
            <Button className="w-full" onClick={handleSignUp}>
              Sign Up & Message Organizer
            </Button>
          </div>
        </div>
      )}
    </MobileLayout>
  );
};

export default OpportunityDetail;
