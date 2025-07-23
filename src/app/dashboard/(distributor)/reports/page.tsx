'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { maintenanceHistory, distributorClinics, devices, technicianLocations } from '@/lib/data';
import { useApp } from '@/context/app-context';
import { useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { MaintenanceRecord } from '@/lib/types';

const chartConfig = {
  usage: {
    label: "Aktivitas Penggunaan (%)",
    color: "hsl(var(--primary))",
  },
} satisfies import('@/components/ui/chart').ChartConfig;


export default function ReportsPage() {
    const { user } = useApp();
    const { toast } = useToast();

    const { myClinics, myTechnicianIds, myMaintenanceHistory } = useMemo(() => {
        if (!user.distributorId) return { myClinics: [], myTechnicianIds: [], myMaintenanceHistory: [] };
        const clinics = distributorClinics.filter(c => c.distributorId === user.distributorId);
        const clinicIds = clinics.map(c => c.id);
        const deviceIds = devices.filter(d => clinicIds.includes(d.clinicId)).map(d => d.id);
        const technicianIds = technicianLocations.filter(t => t.distributorId === user.distributorId).map(t => t.id);
        const history = maintenanceHistory.filter(h => deviceIds.includes(h.deviceId));

        return { myClinics: clinics, myTechnicianIds: technicianIds, myMaintenanceHistory: history };
    }, [user.distributorId]);

    const clinicUsageData = useMemo(() => {
        return myClinics.map(clinic => ({
            name: clinic.name,
            usage: Math.floor(Math.random() * (95 - 60 + 1)) + 60, // Random usage %
        })).slice(0, 5); // Limit to 5 for better viz
    }, [myClinics]);

    const handleDownloadReport = async (item: MaintenanceRecord) => {
        toast({ title: 'Membuat Laporan...', description: 'Mohon tunggu sebentar.'});
        try {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            page.drawText('Laporan Maintenance (Contoh)', { x: 50, y: 800, font, size: 24 });
            page.drawText(`Tanggal: ${item.date}`, { x: 50, y: 750, font, size: 12 });
            page.drawText(`Teknisi: ${item.technicianName}`, { x: 50, y: 730, font, size: 12 });
            page.drawText(`Deskripsi: ${item.description}`, { x: 50, y: 710, font, size: 12 });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Laporan_${item.id}.pdf`;
            link.click();

            toast({ title: 'Laporan Berhasil Diunduh', description: 'PDF telah disimpan di perangkat Anda.'});

        } catch (e) {
            console.error(e);
            toast({ variant: 'destructive', title: 'Gagal Membuat Laporan', description: 'Terjadi kesalahan saat membuat PDF.'});
        }
    };


    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Laporan Penggunaan Aplikasi Klinik</CardTitle>
                    <CardDescription>Aktivitas penggunaan aplikasi oleh masing-masing klinik Anda.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] w-full pr-6">
                     {clinicUsageData.length > 0 ? (
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <BarChart accessibilityLayer data={clinicUsageData} layout="vertical" margin={{ left: 20, right: 40 }}>
                                <CartesianGrid horizontal={false} />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    width={120}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                                />
                                <XAxis dataKey="usage" type="number" hide />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="usage" fill="var(--color-usage)" radius={4}>
                                    <LabelList
                                        dataKey="usage"
                                        position="right"
                                        offset={8}
                                        className="fill-foreground font-semibold"
                                        fontSize={12}
                                        formatter={(value: number) => `${value}%`}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                     ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Tidak ada data penggunaan klinik untuk ditampilkan.
                        </div>
                     )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Laporan Aktivitas Tim Teknisi</CardTitle>
                    <CardDescription>Rekapitulasi pekerjaan yang diselesaikan oleh teknisi Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Teknisi</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead className="text-right">Laporan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {myMaintenanceHistory.length > 0 ? (
                                myMaintenanceHistory.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.technicianName}</TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => handleDownloadReport(item)}>
                                                <Download className="mr-2 h-4 w-4" />
                                                Unduh
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                             ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        Tidak ada riwayat aktivitas.
                                    </TableCell>
                                </TableRow>
                             )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
