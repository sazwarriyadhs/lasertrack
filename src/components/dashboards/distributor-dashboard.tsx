
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapView } from '@/components/map-view';
import { technicianLocations as allTechnicians } from '@/lib/data';

export default function DistributorDashboard() {
    const distributorId = 'dist-1'; // Static for now
    const myTechnicians = allTechnicians.filter(loc => loc.distributorId === distributorId);
    const onDutyTechnicians = myTechnicians.filter(t => t.dutyStatus === 'On Duty');

    return (
        <Card className="h-[85vh]">
            <CardHeader>
                <CardTitle>Peta Tim Teknisi</CardTitle>
                <CardDescription>Lokasi realtime teknisi yang sedang bertugas. Klik marker untuk detail.</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-8rem)] p-0">
                <MapView locations={onDutyTechnicians} />
            </CardContent>
        </Card>
    );
}
