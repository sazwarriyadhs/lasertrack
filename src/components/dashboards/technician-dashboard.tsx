
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { devices, distributorClinics, maintenanceHistory } from '@/lib/data';
import type { Device, DeviceStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight, HardHat, ShieldCheck, ShieldAlert, Bell, List, Calendar, Wrench, Plus, FileText, FileClock, ClipboardList, Briefcase } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const NavCard = ({ title, description, icon, href }: { title: string, description: string, icon: React.ElementType, href: string }) => {
    const Icon = icon;
    return (
        <Link href={href}>
            <Card className="hover:bg-muted/50 hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <p className="font-semibold text-sm mt-2">{title}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </Link>
    );
};


export default function TechnicianDashboard() {
    const { user } = useApp();

    const { assignedDevices, myDevices, myHistory } = useMemo(() => {
        if (!user.id) return { assignedDevices: [], myDevices: [], myHistory: [] };

        const myDevs = devices.filter(d => d.assignedTechnicianId === user.id);
        
        const myClinicIds = distributorClinics.filter(c => c.distributorId === user.distributorId).map(c => c.id);
        const allMyDistributorDevices = devices.filter(d => myClinicIds.includes(d.clinicId));
        const hist = maintenanceHistory.filter(h => h.technicianName === user.name);

        return { assignedDevices: myDevs, myDevices: allMyDistributorDevices, myHistory: hist };
    }, [user.id, user.name, user.distributorId]);
    
    const lastSPK = maintenanceHistory.find(h => h.technicianName === user.name);

    return (
         <div className="space-y-6">
             <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="p-0 flex-row items-center gap-4">
                     <Avatar className="h-16 w-16 border">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                        <h1 className="text-2xl font-bold">Halo, {user.name}!</h1>
                        <p className="text-muted-foreground">Selamat datang di dasbor Anda.</p>
                    </div>
                     <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifikasi</span>
                    </Button>
                </CardHeader>
            </Card>
            
            <Card>
                <CardHeader className='pb-2'>
                    <CardTitle className='text-base flex items-center gap-2'>
                        <Briefcase className='w-5 h-5'/>
                        Surat Perintah Kerja (SPK) Terbaru
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex items-center justify-between'>
                    <div>
                        <p className='font-semibold'>{lastSPK?.description || "Tidak ada SPK aktif"}</p>
                        <p className='text-sm text-muted-foreground'>
                            {lastSPK ? `Untuk perangkat ${devices.find(d => d.id === lastSPK.deviceId)?.name}` : 'Semua pekerjaan telah selesai.'}
                        </p>
                    </div>
                    <Button variant="secondary" size="sm">Lihat Detail</Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <NavCard 
                    title="Kunjungan Hari Ini"
                    description={`${assignedDevices.length} tugas`}
                    icon={ClipboardList}
                    href="/dashboard/device-list"
                 />
                 <NavCard 
                    title="Alat Butuh Perawatan"
                    description={`${myDevices.filter(d => d.status === 'Needs Attention').length} alat`}
                    icon={Wrench}
                    href="/dashboard/device-list"
                 />
                 <NavCard 
                    title="Tambah Laporan"
                    description="Laporkan pekerjaan baru"
                    icon={Plus}
                    href="/dashboard/device-list"
                 />
                 <NavCard 
                    title="Riwayat Servis"
                    description={`${myHistory.length} laporan`}
                    icon={FileClock}
                    href="#"
                 />
            </div>


            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <HardHat className="text-primary"/>
                            Tugas yang Ditugaskan
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
                            assignedDevices.slice(0, 3).map((device) => {
                                const clinic = distributorClinics.find(c => c.id === device.clinicId);
                                return (
                                <Card key={device.id} className="bg-muted/30">
                                    <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <Badge variant={device.status === 'Needs Attention' ? 'destructive' : 'secondary'} className="font-normal mb-2">
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
                                <ShieldCheck className="mx-auto h-12 w-12 text-green-500 mb-2" />
                                <p className="font-semibold">Tidak ada tugas aktif.</p>
                                <p className="text-sm">Semua perangkat dalam kondisi baik.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
         </div>
    );
}
