
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
    if (login(email, password)) {
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Gagal',
        description: 'Email atau password tidak valid.',
      });
    }
  };

  return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-muted/30 p-4 relative">
        <div className="w-full max-w-sm">
            <Card className="shadow-lg">
                <CardHeader>
                     <div className='flex justify-center'><Logo /></div>
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
