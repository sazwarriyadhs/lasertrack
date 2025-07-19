'use client';

import { useApp } from '@/context/app-context';
import SuperAdminDashboard from '@/components/dashboards/super-admin-dashboard';
import DistributorDashboard from '@/components/dashboards/distributor-dashboard';
import ClinicDashboard from '@/components/dashboards/clinic-dashboard';
import TechnicianDashboard from '@/components/dashboards/technician-dashboard';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';

export default function Home() {
  const { user } = useApp();

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

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
}
