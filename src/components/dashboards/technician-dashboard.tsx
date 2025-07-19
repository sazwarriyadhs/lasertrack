
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { devices, distributorClinics } from '@/lib/data';
import type { DeviceStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight, HardHat } from 'lucide-react';
import { useApp } from '@/context/app-context';

const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
};

export default function TechnicianDashboard() {
    const { user } = useApp();
    const assignedDevices = devices.filter(d => d.status === 'Under Maintenance' || d.status === 'Needs Attention');

    return (
         <div className="space-y-4">
             <div className="p-4 bg-card rounded-lg border">
                <h1 className="text-2xl font-bold">Selamat Datang, {user.name}!</h1>
                <p className="text-muted-foreground">Anda memiliki {assignedDevices.length} tugas yang menunggu.</p>
             </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HardHat className="text-primary"/>
                        Tugas Maintenance Saya
                    </CardTitle>
                    <CardDescription>Perangkat yang membutuhkan penanganan Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {assignedDevices.length > 0 ? (
                            assignedDevices.map((device) => {
                                const clinic = distributorClinics.find(c => c.id === device.clinicId);
                                return (
                                <Card key={device.id}>
                                    <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <Badge variant="secondary" className={cn("font-normal mb-2", statusColors[device.status])}>
                                                {device.status}
                                            </Badge>
                                            <h3 className="font-semibold">{device.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {clinic?.name} | SN: {device.serialNumber}
                                            </p>
                                        </div>
                                        <Button asChild className="w-full sm:w-auto flex-shrink-0">
                                            <Link href={`/maintenance/${device.id}`}>
                                                Kerjakan <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )})
                        ) : (
                            <div className="text-center py-10 text-muted-foreground">
                                <p>Tidak ada tugas aktif saat ini. Anda bisa bersantai!</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
         </div>
    );
}
