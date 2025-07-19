'use client';

import React, { useRef, useEffect } from 'react';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Circle, Fill, Stroke, Icon } from 'ol/style';
import type { Location, DistributorLocation, TechnicianLocation, ClinicLocation, Device } from '@/lib/types';
import { locations as allLocations, devices as allDevices } from '@/lib/data';

const COLORS: Record<Location['type'], string> = {
    Distributor: 'rgba(59, 130, 246, 0.9)', // blue-500
    Clinic: 'rgba(16, 185, 129, 0.9)', // emerald-500
    Technician: 'rgba(249, 115, 22, 0.9)', // orange-500
};

const statusBadge: Record<DistributorLocation['applicationStatus'], string> = {
    'Active': 'bg-green-500/80',
    'Inactive': 'bg-gray-500/80',
    'Expired': 'bg-red-500/80',
}

const handlingStatusBadge: Record<TechnicianLocation['handlingStatus'] | string, string> = {
    'Dalam Perjalanan': 'bg-blue-500/80',
    'Menangani': 'bg-yellow-500/80',
    'Selesai': 'bg-green-500/80',
    'Standby': 'bg-gray-500/80'
};


export function MapView({ locations }: { locations: Location[] }) {
    const mapRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current || !popupRef.current) return;

        const popupContainer = popupRef.current;

        const overlay = new Overlay({
            element: popupContainer,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        });
        
        const closer = popupContainer.querySelector('.ol-popup-closer') as HTMLElement;
        if(closer) {
            closer.onclick = () => {
                overlay.setPosition(undefined);
                closer.blur();
                return false;
            };
        }

        const centerCoordinates = locations.length > 0
            ? [locations[0].position.lng, locations[0].position.lat]
            : [-95, 38];
        const center = fromLonLat(centerCoordinates);

        const features = locations.map(loc => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([loc.position.lng, loc.position.lat])),
                ...loc
            });

            let style;
            if (loc.type === 'Technician') {
                 const tech = loc as TechnicianLocation;
                 const color = tech.dutyStatus === 'On Duty' ? COLORS.Technician : 'rgba(107, 114, 128, 0.7)'; // gray-500 for Off Duty
                 style = new Style({
                    image: new Circle({
                        radius: 7,
                        fill: new Fill({ color }),
                        stroke: new Stroke({ color: '#fff', width: 2 })
                    })
                });
            } else {
                style = new Style({
                    image: new Circle({
                        radius: loc.type === 'Distributor' ? 9 : 6,
                        fill: new Fill({ color: COLORS[loc.type] }),
                        stroke: new Stroke({ color: '#fff', width: 2 })
                    })
                });
            }
            feature.setStyle(style);
            return feature;
        });

        const vectorSource = new VectorSource({
            features: features
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer
            ],
            overlays: [overlay],
            view: new View({
                center: center,
                zoom: 4,
            }),
            controls: [],
        });

        map.on('click', (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
                return feature;
            });
            const content = popupContainer.querySelector('.popup-content') as HTMLElement;
            if (feature && content) {
                const props = feature.getProperties();
                const coordinates = (feature.getGeometry() as Point).getCoordinates();
                
                let popupContent = `<h3 class="font-bold text-lg">${props.name}</h3>`;
                popupContent += `<p class="text-sm text-muted-foreground">${props.type}</p>`;

                if (props.type === 'Distributor') {
                    const distProps = props as DistributorLocation;
                    let statusColor = statusBadge[distProps.applicationStatus];
                    popupContent += `
                        <div class="text-sm mt-2 space-y-2">
                             <div class="flex items-center gap-2">
                                <p class="font-semibold">Status:</p>
                                <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    <span class="h-2 w-2 rounded-full mr-2 ${statusColor}"></span>
                                    ${distProps.applicationStatus}
                                </div>
                            </div>
                            <div class="flex items-center gap-2 text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                                <span>${distProps.licenseDuration}</span>
                            </div>
                             <div class="flex items-center gap-2 text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hospital"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 10h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/><path d="M10 6h4"/></svg>
                                <span>Manages ${distProps.clinicCount} clinics</span>
                            </div>
                        </div>
                    `;
                } else if (props.type === 'Technician') {
                    const techProps = props as TechnicianLocation;
                    const destinationClinic = allLocations.find(l => l.id === techProps.destinationClinicId);
                    const handledDevice = allDevices.find(d => d.id === techProps.handledDeviceId);
                    
                    if (techProps.dutyStatus === 'On Duty' && techProps.handlingStatus) {
                        let statusColor = handlingStatusBadge[techProps.handlingStatus];
                        popupContent += `
                            <div class="text-sm mt-2 space-y-2">
                                <div class="flex items-center gap-2">
                                    <p class="font-semibold">Status:</p>
                                    <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                        <span class="h-2 w-2 rounded-full mr-2 ${statusColor}"></span>
                                        ${techProps.handlingStatus}
                                    </div>
                                </div>
                                <p><b>Klinik Tujuan:</b> ${destinationClinic?.name || 'N/A'}</p>
                                <p><b>Device:</b> ${handledDevice?.name || 'N/A'}</p>
                            </div>
                        `;
                    } else {
                         popupContent += `<p class="mt-2 text-sm text-muted-foreground">Status: Off Duty</p>`;
                    }

                }
                
                content.innerHTML = `<div class="p-1">${popupContent}</div>`;
                overlay.setPosition(coordinates);
            } else {
                overlay.setPosition(undefined);
            }
        });

        map.on('pointermove', function (e) {
            const pixel = map.getEventPixel(e.originalEvent);
            const hit = map.hasFeatureAtPixel(pixel);
            if(mapRef.current) {
               mapRef.current.style.cursor = hit ? 'pointer' : '';
            }
        });

        return () => map.setTarget(undefined);

    }, [locations]);

    return (
        <div style={{ height: '100%', width: '100%' }} className="rounded-b-lg overflow-hidden relative">
            <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
            <div ref={popupRef} className="ol-popup">
                <a href="#" className="ol-popup-closer"></a>
                <div className="popup-content"></div>
            </div>
        </div>
    );
}
