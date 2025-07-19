
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { devices, distributorClinics } from '@/lib/data';
import type { Device, DeviceStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight, HardHat, ShieldCheck, ShieldAlert, Bell, List } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { useMemo } from 'react';

const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80 text-green-50',
    'Under Maintenance': 'bg-yellow-500/80 text-yellow-50',
    'Needs Attention': 'bg-orange-500/80 text-orange-50',
    Decommissioned: 'bg-gray-500/80 text-gray-50',
};


const StatsCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ElementType, color: string }) => {
    const Icon = icon;
    return (
        <Card className={cn("border-l-4", color)}>
            <CardContent className="p-4 flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
                <Icon className="h-8 w-8 text-muted-foreground" />
            </CardContent>
        </Card>
    )
};


export default function TechnicianDashboard() {
    const { user } = useApp();

    const { assignedDevices, myDevices } = useMemo(() => {
        if (!user.id) return { assignedDevices: [], myDevices: [] };

        const myDevs = devices.filter(d => d.assignedTechnicianId === user.id);
        
        const myClinicIds = distributorClinics.filter(c => c.distributorId === user.distributorId).map(c => c.id);
        const allMyDistributorDevices = devices.filter(d => myClinicIds.includes(d.clinicId));

        return { assignedDevices: myDevs, myDevices: allMyDistributorDevices };
    }, [user.id, user.distributorId]);

    const operationalCount = myDevices.filter(d => d.status === 'Operational').length;
    const needsAttentionCount = myDevices.filter(d => d.status === 'Needs Attention' || d.status === 'Under Maintenance').length;


    return (
         <div className="space-y-6">
             <div className="p-4 bg-card rounded-lg border">
                <h1 className="text-2xl font-bold">Selamat Datang, {user.name}!</h1>
                <p className="text-muted-foreground">Ini adalah ringkasan tugas dan status perangkat harian Anda.</p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <StatsCard title="Tugas Ditugaskan" value={assignedDevices.length} icon={HardHat} color="border-primary" />
                 <StatsCard title="Perangkat Operasional" value={operationalCount} icon={ShieldCheck} color="border-green-500" />
                 <StatsCard title="Butuh Perhatian" value={needsAttentionCount} icon={ShieldAlert} color="border-orange-500" />
            </div>

            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <HardHat className="text-primary"/>
                            Tugas Kunjungan Hari Ini
                        </CardTitle>
                        <CardDescription>Perangkat yang membutuhkan penanganan langsung dari Anda.</CardDescription>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/device-list">
                            <List className="mr-2"/>
                            Lihat Semua
                        </Link>
                    </Button>
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
                                <p>Tidak ada tugas aktif yang ditugaskan untuk Anda saat ini.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
         </div>
    );
}
