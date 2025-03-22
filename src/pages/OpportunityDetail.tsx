
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import MobileLayout from '@/components/layout/MobileLayout';

// Sample data
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

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, we would fetch the opportunity details using the ID
  // const opportunity = useQuery(['opportunity', id], () => fetchOpportunity(id));
  
  return (
    <MobileLayout hideNav>
      <div className="relative -mx-4 -mt-4">
        <AspectRatio ratio={16/9} className="bg-muted">
          <img 
            src={opportunityDetails.imageUrl} 
            alt={opportunityDetails.title}
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
      
      <div className="mt-4">
        <h1 className="text-2xl font-bold mb-2">{opportunityDetails.title}</h1>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={opportunityDetails.organizationLogo} 
              alt={opportunityDetails.organizationName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium">{opportunityDetails.organizationName}</span>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{opportunityDetails.fullAddress}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{opportunityDetails.date}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{opportunityDetails.time} ({opportunityDetails.duration})</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>{opportunityDetails.volunteersJoined} / {opportunityDetails.volunteersNeeded} volunteers</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">About this opportunity</h2>
          <p className="text-sm text-muted-foreground">{opportunityDetails.description}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Skills needed</h2>
          <div className="flex flex-wrap gap-1">
            {opportunityDetails.skills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
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
          <Button className="w-full" onClick={() => navigate('/chat/org1')}>
            Sign Up & Message Organizer
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default OpportunityDetail;
