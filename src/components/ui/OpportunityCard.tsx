
import React from 'react';
import { Opportunity } from '@/types/database';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onViewDetails?: () => void;
  showActions?: boolean;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity, 
  onViewDetails,
  showActions = true
}) => {
  const { 
    title, 
    organization_name, 
    location, 
    date, 
    time, 
    image_url, 
    skills 
  } = opportunity;

  return (
    <Card className="w-full h-full overflow-hidden flex flex-col">
      <div 
        className="relative h-48 bg-muted w-full overflow-hidden"
        onClick={onViewDetails}
      >
        <img 
          src={image_url || "https://placehold.co/600x400?text=Volunteer+Opportunity"} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {organization_name && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-white text-sm font-medium">{organization_name}</p>
          </div>
        )}
      </div>
      
      <CardContent className="flex-1 p-4">
        <h3 
          className="text-xl font-bold mb-2 line-clamp-2 cursor-pointer hover:text-primary"
          onClick={onViewDetails}
        >
          {title}
        </h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{date}</span>
          </div>
          
          {time && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span>{time}</span>
            </div>
          )}
        </div>
        
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="skill-badge">+{skills.length - 3}</span>
            )}
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="outline" 
            className="w-full justify-between"
            onClick={onViewDetails}
          >
            <span>View Details</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default OpportunityCard;
