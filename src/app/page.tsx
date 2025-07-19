
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function LoginForm({ role, onLogin }: { role: Role, onLogin: (role: Role) => void }) {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Alamat Email</Label>
        <Input id={`${role}-email`} type="email" placeholder={`${role.toLowerCase()}@example.com`} required defaultValue={`${role.toLowerCase().replace(' ', '')}@lasertrack.com`} />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <Input id={`${role}-password`} type="password" required defaultValue="password" />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState('distributor');

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  const handleLogin = (role: Role) => {
    login(role);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Selamat Datang</CardTitle>
                <CardDescription>Silakan login untuk mengakses akun Anda</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="distributor">Distributor</TabsTrigger>
                        <TabsTrigger value="superadmin">Super Admin</TabsTrigger>
                    </TabsList>
                    <TabsContent value="distributor">
                        <Card className='border-0 shadow-none'>
                             <CardContent className='p-2 pt-6'>
                                <LoginForm role="Distributor" onLogin={handleLogin} />
                             </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="superadmin">
                         <Card className='border-0 shadow-none'>
                             <CardContent className='p-2 pt-6'>
                                <LoginForm role="Super Admin" onLogin={handleLogin} />
                             </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
