'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {
    setError(null);
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        router.push('/admin/dashboard');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl: '/admin/dashboard' });
    } catch {
      setError('Google sign-in failed. Please try again.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#060b13] overflow-y-auto py-12 px-4">
      {/* Decorative Blur Background Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[6000ms]" />

      <Card className="relative w-full max-w-md border border-white/10 bg-[#0b121e]/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white overflow-hidden rounded-2xl">
        {/* Top brand header accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange via-brand-blue to-brand-orange" />

        <CardHeader className="space-y-2 text-center pt-8">
          <Link href="/" className="mx-auto flex flex-col items-center gap-1.5 focus:outline-none group mb-2">
            <div className="h-10 w-[51px] relative shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo-symbol-light.png"
                alt="Adruva Logo"
                fill
                sizes="51px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-[800] tracking-tight text-white transition-colors font-poppins mt-1">
              Adruva<span className="text-brand-orange">.</span>
            </span>
          </Link>
          <CardDescription className="text-brand-gray text-sm font-inter">
            Access the administrative console to manage content & leads
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {error && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80 text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-brand-gray" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@adruvasolution.com"
                  className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-brand-gray/40 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-brand-gray" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-brand-gray/40 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white h-12 mt-6 transition-all duration-300 font-semibold flex items-center justify-center gap-2 rounded-lg"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute w-full border-t border-white/10" />
            <span className="relative bg-[#0d1624] px-4 text-xs text-brand-gray uppercase">
              Or continue with
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={loading || googleLoading}
            onClick={handleGoogleSignIn}
            className="w-full border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 flex items-center justify-center gap-3 transition-all duration-300 rounded-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.41 0-6.19-2.78-6.19-6.19 0-3.41 2.78-6.19 6.19-6.19 1.543 0 2.94.57 4.027 1.517l3.056-3.055C18.995 1.77 15.825 1 12.24 1 5.922 1 1 5.922 1 12.24s4.922 11.24 11.24 11.24c6.318 0 10.97-4.444 10.97-11.16 0-.649-.078-1.25-.175-1.835h-10.8V10.285z"
              />
            </svg>
            <span>{googleLoading ? 'Redirecting...' : 'Google Account'}</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
