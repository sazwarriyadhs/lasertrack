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
  name: string;
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

export interface MaintenanceChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}
