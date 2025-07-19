import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapView } from '@/components/map-view';
import { locations, devices, distributorLocations } from '@/lib/data';
import { Hospital, Truck, Wrench, Bot, Pencil, Trash2 } from 'lucide-react';

export default function SuperAdminDashboard() {
    const stats = {
        distributors: locations.filter(l => l.type === 'Distributor').length,
        clinics: locations.filter(l => l.type === 'Clinic').length,
        technicians: locations.filter(l => l.type === 'Technician').length,
        devices: devices.length,
    };

    const distributors = distributorLocations;

    return (
        <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
                        <Bot className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.devices}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clinics</CardTitle>
                        <Hospital className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.clinics}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Distributors</CardTitle>
                        <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.distributors}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Technicians</CardTitle>
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.technicians}</div>
                    </CardContent>
                </Card>
            </div>
            
            <Tabs defaultValue="map">
                <TabsList>
                    <TabsTrigger value="map">Peta Distributor</TabsTrigger>
                    <TabsTrigger value="management">Manajemen Distributor</TabsTrigger>
                    <TabsTrigger value="monitoring">Aplikasi Monitoring</TabsTrigger>
                </TabsList>
                <TabsContent value="map">
                     <Card className="h-[60vh] mt-4">
                        <CardHeader>
                            <CardTitle>Peta Distributor Global</CardTitle>
                            <CardDescription>Lokasi distributor di seluruh dunia. Klik marker untuk melihat detail.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-6rem)] p-0">
                           <MapView locations={distributors} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="management">
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Manajemen Distributor</CardTitle>
                            <CardDescription>Tambah, edit, atau hapus data distributor.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Distributor</TableHead>
                                        <TableHead>Lokasi</TableHead>
                                        <TableHead>Status Aplikasi</TableHead>
                                        <TableHead>Jumlah Klinik</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {distributors.map(d => (
                                        <TableRow key={d.id}>
                                            <TableCell className="font-medium">{d.name}</TableCell>
                                            <TableCell>{`Lat: ${d.position.lat.toFixed(4)}, Lng: ${d.position.lng.toFixed(4)}`}</TableCell>
                                            <TableCell>{d.applicationStatus}</TableCell>
                                            <TableCell>{d.clinicCount}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="outline" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="destructive" size="icon">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="monitoring">
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Monitoring Aplikasi SERENITY LaserTrack</CardTitle>
                            <CardDescription>Monitoring aplikasi yang digunakan oleh distributor untuk mengelola klinik mereka.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4 text-sm">
                                <div>
                                    <h3 className="font-semibold text-card-foreground">Lisensi Aplikasi Tahunan</h3>
                                    <p className="text-muted-foreground">Setiap distributor harus memperpanjang lisensi penggunaan aplikasi SERENITY LaserTrack setiap satu tahun sekali untuk tetap mendapatkan akses penuh.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-card-foreground">Layanan Dukungan Distributor</h3>
                                    <p className="text-muted-foreground">Layanan mencakup servis maintenance dan troubleshooting untuk memastikan kelancaran operasional aplikasi di tingkat distributor.</p>
                                </div>
                                <p className="text-muted-foreground pt-4"> (Fitur monitoring terperinci sedang dalam pengembangan)</p>
                             </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
