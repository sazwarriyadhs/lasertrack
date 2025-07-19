
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus, Pencil, Trash2, Search } from 'lucide-react';
import { devices, technicianLocations as allTechnicians } from '@/lib/data';
import type { TechnicianLocation } from '@/lib/types';
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
import { TechnicianForm } from '@/components/technician-form';
import { useApp } from '@/context/app-context';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


export default function TechnicianManagementPage() {
    const { user } = useApp();
    const distributorId = user.distributorId;
    
    const [technicians, setTechnicians] = useState<TechnicianLocation[]>(
        allTechnicians.filter(loc => loc.distributorId === distributorId)
    );
    const [selectedTechnician, setSelectedTechnician] = useState<TechnicianLocation | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredTechnicians = useMemo(() => {
        return technicians.filter(tech => {
            const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All' || tech.dutyStatus === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [technicians, searchTerm, statusFilter]);


    const handleAdd = () => {
        setSelectedTechnician(null);
        setIsFormOpen(true);
    };

    const handleEdit = (technician: TechnicianLocation) => {
        setSelectedTechnician(technician);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        setTechnicians(prev => prev.filter(d => d.id !== id));
    };

    const handleFormSubmit = (data: Omit<TechnicianLocation, 'id' | 'type' | 'position' | 'distributorId'>) => {
        if (selectedTechnician) {
            // Update
            setTechnicians(prev => prev.map(d => d.id === selectedTechnician.id ? { ...selectedTechnician, ...data } : d));
        } else {
            // Create
            if(!distributorId) return;

            const newTechnician: TechnicianLocation = {
                id: `tech-${Date.now()}`,
                ...data,
                type: 'Technician',
                distributorId: distributorId,
                position: { lat: 34.05, lng: -118.24 }, // Default position
                dutyStatus: 'Off Duty',
            };
            setTechnicians(prev => [newTechnician, ...prev]);
        }
        setIsFormOpen(false);
        setSelectedTechnician(null);
    };

    return (
        <>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                 <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{selectedTechnician ? 'Edit Teknisi' : 'Tambah Teknisi Baru'}</DialogTitle>
                        <DialogDescription>
                            {selectedTechnician ? 'Ubah informasi teknisi di bawah ini.' : 'Isi detail untuk teknisi baru.'}
                        </DialogDescription>
                    </DialogHeader>
                    <TechnicianForm
                        onSubmit={handleFormSubmit}
                        defaultValues={selectedTechnician}
                        onCancel={() => setIsFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader className='flex-row items-center justify-between'>
                    <div>
                        <CardTitle>Manajemen Tim Teknisi</CardTitle>
                        <CardDescription>Kelola daftar teknisi, jadwal, dan riwayat pekerjaan.</CardDescription>
                    </div>
                    <Button onClick={handleAdd}>
                        <UserPlus className='mr-2' />
                        Tambah Teknisi
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama teknisi..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter Status Tugas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">Semua Status</SelectItem>
                                <SelectItem value="On Duty">On Duty</SelectItem>
                                <SelectItem value="Off Duty">Off Duty</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Teknisi</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tugas Aktif</TableHead>
                                <TableHead>Kontak</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTechnicians.map((tech) => (
                                <TableRow key={tech.id}>
                                    <TableCell className="font-medium">{tech.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={tech.dutyStatus === 'On Duty' ? 'default' : 'secondary'}>{tech.dutyStatus === 'On Duty' ? tech.handlingStatus : 'Off Duty'}</Badge>
                                    </TableCell>
                                    <TableCell>{tech.handledDeviceId ? devices.find(d => d.id === tech.handledDeviceId)?.name : 'Standby'}</TableCell>
                                    <TableCell>{tech.contact.phone}</TableCell>
                                    <TableCell className="text-right">
                                         <Button variant="ghost" size="icon" onClick={() => handleEdit(tech)}>
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
                                                    Tindakan ini tidak dapat diurungkan. Ini akan menghapus data teknisi secara permanen.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(tech.id)}>Hapus</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                             {filteredTechnicians.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Tidak ada teknisi yang cocok dengan kriteria.
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
