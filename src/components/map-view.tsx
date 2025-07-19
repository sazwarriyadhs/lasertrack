'use client';

import React, { useRef, useEffect } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import type { Location } from '@/lib/types';

const COLORS = {
    Clinic: 'rgba(239, 68, 68, 0.8)', // red-500
    Distributor: 'rgba(59, 130, 246, 0.8)', // blue-500
    Technician: 'rgba(34, 197, 94, 0.8)', // green-500
};

export function MapView({ locations }: { locations: Location[] }) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const center = locations.length > 0
            ? fromLonLat([locations[0].position.lng, locations[0].position.lat])
            : fromLonLat([-95, 38]);

        const features = locations.map(loc => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([loc.position.lng, loc.position.lat])),
                name: loc.name,
            });
            feature.setStyle(new Style({
                image: new Circle({
                    radius: 8,
                    fill: new Fill({ color: COLORS[loc.type] }),
                    stroke: new Stroke({ color: '#fff', width: 2 })
                })
            }));
            return feature;
        });

        const vectorSource = new VectorSource({
            features: features
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer
            ],
            view: new View({
                center: center,
                zoom: 4,
            }),
            controls: [],
        });

        // Cleanup on unmount
        return () => map.setTarget(undefined);

    }, [locations]);

    return (
        <div style={{ height: '100%', width: '100%' }} className="rounded-b-lg overflow-hidden">
            <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
}
