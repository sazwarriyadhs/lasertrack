'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { devices, technicianLocations as allTechnicians, distributorClinics } from '@/lib/data';

export default function TechnicianManagementPage() {
    const distributorId = 'dist-1'; // Static for now
    const myTechnicians = allTechnicians.filter(loc => loc.distributorId === distributorId);

    return (
        <Card>
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>Manajemen Tim Teknisi</CardTitle>
                    <CardDescription>Daftar teknisi, jadwal, dan riwayat pekerjaan.</CardDescription>
                </div>
                <Button>
                    <UserPlus className='mr-2' />
                    Tambah Teknisi
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Teknisi</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tugas Aktif</TableHead>
                            <TableHead>Kontak</TableHead>
                            <TableHead className="text-right">Riwayat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myTechnicians.map((tech) => (
                            <TableRow key={tech.id}>
                                <TableCell className="font-medium">{tech.name}</TableCell>
                                <TableCell>
                                    <Badge variant={tech.dutyStatus === 'On Duty' ? 'default' : 'secondary'}>{tech.dutyStatus === 'On Duty' ? tech.handlingStatus : 'Off Duty'}</Badge>
                                </TableCell>
                                <TableCell>{tech.handledDeviceId ? devices.find(d => d.id === tech.handledDeviceId)?.name : 'Standby'}</TableCell>
                                <TableCell>{tech.contact.phone}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">Lihat Laporan</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
