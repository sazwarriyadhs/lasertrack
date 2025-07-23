
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useApp } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const profileFormSchema = z.object({
  name: z.string().min(3, { message: "Nama harus memiliki setidaknya 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().min(10, { message: "Nomor telepon harus memiliki setidaknya 10 digit." }),
  address: z.string().min(10, { message: "Alamat harus memiliki setidaknya 10 karakter." }),
  avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user, updateUser, loading } = useApp();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      avatarUrl: '',
    },
    mode: "onChange"
  });

  useEffect(() => {
    if (user) {
        form.reset({
            name: user.name || '',
            email: user.contact?.email || user.email,
            phone: user.contact?.phone || '',
            address: user.address || '',
            avatarUrl: user.avatarUrl || '',
        });
        setPhotoPreview(user.avatarUrl || null);
    }
  }, [user, form.reset]);
  
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        form.setValue('avatarUrl', result, { shouldValidate: true, shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit = (data: ProfileFormValues) => {
    startTransition(() => {
        if (!user) return;
        const updatedData = {
            name: data.name,
            email: data.email, // Also update root email for login consistency
            contact: {
                email: data.email,
                phone: data.phone,
            },
            address: data.address,
            avatarUrl: data.avatarUrl,
        };

        updateUser(updatedData);
        toast({
            title: "Profil Diperbarui",
            description: "Informasi profil Anda telah berhasil disimpan.",
        });
        form.reset(data); // Resets form with new values and clears dirty state
    });
  };
  
  if (loading || !user) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Profil</CardTitle>
        <CardDescription>Kelola informasi profil, alamat, dan kontak Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col items-center gap-4">
                     <Avatar className="h-32 w-32">
                        <AvatarImage src={photoPreview || undefined} alt={user.name} />
                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button asChild variant="outline">
                        <label htmlFor="photo-upload" className="cursor-pointer">
                           <Upload className="mr-2 h-4 w-4" />
                            Ganti Foto
                           <Input id="photo-upload" type="file" className="sr-only" onChange={handlePhotoChange} accept="image/*" />
                        </label>
                    </Button>
                    <FormMessage>{form.formState.errors.avatarUrl?.message}</FormMessage>
                </div>

                <div className="md:col-span-2 space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Lengkap</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nama Anda" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email@contoh.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nomor Telepon</FormLabel>
                                    <FormControl>
                                        <Input placeholder="08123456789" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Alamat</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Alamat lengkap Anda..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
                           {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Simpan Perubahan
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
      </CardContent>
    </Card>
  );
}
