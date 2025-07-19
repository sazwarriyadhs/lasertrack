'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapView } from '@/components/map-view';
import { distributorLocations as initialDistributorLocations } from '@/lib/data';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { DistributorLocation } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DistributorForm } from '@/components/distributor-form';

const statusBadge: Record<DistributorLocation['applicationStatus'], string> = {
    'Active': 'bg-green-500/80',
    'Inactive': 'bg-gray-500/80',
    'Expired': 'bg-red-500/80',
}

export default function SuperAdminDashboard() {
    const [distributors, setDistributors] = useState<DistributorLocation[]>(initialDistributorLocations);
    const [selectedDistributor, setSelectedDistributor] = useState<DistributorLocation | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleAdd = () => {
        setSelectedDistributor(null);
        setIsFormOpen(true);
    };

    const handleEdit = (distributor: DistributorLocation) => {
        setSelectedDistributor(distributor);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        setDistributors(prev => prev.filter(d => d.id !== id));
    };

    const handleFormSubmit = (data: Omit<DistributorLocation, 'id' | 'type' | 'position' | 'clinicCount' | 'lastLogin'>) => {
        if (selectedDistributor) {
            // Update
            setDistributors(prev => prev.map(d => d.id === selectedDistributor.id ? { ...selectedDistributor, ...data } : d));
        } else {
            // Create
            const newDistributor: DistributorLocation = {
                id: `dist-${Date.now()}`,
                ...data,
                type: 'Distributor',
                position: { lat: 40.7128, lng: -74.0060 }, // Default position for new distributors
                clinicCount: 0,
                lastLogin: new Date().toISOString().split('T')[0],
            };
            setDistributors(prev => [newDistributor, ...prev]);
        }
        setIsFormOpen(false);
        setSelectedDistributor(null);
    };


    return (
        <div className="grid gap-6 p-4 sm:p-6" id="dashboard-content">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                 <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{selectedDistributor ? 'Edit Distributor' : 'Tambah Distributor Baru'}</DialogTitle>
                        <DialogDescription>
                            {selectedDistributor ? 'Ubah informasi distributor di bawah ini.' : 'Isi detail untuk distributor baru.'}
                        </DialogDescription>
                    </DialogHeader>
                    <DistributorForm
                        onSubmit={handleFormSubmit}
                        defaultValues={selectedDistributor}
                        onCancel={() => setIsFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <section id="map-section">
                <Card className="h-[60vh]">
                    <CardHeader>
                        <CardTitle>Peta Distributor</CardTitle>
                        <CardDescription>Lokasi distributor. Klik marker untuk melihat jumlah klinik yang dikelola.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-6rem)] p-0">
                    <MapView locations={distributors} />
                    </CardContent>
                </Card>
            </section>

            <section id="distributor-management-section">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Manajemen Distributor</CardTitle>
                            <CardDescription>Kelola lisensi aplikasi dan akun untuk semua distributor.</CardDescription>
                        </div>
                        <Button onClick={handleAdd}>
                            <PlusCircle className="mr-2" />
                            Tambah Distributor
                        </Button>
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
                                {distributors.map((distributor) => (
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
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(distributor)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                             <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tindakan ini tidak dapat diurungkan. Ini akan menghapus data distributor secara permanen.
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(distributor.id)}>Hapus</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
