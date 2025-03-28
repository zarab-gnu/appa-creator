
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface SignupFormProps {
  userType: 'volunteer' | 'organizer';
  setUserType: (type: 'volunteer' | 'organizer') => void;
}

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  userType: z.enum(['volunteer', 'organizer']),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm: React.FC<SignupFormProps> = ({ userType, setUserType }) => {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      userType,
    },
  });
  
  // Update form when userType prop changes
  React.useEffect(() => {
    form.setValue('userType', userType);
  }, [userType, form]);
  
  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      const { success, error } = await signUp({
        email: values.email,
        password: values.password,
        name: values.name,
        userType: values.userType,
      });
      
      if (!success) {
        console.error('Signup error:', error);
        // Error is shown through toast from the auth context
      }
    } catch (error) {
      console.error('Unexpected error during signup:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUserTypeChange = (value: 'volunteer' | 'organizer') => {
    setUserType(value);
    form.setValue('userType', value);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your name" 
                  autoComplete="name"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  autoComplete="email"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  autoComplete="new-password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <Label>I want to</Label>
          <RadioGroup 
            defaultValue={userType}
            value={userType}
            onValueChange={(value) => handleUserTypeChange(value as 'volunteer' | 'organizer')}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="volunteer" id="volunteer" />
              <Label htmlFor="volunteer" className="font-normal cursor-pointer">Volunteer for opportunities</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="organizer" id="organizer" />
              <Label htmlFor="organizer" className="font-normal cursor-pointer">Organize volunteer events</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
