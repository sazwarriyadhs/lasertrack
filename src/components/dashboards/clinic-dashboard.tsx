
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { devices, maintenanceHistory, technicianLocations, distributorLocations, purchaseHistory } from '@/lib/data';
import type { Device, DeviceStatus, MaintenanceRecord, TechnicianLocation, PurchaseHistoryRecord } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail, User, CheckCircle, Wrench, Route, Send, Loader2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/app-context';


const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
};

const handlingStatusInfo = {
    'Dalam Perjalanan': { icon: Route, color: 'text-blue-500' },
    'Menangani': { icon: Wrench, color: 'text-yellow-500' },
    'Selesai': { icon: CheckCircle, color: 'text-green-500' },
};

const TechnicianStatusCard = ({ technician, device }: { technician: TechnicianLocation, device: Device }) => {
    const StatusIcon = handlingStatusInfo[technician.handlingStatus!].icon;
    const statusColor = handlingStatusInfo[technician.handlingStatus!].color;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Status Teknisi Aktif</CardTitle>
                <CardDescription>Informasi teknisi yang sedang menangani perangkat Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={technician.avatarUrl} alt={technician.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{technician.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <p className="font-bold text-lg">{technician.name}</p>
                        <p className="text-sm text-muted-foreground">Menangani: <span className="font-semibold">{device.name}</span></p>
                        <div className="flex items-center gap-2">
                             <StatusIcon className={cn("h-5 w-5", statusColor)} />
                            <p className={cn("font-semibold", statusColor)}>{technician.handlingStatus}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const ContactCard = () => {
    const distributor = distributorLocations.find(d => d.id === 'dist-5');
    const technicians = technicianLocations.filter(t => t.distributorId === 'dist-5');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">Distributor Anda</h3>
                    <div className="flex items-center gap-4">
                         <Avatar>
                            <AvatarImage src={distributor?.avatarUrl} alt={distributor?.name} data-ai-hint="company logo" />
                            <AvatarFallback>{distributor?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                             <p className="font-medium">{distributor?.name}</p>
                             <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <Mail className="h-4 w-4" />
                                <span>{distributor?.contact.email}</span>
                             </div>
                             <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{distributor?.contact.phone}</span>
                             </div>
                        </div>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2">Teknisi Tersedia</h3>
                     {technicians.map(technician => (
                        <div key={technician.id} className="flex items-center gap-4 mb-3">
                            <Avatar>
                                <AvatarImage src={technician?.avatarUrl} alt={technician?.name} data-ai-hint="person portrait" />
                                <AvatarFallback>{technician?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{technician?.name}</p>
                                <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                    <Mail className="h-4 w-4" />
                                    <span>{technician?.contact.email}</span>
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{technician?.contact.phone}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const MaintenanceRequestForm = ({ devices }: { devices: Device[] }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDevice || !description) {
            toast({
                variant: 'destructive',
                title: 'Form Tidak Lengkap',
                description: 'Harap pilih perangkat dan isi deskripsi masalah.',
            });
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast({
                title: 'Laporan Terkirim',
                description: 'Permintaan maintenance Anda telah dikirim ke distributor.',
            });
            setIsLoading(false);
            setSelectedDevice('');
            setDescription('');
        }, 1500);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Permintaan Maintenance & Laporan</CardTitle>
                <CardDescription>Laporkan masalah perangkat atau minta jadwal maintenance.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="device-select">Pilih Perangkat</Label>
                        <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                            <SelectTrigger id="device-select">
                                <SelectValue placeholder="Pilih perangkat yang bermasalah" />
                            </SelectTrigger>
                            <SelectContent>
                                {devices.map(device => (
                                    <SelectItem key={device.id} value={device.id}>
                                        {device.name} (SN: {device.serialNumber})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi Masalah</Label>
                        <Textarea
                            id="description"
                            placeholder="Jelaskan masalah yang Anda alami..."
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2" />}
                        Kirim Laporan
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};


export default function ClinicDashboard() {
    const { user } = useApp();
    const clinicId = 'clinic-6'; // Static for demo - assuming logged in user is from this clinic
    const clinicDevices = devices.filter(d => d.clinicId === clinicId);
    const clinicMaintenanceHistory = maintenanceHistory.filter(h => clinicDevices.some(d => d.id === h.deviceId));
    const clinicPurchaseHistory = purchaseHistory.filter(h => clinicDevices.some(d => d.id === h.deviceId));
    
    const activeMaintenanceDevice = clinicDevices.find(d => d.status === 'Under Maintenance' || d.status === 'Needs Attention');
    const assignedTechnician = activeMaintenanceDevice ? technicianLocations.find(t => t.handledDeviceId === activeMaintenanceDevice.id) : undefined;

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Perangkat Saya</CardTitle>
                        <CardDescription>Daftar semua perangkat yang terdaftar di klinik Anda, {user.name}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Perangkat</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Serial No.</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Maintenance Terakhir</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clinicDevices.map((device) => (
                                    <TableRow key={device.id}>
                                        <TableCell className="font-medium">{device.name}</TableCell>
                                        <TableCell>{device.model}</TableCell>
                                        <TableCell>{device.serialNumber}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-normal">
                                                <span className={cn('h-2 w-2 rounded-full mr-2', statusColors[device.status])}></span>
                                                {device.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{device.lastMaintenance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Maintenance</CardTitle>
                        <CardDescription>Catatan maintenance untuk semua perangkat Anda.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Perangkat</TableHead>
                                    <TableHead>Teknisi</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clinicMaintenanceHistory.map((record) => {
                                    const device = clinicDevices.find(d => d.id === record.deviceId);
                                    return (
                                        <TableRow key={record.id}>
                                            <TableCell>{record.date}</TableCell>
                                            <TableCell className="font-medium">{device?.name}</TableCell>
                                            <TableCell>{record.technicianName}</TableCell>
                                            <TableCell>{record.description}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Pembelian Perangkat</CardTitle>
                        <CardDescription>Informasi pembelian dan garansi untuk perangkat Anda.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tgl. Pembelian</TableHead>
                                    <TableHead>Nama Perangkat</TableHead>
                                    <TableHead>Distributor</TableHead>
                                    <TableHead>Garansi Berakhir</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clinicPurchaseHistory.map((record: PurchaseHistoryRecord) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.purchaseDate}</TableCell>
                                        <TableCell className="font-medium">{record.deviceName}</TableCell>
                                        <TableCell>{record.distributorName}</TableCell>
                                        <TableCell>
                                            <div className='flex items-center gap-2'>
                                                <Calendar className='w-4 h-4 text-muted-foreground' />
                                                <span>{record.warrantyEndDate}</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 space-y-6">
                {assignedTechnician && activeMaintenanceDevice && (
                    <TechnicianStatusCard technician={assignedTechnician} device={activeMaintenanceDevice} />
                )}
                <MaintenanceRequestForm devices={clinicDevices} />
                <ContactCard />
            </div>
        </div>
    );
}
