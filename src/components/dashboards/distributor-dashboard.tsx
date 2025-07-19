'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapView } from '@/components/map-view';
import { locations, devices, distributorLocations } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { DeviceStatus, DistributorLocation } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useApp } from '@/context/app-context';
import { CheckCircle, Clock, XCircle, FileText } from 'lucide-react';


const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
};

const licenseStatusInfo: Record<DistributorLocation['applicationStatus'], { icon: React.ElementType, color: string, label: string }> = {
    'Active': { icon: CheckCircle, color: 'text-green-500', label: 'Lisensi Aktif' },
    'Inactive': { icon: XCircle, color: 'text-gray-500', label: 'Lisensi Tidak Aktif' },
    'Expired': { icon: Clock, color: 'text-red-500', label: 'Lisensi Kedaluwarsa' },
};


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

const LicenseStatusCard = ({ distributor }: { distributor: DistributorLocation }) => {
    const status = licenseStatusInfo[distributor.applicationStatus];
    const StatusIcon = status.icon;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    <span>Status Lisensi Aplikasi</span>
                </CardTitle>
                <CardDescription>Status lisensi SERENITY LaserTrack Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                    <StatusIcon className={cn("h-10 w-10", status.color)} />
                    <div>
                        <p className={cn("font-bold text-lg", status.color)}>{status.label}</p>
                        <p className="text-sm text-muted-foreground">{distributor.licenseDuration}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


export default function DistributorDashboard() {
    const { user } = useApp();
    const distributorId = 'dist-1'; // Static for now
    const distributorDetails = distributorLocations.find(d => d.id === distributorId);
    const distributorClinics = locations.filter(loc => loc.type === 'Clinic' && loc.distributorId === distributorId);
    const distributorTechnicians = locations.filter(loc => loc.type === 'Technician' && loc.distributorId === distributorId);
    const distributorDevices = devices.filter(device => distributorClinics.some(c => c.id === device.clinicId));
    
    const mapLocations = [...distributorClinics, ...distributorTechnicians];
    
    return (
       <Tabs defaultValue="map" className="space-y-4">
            <TabsList>
                <TabsTrigger value="map">Peta & Monitoring</TabsTrigger>
                <TabsTrigger value="devices">Monitoring Perangkat</TabsTrigger>
                <TabsTrigger value="reports">Laporan Penggunaan</TabsTrigger>
                <TabsTrigger value="license">Status Lisensi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map">
                 <Card className="h-[75vh]">
                    <CardHeader>
                        <CardTitle>Peta Klinik & Teknisi</CardTitle>
                        <CardDescription>Lokasi klinik dan status teknisi Anda. Klik marker teknisi untuk detail.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-6rem)] p-0">
                        <MapView locations={mapLocations} />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="devices">
                <Card>
                    <CardHeader>
                        <CardTitle>Monitoring Perangkat</CardTitle>
                        <CardDescription>Status semua perangkat di klinik yang Anda kelola.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Klinik</TableHead>
                                    <TableHead>Device</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Serial No.</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Maintenance Terakhir</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {distributorDevices.map((device) => {
                                    const clinic = distributorClinics.find(c => c.id === device.clinicId);
                                    return (
                                        <TableRow key={device.id}>
                                            <TableCell className="font-medium">{clinic?.name || 'N/A'}</TableCell>
                                            <TableCell>{device.name}</TableCell>
                                            <TableCell>{device.model}</TableCell>
                                            <TableCell>{device.serialNumber}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="font-normal">
                                                    <span className={cn('h-2 w-2 rounded-full mr-2', statusColors[device.status])}></span>
                                                    {device.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{device.lastMaintenance}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="reports">
                 <Card>
                    <CardHeader>
                        <CardTitle>Laporan Penggunaan Aplikasi oleh Klinik</CardTitle>
                        <CardDescription>Tingkat aktivitas penggunaan aplikasi oleh masing-masing klinik.</CardDescription>
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
                                />
                                <XAxis dataKey="usage" type="number" hide />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="usage" fill="var(--color-usage)" radius={4}>
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="license">
                {distributorDetails && <LicenseStatusCard distributor={distributorDetails} />}
            </TabsContent>
        </Tabs>
    );
}
