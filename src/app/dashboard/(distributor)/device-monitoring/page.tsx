
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { devices, distributorClinics } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Device, DeviceStatus } from '@/lib/types';
import Link from 'next/link';
import { useApp } from '@/context/app-context';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
};

export default function DeviceMonitoringPage() {
    const { user } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    
    const distributorId = user.distributorId;
    const myClinics = distributorClinics.filter(loc => loc.distributorId === distributorId);
    const myDevices = devices.filter(device => myClinics.some(c => c.id === device.clinicId));

    const filteredDevices = useMemo(() => {
        return myDevices.filter(device => {
            const clinic = myClinics.find(c => c.id === device.clinicId);
            const searchLower = searchTerm.toLowerCase();

            const matchesSearch = 
                device.name.toLowerCase().includes(searchLower) ||
                device.serialNumber.toLowerCase().includes(searchLower) ||
                device.model.toLowerCase().includes(searchLower) ||
                clinic?.name.toLowerCase().includes(searchLower);

            const matchesStatus = statusFilter === 'All' || device.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [myDevices, myClinics, searchTerm, statusFilter]);

    return (
        <Card>
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>Monitoring Perangkat</CardTitle>
                    <CardDescription>Status semua perangkat di klinik yang Anda kelola.</CardDescription>
                </div>
                 <Button asChild>
                    <Link href="/dashboard/technician-assignment">
                        <PlusCircle className='mr-2' />
                        Jadwalkan Maintenance
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari perangkat, SN, atau klinik..."
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
                            <SelectItem value="Operational">Operasional</SelectItem>
                            <SelectItem value="Under Maintenance">Dalam Perbaikan</SelectItem>
                            <SelectItem value="Needs Attention">Membutuhkan Perhatian</SelectItem>
                            <SelectItem value="Decommissioned">Decommissioned</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Klinik</TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Serial No.</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Maintenance Terakhir</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDevices.map((device) => {
                            const clinic = myClinics.find(c => c.id === device.clinicId);
                            return (
                                <TableRow key={device.id}>
                                    <TableCell className="font-medium">{clinic?.name || 'N/A'}</TableCell>
                                    <TableCell>{device.name}</TableCell>
                                    <TableCell>{device.serialNumber}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-normal">
                                            <span className={cn('h-2 w-2 rounded-full mr-2', statusColors[device.status])}></span>
                                            {device.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{device.lastMaintenance}</TableCell>
                                </TableRow>
                            )
                        })}
                        {filteredDevices.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Tidak ada perangkat yang cocok dengan kriteria.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
