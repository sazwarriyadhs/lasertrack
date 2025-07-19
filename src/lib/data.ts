import type { User, Device, Location, MaintenanceChecklistItem, DistributorLocation, ActivityLog, UserActivity, ClinicLocation, TechnicianLocation, MaintenanceRecord, PurchaseHistoryRecord } from '@/lib/types';

export const users: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'superadmin@lasertrack.com', role: 'Super Admin', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-2', name: 'Distributor User', email: 'distributor@lasertrack.com', role: 'Distributor', avatarUrl: 'https://placehold.co/100x100', distributorId: 'dist-1' },
  { id: 'user-3', name: 'Clinic User', email: 'clinic@lasertrack.com', role: 'Clinic', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-4', name: 'Technician User', email: 'tech@lasertrack.com', role: 'Technician', avatarUrl: 'https://placehold.co/100x100' },
];

export const devices: Device[] = [
  { id: 'dev-1', name: 'LightSheer Desire', model: 'LS-2000', serialNumber: 'SN-A1B2C3D4', clinicId: 'clinic-1', status: 'Operational', lastMaintenance: '2024-05-01' },
  { id: 'dev-2', name: 'Lumenis M22', model: 'M22-ResurFX', serialNumber: 'SN-E5F6G7H8', clinicId: 'clinic-1', status: 'Under Maintenance', lastMaintenance: '2024-04-15' },
  { id: 'dev-3', name: 'Cynosure PicoSure', model: 'PS-300', serialNumber: 'SN-I9J0K1L2', clinicId: 'clinic-2', status: 'Needs Attention', lastMaintenance: '2024-03-20' },
  { id: 'dev-4', name: 'Candela GentleMax Pro', model: 'GMP-500', serialNumber: 'SN-M3N4O5P6', clinicId: 'clinic-2', status: 'Operational', lastMaintenance: '2024-06-10' },
  { id: 'dev-5', name: 'Solta Fraxel', model: 'Fraxel-Dual', serialNumber: 'SN-Q7R8S9T0', clinicId: 'clinic-3', status: 'Decommissioned', lastMaintenance: '2023-12-01' },
  { id: 'dev-6', name: 'Alma Soprano', model: 'Soprano-ICE', serialNumber: 'SN-V1W2X3Y4', clinicId: 'clinic-4', status: 'Operational', lastMaintenance: '2024-07-01' },
  { id: 'dev-7', name: 'BTL Emsculpt', model: 'Emsculpt-Neo', serialNumber: 'SN-Z5A6B7C8', clinicId: 'clinic-5', status: 'Needs Attention', lastMaintenance: '2024-06-18' },
];

export const distributorLocations: DistributorLocation[] = [
  { id: 'dist-1', name: 'West Coast Distribution', type: 'Distributor', position: { lat: 34.052235, lng: -118.243683 }, applicationStatus: 'Active', licenseDuration: '280 days remaining', clinicCount: 3, lastLogin: '2024-07-20', contact: { email: 'contact@westcoast.com', phone: '123-456-7890' }, avatarUrl: 'https://placehold.co/100x100/3B82F6/FFFFFF' },
  { id: 'dist-2', name: 'East Coast Supplies', type: 'Distributor', position: { lat: 40.712776, lng: -74.005974 }, applicationStatus: 'Active', licenseDuration: '150 days remaining', clinicCount: 2, lastLogin: '2024-07-21', contact: { email: 'support@eastcoast.com', phone: '987-654-3210' }, avatarUrl: 'https://placehold.co/100x100/10B981/FFFFFF' },
  { id: 'dist-3', name: 'Southern Distribution', type: 'Distributor', position: { lat: 29.7604, lng: -95.3698 }, applicationStatus: 'Expired', licenseDuration: 'Expired 15 days ago', clinicCount: 0, lastLogin: '2024-06-15', contact: { email: 'info@southern.com', phone: '555-123-4567' }, avatarUrl: 'https://placehold.co/100x100/EF4444/FFFFFF' },
  { id: 'dist-4', name: 'Midwest Medical', type: 'Distributor', position: { lat: 41.8781, lng: -87.6298 }, applicationStatus: 'Active', licenseDuration: '320 days remaining', clinicCount: 0, lastLogin: '2024-07-19', contact: { email: 'sales@midwest.com', phone: '222-333-4444' }, avatarUrl: 'https://placehold.co/100x100/6366F1/FFFFFF' },
];

export const distributorClinics: ClinicLocation[] = [
    { id: 'clinic-1', name: 'Sunset Aesthetics Clinic', type: 'Clinic', distributorId: 'dist-1', position: { lat: 34.0904, lng: -118.3618 }, avatarUrl: "https://placehold.co/100x100/16A34A/FFFFFF", contact: { email: 'info@sunset.com', phone: '123-111-2222'} },
    { id: 'clinic-2', name: 'Metropolis Laser Center', type: 'Clinic', distributorId: 'dist-2', position: { lat: 40.758, lng: -73.9855 }, avatarUrl: "https://placehold.co/100x100/16A34A/FFFFFF", contact: { email: 'info@metropolis.com', phone: '123-222-3333'} },
    { id: 'clinic-3', name: 'Downtown MedSpa', type: 'Clinic', distributorId: 'dist-1', position: { lat: 29.75, lng: -95.37 }, avatarUrl: "https://placehold.co/100x100/16A34A/FFFFFF", contact: { email: 'info@downtown.com', phone: '123-333-4444'} },
    { id: 'clinic-4', name: 'Windy City Wellness', type: 'Clinic', distributorId: 'dist-2', position: { lat: 41.89, lng: -87.63 }, avatarUrl: "https://placehold.co/100x100/16A34A/FFFFFF", contact: { email: 'info@windy.com', phone: '123-444-5555'} },
    { id: 'clinic-5', name: 'Golden Gate Health', type: 'Clinic', distributorId: 'dist-1', position: { lat: 37.7749, lng: -122.4194 }, avatarUrl: "https://placehold.co/100x100/16A34A/FFFFFF", contact: { email: 'info@gg.com', phone: '123-555-6666'} },
];

export const technicianLocations: TechnicianLocation[] = [
    { id: 'tech-1', name: 'Tech Maria', type: 'Technician', distributorId: 'dist-1', position: { lat: 34.1522, lng: -118.4436 }, dutyStatus: 'On Duty', handlingStatus: 'Dalam Perjalanan', destinationClinicId: 'clinic-1', handledDeviceId: 'dev-2', contact: { email: 'maria.t@tech.com', phone: '111-222-3333' }, avatarUrl: 'https://placehold.co/100x100/F97316/FFFFFF' },
    { id: 'tech-2', name: 'Tech John', type: 'Technician', distributorId: 'dist-2', position: { lat: 40.6127, lng: -73.9059 }, dutyStatus: 'On Duty', handlingStatus: 'Menangani', destinationClinicId: 'clinic-2', handledDeviceId: 'dev-3', contact: { email: 'john.d@tech.com', phone: '444-555-6666' }, avatarUrl: 'https://placehold.co/100x100/8B5CF6/FFFFFF' },
    { id: 'tech-3', name: 'Tech David', type: 'Technician', distributorId: 'dist-1', position: { lat: 37.8044, lng: -122.2711 }, dutyStatus: 'On Duty', handlingStatus: 'Selesai', destinationClinicId: 'clinic-5', handledDeviceId: 'dev-7', contact: { email: 'dave.s@tech.com', phone: '777-888-9999' }, avatarUrl: 'https://placehold.co/100x100/0EA5E9/FFFFFF' },
    { id: 'tech-4', name: 'Tech Sarah', type: 'Technician', distributorId: 'dist-1', position: { lat: 33.9522, lng: -118.3436 }, dutyStatus: 'Off Duty', contact: { email: 'sarah.w@tech.com', phone: '121-212-3232' }, avatarUrl: 'https://placehold.co/100x100/EC4899/FFFFFF' },
    { id: 'tech-5', name: 'Tech Mike', type: 'Technician', distributorId: 'dist-1', position: { lat: 34.05, lng: -118.24 }, dutyStatus: 'On Duty', handlingStatus: 'Standby', contact: { email: 'mike.p@tech.com', phone: '321-654-9870' }, avatarUrl: 'https://placehold.co/100x100/14B8A6/FFFFFF' }
];

export const locations: Location[] = [
  ...distributorLocations,
  ...distributorClinics,
  ...technicianLocations,
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
    { id: 'log-6', timestamp: '2024-07-19 11:00 AM', user: 'distributor@lasertrack.com', action: 'Assigned Tech John to Clinic-2' },
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

export const maintenanceHistory: MaintenanceRecord[] = [
    { id: 'hist-1', deviceId: 'dev-1', date: '2024-05-01', technicianName: 'Tech Maria', description: 'Annual calibration and cooling system check.' },
    { id: 'hist-2', deviceId: 'dev-2', date: '2024-04-15', technicianName: 'Tech John', description: 'Replaced optical filter and firmware update.' },
    { id: 'hist-3', deviceId: 'dev-3', date: '2024-03-20', technicianName: 'Tech John', description: 'Power supply diagnostics. Needs replacement.' },
    { id: 'hist-4', deviceId: 'dev-1', date: '2023-11-10', technicianName: 'Tech Maria', description: 'Emergency shutoff test and general cleaning.' },
    { id: 'hist-5', deviceId: 'dev-7', date: '2024-06-18', technicianName: 'Tech David', description: 'Software glitch resolved.' },
];

export const purchaseHistory: PurchaseHistoryRecord[] = [
    { id: 'pur-1', deviceId: 'dev-1', deviceName: 'LightSheer Desire', purchaseDate: '2023-01-15', distributorName: 'West Coast Distribution', warrantyEndDate: '2025-01-15' },
    { id: 'pur-2', deviceId: 'dev-2', deviceName: 'Lumenis M22', purchaseDate: '2022-11-20', distributorName: 'West Coast Distribution', warrantyEndDate: '2024-11-20' },
    { id: 'pur-3', deviceId: 'dev-3', deviceName: 'Cynosure PicoSure', purchaseDate: '2023-03-10', distributorName: 'East Coast Supplies', warrantyEndDate: '2025-03-10' },
    { id: 'pur-4', deviceId: 'dev-4', deviceName: 'Candela GentleMax Pro', purchaseDate: '2023-06-01', distributorName: 'East Coast Supplies', warrantyEndDate: '2025-06-01' },
];
