
'use client';
import Link from 'next/link';
import { useApp } from '@/context/app-context';
import { LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { SidebarNav } from './sidebar-nav';


export function Sidebar() {
    const { user } = useApp();

    return (
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r bg-card">
            <div className="flex h-full flex-col">
                <div className="border-b">
                    <Link href="/dashboard"><Logo /></Link>
                </div>
                <nav className="flex-1 px-4 py-4">
                     <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">{user.role} Menu</p>
                    <SidebarNav />
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
