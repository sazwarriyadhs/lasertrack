
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapView } from '@/components/map-view';
import { distributorLocations as initialDistributorLocations } from '@/lib/data';
import { Pencil, Trash2, PlusCircle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { DistributorLocation } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusBadge: Record<DistributorLocation['applicationStatus'], string> = {
    'Active': 'bg-green-500/80',
    'Inactive': 'bg-gray-500/80',
    'Expired': 'bg-red-500/80',
}

export default function SuperAdminDashboard() {
    const [distributors, setDistributors] = useState<DistributorLocation[]>(initialDistributorLocations);
    const [selectedDistributor, setSelectedDistributor] = useState<DistributorLocation | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredDistributors = useMemo(() => {
        return distributors.filter(distributor => {
            const matchesSearch = distributor.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All' || distributor.applicationStatus === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [distributors, searchTerm, statusFilter]);

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
                position: { lat: -6.2088, lng: 106.8456 }, // Default position Jakarta
                clinicCount: 0,
                lastLogin: new Date().toISOString().split('T')[0],
            };
            setDistributors(prev => [newDistributor, ...prev]);
        }
        setIsFormOpen(false);
        setSelectedDistributor(null);
    };


    return (
        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-3" id="dashboard-content">
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

            <section id="map-section" className="lg:col-span-3">
                <Card className="h-[60vh]">
                    <CardHeader>
                        <CardTitle>Peta Distributor</CardTitle>
                        <CardDescription>Lokasi distributor. Gunakan filter di bawah untuk menampilkan data spesifik.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-6rem)] p-0">
                    <MapView locations={filteredDistributors} initialZoom={5} />
                    </CardContent>
                </Card>
            </section>

            <section id="distributor-management-section" className="lg:col-span-3">
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
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Cari nama distributor..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">Semua Status</SelectItem>
                                    <SelectItem value="Active">Aktif</SelectItem>
                                    <SelectItem value="Inactive">Tidak Aktif</SelectItem>
                                    <SelectItem value="Expired">Kadaluarsa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
                                {filteredDistributors.map((distributor) => (
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
                                 {filteredDistributors.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            Tidak ada distributor yang cocok dengan kriteria pencarian.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
