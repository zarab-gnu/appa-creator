
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import SwipeCard from '@/components/ui/SwipeCard';
import OpportunityCard, { Opportunity } from '@/components/ui/OpportunityCard';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { fetchOpportunities, saveUserResponse } from '@/lib/opportunityService';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadOpportunities = async () => {
      setLoading(true);
      try {
        const data = await fetchOpportunities();
        if (data && data.length > 0) {
          setOpportunities(data);
        } else {
          // Fallback to sample data if no opportunities are found
          setOpportunities(sampleOpportunities);
        }
      } catch (error) {
        console.error('Error loading opportunities:', error);
        setOpportunities(sampleOpportunities);
        toast({
          title: "Couldn't load opportunities",
          description: "Using sample data instead",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadOpportunities();
  }, [toast]);
  
  const handleSwipeLeft = async () => {
    // Skip this opportunity
    if (user) {
      await saveUserResponse(user.id, opportunities[currentIndex].id, 'skip');
    }
    
    setTimeout(() => {
      if (currentIndex < opportunities.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // No more opportunities to show
        setOpportunities([...opportunities, ...sampleOpportunities]);
        setCurrentIndex(currentIndex + 1);
      }
    }, 300);
  };
  
  const handleSwipeRight = async () => {
    // Accept this opportunity
    if (user) {
      await saveUserResponse(user.id, opportunities[currentIndex].id, 'accept');
      
      toast({
        title: "Opportunity Accepted!",
        description: `You've signed up for ${opportunities[currentIndex].title}`,
      });
    }
    
    setTimeout(() => {
      if (currentIndex < opportunities.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // No more opportunities to show
        setOpportunities([...opportunities, ...sampleOpportunities]);
        setCurrentIndex(currentIndex + 1);
      }
    }, 300);
  };
  
  const handleViewDetails = (id: string) => {
    navigate(`/opportunity/${id}`);
  };
  
  // Sample data as fallback
  const sampleOpportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Beach Cleanup Drive',
      organizationName: 'Ocean Conservancy',
      location: 'Miami Beach, FL',
      date: 'Aug 15, 2023',
      time: '9:00 AM - 12:00 PM',
      imageUrl: 'https://placehold.co/600x400?text=Beach+Cleanup',
      skills: ['Environment', 'Physical Labor', 'Teamwork']
    },
    {
      id: '2',
      title: 'Food Distribution for Homeless',
      organizationName: 'City Shelter',
      location: 'Downtown Chicago, IL',
      date: 'Aug 20, 2023',
      time: '5:00 PM - 8:00 PM',
      imageUrl: 'https://placehold.co/600x400?text=Food+Distribution',
      skills: ['Communication', 'Service', 'Organization']
    },
    {
      id: '3',
      title: 'Teach Computer Skills to Seniors',
      organizationName: 'Elder Tech Connect',
      location: 'Senior Center, Boston, MA',
      date: 'Aug 22, 2023',
      time: '2:00 PM - 4:00 PM',
      imageUrl: 'https://placehold.co/600x400?text=Tech+Education',
      skills: ['Teaching', 'Technology', 'Patience']
    }
  ];
  
  return (
    <MobileLayout>
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon">
          <Filter className="w-5 h-5" />
        </Button>
        
        <h1 className="text-xl font-bold">Discover</h1>
        
        <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
          <Bell className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="relative h-[calc(100vh-11rem)] flex justify-center items-center overflow-hidden">
        {loading ? (
          <div className="text-center">
            <p>Loading opportunities...</p>
          </div>
        ) : opportunities.length > currentIndex ? (
          <SwipeCard
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          >
            <OpportunityCard 
              opportunity={opportunities[currentIndex]}
              onViewDetails={() => handleViewDetails(opportunities[currentIndex].id)}
            />
          </SwipeCard>
        ) : (
          <div className="text-center p-6">
            <h3 className="text-lg font-medium mb-2">No more opportunities</h3>
            <p className="text-muted-foreground mb-4">Check back later for more volunteer opportunities matching your interests.</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Home;
