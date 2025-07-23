'use client';
import { MaintenanceForm } from '@/components/maintenance/maintenance-form';
import { devices } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/layout/logo';
import { useApp } from '@/context/app-context';
import { useEffect } from 'react';
import React from 'react';

export default function MaintenancePage({ params }: { params: { deviceId: string } }) {
    const { deviceId } = params;
    const device = devices.find(d => d.id === deviceId);
    const { isAuthenticated } = useApp();
    const router = useRouter();

    useEffect(() => {
        if(!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router])

    if (!device) {
        notFound();
    }
    
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
                <nav className="flex-1">
                    <Button asChild variant="outline">
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Dashboard
                        </Link>
                    </Button>
                </nav>
                 <Logo />
                 <div className="flex-1" />
            </header>
            <main className="flex-1 p-4 sm:p-6 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2 mb-6">
                    <h1 className="text-3xl font-semibold">Maintenance untuk {device.name}</h1>
                    <p className="text-muted-foreground">SN: {device.serialNumber}</p>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
                    <MaintenanceForm device={device} />
                </div>
            </main>
        </div>
    );
}