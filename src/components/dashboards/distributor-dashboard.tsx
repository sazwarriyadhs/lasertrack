
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapView } from '@/components/map-view';
import { distributorClinics as allClinics, devices } from '@/lib/data';
import type { ClinicLocation, Device } from '@/lib/types';
import { useApp } from '@/context/app-context';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DistributorDashboard() {
    const { user } = useApp();
    const distributorId = user.distributorId;

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const myClinics = useMemo(() => {
        if (!distributorId) return [];
        return allClinics.filter(loc => loc.distributorId === distributorId);
    }, [distributorId]);

    const getClinicDeviceStatus = (clinicId: string): Device['status'] | null => {
        const clinicDevices = devices.filter(d => d.clinicId === clinicId);
        if (clinicDevices.length === 0) return null;
        if (clinicDevices.some(d => d.status === 'Needs Attention')) return 'Needs Attention';
        if (clinicDevices.some(d => d.status === 'Under Maintenance')) return 'Under Maintenance';
        if (clinicDevices.every(d => d.status === 'Operational')) return 'Operational';
        return null;
    };
    
    const filteredClinics = useMemo(() => {
        let clinics = myClinics.map(clinic => ({
            ...clinic,
            devices: devices.filter(d => d.clinicId === clinic.id)
        }));

        return clinics.filter(clinic => {
            const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase());
            const clinicStatus = getClinicDeviceStatus(clinic.id);
            const matchesStatus = statusFilter === 'All' || clinicStatus === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [myClinics, searchTerm, statusFilter]);

    return (
        <Card className="h-[85vh]">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <CardTitle>Peta Jaringan Klinik</CardTitle>
                        <CardDescription>Lokasi klinik yang Anda kelola. Gunakan filter untuk mencari.</CardDescription>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama klinik..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Filter Status Perangkat" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">Semua Status</SelectItem>
                                <SelectItem value="Needs Attention">Membutuhkan Perhatian</SelectItem>
                                <SelectItem value="Under Maintenance">Dalam Perbaikan</SelectItem>
                                <SelectItem value="Operational">Operasional</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-10rem)] sm:h-[calc(100%-8rem)] p-0">
                <MapView locations={filteredClinics} initialZoom={5} />
            </CardContent>
        </Card>
    );
}
