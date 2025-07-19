'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Map, BarChart2, Users, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Logo = () => (
    <div className="flex items-center gap-2 px-4 h-16 border-b">
        <Bot className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold">LaserTrack Lite</h1>
    </div>
);

const navItems = [
    { href: '#map-section', label: 'Peta', icon: Map },
    { href: '#stats-section', label: 'Statistik', icon: BarChart2 },
    { href: '#distributor-management-section', label: 'Manajemen Distributor', icon: Users },
    { href: '#activity-logs-section', label: 'Log Aktivitas', icon: FileText },
]

export function SuperAdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r bg-card">
            <div className="flex h-full flex-col">
                <Logo />
                <nav className="flex-1 px-4 py-4">
                    <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">Dashboard</p>
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Button asChild variant={'ghost'} className="w-full justify-start gap-2">
                                    <Link href={item.href}>
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
