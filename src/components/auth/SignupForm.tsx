
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';

interface SignupFormProps {
  userType: 'volunteer' | 'organizer';
  setUserType: (type: 'volunteer' | 'organizer') => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ userType, setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default SignupForm;
