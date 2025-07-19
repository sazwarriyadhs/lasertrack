'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { type Location } from '@/lib/types';
import { Hospital, Truck, Wrench } from 'lucide-react';

const ICONS = {
    Clinic: <Hospital className="h-4 w-4 text-white" />,
    Distributor: <Truck className="h-4 w-4 text-white" />,
    Technician: <Wrench className="h-4 w-4 text-white" />,
};

const COLORS = {
    Clinic: 'bg-red-500',
    Distributor: 'bg-blue-500',
    Technician: 'bg-green-500',
};

export function MapView({ locations }: { locations: Location[] }) {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return (
            <div className="flex h-full items-center justify-center rounded-lg bg-muted">
                <div className="text-center text-muted-foreground">
                    <p className="font-semibold">Google Maps API Key is missing.</p>
                    <p className="text-sm">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.</p>
                </div>
            </div>
        );
    }

    const center = locations.length > 0 ? locations[0].position : { lat: 38, lng: -95 };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div style={{ height: '100%', width: '100%' }} className="rounded-b-lg overflow-hidden">
                <Map
                    defaultCenter={center}
                    defaultZoom={4}
                    mapId="lasertrack-map-1"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    className="rounded-b-lg"
                >
                    {locations.map((loc) => (
                         <AdvancedMarker key={loc.id} position={loc.position} title={loc.name}>
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md ${COLORS[loc.type]}`}>
                                {ICONS[loc.type]}
                            </div>
                         </AdvancedMarker>
                    ))}
                </Map>
            </div>
        </APIProvider>
    );
}
