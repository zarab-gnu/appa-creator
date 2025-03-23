
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { User, Building } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          placeholder="John Doe" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="space-y-3">
        <Label className="block mb-1">Account Type</Label>
        <ToggleGroup 
          type="single" 
          variant="outline"
          className="grid grid-cols-2 gap-2 p-1 border rounded-lg"
          value={userType}
          onValueChange={(value) => value && setUserType(value as 'volunteer' | 'organizer')}
        >
          <ToggleGroupItem 
            value="volunteer" 
            className={`flex flex-col items-center justify-center py-3 gap-2 ${userType === 'volunteer' ? 'bg-primary/10' : ''}`}
            aria-label="Volunteer account"
          >
            <User className="h-5 w-5" />
            <span>Volunteer</span>
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="organizer" 
            className={`flex flex-col items-center justify-center py-3 gap-2 ${userType === 'organizer' ? 'bg-primary/10' : ''}`}
            aria-label="Organizer account"
          >
            <Building className="h-5 w-5" />
            <span>Organizer</span>
          </ToggleGroupItem>
        </ToggleGroup>
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
