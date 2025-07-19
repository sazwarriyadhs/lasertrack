import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { devices } from '@/lib/data';
import type { DeviceStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
};

export default function ClinicDashboard() {
    const clinicDevices = devices.filter(d => d.clinicId === 'clinic-1' || d.clinicId === 'clinic-2');

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Devices</CardTitle>
                <CardDescription>A list of all devices registered to your clinic.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Device Name</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>Serial No.</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Maintenance</TableHead>
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
    );
}
