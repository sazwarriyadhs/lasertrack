
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
    if (login(email, password)) {
      const user = login(email, password);
        if (user && user.role === 'Technician') {
            router.push('/dashboard');
        } else {
             toast({
                variant: 'destructive',
                title: 'Login Gagal',
                description: 'Akun ini tidak memiliki akses Teknisi.',
            });
        }
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
                <CardTitle className="text-center text-3xl font-bold">Login Teknisi</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="sr-only">Alamat Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="Alamat Email"
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                         <Label htmlFor="password" className="sr-only">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="Password"
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" />
                            <Label htmlFor="remember-me" className="font-normal text-sm">
                                Ingat Saya
                            </Label>
                        </div>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                            Lupa kata sandi?
                        </Link>
                    </div>
                    <Button type="submit" className="w-full h-11">
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
      </div>
       <div className="absolute bottom-6 text-center text-sm text-muted-foreground">
           <p className="mb-1">Didukung oleh:</p>
          <Logo variant="small" />
      </div>
    </div>
  );
}
