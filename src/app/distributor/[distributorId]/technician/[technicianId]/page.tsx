
'use client';

import { technicianLocations, distributorLocations, devices } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Phone, MapPin, HardHat, CheckCircle, Wrench, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { cn } from '@/lib/utils';
import type { TechnicianLocation, HandlingStatus } from '@/lib/types';
import React from 'react';
import { MapView } from '@/components/map-view';
import { useLanguage } from '@/context/language-context';


const handlingStatusInfo: Record<HandlingStatus, { icon: React.ElementType, labelKey: string, color: string }> = {
    'Dalam Perjalanan': { icon: Route, labelKey: 'en_route', color: 'text-blue-500' },
    'Menangani': { icon: Wrench, labelKey: 'handling', color: 'text-yellow-500' },
    'Selesai': { icon: CheckCircle, labelKey: 'completed', color: 'text-green-500' },
    'Standby': { icon: CheckCircle, labelKey: 'standby', color: 'text-gray-500' },
};


export default function TechnicianDetailPage({ params }: { params: { distributorId: string, technicianId: string } }) {
    const { distributorId, technicianId } = params;
    const router = useRouter();
    const { t } = useLanguage();
    const technician = technicianLocations.find(t => t.id === technicianId && t.distributorId === distributorId);
    const distributor = distributorLocations.find(d => d.id === distributorId);
    
    if (!technician || !distributor) {
        notFound();
    }

    const handledDevice = technician.dutyStatus === 'On Duty' && technician.handledDeviceId ? devices.find(d => d.id === technician.handledDeviceId) : null;
    const statusInfo = technician.dutyStatus === 'On Duty' && technician.handlingStatus ? handlingStatusInfo[technician.handlingStatus] : null;

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
             <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
                <div className="flex-1">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t('back')}
                    </Button>
                </div>
                 <Logo />
                 <div className="flex-1" />
            </header>
            <main className="flex-1 p-4 sm:p-6 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
                     <Card className="lg:col-span-1">
                        <CardHeader className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-t-lg">
                            <Avatar className="h-24 w-24 mb-4 border-4 border-background" data-ai-hint="person portrait">
                                <AvatarImage src={technician.avatarUrl} alt={technician.name} />
                                <AvatarFallback>{technician.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-3xl">{technician.name}</CardTitle>
                            <CardDescription>{t('professional_technician_at', {distributor: distributor.name})}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg border-b pb-2">{t('contact_information')}</h3>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <span>{technician.contact.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                    <span>{technician.contact.phone}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                                    <span>{technician.address}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                 <h3 className="font-semibold text-lg border-b pb-2">{t('duty_status')}</h3>
                                <Badge variant={technician.dutyStatus === 'On Duty' ? 'default' : 'secondary'} className="text-base">
                                   {technician.dutyStatus === 'On Duty' ? t('on_duty_label') : t('off_duty_label')}
                                </Badge>

                                {statusInfo && (
                                     <div className="flex items-center gap-3">
                                        <statusInfo.icon className={cn("h-5 w-5", statusInfo.color)} />
                                        <span className={cn("font-semibold", statusInfo.color)}>{t(statusInfo.labelKey)}</span>
                                    </div>
                                )}

                                {handledDevice ? (
                                     <Card className="bg-muted/50">
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <HardHat className="h-4 w-4" />
                                                {t('handling_device')}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-3 pt-0">
                                             <p className="font-semibold">{handledDevice.name}</p>
                                             <p className="text-sm text-muted-foreground">SN: {handledDevice.serialNumber}</p>
                                        </CardContent>
                                    </Card>
                                ) : technician.dutyStatus === 'On Duty' ? (
                                     <Card className="bg-muted/50">
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <HardHat className="h-4 w-4" />
                                                {t('current_task')}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-3 pt-0">
                                             <p className="font-semibold">{t('standby')}</p>
                                             <p className="text-sm text-muted-foreground">{t('waiting_for_new_assignment')}</p>
                                        </CardContent>
                                    </Card>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-1 h-[400px] lg:h-auto">
                        <CardHeader>
                            <CardTitle>{t('technician_location_gps')}</CardTitle>
                            <CardDescription>{t('last_recorded_position')}</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-8rem)] p-0">
                            <MapView locations={[technician]} initialZoom={15} />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
