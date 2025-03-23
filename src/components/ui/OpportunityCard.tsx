
import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Opportunity as OpportunityType } from '@/types/database';

interface OpportunityCardProps {
  opportunity: OpportunityType;
  onViewDetails?: () => void;
  onSkip?: () => void;
  onAccept?: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity, 
  onViewDetails,
  onSkip,
  onAccept
}) => {
  return (
    <div className="flex flex-col h-full relative">
      <AspectRatio ratio={4/3} className="bg-muted">
        <img 
          src={opportunity.image_url || 'https://placehold.co/600x400?text=Volunteer+Opportunity'} 
          alt={opportunity.title}
          className="object-cover w-full h-full rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </AspectRatio>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold line-clamp-2">{opportunity.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{opportunity.organization_name}</p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{opportunity.location}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{opportunity.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{opportunity.time}</span>
          </div>
        </div>
        
        <div className="mb-4 flex-grow">
          <p className="text-sm mb-2 font-medium">Skills needed:</p>
          <div className="flex flex-wrap gap-1">
            {opportunity.skills && opportunity.skills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mb-10" 
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex gap-2">
          <button 
            className="bg-destructive text-destructive-foreground rounded-full px-3 py-1 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            onClick={onSkip}
          >
            Skip
          </button>
          <button 
            className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            onClick={onAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
