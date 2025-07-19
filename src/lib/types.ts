export type Role = 'Super Admin' | 'Distributor' | 'Clinic' | 'Technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
}

export type DeviceStatus = 'Operational' | 'Under Maintenance' | 'Decommissioned' | 'Needs Attention';

export interface Device {
  id: string;
  name:string;
  model: string;
  serialNumber: string;
  clinicId: string;
  status: DeviceStatus;
  lastMaintenance: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'Distributor' | 'Clinic' | 'Technician';
  position: { lat: number; lng: number };
}

export interface DistributorLocation extends Location {
  type: 'Distributor';
  applicationStatus: 'Active' | 'Inactive' | 'Expired';
  licenseDuration: string;
  clinicCount: number;
  lastLogin: string;
}

export interface MaintenanceChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface ActivityLog {
    id: string;
    timestamp: string;
    user: string;
    action: string;
}

export interface UserActivity {
    date: string;
    logins: number;
    activities: number;
}
