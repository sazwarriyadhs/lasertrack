
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/logo';
import { useApp } from '@/context/app-context';

export default function SuperAdminLoginPage() {
  const router = useRouter();
  const { login } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login('Super Admin');
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
         <div className="mb-8 flex justify-center">
            <Link href="/"><Logo /></Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Super Admin Login</CardTitle>
            <CardDescription>Masuk ke dasbor SERENITY LaserTrack</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Alamat Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" required defaultValue="admin@lasertrack.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required defaultValue="password" />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
             <div className="mt-4 text-center text-sm">
                Bukan Super Admin?{' '}
                <Link href="/login/distributor" className="underline">
                    Login sebagai Distributor
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
