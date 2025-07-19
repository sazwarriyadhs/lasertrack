import type { User, Device, Location, MaintenanceChecklistItem } from '@/lib/types';

export const users: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'admin@lasertrack.com', role: 'Super Admin', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-2', name: 'Distributor User', email: 'distributor@lasertrack.com', role: 'Distributor', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-3', name: 'Clinic User', email: 'clinic@lasertrack.com', role: 'Clinic', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-4', name: 'Technician User', email: 'tech@lasertrack.com', role: 'Technician', avatarUrl: 'https://placehold.co/100x100' },
];

export const devices: Device[] = [
  { id: 'dev-1', name: 'LightSheer Desire', model: 'LS-2000', serialNumber: 'SN-A1B2C3D4', clinicId: 'clinic-1', status: 'Operational', lastMaintenance: '2024-05-01' },
  { id: 'dev-2', name: 'Lumenis M22', model: 'M22-ResurFX', serialNumber: 'SN-E5F6G7H8', clinicId: 'clinic-1', status: 'Under Maintenance', lastMaintenance: '2024-04-15' },
  { id: 'dev-3', name: 'Cynosure PicoSure', model: 'PS-300', serialNumber: 'SN-I9J0K1L2', clinicId: 'clinic-2', status: 'Needs Attention', lastMaintenance: '2024-03-20' },
  { id: 'dev-4', name: 'Candela GentleMax Pro', model: 'GMP-500', serialNumber: 'SN-M3N4O5P6', clinicId: 'clinic-2', status: 'Operational', lastMaintenance: '2024-06-10' },
  { id: 'dev-5', name: 'Solta Fraxel', model: 'Fraxel-Dual', serialNumber: 'SN-Q7R8S9T0', clinicId: 'clinic-1', status: 'Decommissioned', lastMaintenance: '2023-12-01' },
];

export const locations: Location[] = [
  { id: 'dist-1', name: 'West Coast Distribution', type: 'Distributor', position: { lat: 34.052235, lng: -118.243683 } },
  { id: 'dist-2', name: 'East Coast Supplies', type: 'Distributor', position: { lat: 40.712776, lng: -74.005974 } },
  { id: 'clinic-1', name: 'Sunset Aesthetics Clinic', type: 'Clinic', position: { lat: 34.0904, lng: -118.3618 } },
  { id: 'clinic-2', name: 'Metropolis Laser Center', type: 'Clinic', position: { lat: 40.758, lng: -73.9855 } },
  { id: 'tech-1', name: 'Tech Maria', type: 'Technician', position: { lat: 34.1522, lng: -118.4436 } },
  { id: 'tech-2', name: 'Tech John', type: 'Technician', position: { lat: 40.6127, lng: -73.9059 } },
];

export const maintenanceChecklist: MaintenanceChecklistItem[] = [
  { id: 'check-1', label: 'Calibrate laser output', checked: false },
  { id: 'check-2', label: 'Inspect cooling system', checked: false },
  { id: 'check-3', label: 'Clean optical components', checked: false },
  { id: 'check-4', label: 'Verify emergency shutoff', checked: false },
  { id: 'check-5', label: 'Update device firmware', checked: false },
  { id: 'check-6', label: 'Check power supply stability', checked: false },
];
