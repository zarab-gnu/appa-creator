
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import SwipeCard from '@/components/ui/SwipeCard';
import OpportunityCard, { Opportunity } from '@/components/ui/OpportunityCard';

// Sample data
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

const Home = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>(sampleOpportunities);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleSwipeLeft = () => {
    // Skip this opportunity
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
  
  const handleSwipeRight = () => {
    // Accept this opportunity
    // In a real app, we'd save this choice to the user's profile
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
        {opportunities.length > currentIndex ? (
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
