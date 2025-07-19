'use client';

import { DistributorRegistrationForm } from '@/components/distributor-registration-form';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


export default function DistributorRegistrationPage() {

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
                <div className="flex-1">
                    <Button asChild variant="outline">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Landing Page
                        </Link>
                    </Button>
                </div>
                 <Logo />
                 <div className='flex-1' />
            </header>
            <main className="flex-1 p-4 sm:p-6 md:p-10">
                 <div className="mx-auto grid w-full max-w-4xl gap-2 mb-6 text-center">
                    <h1 className="text-3xl font-semibold">Pendaftaran Partner Distributor</h1>
                    <p className="text-muted-foreground">Ikuti tiga langkah mudah untuk bergabung dengan jaringan kami.</p>
                </div>
                <div className="mx-auto w-full max-w-4xl items-start gap-6">
                    <DistributorRegistrationForm />
                </div>
            </main>
        </div>
    );
}
