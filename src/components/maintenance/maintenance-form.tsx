
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { type Device, type MaintenanceChecklistItem } from '@/lib/types';
import { maintenanceChecklist as initialChecklist } from '@/lib/data';
import { generateReportAction } from '@/app/actions';
import { Loader2, FileUp, X, FileText } from 'lucide-react';
import Image from 'next/image';
import { useApp } from '@/context/app-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    statusUpdates: z.string().min(10, { message: 'Harap berikan pembaruan status yang terperinci.' }),
    handlingStatus: z.enum(["Dalam Perjalanan", "Menangani", "Selesai"]),
    additionalNotes: z.string().optional(),
});

export function MaintenanceForm({ device }: { device: Device }) {
    const { user } = useApp();
    const { toast } = useToast();
    const [checklist, setChecklist] = useState<MaintenanceChecklistItem[]>(initialChecklist.map(item => ({...item})));
    const [photos, setPhotos] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { statusUpdates: '', additionalNotes: '', handlingStatus: 'Menangani' },
    });

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (typeof e.target?.result === 'string') {
                        setPhotos(prev => [...prev, e.target.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };
    
    const handleChecklistChange = (id: string) => {
        setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        startTransition(async () => {
            try {
                const checklistResults = checklist
                    .map(item => `${item.label}: ${item.checked ? 'Passed' : 'Failed'}`)
                    .join('\n');
                
                const result = await generateReportAction({
                    technicianName: user.name,
                    deviceName: device.name,
                    statusUpdates: `Status Penanganan: ${values.handlingStatus}\n\nPembaruan: ${values.statusUpdates}`,
                    checklistResults,
                    photosDataUri: photos,
                    additionalNotes: values.additionalNotes,
                });

                if (result && result.report) {
                    const byteCharacters = atob(result.report);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });
                    
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `Laporan_Maintenance_${device.name.replace(/ /g, '_')}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    toast({
                        title: 'Laporan Dibuat',
                        description: 'Laporan maintenance Anda telah berhasil dibuat dan diunduh.',
                    });
                    form.reset();
                    setPhotos([]);
                    setChecklist(initialChecklist.map(item => ({...item})));
                } else {
                    throw new Error('Gagal membuat laporan.');
                }
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Terjadi kesalahan saat membuat laporan. Silakan coba lagi.',
                });
                console.error(error);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Checklist Maintenance</CardTitle>
                            <CardDescription>Lengkapi checklist untuk perangkat.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            {checklist.map(item => (
                                <div key={item.id} className="flex items-center space-x-2">
                                    <Checkbox id={item.id} checked={item.checked} onCheckedChange={() => handleChecklistChange(item.id)} />
                                    <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {item.label}
                                    </label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Unggah Foto</CardTitle>
                            <CardDescription>Tambahkan foto perangkat atau komponen tertentu.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary">
                                    <div className='text-center text-muted-foreground'>
                                        <FileUp className="w-8 h-8 mx-auto mb-2" />
                                        <p>Klik untuk mengunggah gambar</p>
                                    </div>
                                    <Input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" multiple onChange={handlePhotoUpload} />
                                </div>
                                {photos.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {photos.map((photo, index) => (
                                            <div key={index} className="relative group">
                                                <Image src={photo} alt={`Upload ${index + 1}`} width={150} height={150} className="object-cover rounded-md w-full aspect-square" data-ai-hint="laser device" />
                                                <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => setPhotos(p => p.filter((_, i) => i !== index))}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                    ))}
                                </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="lg:col-span-1 space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Status & Catatan</CardTitle>
                            <CardDescription>Perbarui status penanganan dan berikan catatan.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="handlingStatus"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Status Penanganan</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih status penanganan" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="Dalam Perjalanan">Dalam Perjalanan</SelectItem>
                                        <SelectItem value="Menangani">Menangani</SelectItem>
                                        <SelectItem value="Selesai">Selesai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="statusUpdates"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pembaruan Status</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Jelaskan status saat ini, pekerjaan yang dilakukan, dan masalah yang ditemukan..." {...field} rows={5} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="additionalNotes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Catatan Tambahan (Opsional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Informasi relevan lainnya..." {...field} rows={3} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button type="submit" disabled={isPending} className="w-full">
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                                Buat & Unduh Laporan
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </Form>
    );
}
