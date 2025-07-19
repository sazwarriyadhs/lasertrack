
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/logo';
import { useApp } from '@/context/app-context';
import type { Role } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useApp();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let role: Role | null = null;
    
    // Determine role based on email
    if (email.toLowerCase().startsWith('superadmin')) {
      role = 'Super Admin';
    } else if (email.toLowerCase().startsWith('distributor')) {
      role = 'Distributor';
    } else if (email.toLowerCase().startsWith('clinic')) {
        role = 'Clinic';
    } else if (email.toLowerCase().startsWith('tech')) {
        role = 'Technician';
    }

    if (role) {
      login(role);
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
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">Selamat Datang</CardTitle>
                <CardDescription>Silakan login untuk mengakses akun Anda</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="user@example.com" 
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
                            defaultValue="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
