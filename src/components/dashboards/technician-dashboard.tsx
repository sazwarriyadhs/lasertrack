
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { devices, distributorClinics, maintenanceHistory } from '@/lib/data';
import { ArrowRight, HardHat, Bell, List, Calendar, Wrench, Plus, Briefcase, ClipboardList } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useLanguage } from '@/context/language-context';


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
    const { t } = useLanguage();

    const { assignedDevices, urgentTasks } = useMemo(() => {
        if (!user.id) return { assignedDevices: [], urgentTasks: [] };
        
        // Devices assigned to this technician
        const assigned = devices.filter(d => d.assignedTechnicianId === user.id);
        
        // All devices from the technician's distributor that need attention
        const myClinicIds = distributorClinics.filter(c => c.distributorId === user.distributorId).map(c => c.id);
        const urgent = devices.filter(d => myClinicIds.includes(d.clinicId) && d.status === 'Needs Attention');
        
        return { 
            assignedDevices: assigned,
            urgentTasks: urgent
        };
    }, [user.id, user.distributorId]);
    

    return (
         <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                     <Avatar className="h-14 w-14 border">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-bold">{user.name}</h1>
                        <p className="text-muted-foreground">{t('Technician')}</p>
                    </div>
                </div>
                 <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-6 w-6" />
                     <Badge className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center" variant="destructive">2</Badge>
                    <span className="sr-only">{t('notifications')}</span>
                </Button>
            </div>
            
            <h2 className="text-2xl font-bold">{t('dashboard_title', {role: ''}).replace(' Dashboard', '')}</h2>

             <div className="grid grid-cols-3 gap-4">
                <StatCard 
                    title={t('Kunjungan Hari Ini')}
                    value={5}
                    icon={Calendar}
                    href="#"
                />
                <StatCard 
                    title={t('Alat Butuh Perawatan')}
                    value={urgentTasks.length}
                    icon={Wrench}
                    href="/dashboard/device-list"
                />
                <StatCard 
                    title={t('Notifikasi Baru')}
                    value={2}
                    icon={Bell}
                    href="#"
                />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <NavCard 
                    title={t('Tambah Laporan')}
                    icon={Plus}
                    href="/dashboard/device-list"
                 />
                  <NavCard 
                    title={t('Jadwal Kunjungan')}
                    icon={Calendar}
                    href="#"
                 />
                 <NavCard 
                    title={t('Semua Alat')}
                    icon={Briefcase}
                    href="/dashboard/device-list"
                 />
                 <NavCard 
                    title={t('Riwayat Servis')}
                    icon={ClipboardList}
                    href="#"
                 />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HardHat className="text-primary"/>
                        {t('Tugas Mendesak')}
                    </CardTitle>
                    <CardDescription>{t('Perangkat yang membutuhkan penanganan segera.')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {assignedDevices.length > 0 ? (
                            assignedDevices.slice(0, 3).map((device) => {
                                const clinic = distributorClinics.find(c => c.id === device.clinicId);
                                return (
                                <Card key={device.id} className="bg-muted/30">
                                    <CardContent className="p-4 flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <Badge variant={device.status === 'Needs Attention' ? 'destructive' : 'secondary'} className="font-normal mb-2">
                                                {t(device.status.toLowerCase().replace(/ /g, '_'))}
                                            </Badge>
                                            <h3 className="font-semibold">{device.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {clinic?.name}
                                            </p>
                                        </div>
                                        <Button asChild size="sm" className="flex-shrink-0">
                                            <Link href={`/maintenance/${device.id}`}>
                                                {t('Lihat')} <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )})
                        ) : (
                            <div className="text-center py-6 text-muted-foreground">
                                <p className="text-sm">{t('Tidak ada tugas mendesak.')}</p>
                            </div>
                        )}
                         {assignedDevices.length === 0 && urgentTasks.length > 0 && (
                             <div className="text-center py-6 text-muted-foreground">
                                <p className="text-sm">{t('Ada {{count}} perangkat butuh perhatian. Cek daftar perangkat.', {count: urgentTasks.length})}</p>
                                <Button asChild variant="link">
                                    <Link href="/dashboard/device-list">{t('Lihat daftar perangkat')}</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

         </div>
    );
}
