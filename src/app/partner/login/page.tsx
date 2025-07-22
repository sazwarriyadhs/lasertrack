
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/logo';
import { useApp } from '@/context/app-context';
import type { Role } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

const RegenesisLogo = () => (
    <div className="flex flex-col items-center justify-center text-center mb-4">
        <svg width="150" height="70" viewBox="0 0 203 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M76.8392 34.18C75.8492 28.52 70.8392 23.6 64.7192 23.6C57.6992 23.6 52.1792 29.28 52.1792 36.32C52.1792 43.36 57.6992 49.04 64.7192 49.04C70.1192 49.04 74.6592 45.42 76.3792 40.5H66.0792V36.02H77.9592V37.28C77.8192 44.92 72.1992 51.18 64.7192 51.18C56.2392 51.18 49.5792 44.62 49.5792 36.32C49.5792 28.02 56.2392 21.46 64.7192 21.46C72.3392 21.46 77.9392 26.66 78.5992 34.18H76.8392Z" fill="#008080"/>
            <path d="M43.1592 21.7401H46.2192V44.2801C46.2192 47.9801 43.4392 50.9001 39.7392 50.9001H34.3192V48.1801H39.5992C41.6792 48.1801 43.1592 46.7001 43.1592 44.6401V21.7401Z" fill="#008080"/>
            <path d="M29.9829 41.34L26.5429 21.74H29.6229L31.8629 35.1L34.1029 21.74H37.1829L33.7429 41.34V50.66H30.9029V44.5L29.9829 41.34Z" fill="#008080"/>
            <path d="M9.82672 26.7C10.8267 24 13.8467 21.46 17.5267 21.46C23.2467 21.46 26.5267 25.5 26.5267 31.84V50.66H23.4667V32.38C23.4667 27.9 20.9267 24.2 17.0667 24.2C14.1867 24.2 12.2267 26.26 11.5267 28.16V50.66H8.46672V21.74H11.5267V26.7H9.82672Z" fill="#008080"/>
            <path d="M12.9813 4.24C10.7413 4.24 8.78125 5.5 8.08125 7.4L15.6813 25.04L23.5213 7.4C22.8213 5.5 20.8613 4.24 18.6213 4.24H12.9813ZM24.4213 2.94C26.9613 3.52 28.7613 5.76 28.7613 8.46V28.16L15.6813 59.36L2.60125 28.16V8.46C2.60125 5.76 4.40125 3.52 6.94125 2.94L15.6813 24.16L24.4213 2.94Z" fill="#008080"/>
            <path d="M85.7953 21.74H88.8553V50.66H85.7953V21.74Z" fill="#757575"/>
            <path d="M96.7915 21.74H99.8515V47.94C99.8515 49.74 101.072 50.9 102.872 50.9C104.672 50.9 105.891 49.74 105.891 47.94V21.74H108.951V47.66C108.951 51.5 106.251 53.66 102.872 53.66C99.4915 53.66 96.7915 51.5 96.7915 47.66V21.74Z" fill="#757575"/>
            <path d="M123.655 41.34L120.215 21.74H123.295L125.535 35.1L127.775 21.74H130.855L127.415 41.34V50.66H124.575V44.5L123.655 41.34Z" fill="#757575"/>
            <path d="M138.566 26.7C139.566 24 142.586 21.46 146.266 21.46C151.986 21.46 155.266 25.5 155.266 31.84V50.66H152.206V32.38C152.206 27.9 149.666 24.2 145.806 24.2C142.926 24.2 140.966 26.26 140.266 28.16V50.66H137.206V21.74H140.266V26.7H138.566Z" fill="#757575"/>
            <path d="M165.61 21.74H171.49L174.93 33.34L178.37 21.74H184.25L177.69 37.1V50.66H174.63V37.2L181.41 21.74H187.57L179.41 39.38L188.03 50.66H181.65L176.45 42.5L171.25 50.66H164.87L173.49 39.38L165.61 21.74Z" fill="#757575"/>
            <path d="M194.023 26.7C195.023 24 198.043 21.46 201.723 21.46C207.443 21.46 210.723 25.5 210.723 31.84V50.66H207.663V32.38C207.663 27.9 205.123 24.2 201.263 24.2C198.383 24.2 196.423 26.26 195.723 28.16V50.66H192.663V21.74H195.723V26.7H194.023Z" fill="#757575"/>
            <text x="86" y="75" fontFamily="Arial, sans-serif" fontSize="12" fill="#757575">Advancing Your Business</text>
        </svg>
    </div>
);


export default function DistributorLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useApp();
  const { toast } = useToast();
  const [email, setEmail] = useState('distributor@lasertrack.com');
  const [password, setPassword] = useState('password');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().startsWith('distributor')) {
      login('Distributor');
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Gagal',
        description: 'Email atau password tidak valid untuk peran Distributor.',
      });
    }
  };

  return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-muted/30 p-4 relative">
        <div className="w-full max-w-sm">
            <Card className="shadow-lg">
                <CardHeader>
                     <RegenesisLogo />
                    <CardTitle className="text-center text-3xl font-bold">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" />
                            <Label htmlFor="remember-me" className="font-normal text-sm">
                                Remember Me
                            </Label>
                        </div>
                        <Button type="submit" className="w-full h-11">
                            Login
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm flex justify-between">
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            Forgot password?
                        </Link>
                        <p className="text-muted-foreground">
                            Not a member?{' '}
                            <Link href="/partner/register" className="font-semibold text-primary hover:underline">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
         <div className="absolute bottom-6 text-center text-sm text-muted-foreground">
             <p className="mb-1">Supported by:</p>
            <Logo variant="small" />
        </div>
    </div>
  );
}
