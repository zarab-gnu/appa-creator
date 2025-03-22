
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import SocialAuth from '@/components/auth/SocialAuth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'volunteer' | 'organizer'>('volunteer');
  
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
      
      {isLogin ? (
        <LoginForm userType={userType} />
      ) : (
        <SignupForm userType={userType} setUserType={setUserType} />
      )}
      
      <SocialAuth />
      
      <div className="text-center mt-6">
        <Button 
          variant="link" 
          className="p-0 h-auto"
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
