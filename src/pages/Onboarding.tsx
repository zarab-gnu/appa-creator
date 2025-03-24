
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Users, Calendar, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const OnboardingScreens = [
  {
    title: "Find Opportunities",
    description: "Discover volunteer opportunities that match your skills and interests",
    icon: Heart,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Connect with Organizations",
    description: "Chat directly with organizers to learn more about events",
    icon: Users,
    color: "bg-secondary/10 text-secondary"
  },
  {
    title: "Track Your Schedule",
    description: "Manage your volunteer schedule with our calendar integration",
    icon: Calendar,
    color: "bg-primary/20 text-primary"
  },
  {
    title: "Earn Achievements",
    description: "Get recognized for your contributions with badges and points",
    icon: Award,
    color: "bg-secondary/20 text-secondary"
  }
];

const Onboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (currentScreen < OnboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      navigate('/auth');
    }
  };
  
  const handleSkip = () => {
    navigate('/auth');
  };
  
  const screen = OnboardingScreens[currentScreen];
  const progress = ((currentScreen + 1) / OnboardingScreens.length) * 100;
  
  return (
    <div className="mobile-container flex flex-col p-6">
      <div className="flex justify-between items-center mb-8">
        <Progress value={progress} className="w-2/3" />
        <Button variant="ghost" className="text-sm" onClick={handleSkip}>
          Skip
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 mb-12">
        <div className={`w-20 h-20 rounded-full ${screen.color} flex items-center justify-center mb-8`}>
          <screen.icon className="w-10 h-10" />
        </div>
        
        <h1 className="text-2xl font-bold mb-3">{screen.title}</h1>
        <p className="text-muted-foreground mb-8">{screen.description}</p>
        
        <div className="flex gap-2 mt-4">
          {OnboardingScreens.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentScreen ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>
      
      <Button 
        className="w-full mb-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={handleNext}
      >
        {currentScreen < OnboardingScreens.length - 1 ? "Next" : "Get Started"}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Onboarding;
