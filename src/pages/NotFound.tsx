
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mobile-container flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-8">
        <div className="text-7xl font-bold text-muted">404</div>
        <h1 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <Button 
        className="flex items-center gap-2"
        onClick={() => navigate('/')}
      >
        <Home className="h-4 w-4" />
        Return Home
      </Button>
    </div>
  );
};

export default NotFound;
