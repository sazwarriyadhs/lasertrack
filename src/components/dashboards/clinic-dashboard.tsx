
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { devices, maintenanceHistory, technicianLocations, distributorLocations, purchaseHistory, distributorClinics } from '@/lib/data';
import type { Device, DeviceStatus, MaintenanceRecord, TechnicianLocation, PurchaseHistoryRecord, DistributorLocation, ClinicLocation, HandlingStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail, User, CheckCircle, Wrench, Route, Send, Loader2, Calendar, FileText, MapPin } from 'lucide-react';
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
import { MapView } from '../map-view';
import { useLanguage } from '@/context/language-context';
import React from 'react';


const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
};

const handlingStatusInfo: Record<HandlingStatus, { icon: React.ElementType, color: string }> = {
    'Dalam Perjalanan': { icon: Route, color: 'text-blue-500' },
    'Menangani': { icon: Wrench, color: 'text-yellow-500' },
    'Selesai': { icon: CheckCircle, color: 'text-green-500' },
    'Standby': { icon: CheckCircle, color: 'text-gray-500' },
};

const TechnicianStatusCard = ({ technician, device }: { technician: TechnicianLocation, device: Device }) => {
    const statusInfo = technician.handlingStatus ? handlingStatusInfo[technician.handlingStatus] : null;

    if (!statusInfo) return null;

    const StatusIcon = statusInfo.icon;
    const statusColor = statusInfo.color;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Status Teknisi Aktif</CardTitle>
                <CardDescription>Informasi teknisi yang sedang menangani perangkat Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16" data-ai-hint="person portrait">
                        <AvatarImage src={technician.avatarUrl} alt={technician.name} />
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

const ContactCard = ({distributor, technicians}: {distributor: DistributorLocation | undefined, technicians: TechnicianLocation[]}) => {
    const {t} = useLanguage();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('contact_information')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 {distributor && (
                    <div>
                        <h3 className="font-semibold mb-2">{t('your_distributor')}</h3>
                        <div className="flex items-center gap-4">
                            <Avatar data-ai-hint="company logo">
                                <AvatarImage src={distributor.avatarUrl} alt={distributor.name} />
                                <AvatarFallback>{distributor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{distributor.name}</p>
                                <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                    <Mail className="h-4 w-4" />
                                    <span>{distributor.contact.email}</span>
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{distributor.contact.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                 )}
                 <div>
                    <h3 className="font-semibold mb-2">{t('available_technicians')}</h3>
                     {technicians.map(technician => (
                        <div key={technician.id} className="flex items-center gap-4 mb-3">
                            <Avatar data-ai-hint="person portrait">
                                <AvatarImage src={technician?.avatarUrl} alt={technician?.name} />
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
                    {technicians.length === 0 && <p className="text-sm text-muted-foreground">{t('no_technicians_available')}</p>}
                </div>
            </CardContent>
        </Card>
    );
};

const MaintenanceRequestForm = ({ devices }: { devices: Device[] }) => {
    const { toast } = useToast();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDevice || !description) {
            toast({
                variant: 'destructive',
                title: t('form_incomplete_title'),
                description: t('form_incomplete_desc'),
            });
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast({
                title: t('report_sent_title'),
                description: t('report_sent_desc'),
            });
            setIsLoading(false);
            setSelectedDevice('');
            setDescription('');
        }, 1500);
    };

    return (
        <Card id="request-service-section">
            <CardHeader>
                <CardTitle>{t('maintenance_request_title')}</CardTitle>
                <CardDescription>{t('maintenance_request_desc')}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="device-select">{t('select_device')}</Label>
                        <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                            <SelectTrigger id="device-select">
                                <SelectValue placeholder={t('select_device_placeholder')} />
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
                        <Label htmlFor="description">{t('problem_description')}</Label>
                        <Textarea
                            id="description"
                            placeholder={t('problem_description_placeholder_clinic')}
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2" />}
                        {t('send_report')}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};


export default function ClinicDashboard() {
    const { user } = useApp();
    const {t} = useLanguage();
    const clinicId = user.clinicId; 
    const myClinic = distributorClinics.find(c => c.id === clinicId);
    const clinicDevices = devices.filter(d => d.clinicId === clinicId);
    const myDistributor = distributorLocations.find(d => d.id === user.distributorId);
    const myTechnicians = technicianLocations.filter(t => t.distributorId === user.distributorId);
    const clinicMaintenanceHistory = maintenanceHistory.filter(h => clinicDevices.some(d => d.id === h.deviceId));
    const clinicPurchaseHistory = purchaseHistory.filter(h => h.deviceId && clinicDevices.some(d => d.id === h.deviceId));
    
    const activeMaintenanceDevice = clinicDevices.find(d => d.status === 'Under Maintenance' || d.status === 'Needs Attention');
    const assignedTechnician = activeMaintenanceDevice ? myTechnicians.find(t => t.handledDeviceId === activeMaintenanceDevice.id) : undefined;

    const mapLocations = [myClinic, myDistributor].filter(Boolean) as (ClinicLocation | DistributorLocation)[];

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                 {myClinic && myDistributor && (
                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2">
                                <MapPin className="text-primary"/>
                                {t('location_map')}
                            </CardTitle>
                            <CardDescription>{t('location_map_desc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="h-64 p-0">
                            <MapView locations={mapLocations} initialZoom={10} />
                        </CardContent>
                    </Card>
                )}
                <Card id="my-devices-section">
                    <CardHeader>
                        <CardTitle>{t('my_devices_title')}</CardTitle>
                        <CardDescription>{t('my_devices_desc', {name: user.name})}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('device_name')}</TableHead>
                                    <TableHead>{t('model')}</TableHead>
                                    <TableHead>{t('serial_no')}</TableHead>
                                    <TableHead>{t('status')}</TableHead>
                                    <TableHead>{t('last_maintenance')}</TableHead>
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
                                                {t(device.status.toLowerCase().replace(/ /g, '_'))}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{device.lastMaintenance}</TableCell>
                                    </TableRow>
                                ))}
                                {clinicDevices.length === 0 && (
                                     <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            {t('no_devices_registered')}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card id="maintenance-history-section">
                    <CardHeader>
                        <CardTitle>{t('maintenance_history_title')}</CardTitle>
                        <CardDescription>{t('maintenance_history_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('date')}</TableHead>
                                    <TableHead>{t('device')}</TableHead>
                                    <TableHead>{t('technician')}</TableHead>
                                    <TableHead>{t('description')}</TableHead>
                                    <TableHead className='text-right'>{t('report')}</TableHead>
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
                                            <TableCell className='text-right'>
                                                <Button variant="ghost" size="icon">
                                                    <FileText className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                                 {clinicMaintenanceHistory.length === 0 && (
                                     <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            {t('no_maintenance_history')}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('purchase_history_title')}</CardTitle>
                        <CardDescription>{t('purchase_history_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('purchase_date')}</TableHead>
                                    <TableHead>{t('device_name')}</TableHead>
                                    <TableHead>{t('distributor')}</TableHead>
                                    <TableHead>{t('warranty_end_date')}</TableHead>
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
                                {clinicPurchaseHistory.length === 0 && (
                                     <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            {t('no_purchase_history')}
                                        </TableCell>
                                    </TableRow>
                                )}
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
                <ContactCard distributor={myDistributor} technicians={myTechnicians} />
            </div>
        </div>
    );
}
