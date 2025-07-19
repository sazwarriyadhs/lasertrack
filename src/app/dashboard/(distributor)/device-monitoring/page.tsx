'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { devices, distributorClinics } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { DeviceStatus } from '@/lib/types';

const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
};

export default function DeviceMonitoringPage() {
    const distributorId = 'dist-1'; // Static for now
    const myClinics = distributorClinics.filter(loc => loc.distributorId === distributorId);
    const myDevices = devices.filter(device => myClinics.some(c => c.id === device.clinicId));

    return (
        <Card>
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>Monitoring Perangkat</CardTitle>
                    <CardDescription>Status semua perangkat di klinik yang Anda kelola.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className='mr-2' />
                    Jadwalkan Maintenance
                </Button>
            </CardHeader>
            <CardContent>
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
                        {myDevices.map((device) => {
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
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
