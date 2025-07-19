
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapView } from '@/components/map-view';
import { technicianLocations as allTechnicians } from '@/lib/data';
import type { TechnicianLocation } from '@/lib/types';
import { useApp } from '@/context/app-context';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TechnicianTrackingPage() {
    const { user } = useApp();
    const distributorId = user.distributorId;

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const myTechnicians = useMemo(() => {
        if (!distributorId) return [];
        return allTechnicians.filter(tech => tech.distributorId === distributorId);
    }, [distributorId]);
    
    const filteredTechnicians = useMemo(() => {
        let technicians = myTechnicians;

        if (searchTerm) {
             technicians = technicians.filter(tech => tech.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (statusFilter !== 'All') {
            if(statusFilter === 'On Duty') {
                technicians = technicians.filter(tech => tech.dutyStatus === 'On Duty');
            } else if (statusFilter === 'Off Duty') {
                 technicians = technicians.filter(tech => tech.dutyStatus === 'Off Duty');
            } else { // It's a handlingStatus
                 technicians = technicians.filter(tech => tech.handlingStatus === statusFilter);
            }
        }
        
        return technicians;

    }, [myTechnicians, searchTerm, statusFilter]);

    return (
        <Card className="h-[85vh]">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <CardTitle>Peta Pelacakan Teknisi</CardTitle>
                        <CardDescription>Lokasi dan status tim teknisi Anda secara real-time.</CardDescription>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama teknisi..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Filter Status Teknisi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">Semua Status</SelectItem>
                                <SelectItem value="On Duty">On Duty</SelectItem>
                                <SelectItem value="Off Duty">Off Duty</SelectItem>
                                <SelectItem value="Dalam Perjalanan">Dalam Perjalanan</SelectItem>
                                <SelectItem value="Menangani">Menangani</SelectItem>
                                <SelectItem value="Selesai">Selesai</SelectItem>
                                <SelectItem value="Standby">Standby</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-10rem)] sm:h-[calc(100%-8rem)] p-0">
                <MapView locations={filteredTechnicians} initialZoom={5} />
            </CardContent>
        </Card>
    );
}
