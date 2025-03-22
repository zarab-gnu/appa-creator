
import React from 'react';
import { Button } from '@/components/ui/button';

const SocialAuth: React.FC = () => {
  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="w-full">Google</Button>
        <Button variant="outline" className="w-full">Apple</Button>
      </div>
    </>
  );
};

export default SocialAuth;
