import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapView } from '@/components/map-view';
import { locations, distributorLocations, activityLogs, userActivityData } from '@/lib/data';
import { Pencil, Trash2, Eye, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { DistributorLocation } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const statusBadge: Record<DistributorLocation['applicationStatus'], string> = {
    'Active': 'bg-green-500/80',
    'Inactive': 'bg-gray-500/80',
    'Expired': 'bg-red-500/80',
}

const chartConfig = {
  logins: {
    label: "Logins",
    color: "hsl(var(--primary))",
  },
  activities: {
    label: "Aktivitas",
    color: "hsl(var(--accent))",
  },
} satisfies import('@/components/ui/chart').ChartConfig;


export default function SuperAdminDashboard() {

    return (
        <div className="grid gap-6 p-4 sm:p-6" id="dashboard-content">
            <section id="map-section">
                <Card className="h-[60vh]">
                    <CardHeader>
                        <CardTitle>Peta Distributor & Klinik</CardTitle>
                        <CardDescription>Lokasi distributor dan klinik di seluruh dunia. Klik marker untuk detail.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-6rem)] p-0">
                    <MapView locations={locations} />
                    </CardContent>
                </Card>
            </section>

            <section id="stats-section">
                <Card>
                    <CardHeader>
                        <CardTitle>Statistik Penggunaan Aplikasi</CardTitle>
                        <CardDescription>Aktivitas pengguna selama 7 hari terakhir.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px] w-full">
                         <ChartContainer config={chartConfig} className="w-full h-full">
                            <AreaChart
                                accessibilityLayer
                                data={userActivityData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short'})}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Area
                                    dataKey="activities"
                                    type="natural"
                                    fill={chartConfig.activities.color}
                                    fillOpacity={0.4}
                                    stroke={chartConfig.activities.color}
                                    stackId="a"
                                />
                                <Area
                                    dataKey="logins"
                                    type="natural"
                                    fill={chartConfig.logins.color}
                                    fillOpacity={0.4}
                                    stroke={chartConfig.logins.color}
                                    stackId="b"
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </section>

            <section id="distributor-management-section">
                <Card>
                    <CardHeader>
                        <CardTitle>Manajemen Lisensi & Akun Distributor</CardTitle>
                        <CardDescription>Kelola lisensi aplikasi dan akun untuk semua distributor.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Distributor</TableHead>
                                    <TableHead>Status Lisensi</TableHead>
                                    <TableHead>Sisa Durasi</TableHead>
                                    <TableHead>Login Terakhir</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {distributorLocations.map((distributor) => (
                                    <TableRow key={distributor.id}>
                                        <TableCell className="font-medium">{distributor.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-normal">
                                                <span className={cn('h-2 w-2 rounded-full mr-2', statusBadge[distributor.applicationStatus])}></span>
                                                {distributor.applicationStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{distributor.licenseDuration}</TableCell>
                                        <TableCell>{distributor.lastLogin}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </section>

            <section id="activity-logs-section">
                <Card>
                    <CardHeader>
                        <CardTitle>Log Aktivitas</CardTitle>
                        <CardDescription>Rekaman aktivitas terbaru dari semua pengguna.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead>Pengguna</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activityLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                                        <TableCell>{log.user}</TableCell>
                                        <TableCell>{log.action}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
