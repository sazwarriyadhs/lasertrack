import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapView } from '@/components/map-view';
import { locations, devices } from '@/lib/data';
import { Hospital, Truck, Wrench, Bot, Pencil, Trash2 } from 'lucide-react';

export default function SuperAdminDashboard() {
    const stats = {
        distributors: locations.filter(l => l.type === 'Distributor').length,
        clinics: locations.filter(l => l.type === 'Clinic').length,
        technicians: locations.filter(l => l.type === 'Technician').length,
        devices: devices.length,
    };

    const distributors = locations.filter(l => l.type === 'Distributor');

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
                            <CardDescription>Lokasi distributor di seluruh dunia.</CardDescription>
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
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {distributors.map(d => (
                                        <TableRow key={d.id}>
                                            <TableCell className="font-medium">{d.name}</TableCell>
                                            <TableCell>{`Lat: ${d.position.lat}, Lng: ${d.position.lng}`}</TableCell>
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
                            <CardTitle>Manajemen Aplikasi Monitoring</CardTitle>
                            <CardDescription>Kelola pengaturan dan fitur aplikasi monitoring.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground"> (Fitur sedang dalam pengembangan)</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
