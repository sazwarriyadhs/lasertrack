
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/app-context';
import { generateWorkOrderAction } from '@/app/actions';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle, UserPlus, Send, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { devices, distributorLocations, technicianLocations as allTechnicians, distributorClinics } from '@/lib/data';

const assignmentFormSchema = z.object({
    clinicId: z.string().min(1, { message: 'Klinik harus dipilih.' }),
    deviceId: z.string().min(1, { message: 'Perangkat harus dipilih.' }),
    technicianId: z.string().min(1, { message: 'Teknisi harus dipilih.' }),
    deadline: z.string().min(1, { message: 'Deadline harus diisi.' }),
    complexity: z.enum(['Rendah', 'Sedang', 'Tinggi'], { required_error: 'Tingkat kerumitan harus dipilih.'}),
    estimatedDuration: z.string().min(1, { message: 'Estimasi durasi harus diisi.' }),
    description: z.string().min(10, { message: 'Deskripsi masalah harus diisi (minimal 10 karakter).' }),
});


export default function TechnicianAssignmentPage() {
    const { user } = useApp();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const distributorId = user.distributorId;
    const myClinics = distributorClinics.filter(loc => loc.distributorId === distributorId);
    const myTechnicians = allTechnicians.filter(loc => loc.distributorId === distributorId);
    const myDevices = devices.filter(device => myClinics.some(c => c.id === device.clinicId));

    const form = useForm<z.infer<typeof assignmentFormSchema>>({
        resolver: zodResolver(assignmentFormSchema),
        defaultValues: {
            clinicId: '',
            deviceId: '',
            technicianId: '',
            deadline: '',
            estimatedDuration: '',
            description: '',
        }
    });

    const onSubmitAssignment = (values: z.infer<typeof assignmentFormSchema>) => {
        startTransition(async () => {
             const clinic = myClinics.find(c => c.id === values.clinicId);
             const device = myDevices.find(d => d.id === values.deviceId);
             const technician = myTechnicians.find(t => t.id === values.technicianId);
             const distributor = distributorLocations.find(d => d.id === user.distributorId);
 
             if (!clinic || !device || !technician || !distributor) {
                 toast({
                     variant: 'destructive',
                     title: 'Error',
                     description: 'Data tidak lengkap untuk membuat surat perintah kerja.',
                 });
                 return;
             }
 
             try {
                const result = await generateWorkOrderAction({
                     distributorName: distributor.name,
                     technicianName: technician.name,
                     clinicName: clinic.name,
                     clinicAddress: clinic.address,
                     deviceName: device.name,
                     deviceSerial: device.serialNumber,
                     taskDescription: values.description,
                     deadline: values.deadline,
                     complexity: values.complexity,
                     estimatedDuration: values.estimatedDuration,
                });
 
                 if (result && result.workOrder) {
                    const byteCharacters = atob(result.workOrder);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                    
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `SPK_${technician.name.replace(/ /g, '_')}_${device.name.replace(/ /g, '_')}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                     
                     toast({
                         title: 'Surat Perintah Kerja Dibuat',
                         description: 'SPK telah berhasil dibuat dan diunduh.',
                     });
                     form.reset();
                 } else {
                     throw new Error('Gagal membuat SPK.');
                 }
             } catch (error) {
                 toast({
                     variant: 'destructive',
                     title: 'Error',
                     description: 'Terjadi kesalahan saat membuat SPK. Silakan coba lagi.',
                 });
                 console.error(error);
             }
        });
     };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Form Penugasan Teknisi Baru</CardTitle>
                <CardDescription>Isi form untuk membuat Surat Perintah Kerja (SPK) untuk teknisi.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitAssignment)} className="space-y-6">
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            <FormField
                                control={form.control}
                                name="clinicId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pilih Klinik</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih klinik" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {myClinics.map(clinic => <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deviceId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pilih Perangkat</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!form.watch('clinicId')}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih perangkat" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                 {myDevices.filter(d => d.clinicId === form.watch('clinicId')).map(device => <SelectItem key={device.id} value={device.id}>{device.name} - {device.serialNumber}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="technicianId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pilih Teknisi</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih teknisi" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {myTechnicians.map(tech => <SelectItem key={tech.id} value={tech.id}>{tech.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deadline</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="complexity"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tingkat Kerumitan</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Pilih tingkat kerumitan" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Rendah">Rendah</SelectItem>
                                        <SelectItem value="Sedang">Sedang</SelectItem>
                                        <SelectItem value="Tinggi">Tinggi</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="estimatedDuration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estimasi Durasi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contoh: 2 Jam, 1 Hari" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi Masalah</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Jelaskan masalah yang terjadi secara singkat..." rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className='mr-2' />}
                                Buat & Unduh SPK
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
