import type { User, Device, Location, MaintenanceChecklistItem, DistributorLocation, ActivityLog, UserActivity } from '@/lib/types';

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

export const distributorLocations: DistributorLocation[] = [
  { id: 'dist-1', name: 'West Coast Distribution', type: 'Distributor', position: { lat: 34.052235, lng: -118.243683 }, applicationStatus: 'Active', licenseDuration: '280 days remaining', clinicCount: 8, lastLogin: '2024-07-20' },
  { id: 'dist-2', name: 'East Coast Supplies', type: 'Distributor', position: { lat: 40.712776, lng: -74.005974 }, applicationStatus: 'Active', licenseDuration: '150 days remaining', clinicCount: 12, lastLogin: '2024-07-21' },
  { id: 'dist-3', name: 'Southern Distribution', type: 'Distributor', position: { lat: 29.7604, lng: -95.3698 }, applicationStatus: 'Expired', licenseDuration: 'Expired 15 days ago', clinicCount: 5, lastLogin: '2024-06-15' },
  { id: 'dist-4', name: 'Midwest Medical', type: 'Distributor', position: { lat: 41.8781, lng: -87.6298 }, applicationStatus: 'Active', licenseDuration: '320 days remaining', clinicCount: 15, lastLogin: '2024-07-19' },
];

export const locations: Location[] = [
  ...distributorLocations,
  { id: 'clinic-1', name: 'Sunset Aesthetics Clinic', type: 'Clinic', position: { lat: 34.0904, lng: -118.3618 } },
  { id: 'clinic-2', name: 'Metropolis Laser Center', type: 'Clinic', position: { lat: 40.758, lng: -73.9855 } },
  { id: 'clinic-3', name: 'Downtown MedSpa', type: 'Clinic', position: { lat: 29.75, lng: -95.37 } },
  { id: 'clinic-4', name: 'Windy City Wellness', type: 'Clinic', position: { lat: 41.89, lng: -87.63 } },
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

export const activityLogs: ActivityLog[] = [
    { id: 'log-1', timestamp: '2024-07-21 10:05 AM', user: 'distributor@lasertrack.com', action: 'Logged in' },
    { id: 'log-2', timestamp: '2024-07-21 10:06 AM', user: 'distributor@lasertrack.com', action: 'Viewed clinic list' },
    { id: 'log-3', timestamp: '2024-07-20 09:15 AM', user: 'tech@lasertrack.com', action: 'Started maintenance on device SN-E5F6G7H8' },
    { id: 'log-4', timestamp: '2024-07-20 08:00 AM', user: 'admin@lasertrack.com', action: 'Viewed distributor map' },
    { id: 'log-5', timestamp: '2024-07-19 02:30 PM', user: 'clinic@lasertrack.com', action: 'Viewed device list' },
    { id: 'log-6', timestamp: '2024-07-19 11:00 AM', user: 'distributor@lasertrack.com', action: 'Added new technician' },
];

export const userActivityData: UserActivity[] = [
  { date: '2024-07-15', logins: 25, activities: 120 },
  { date: '2024-07-16', logins: 30, activities: 150 },
  { date: '2024-07-17', logins: 28, activities: 140 },
  { date: '2024-07-18', logins: 35, activities: 180 },
  { date: '2024-07-19', logins: 40, activities: 200 },
  { date: '2024-07-20', logins: 38, activities: 190 },
  { date: '2024-07-21', logins: 45, activities: 220 },
];
