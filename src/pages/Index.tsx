
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mobile-container flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-8 fade-in">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-primary text-3xl font-bold">VC</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">VolunCheers</h1>
        <p className="text-xl text-muted-foreground">Find volunteer opportunities that match your skills and interests</p>
      </div>
      
      <div className="w-full space-y-4">
        <Button 
          className="w-full"
          onClick={() => navigate('/onboarding')}
        >
          Get Started
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate('/auth')}
        >
          I already have an account
        </Button>
      </div>
      
      <p className="mt-8 text-xs text-muted-foreground">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default Index;
