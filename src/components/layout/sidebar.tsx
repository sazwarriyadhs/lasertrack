'use client';
import Link from 'next/link';
import { useApp } from '@/context/app-context';
import { Bot, LayoutDashboard, Map, BarChart2, BadgeCheck, FileText, Wrench, Hospital, Users, AreaChart, Settings, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const Logo = () => (
    <div className="flex items-center gap-2 px-4 h-16 border-b">
        <Bot className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold">LaserTrack Lite</h1>
    </div>
);

const superAdminNavItems = [
    { href: '#map-section', label: 'Peta', icon: Map },
    { href: '#stats-section', label: 'Statistik', icon: BarChart2 },
    { href: '#distributor-management-section', label: 'Manajemen Lisensi', icon: BadgeCheck },
    { href: '#activity-logs-section', label: 'Log Aktivitas', icon: FileText },
];

const distributorNavItems = [
    { href: '#', label: 'Dashboard', icon: LayoutDashboard },
    { href: '#', label: 'Manajemen Tim', icon: Users },
    { href: '#', label: 'Monitoring Device', icon: Wrench },
    { href: '#', label: 'Laporan', icon: AreaChart },
];

const clinicNavItems = [
    { href: '#', label: 'Dashboard', icon: LayoutDashboard },
    { href: '#', label: 'Perangkat Saya', icon: Wrench },
    { href: '#', label: 'Riwayat', icon: FileText },
    { href: '#', label: 'Kontak', icon: Users },
];

const technicianNavItems = [
    { href: '#', label: 'Tugas Saya', icon: LayoutDashboard },
    { href: '/maintenance/dev-2', label: 'Maintenance Aktif', icon: Wrench },
    { href: '#', label: 'Pengaturan', icon: Settings },
];

const getNavItemsByRole = (role: string) => {
    switch (role) {
        case 'Super Admin':
            return superAdminNavItems;
        case 'Distributor':
            return distributorNavItems;
        case 'Clinic':
            return clinicNavItems;
        case 'Technician':
            return technicianNavItems;
        default:
            return [];
    }
};

export function Sidebar() {
    const { user } = useApp();
    const pathname = usePathname();
    const navItems = getNavItemsByRole(user.role);

    return (
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r bg-card">
            <div className="flex h-full flex-col">
                <Logo />
                <nav className="flex-1 px-4 py-4">
                     <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">{user.role} Menu</p>
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Button asChild variant={pathname === item.href ? 'secondary' : 'ghost'} className="w-full justify-start gap-2">
                                    <Link href={item.href}>
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-auto p-4 border-t">
                     <Button asChild variant="ghost" className="w-full justify-start gap-2">
                        <Link href="#">
                            <LifeBuoy className="h-5 w-5" />
                            Support
                        </Link>
                    </Button>
                </div>
            </div>
        </aside>
    );
}
