
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import SocialAuth from '@/components/auth/SocialAuth';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'volunteer' | 'organizer'>('volunteer');
  
  return (
    <div className="mobile-container p-6">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <span className="text-primary text-2xl font-bold">VC</span>
        </div>
        <h1 className="text-2xl font-bold">
          {isLogin ? 'Welcome Back' : 'Join VolunCheers'}
        </h1>
        <p className="text-muted-foreground">
          {isLogin ? 'Sign in to continue' : 'Create your account'}
        </p>
      </div>
      
      <div className="mb-6">
        <ToggleGroup type="single" value={isLogin ? "login" : "signup"} className="justify-center w-full">
          <ToggleGroupItem 
            value="login" 
            onClick={() => setIsLogin(true)}
            className={`w-32 ${isLogin ? 'bg-primary/10 text-primary' : ''}`}
          >
            Sign In
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="signup" 
            onClick={() => setIsLogin(false)}
            className={`w-32 ${!isLogin ? 'bg-primary/10 text-primary' : ''}`}
          >
            Sign Up
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {isLogin ? (
        <LoginForm userType={userType} />
      ) : (
        <SignupForm userType={userType} setUserType={setUserType} />
      )}
      
      <SocialAuth />
      
      <div className="text-center mt-6">
        <Button 
          variant="link" 
          className="p-0 h-auto text-secondary hover:text-secondary/80"
          onClick={() => setIsLogin(!isLogin)}
          type="button"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
