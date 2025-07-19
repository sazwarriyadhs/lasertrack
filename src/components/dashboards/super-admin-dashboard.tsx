import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapView } from '@/components/map-view';
import { locations, devices } from '@/lib/data';
import { Hospital, Truck, Wrench, Bot } from 'lucide-react';

export default function SuperAdminDashboard() {
    const stats = {
        distributors: locations.filter(l => l.type === 'Distributor').length,
        clinics: locations.filter(l => l.type === 'Clinic').length,
        technicians: locations.filter(l => l.type === 'Technician').length,
        devices: devices.length,
    };

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
                    <CardTitle>Global Asset Map</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-4rem)] p-0">
                   <MapView locations={locations} />
                </CardContent>
            </Card>
        </div>
    );
}
