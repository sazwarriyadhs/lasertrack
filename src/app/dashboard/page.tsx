
'use client';

import { useApp } from '@/context/app-context';
import SuperAdminDashboard from '@/components/dashboards/super-admin-dashboard';
import DistributorDashboard from '@/components/dashboards/distributor-dashboard';
import ClinicDashboard from '@/components/dashboards/clinic-dashboard';
import TechnicianDashboard from '@/components/dashboards/technician-dashboard';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const renderDashboard = () => {
    switch (user.role) {
      case 'Super Admin':
        return <SuperAdminDashboard />;
      case 'Distributor':
        return <DistributorDashboard />;
      case 'Clinic':
        return <ClinicDashboard />;
      case 'Technician':
        return <TechnicianDashboard />;
      default:
        return <div>Invalid Role</div>;
    }
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 bg-muted/30">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
}
