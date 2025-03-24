
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const SocialAuth: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Button variant="outline" className="h-12">
          <FaGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
        
        <Button variant="outline" className="h-12">
          <FaFacebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
        
        <Button variant="outline" className="h-12">
          <FaApple className="mr-2 h-4 w-4" />
          Apple
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;
