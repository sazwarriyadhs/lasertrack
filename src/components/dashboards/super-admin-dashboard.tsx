import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
            
             <Card className="h-[60vh]">
                <CardHeader>
                    <CardTitle>Peta Distributor Global</CardTitle>
                    <CardDescription>Lokasi distributor di seluruh dunia. Klik marker untuk melihat detail.</CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100%-6rem)] p-0">
                   <MapView locations={distributors} />
                </CardContent>
            </Card>
        </div>
    );
}
