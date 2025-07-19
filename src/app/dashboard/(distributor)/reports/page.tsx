'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { maintenanceHistory } from '@/lib/data';

const clinicUsageData = [
  { name: 'Sunset Aesthetics', usage: 85 },
  { name: 'Metropolis Laser', usage: 92 },
  { name: 'A-List Derm', usage: 78 },
  { name: 'Glow Up Clinic', usage: 65 },
  { name: 'New Me Spa', usage: 88 },
];

const chartConfig = {
  usage: {
    label: "Aktivitas Penggunaan (%)",
    color: "hsl(var(--primary))",
  },
} satisfies import('@/components/ui/chart').ChartConfig;


export default function ReportsPage() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Laporan Penggunaan Aplikasi Klinik</CardTitle>
                    <CardDescription>Aktivitas penggunaan aplikasi oleh masing-masing klinik.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] w-full">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                        <BarChart accessibilityLayer data={clinicUsageData} layout="vertical" margin={{ left: 20, right: 20 }}>
                            <CartesianGrid horizontal={false} />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                width={120}
                                tick={{ fontSize: 12 }}
                            />
                            <XAxis dataKey="usage" type="number" hide />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="usage" fill="var(--color-usage)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Laporan Aktivitas Tim Teknisi</CardTitle>
                    <CardDescription>Rekapitulasi pekerjaan yang diselesaikan oleh teknisi.</CardDescription>
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
                            {maintenanceHistory.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.technicianName}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
