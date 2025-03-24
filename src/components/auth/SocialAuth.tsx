
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Apple } from 'lucide-react';

// Custom Google icon since Lucide doesn't have one that matches the style
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    <path d="M17.8 12.2h-5.8v2.4h3.4c-.3 1.6-1.9 2.8-3.4 2.8-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7c.9 0 1.8.4 2.4 1l1.8-1.8c-1.1-1.1-2.6-1.8-4.2-1.8-3.3 0-5.9 2.7-5.9 5.9s2.7 5.9 5.9 5.9c3 0 5.8-2.2 5.8-5.9 0-.4 0-.7-.1-1.1z" />
  </svg>
);

const SocialAuth = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Button variant="outline" className="h-12">
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" className="h-12">
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
        <Button variant="outline" className="h-12">
          <Apple className="mr-2 h-4 w-4" />
          Apple
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;
