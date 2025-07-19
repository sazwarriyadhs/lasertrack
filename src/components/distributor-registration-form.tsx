'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Check, Loader2, UploadCloud, FileText, CreditCard, Building, CircleCheck, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const steps = [
  { id: 'Step 1', name: 'Informasi Perusahaan', fields: ['companyName', 'email', 'phone', 'address'] },
  { id: 'Step 2', name: 'Verifikasi Dokumen', fields: ['ktp', 'npwp', 'nib'] },
  { id: 'Step 3', name: 'Pembayaran Lisensi' },
];

const registrationSchema = z.object({
  companyName: z.string().min(3, 'Nama perusahaan harus diisi'),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon tidak valid'),
  address: z.string().min(10, 'Alamat lengkap harus diisi'),
  ktp: z.any().refine(file => file?.length == 1, 'File KTP harus diunggah.'),
  npwp: z.any().refine(file => file?.length == 1, 'File NPWP harus diunggah.'),
  nib: z.any().refine(file => file?.length == 1, 'File NIB harus diunggah.'),
});


export function DistributorRegistrationForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof registrationSchema>>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            companyName: '',
            email: '',
            phone: '',
            address: '',
        }
    });

    type FieldName = keyof z.infer<typeof registrationSchema>;

    const next = async () => {
        const fields = steps[currentStep].fields;
        const output = await form.trigger(fields as FieldName[], { shouldFocus: true });

        if (!output) return;

        if (currentStep < steps.length - 1) {
            if(currentStep === steps.length - 2) { // After document upload
                setIsSubmitting(true);
                // Simulate backend processing
                setTimeout(() => {
                    setIsSubmitting(false);
                    setCurrentStep(step => step + 1);
                }, 1500)
            } else {
                setCurrentStep(step => step + 1);
            }
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(step => step - 1);
        }
    };
    
    const FileUploadInput = ({ name, label }: { name: FieldName, label: string }) => {
        const fileRef = form.register(name);
        const [fileName, setFileName] = useState('');
        
        return (
             <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                     <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                             <div className="relative flex items-center justify-center w-full">
                                <label htmlFor={name} className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary bg-muted/40">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {fileName ? (
                                            <>
                                                <FileText className="w-8 h-8 mb-2 text-primary" />
                                                <p className="text-sm font-semibold text-foreground">{fileName}</p>
                                            </>
                                        ) : (
                                             <>
                                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk unggah</span></p>
                                            </>
                                        )}
                                    </div>
                                    <Input 
                                        id={name} 
                                        type="file" 
                                        className="hidden" 
                                        {...fileRef}
                                        onChange={(e) => {
                                            field.onChange(e.target.files);
                                            setFileName(e.target.files?.[0]?.name || '');
                                        }} 
                                    />
                                </label>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    };


    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center mb-4">
                    {steps.map((step, index) => (
                        <div key={step.name} className="flex items-center gap-2">
                             <div className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full border-2",
                                currentStep === index ? 'border-primary text-primary font-bold' :
                                index < currentStep ? 'bg-primary border-primary text-primary-foreground' : 'border-border text-muted-foreground'
                             )}>
                                 {index < currentStep ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                            </div>
                            <span className={cn("hidden md:block", index <= currentStep ? "font-semibold text-foreground" : "text-muted-foreground")}>{step.name}</span>
                        </div>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentStep === 0 && (
                                    <div className="space-y-4">
                                         <FormField
                                            control={form.control}
                                            name="companyName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nama Perusahaan</FormLabel>
                                                    <FormControl><Input placeholder="Contoh: PT. Estetika Medika Indonesia" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email Perusahaan</FormLabel>
                                                        <FormControl><Input type="email" placeholder="kontak@perusahaan.com" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>No. Telepon</FormLabel>
                                                        <FormControl><Input placeholder="08123456789" {...field} /></FormControl>
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
                                                    <FormLabel>Alamat Lengkap Perusahaan</FormLabel>
                                                    <FormControl><Textarea placeholder="Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <CardDescription>Unggah dokumen legalitas perusahaan Anda dalam format PDF atau gambar.</CardDescription>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <FileUploadInput name="ktp" label="KTP Direktur" />
                                            <FileUploadInput name="npwp" label="NPWP Perusahaan" />
                                            <FileUploadInput name="nib" label="NIB (Nomor Induk Berusaha)" />
                                        </div>
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div className="text-center">
                                        <CircleCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                        <h2 className="text-2xl font-bold">Verifikasi Selesai, Lanjutkan ke Pembayaran</h2>
                                        <p className="text-muted-foreground mt-2">Satu langkah lagi untuk mengaktifkan akun distributor Anda.</p>
                                        
                                        <Card className="mt-6 text-left">
                                            <CardHeader>
                                                <CardTitle>Ringkasan Pembayaran</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground">Lisensi Aplikasi LaserTrack Lite (1 Tahun)</span>
                                                    <span className="font-bold">Rp 15.000.000</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground">Pajak (11%)</span>
                                                    <span className="font-bold">Rp 1.650.000</span>
                                                </div>
                                                <div className="border-t pt-4 flex justify-between items-center text-lg">
                                                    <span className="font-bold">Total Pembayaran</span>
                                                    <span className="font-bold text-primary">Rp 16.650.000</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button className="w-full" size="lg" onClick={() => setCurrentStep(step => step + 1)}>
                                                    <CreditCard className="mr-2" />
                                                    Lanjutkan ke Pembayaran
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                )}
                                {currentStep === 3 && (
                                    <div className="text-center py-10">
                                         <PartyPopper className="w-20 h-20 text-primary mx-auto mb-4" />
                                         <h2 className="text-2xl font-bold">Pendaftaran Berhasil!</h2>
                                         <p className="text-muted-foreground mt-2">Selamat! Akun Anda telah dibuat. Tim kami akan segera menghubungi Anda untuk proses aktivasi.</p>
                                         <Button asChild className="mt-6">
                                            <Link href="/partner/login">
                                                Kembali ke Halaman Login
                                            </Link>
                                         </Button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </form>
                </FormProvider>
            </CardContent>
            {currentStep < 2 && (
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prev} disabled={currentStep === 0}>
                        Kembali
                    </Button>
                    <Button onClick={next}>
                        {currentStep === steps.length - 2 ? 'Verifikasi & Lanjutkan' : 'Selanjutnya'}
                    </Button>
                </CardFooter>
            )}
             {currentStep === 1 && isSubmitting && (
                <CardFooter>
                     <Button disabled className="w-full">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memverifikasi Dokumen...
                    </Button>
                </CardFooter>
             )}
        </Card>
    );
}
