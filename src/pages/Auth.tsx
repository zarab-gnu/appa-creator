
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('volunteer');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normally would handle authentication here
    if (userType === 'organizer') {
      navigate('/organizer/dashboard');
    } else {
      navigate('/home');
    }
  };
  
  return (
    <div className="mobile-container p-6">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-2xl font-bold">
          {isLogin ? 'Welcome Back' : 'Join VolunCheers'}
        </h1>
        <p className="text-muted-foreground">
          {isLogin ? 'Sign in to continue' : 'Create your account'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            
            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup 
                defaultValue="volunteer" 
                className="flex gap-4"
                onValueChange={setUserType}
                value={userType}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="volunteer" id="volunteer" />
                  <Label htmlFor="volunteer">Volunteer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="organizer" id="organizer" />
                  <Label htmlFor="organizer">Organizer</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        
        {isLogin && (
          <div className="text-right">
            <Button variant="link" className="p-0 h-auto text-sm">
              Forgot Password?
            </Button>
          </div>
        )}
        
        <Button type="submit" className="w-full">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
        
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
        
        <div className="text-center mt-6">
          <Button 
            variant="link" 
            className="p-0 h-auto"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
