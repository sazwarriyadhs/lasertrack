
'use client';

import { useApp } from '@/context/app-context';
import SuperAdminDashboard from '@/components/dashboards/super-admin-dashboard';
import DistributorDashboard from '@/components/dashboards/distributor-dashboard';
import ClinicDashboard from '@/components/dashboards/clinic-dashboard';
import TechnicianDashboard from '@/components/dashboards/technician-dashboard';
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
    <>
      {renderDashboard()}
    </>
  );
}
