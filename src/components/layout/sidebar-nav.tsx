'use client';
import Link from 'next/link';
import { useApp } from '@/context/app-context';
import { LayoutDashboard, Map, BarChart2, BadgeCheck, FileText, HardHat, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const superAdminNavItems = [
    { href: '/dashboard', label: 'Peta', icon: Map },
    { href: '/dashboard#stats-section', label: 'Statistik', icon: BarChart2 },
    { href: '/dashboard#distributor-management-section', label: 'Manajemen Lisensi', icon: BadgeCheck },
    { href: '/dashboard#activity-logs-section', label: 'Log Aktivitas', icon: FileText },
];

const distributorNavItems = [
    { 
        label: 'Monitoring', 
        icon: LayoutDashboard,
        subItems: [
            { href: '/dashboard', label: 'Peta Teknisi' },
            { href: '/dashboard/device-monitoring', label: 'Monitoring Perangkat' },
        ]
    },
    { 
        label: 'Manajemen Tim', 
        icon: HardHat,
        subItems: [
            { href: '/dashboard/technician-management', label: 'Daftar Teknisi' },
            { href: '/dashboard/technician-assignment', label: 'Penugasan Baru' },
        ]
    },
    { href: '/dashboard/reports', label: 'Laporan', icon: Activity },
];

const clinicNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const technicianNavItems = [
    { href: '/dashboard', label: 'Tugas Saya', icon: LayoutDashboard },
];

export function SidebarNav() {
    const { user } = useApp();
    const pathname = usePathname();

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

    const isSubItemActive = (subItems: { href: string }[]) => {
        return subItems.some(item => pathname === item.href);
    };
    
    const renderNavItems = () => {
        let navItems;
        switch (user.role) {
            case 'Super Admin':
                navItems = superAdminNavItems;
                return (
                     <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Button asChild variant={pathname === item.href ? 'secondary' : 'ghost'} className="w-full justify-start gap-2">
                                    <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                );
            case 'Distributor':
                navItems = distributorNavItems;
                const defaultActiveAccordion = navItems
                    .filter(item => item.subItems && isSubItemActive(item.subItems))
                    .map(item => item.label);
                 return (
                    <Accordion type="multiple" defaultValue={defaultActiveAccordion} className="w-full">
                        {navItems.map((item) => (
                            item.subItems ? (
                                <AccordionItem value={item.label} key={item.label} className="border-b-0">
                                    <AccordionTrigger className="py-2 hover:no-underline hover:bg-muted rounded-md px-2 [&[data-state=open]>svg]:text-primary">
                                         <div className="flex items-center gap-2 text-base font-medium">
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-6 pt-1">
                                        <ul className="space-y-1">
                                            {item.subItems.map(subItem => (
                                                <li key={subItem.label}>
                                                    <Button asChild variant={pathname === subItem.href ? 'secondary' : 'ghost'} className="w-full justify-start gap-2 h-9">
                                                        <Link href={subItem.href}>
                                                            {subItem.label}
                                                        </Link>
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ) : (
                                 <Button asChild key={item.label} variant={pathname === item.href ? 'secondary' : 'ghost'} className="w-full justify-start gap-2 text-base font-medium py-2 h-auto mt-1">
                                    <Link href={item.href}>
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                </Button>
                            )
                        ))}
                    </Accordion>
                );
            case 'Clinic':
                navItems = clinicNavItems;
                return (
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
                );
            case 'Technician':
                 navItems = technicianNavItems;
                 return (
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
                );
            default:
                return null;
        }
    }

    return <>{renderNavItems()}</>;
}
