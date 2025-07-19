
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/logo';
import { useApp } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

export default function TechnicianLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useApp();
  const { toast } = useToast();
  const [email, setEmail] = useState('tech@lasertrack.com');
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
    if (email.toLowerCase().startsWith('tech')) {
      login('Technician');
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Gagal',
        description: 'Email atau password tidak valid untuk peran Teknisi.',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 relative">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <Card className="shadow-lg">
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">Portal Teknisi</CardTitle>
                <CardDescription>Masuk untuk mengakses jadwal dan laporan Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email atau ID Teknisi</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="contoh: budi.t@tech.com" 
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
                    <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" />
                            <label
                                htmlFor="remember-me"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Ingat saya
                            </label>
                        </div>
                        <Link href="#" className="text-sm text-primary hover:underline">
                            Lupa Password?
                        </Link>
                    </div>
                    <Button type="submit" className="w-full">
                        Masuk
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-4 pt-4">
                 <Link href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline">
                    Butuh Bantuan? Hubungi Admin
                </Link>
                <p className="text-xs text-muted-foreground pt-4">© 2025 LaserTrack Lite</p>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
