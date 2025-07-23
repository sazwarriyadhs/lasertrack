
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus, Pencil, Trash2, PlusCircle, Search } from 'lucide-react';
import { devices, distributorClinics as allClinics, locations } from '@/lib/data';
import type { ClinicLocation, Device, DeviceStatus } from '@/lib/types';
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
import { useLanguage } from '@/context/language-context';


export default function ClinicManagementPage() {
    const { user } = useApp();
    const { t } = useLanguage();
    const distributorId = user.distributorId;

    const [clinics, setClinics] = useState<ClinicLocation[]>(
        allClinics.filter(loc => loc.distributorId === distributorId)
    );
    const [selectedClinic, setSelectedClinic] = useState<ClinicLocation | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const getClinicDeviceStatus = (clinicId: string): DeviceStatus | 'No Devices' => {
        const clinicDevices = devices.filter(d => d.clinicId === clinicId);
        if (clinicDevices.length === 0) return 'No Devices';
        if (clinicDevices.some(d => d.status === 'Needs Attention')) return 'Needs Attention';
        if (clinicDevices.some(d => d.status === 'Under Maintenance')) return 'Under Maintenance';
        if (clinicDevices.every(d => d.status === 'Operational')) return 'Operational';
        return 'Operational'; // Default fallback for mixed but not critical statuses
    };
    
    const statusBadge: Record<DeviceStatus | 'No Devices', string> = {
        Operational: 'bg-green-500/80 text-green-50',
        'Under Maintenance': 'bg-yellow-500/80 text-yellow-50',
        'Needs Attention': 'bg-orange-500/80 text-orange-50',
        Decommissioned: 'bg-gray-500/80 text-gray-50',
        'No Devices': 'bg-gray-400/80 text-gray-50',
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
                        <DialogTitle>{selectedClinic ? t('edit_clinic') : t('add_clinic')}</DialogTitle>
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
                        <CardTitle>{t('clinic_management_title')}</CardTitle>
                        <CardDescription>{t('clinic_management_desc')}</CardDescription>
                    </div>
                    <Button onClick={handleAdd}>
                        <PlusCircle className='mr-2' />
                        {t('add_clinic')}
                    </Button>
                </CardHeader>
                <CardContent>
                     <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t('search_clinic_name')}
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder={t('filter_device_status')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">{t('all_statuses')}</SelectItem>
                                <SelectItem value="Needs Attention">{t('needs_attention')}</SelectItem>
                                <SelectItem value="Under Maintenance">{t('under_maintenance')}</SelectItem>
                                <SelectItem value="Operational">{t('operational')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('clinic_name')}</TableHead>
                                <TableHead>{t('device_status')}</TableHead>
                                <TableHead>{t('device_count')}</TableHead>
                                <TableHead>{t('contact')}</TableHead>
                                <TableHead className="text-right">{t('actions')}</TableHead>
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
                                        <Badge variant="secondary" className={cn("font-normal", statusBadge[clinicStatus])}>
                                            {clinicStatus === 'No Devices' ? 'Belum ada perangkat' : t(clinicStatus.toLowerCase().replace(/ /g, '_'))}
                                        </Badge>
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
                                                <AlertDialogTitle>{t('are_you_sure')}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    {t('action_cannot_be_undone')}
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(clinic.id)}>{t('delete')}</AlertDialogAction>
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
                                        {t('no_matching_data')}
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
