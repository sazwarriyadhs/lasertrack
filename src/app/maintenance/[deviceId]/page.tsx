import { MaintenanceForm } from '@/components/maintenance/maintenance-form';
import { devices } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot } from 'lucide-react';

export default function MaintenancePage({ params }: { params: { deviceId: string } }) {
    const device = devices.find(d => d.id === params.deviceId);

    if (!device) {
        notFound();
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Bot className="h-8 w-8 text-primary" />
                    <h1 className="text-xl font-bold">LaserTrack Lite</h1>
                </div>
                <nav className="flex-1">
                    <Button asChild variant="outline">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Dashboard
                        </Link>
                    </Button>
                </nav>
            </header>
            <main className="flex-1 p-4 sm:p-6 md:p-10">
                <div className="mx-auto grid w-full max-w-4xl gap-2 mb-6">
                    <h1 className="text-3xl font-semibold">Maintenance untuk {device.name}</h1>
                    <p className="text-muted-foreground">SN: {device.serialNumber}</p>
                </div>
                <div className="mx-auto grid w-full max-w-4xl items-start gap-6">
                    <MaintenanceForm device={device} />
                </div>
            </main>
        </div>
    );
}
