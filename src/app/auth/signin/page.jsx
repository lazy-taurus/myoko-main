'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react'; // Added Eye Icons for Show/Hide Password
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function SignIn() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Show/Hide Password State
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('/api/client/login', data);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.user.accessToken);
        window.location.replace('/');
      } else {
        toast.error(response.data.error || 'An error occurred');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    await handleLogin({ email, password });

    setIsLoading(false);
  };

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {registered && (
            <div className='mb-4 text-green-600'>
              ✅ Account created successfully! Please sign in.
            </div>
          )}
          <form onSubmit={handleSubmit} className='space-y-4'>
            
            {/* Email Field */}
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='name@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field with Show/Hide Button */}
            <div className='space-y-2 relative'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='/auth/forgot-password'
                  className='text-sm text-primary hover:underline'
                >
                  Forgot password?
                </Link>
              </div>

              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type='submit'
              className='w-full text-black border-2 backsec'
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className='flex flex-col space-y-4'>
          <div className='text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/auth/signup' className='text-black'>
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>

      <ToastContainer />
    </div>
  );
}