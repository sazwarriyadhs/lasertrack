'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapView } from '@/components/map-view';
import { locations, devices, distributorLocations, technicianLocations as allTechnicians, maintenanceHistory, distributorClinics } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Device, DeviceStatus, DistributorLocation, TechnicianLocation } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle, UserPlus, Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const statusColors: Record<DeviceStatus, string> = {
    Operational: 'bg-green-500/80',
    'Under Maintenance': 'bg-yellow-500/80',
    'Needs Attention': 'bg-orange-500/80',
    Decommissioned: 'bg-gray-500/80',
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


export default function DistributorDashboard() {
    const distributorId = 'dist-1'; // Static for now
    const distributorDetails = distributorLocations.find(d => d.id === distributorId);
    const myClinics = distributorClinics.filter(loc => loc.distributorId === distributorId);
    const myTechnicians = allTechnicians.filter(loc => loc.distributorId === distributorId);
    const myDevices = devices.filter(device => myClinics.some(c => c.id === device.clinicId));
    
    const onDutyTechnicians = myTechnicians.filter(t => t.dutyStatus === 'On Duty');
    
    return (
       <Tabs defaultValue="map-technician" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                <TabsTrigger value="map-technician">Peta Tim Teknisi</TabsTrigger>
                <TabsTrigger value="technician-management">Manajemen Tim</TabsTrigger>
                <TabsTrigger value="technician-assignment">Penugasan Teknisi</TabsTrigger>
                <TabsTrigger value="device-monitoring">Monitoring Device</TabsTrigger>
                <TabsTrigger value="reports">Laporan Aktivitas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map-technician">
                 <Card className="h-[75vh]">
                    <CardHeader>
                        <CardTitle>Peta Tim Teknisi</CardTitle>
                        <CardDescription>Lokasi realtime teknisi yang sedang bertugas. Klik marker untuk detail.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-6rem)] p-0">
                        <MapView locations={onDutyTechnicians} />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="technician-management">
                <Card>
                    <CardHeader className='flex-row items-center justify-between'>
                        <div>
                            <CardTitle>Manajemen Tim Teknisi</CardTitle>
                            <CardDescription>Daftar teknisi, jadwal, dan riwayat pekerjaan.</CardDescription>
                        </div>
                        <Button>
                            <UserPlus className='mr-2' />
                            Tambah Teknisi
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Teknisi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tugas Aktif</TableHead>
                                    <TableHead>Kontak</TableHead>
                                    <TableHead className="text-right">Riwayat</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {myTechnicians.map((tech) => (
                                    <TableRow key={tech.id}>
                                        <TableCell className="font-medium">{tech.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={tech.dutyStatus === 'On Duty' ? 'default' : 'secondary'}>{tech.dutyStatus === 'On Duty' ? tech.handlingStatus : 'Off Duty'}</Badge>
                                        </TableCell>
                                        <TableCell>{tech.handledDeviceId ? devices.find(d => d.id === tech.handledDeviceId)?.name : 'Standby'}</TableCell>
                                        <TableCell>{tech.contact.phone}</TableCell>
                                        <TableCell className="text-right">
                                             <Button variant="outline" size="sm">Lihat Laporan</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="technician-assignment">
                <Card>
                    <CardHeader>
                        <CardTitle>Form Penugasan Teknisi Baru</CardTitle>
                        <CardDescription>Buat dan kirim tugas baru untuk tim teknisi Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="clinic">Pilih Klinik</Label>
                                <Select>
                                    <SelectTrigger id="clinic">
                                        <SelectValue placeholder="Pilih klinik yang membutuhkan bantuan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {myClinics.map(clinic => <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="device">Pilih Perangkat</Label>
                                <Select>
                                    <SelectTrigger id="device">
                                        <SelectValue placeholder="Pilih perangkat yang bermasalah" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {myDevices.map(device => <SelectItem key={device.id} value={device.id}>{device.name} - {device.serialNumber}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="technician">Pilih Teknisi</Label>
                                <Select>
                                    <SelectTrigger id="technician">
                                        <SelectValue placeholder="Pilih teknisi yang akan ditugaskan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {myTechnicians.map(tech => <SelectItem key={tech.id} value={tech.id}>{tech.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="deadline">Deadline</Label>
                                <Input id="deadline" type="date" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi Masalah</Label>
                            <Textarea id="description" placeholder="Jelaskan masalah yang terjadi secara singkat..." rows={4}/>
                        </div>

                        <div className="flex justify-end">
                            <Button>
                                <Send className='mr-2' />
                                Kirim Tugas & Notifikasi
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="device-monitoring">
                <Card>
                    <CardHeader className='flex-row items-center justify-between'>
                       <div>
                            <CardTitle>Monitoring Perangkat</CardTitle>
                            <CardDescription>Status semua perangkat di klinik yang Anda kelola.</CardDescription>
                       </div>
                       <Button>
                           <PlusCircle className='mr-2' />
                           Jadwalkan Maintenance
                       </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Klinik</TableHead>
                                    <TableHead>Device</TableHead>
                                    <TableHead>Serial No.</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Maintenance Terakhir</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {myDevices.map((device) => {
                                    const clinic = myClinics.find(c => c.id === device.clinicId);
                                    return (
                                        <TableRow key={device.id}>
                                            <TableCell className="font-medium">{clinic?.name || 'N/A'}</TableCell>
                                            <TableCell>{device.name}</TableCell>
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
            </TabsContent>

        </Tabs>
    );
}
