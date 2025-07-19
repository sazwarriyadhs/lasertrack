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
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 relative">
        <Button variant="outline" asChild className="absolute top-4 left-4">
            <Link href="/">
                <ArrowLeft className="mr-2" />
                Kembali ke Landing Page
            </Link>
        </Button>
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">Login Partner Distributor</CardTitle>
                <CardDescription>Akses dasbor Anda untuk mengelola klinik dan teknisi.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Alamat Email Distributor</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="distributor@example.com" 
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
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </CardContent>
            <Separator className="my-4" />
            <CardFooter className="flex-col gap-4">
                <p className="text-sm text-muted-foreground">Belum menjadi partner?</p>
                 <Button variant="outline" asChild className="w-full">
                    <Link href="/partner/register">
                        <UserPlus className="mr-2" />
                        Daftar sebagai Distributor
                    </Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
