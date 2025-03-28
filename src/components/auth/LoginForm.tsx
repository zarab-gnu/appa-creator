
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSuccess?: () => void;
  onToggleForm?: () => void;
}

// Define the login form values type
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = ({ onSuccess, onToggleForm }: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = 
    useForm<LoginFormValues>({
      defaultValues: {
        email: '',
        password: ''
      }
    });
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { success, error } = await signIn({
        email: data.email,
        password: data.password
      });
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to VolunCheers!",
        });
        
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: "Login failed",
          description: error?.message || "Please check your credentials and try again.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">Login to continue your volunteering journey</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={onToggleForm}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
