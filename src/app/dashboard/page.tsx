
'use client';

import { useApp } from '@/context/app-context';
import SuperAdminDashboard from '@/components/dashboards/super-admin-dashboard';
import DistributorDashboard from '@/components/dashboards/distributor-dashboard';
import ClinicDashboard from '@/components/dashboards/clinic-dashboard';
import TechnicianDashboard from '@/components/dashboards/technician-dashboard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ClinicLayout from './(clinic)/layout';
import DistributorLayout from './(distributor)/layout';
import TechnicianLayout from './(technician)/layout';

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
        return <DistributorLayout><DistributorDashboard /></DistributorLayout>;
      case 'Clinic':
        return <ClinicLayout><ClinicDashboard /></ClinicLayout>;
      case 'Technician':
        return <TechnicianLayout><TechnicianDashboard /></TechnicianLayout>;
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
