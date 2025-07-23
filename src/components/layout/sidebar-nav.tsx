
'use client';
import Link from 'next/link';
import { useApp } from '@/context/app-context';
import { LayoutDashboard, Map, HardHat, Activity, Users, Hospital, Building, Route, Wrench, FileText, Send, MessageSquare, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/context/language-context';

export function SidebarNav() {
    const { user } = useApp();
    const pathname = usePathname();
    const { t } = useLanguage();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.includes('#')) {
            e.preventDefault();
            if (pathname !== '/dashboard') {
                // Navigate to dashboard first, then scroll
                 window.location.href = href;
            } else {
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
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
                navItems = [
                    { href: '/dashboard', label: t('distributor_map'), icon: Map },
                    { href: '/dashboard#distributor-management-section', label: t('distributor_management'), icon: Users },
                    { href: '/dashboard/chat', label: t('messages'), icon: MessageSquare },
                ];
                return (
                     <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Button asChild variant={pathname === item.href || (item.href.includes('#') && pathname==='/dashboard') ? 'secondary' : 'ghost'} className="w-full justify-start gap-2">
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
                navItems = [
                    { 
                        href: '/dashboard',
                        label: t('clinic_map'), 
                        icon: Map,
                    },
                    { 
                        label: t('management'), 
                        icon: HardHat,
                        subItems: [
                            { href: '/dashboard/clinic-management', label: t('clinic_list') },
                            { href: '/dashboard/device-monitoring', label: t('device_monitoring') },
                            { href: '/dashboard/technician-management', label: t('technician_list') },
                            { href: '/dashboard/technician-tracking', label: t('technician_tracking') },
                            { href: '/dashboard/technician-assignment', label: t('new_assignment') },
                        ]
                    },
                    { href: '/dashboard/reports', label: t('reports'), icon: Activity },
                    { href: '/dashboard/chat', label: t('messages'), icon: MessageSquare },
                ];
                const defaultActiveAccordion = navItems
                    .filter(item => 'subItems' in item && item.subItems && isSubItemActive(item.subItems))
                    .map(item => item.label);
                 return (
                    <Accordion type="multiple" defaultValue={defaultActiveAccordion} className="w-full">
                        {navItems.map((item) => (
                           'subItems' in item && item.subItems ? (
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
                navItems = [
                    { href: '/dashboard', label: t('dashboard_title', {role: ''}).replace(' Dashboard', '') },
                    { href: '/dashboard#maintenance-history-section', label: t('maintenance_history'), icon: FileText },
                    { href: '/dashboard#request-service-section', label: t('service_request'), icon: Send },
                ];
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
            case 'Technician':
                 navItems = [
                    { href: '/dashboard', label: t('daily_dashboard'), icon: LayoutDashboard },
                    { href: '/dashboard/device-list', label: t('device_list'), icon: List },
                ];
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

    return <nav className='px-2'>{renderNavItems()}</nav>;
}
