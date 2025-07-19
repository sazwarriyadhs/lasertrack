
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { TechnicianLocation } from '@/lib/types';
import { DialogFooter } from './ui/dialog';

const formSchema = z.object({
    name: z.string().min(3, { message: 'Nama teknisi minimal 3 karakter.' }),
    contact: z.object({
        email: z.string().email({ message: 'Format email tidak valid.' }),
        phone: z.string().min(10, { message: 'Nomor telepon minimal 10 digit.' }),
    }),
    address: z.string().min(10, { message: "Alamat harus diisi minimal 10 karakter."}),
    avatarUrl: z.string().url({ message: 'URL avatar tidak valid.' }).optional().or(z.literal('')),
});

type FormValues = Omit<TechnicianLocation, 'id' | 'type' | 'position' | 'distributorId' | 'dutyStatus' | 'handlingStatus' | 'destinationClinicId' | 'handledDeviceId'>

interface TechnicianFormProps {
    onSubmit: (data: FormValues) => void;
    onCancel: () => void;
    defaultValues?: TechnicianLocation | null;
}

export function TechnicianForm({ onSubmit, onCancel, defaultValues }: TechnicianFormProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            contact: {
                email: defaultValues?.contact.email || '',
                phone: defaultValues?.contact.phone || '',
            },
            address: defaultValues?.address || '',
            avatarUrl: defaultValues?.avatarUrl || '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Teknisi</FormLabel>
                            <FormControl>
                                <Input placeholder="Contoh: Budi Santoso" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat</FormLabel>
                            <FormControl>
                                <Input placeholder="Alamat lengkap teknisi" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact.email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Kontak</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="budi.s@provider.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact.phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telepon Kontak</FormLabel>
                            <FormControl>
                                <Input placeholder="081234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL Avatar (Opsional)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://placehold.co/100x100" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter className='pt-4'>
                    <Button type="button" variant="outline" onClick={onCancel}>Batal</Button>
                    <Button type="submit">Simpan</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
