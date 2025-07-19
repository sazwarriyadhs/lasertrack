
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapView } from '@/components/map-view';
import { distributorClinics as allClinics, devices } from '@/lib/data';
import type { ClinicLocation } from '@/lib/types';
import { useApp } from '@/context/app-context';

export default function DistributorDashboard() {
    const { user } = useApp();
    const distributorId = user.distributorId;
    const myClinics = allClinics.filter(loc => loc.distributorId === distributorId);

    const clinicsWithDevices = myClinics.map(clinic => ({
        ...clinic,
        devices: devices.filter(d => d.clinicId === clinic.id)
    }));

    return (
        <Card className="h-[85vh]">
            <CardHeader>
                <CardTitle>Peta Jaringan Klinik</CardTitle>
                <CardDescription>Lokasi klinik yang Anda kelola. Klik marker untuk detail perangkat.</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-8rem)] p-0">
                <MapView locations={clinicsWithDevices} initialZoom={5} />
            </CardContent>
        </Card>
    );
}
