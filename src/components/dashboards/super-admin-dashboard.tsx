import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapView } from '@/components/map-view';
import { distributorLocations } from '@/lib/data';
import { Pencil, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { DistributorLocation } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusBadge: Record<DistributorLocation['applicationStatus'], string> = {
    'Active': 'bg-green-500/80',
    'Inactive': 'bg-gray-500/80',
    'Expired': 'bg-red-500/80',
}

export default function SuperAdminDashboard() {

    return (
        <div className="grid gap-6 p-4 sm:p-6" id="dashboard-content">
            <section id="map-section">
                <Card className="h-[60vh]">
                    <CardHeader>
                        <CardTitle>Peta Distributor</CardTitle>
                        <CardDescription>Lokasi distributor. Klik marker untuk melihat jumlah klinik yang dikelola.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-6rem)] p-0">
                    <MapView locations={distributorLocations} />
                    </CardContent>
                </Card>
            </section>

            <section id="distributor-management-section">
                <Card>
                    <CardHeader>
                        <CardTitle>Manajemen Distributor</CardTitle>
                        <CardDescription>Kelola lisensi aplikasi dan akun untuk semua distributor.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Distributor</TableHead>
                                    <TableHead>Status Lisensi</TableHead>
                                    <TableHead>Sisa Durasi</TableHead>
                                    <TableHead>Login Terakhir</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {distributorLocations.map((distributor) => (
                                    <TableRow key={distributor.id}>
                                        <TableCell className="font-medium">{distributor.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-normal">
                                                <span className={cn('h-2 w-2 rounded-full mr-2', statusBadge[distributor.applicationStatus])}></span>
                                                {distributor.applicationStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{distributor.licenseDuration}</TableCell>
                                        <TableCell>{distributor.lastLogin}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
