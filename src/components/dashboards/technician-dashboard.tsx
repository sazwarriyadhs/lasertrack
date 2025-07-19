
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { devices, distributorClinics, maintenanceHistory } from '@/lib/data';
import { ArrowRight, HardHat, Bell, List, Calendar, Wrench, Plus, FileClock, Briefcase, ClipboardList } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';


const StatCard = ({ title, value, icon, href }: { title: string, value: number | string, icon: React.ElementType, href: string }) => {
    const Icon = icon;
    return (
        <Link href={href} className="block">
            <Card className="hover:bg-muted/50 hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-1">
                     <div className="relative">
                        <Icon className="h-10 w-10 text-primary mb-2" />
                        {title.includes("Kunjungan") && (
                            <span className='absolute top-0 right-0 h-5 w-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center' style={{transform: 'translate(40%, -20%)'}}>3</span>
                        )}
                    </div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-sm text-muted-foreground">{title}</p>
                </CardContent>
            </Card>
        </Link>
    );
};

const NavCard = ({ title, icon, href }: { title: string, icon: React.ElementType, href: string }) => {
    const Icon = icon;
    return (
        <Link href={href}>
            <Card className="hover:bg-muted/50 hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <p className="font-semibold text-sm mt-1">{title}</p>
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
    

    return (
         <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                     <Avatar className="h-14 w-14 border">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-bold">Muhammad Aditya</h1>
                        <p className="text-muted-foreground">Teknisi</p>
                    </div>
                </div>
                 <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-6 w-6" />
                     <Badge className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center" variant="destructive">2</Badge>
                    <span className="sr-only">Notifikasi</span>
                </Button>
            </div>
            
            <h2 className="text-2xl font-bold">Dashboard</h2>

             <div className="grid grid-cols-3 gap-4">
                <StatCard 
                    title="Kunjungan Hari Ini"
                    value={5}
                    icon={Calendar}
                    href="#"
                />
                <StatCard 
                    title="Alat Butuh Perawatan"
                    value={myDevices.filter(d => d.status === 'Needs Attention').length}
                    icon={Wrench}
                    href="/dashboard/device-list"
                />
                <StatCard 
                    title="Notifikasi Baru"
                    value={2}
                    icon={Bell}
                    href="#"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                 <NavCard 
                    title="Tambah Laporan"
                    icon={Plus}
                    href="/dashboard/device-list"
                 />
                  <NavCard 
                    title="Jadwal Kunjungan"
                    icon={Calendar}
                    href="#"
                 />
                 <NavCard 
                    title="Semua Alat"
                    icon={Briefcase}
                    href="/dashboard/device-list"
                 />
                 <NavCard 
                    title="Riwayat Servis"
                    icon={ClipboardList}
                    href="#"
                 />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HardHat className="text-primary"/>
                        Tugas Mendesak
                    </CardTitle>
                    <CardDescription>Perangkat yang membutuhkan penanganan segera.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {assignedDevices.length > 0 ? (
                            assignedDevices.slice(0, 2).map((device) => {
                                const clinic = distributorClinics.find(c => c.id === device.clinicId);
                                return (
                                <Card key={device.id} className="bg-muted/30">
                                    <CardContent className="p-4 flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <Badge variant={device.status === 'Needs Attention' ? 'destructive' : 'secondary'} className="font-normal mb-2">
                                                {device.status}
                                            </Badge>
                                            <h3 className="font-semibold">{device.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {clinic?.name}
                                            </p>
                                        </div>
                                        <Button asChild size="sm" className="flex-shrink-0">
                                            <Link href={`/maintenance/${device.id}`}>
                                                Lihat <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )})
                        ) : (
                            <div className="text-center py-6 text-muted-foreground">
                                <p className="text-sm">Tidak ada tugas mendesak.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

         </div>
    );
}

