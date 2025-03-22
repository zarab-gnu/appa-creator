
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'volunteer' | 'organizer'>('volunteer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp } = useSupabaseAuth();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        // Handle login
        const { success, error } = await signIn({ email, password });
        
        if (success) {
          toast({
            title: "Login successful",
            description: "Welcome back to VolunCheers!"
          });
          
          if (userType === 'organizer') {
            navigate('/organizer/dashboard');
          } else {
            navigate('/home');
          }
        } else {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive"
          });
        }
      } else {
        // Handle signup
        if (!name) {
          toast({
            title: "Missing information",
            description: "Please provide your full name",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        const { success, error } = await signUp({ 
          email, 
          password, 
          userType, 
          name 
        });
        
        if (success) {
          toast({
            title: "Account created",
            description: "Welcome to VolunCheers!"
          });
          
          if (userType === 'organizer') {
            navigate('/organizer/dashboard');
          } else {
            navigate('/home');
          }
        } else {
          toast({
            title: "Signup failed",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup 
                defaultValue="volunteer" 
                className="flex gap-4"
                onValueChange={(value) => setUserType(value as 'volunteer' | 'organizer')}
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
          <Input 
            id="email" 
            type="email" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {isLogin && (
          <div className="text-right">
            <Button variant="link" className="p-0 h-auto text-sm">
              Forgot Password?
            </Button>
          </div>
        )}
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
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
            type="button"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
