
'use client';
import Link from 'next/link';
import { useApp } from '@/context/app-context';
import { LayoutDashboard, Map, BarChart2, BadgeCheck, FileText, Wrench, Users, AreaChart, Settings, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/layout/logo';


const superAdminNavItems = [
    { href: '/dashboard#map-section', label: 'Peta', icon: Map },
    { href: '/dashboard#stats-section', label: 'Statistik', icon: BarChart2 },
    { href: '/dashboard#distributor-management-section', label: 'Manajemen Lisensi', icon: BadgeCheck },
    { href: '/dashboard#activity-logs-section', label: 'Log Aktivitas', icon: FileText },
];

const distributorNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const clinicNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const technicianNavItems = [
    { href: '/dashboard', label: 'Tugas Saya', icon: LayoutDashboard },
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

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname === '/dashboard' && href.includes('#')) {
            e.preventDefault();
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };


    return (
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r bg-card">
            <div className="flex h-full flex-col">
                <div className="border-b">
                    <Link href="/dashboard"><Logo /></Link>
                </div>
                <nav className="flex-1 px-4 py-4">
                     <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">{user.role} Menu</p>
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Button asChild variant={'ghost'} className="w-full justify-start gap-2">
                                    <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
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
