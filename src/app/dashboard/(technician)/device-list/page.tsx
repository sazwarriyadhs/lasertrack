
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ArrowRight, HardHat } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { devices, distributorClinics } from '@/lib/data';
import type { Device, DeviceStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
};


export default function TechnicianDeviceListPage() {
    const { user } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [clinicFilter, setClinicFilter] = useState('All');

    const myDistributorId = user.distributorId;
    
    const myDevices = useMemo(() => {
        if (!myDistributorId) return [];
        const myClinicIds = distributorClinics.filter(c => c.distributorId === myDistributorId).map(c => c.id);
        return devices.filter(d => myClinicIds.includes(d.clinicId));
    }, [myDistributorId]);

    const myClinics = useMemo(() => {
        if (!myDistributorId) return [];
        return distributorClinics.filter(c => c.distributorId === myDistributorId);
    }, [myDistributorId]);


    const filteredDevices = useMemo(() => {
        return myDevices.filter(device => {
            const clinic = myClinics.find(c => c.id === device.clinicId);
            const searchLower = searchTerm.toLowerCase();

            const matchesSearch = 
                device.name.toLowerCase().includes(searchLower) ||
                device.serialNumber.toLowerCase().includes(searchLower) ||
                clinic?.name.toLowerCase().includes(searchLower);

            const matchesStatus = statusFilter === 'All' || device.status === statusFilter;
            const matchesClinic = clinicFilter === 'All' || device.clinicId === clinicFilter;

            return matchesSearch && matchesStatus && matchesClinic;
        });
    }, [myDevices, myClinics, searchTerm, statusFilter, clinicFilter]);


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HardHat className="text-primary"/>
                    Daftar Semua Perangkat
                </CardTitle>
                <CardDescription>Telusuri semua perangkat yang dikelola oleh distributor Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari perangkat, SN, atau klinik..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select value={clinicFilter} onValueChange={setClinicFilter}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Filter Klinik" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">Semua Klinik</SelectItem>
                                {myClinics.map(clinic => <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Filter Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">Semua Status</SelectItem>
                                <SelectItem value="Operational">Operasional</SelectItem>
                                <SelectItem value="Under Maintenance">Dalam Perbaikan</SelectItem>
                                <SelectItem value="Needs Attention">Membutuhkan Perhatian</SelectItem>
                                <SelectItem value="Decommissioned">Decommissioned</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredDevices.length > 0 ? (
                        filteredDevices.map((device) => {
                            const clinic = myClinics.find(c => c.id === device.clinicId);
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
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Instalasi: {device.installDate} | Garansi Hingga: {device.warrantyEndDate}
                                        </p>
                                    </div>
                                    <Button asChild className="w-full sm:w-auto flex-shrink-0">
                                        <Link href={`/maintenance/${device.id}`}>
                                            Lihat & Lapor <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )})
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>Tidak ada perangkat yang cocok dengan filter Anda.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
