
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus, Pencil, Trash2, PlusCircle, Search } from 'lucide-react';
import { devices, distributorClinics as allClinics, locations } from '@/lib/data';
import type { ClinicLocation, Device } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { ClinicForm } from '@/components/clinic-form';
import { useApp } from '@/context/app-context';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function ClinicManagementPage() {
    const { user } = useApp();
    const distributorId = user.distributorId;

    const [clinics, setClinics] = useState<ClinicLocation[]>(
        allClinics.filter(loc => loc.distributorId === distributorId)
    );
    const [selectedClinic, setSelectedClinic] = useState<ClinicLocation | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const getClinicDeviceStatus = (clinicId: string): Device['status'] | null => {
        const clinicDevices = devices.filter(d => d.clinicId === clinicId);
        if (clinicDevices.length === 0) return null;
        if (clinicDevices.some(d => d.status === 'Needs Attention')) return 'Needs Attention';
        if (clinicDevices.some(d => d.status === 'Under Maintenance')) return 'Under Maintenance';
        if (clinicDevices.every(d => d.status === 'Operational')) return 'Operational';
        return null;
    };
    
    const statusBadge: Record<Device['status'], string> = {
        Operational: 'bg-green-500/80 text-green-50',
        'Under Maintenance': 'bg-yellow-500/80 text-yellow-50',
        'Needs Attention': 'bg-orange-500/80 text-orange-50',
        Decommissioned: 'bg-gray-500/80 text-gray-50',
    }


    const filteredClinics = useMemo(() => {
        return clinics.filter(clinic => {
            const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase());
            const clinicStatus = getClinicDeviceStatus(clinic.id);
            const matchesStatus = statusFilter === 'All' || clinicStatus === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [clinics, searchTerm, statusFilter]);

    const handleAdd = () => {
        setSelectedClinic(null);
        setIsFormOpen(true);
    };

    const handleEdit = (clinic: ClinicLocation) => {
        setSelectedClinic(clinic);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        setClinics(prev => prev.filter(c => c.id !== id));
    };

    const handleFormSubmit = (data: Omit<ClinicLocation, 'id' | 'type' | 'position' | 'distributorId'>) => {
        if (selectedClinic) {
            // Update
            setClinics(prev => prev.map(c => c.id === selectedClinic.id ? { ...selectedClinic, ...data } : c));
        } else {
            // Create
            if (!distributorId) return;

            const newClinic: ClinicLocation = {
                id: `clinic-${Date.now()}`,
                ...data,
                type: 'Clinic',
                distributorId: distributorId,
                position: { lat: -6.2088, lng: 106.8456 }, // Default position Jakarta
            };
            setClinics(prev => [newClinic, ...prev]);
        }
        setIsFormOpen(false);
        setSelectedClinic(null);
    };

    return (
        <>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                 <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{selectedClinic ? 'Edit Klinik' : 'Tambah Klinik Baru'}</DialogTitle>
                        <DialogDescription>
                            {selectedClinic ? 'Ubah informasi klinik di bawah ini.' : 'Isi detail untuk klinik baru.'}
                        </DialogDescription>
                    </DialogHeader>
                    <ClinicForm
                        onSubmit={handleFormSubmit}
                        defaultValues={selectedClinic}
                        onCancel={() => setIsFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader className='flex-row items-center justify-between'>
                    <div>
                        <CardTitle>Manajemen Klinik</CardTitle>
                        <CardDescription>Kelola daftar klinik yang terhubung dengan distributor Anda.</CardDescription>
                    </div>
                    <Button onClick={handleAdd}>
                        <PlusCircle className='mr-2' />
                        Tambah Klinik
                    </Button>
                </CardHeader>
                <CardContent>
                     <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-full max-w-sm">
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Klinik</TableHead>
                                <TableHead>Status Perangkat</TableHead>
                                <TableHead>Jumlah Perangkat</TableHead>
                                <TableHead>Kontak</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredClinics.map((clinic) => {
                                const clinicDevices = devices.filter(d => d.clinicId === clinic.id);
                                const clinicStatus = getClinicDeviceStatus(clinic.id);
                                return (
                                <TableRow key={clinic.id}>
                                    <TableCell className="font-medium">{clinic.name}</TableCell>
                                    <TableCell>
                                        {clinicStatus ? (
                                            <Badge variant="secondary" className={cn("font-normal", statusBadge[clinicStatus])}>
                                                {clinicStatus}
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline">N/A</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{clinicDevices.length}</TableCell>
                                    <TableCell>{clinic.contact.phone}</TableCell>
                                    <TableCell className="text-right">
                                         <Button variant="ghost" size="icon" onClick={() => handleEdit(clinic)}>
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
                                                    Tindakan ini tidak dapat diurungkan. Ini akan menghapus data klinik secara permanen dari daftar Anda.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(clinic.id)}>Hapus</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                                );
                            })}
                             {filteredClinics.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Tidak ada klinik yang cocok dengan kriteria pencarian.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
