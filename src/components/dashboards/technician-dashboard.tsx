import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { devices } from '@/lib/data';
import type { DeviceStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
};

export default function TechnicianDashboard() {
    const assignedDevices = devices.filter(d => d.status === 'Under Maintenance' || d.status === 'Needs Attention');

    return (
         <Card>
            <CardHeader>
                <CardTitle>Maintenance Assignments</CardTitle>
                <CardDescription>Devices that require your attention.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Device</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Maintenance</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assignedDevices.map((device) => (
                            <TableRow key={device.id}>
                                <TableCell className="font-medium">{device.name} <span className="text-sm text-muted-foreground">({device.model})</span></TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-normal">
                                        <span className={cn('h-2 w-2 rounded-full mr-2', statusColors[device.status])}></span>
                                        {device.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{device.lastMaintenance}</TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/maintenance/${device.id}`}>
                                            Start Maintenance <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
