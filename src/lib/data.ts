
import type { User, Device, Location, MaintenanceChecklistItem, DistributorLocation, ActivityLog, UserActivity, ClinicLocation, TechnicianLocation, MaintenanceRecord, PurchaseHistoryRecord } from '@/lib/types';

export const users: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'superadmin@lasertrack.com', role: 'Super Admin', avatarUrl: 'https://placehold.co/100x100', address: '123 Admin Plaza, Suite 100, Capital City', contact: {email: 'superadmin@lasertrack.com', phone: '555-0101'} },
  { id: 'user-2', name: 'PT Regenesis Indonesia', email: 'distributor@lasertrack.com', role: 'Distributor', avatarUrl: 'https://placehold.co/100x100/1e40af/FFFFFF', distributorId: 'dist-5', address: 'Gedung Regenesis, Jl. Jend. Sudirman Kav. 50, Jakarta, Indonesia', contact: {email: 'info@regenesis.co.id', phone: '021-1234-5678'} },
  { id: 'user-3', name: 'Klinik Baruna', email: 'clinic@lasertrack.com', role: 'Clinic', clinicId: 'clinic-10', distributorId: 'dist-5', avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', address: 'Jl. Pajajaran No. 9, Bogor', contact: {email: 'hello@baruna.clinic', phone: '021-222-5555'} },
  { id: 'user-4', name: 'Budi Teknisi', email: 'tech@lasertrack.com', role: 'Technician', avatarUrl: 'https://placehold.co/100x100/F97316/FFFFFF', address: 'Jl. Teknisi No. 1, Jakarta', contact: {email: 'budi.t@tech.com', phone: '0812-1111-2222'} },
];

export const devices: Device[] = [
  { id: 'dev-1', name: 'PicoWay®', model: 'Candela-PW', serialNumber: 'SN-A1B2C3D4', clinicId: 'clinic-6', status: 'Operational', lastMaintenance: '2024-05-01' },
  { id: 'dev-2', name: 'Vbeam Perfecta®', model: 'Candela-VB', serialNumber: 'SN-E5F6G7H8', clinicId: 'clinic-6', status: 'Under Maintenance', lastMaintenance: '2024-04-15' },
  { id: 'dev-3', name: 'Cellec V', model: 'Jeisys-CV', serialNumber: 'SN-I9J0K1L2', clinicId: 'clinic-7', status: 'Operational', lastMaintenance: '2024-03-20' },
  { id: 'dev-4', name: 'BeautiFill', model: 'Alma-BF', serialNumber: 'SN-M3N4O5P6', clinicId: 'clinic-7', status: 'Operational', lastMaintenance: '2024-06-10' },
  { id: 'dev-5', name: 'BiAxis QS™', model: 'BiAxis-QS', serialNumber: 'SN-Q7R8S9T0', clinicId: 'clinic-8', status: 'Decommissioned', lastMaintenance: '2023-12-01' },
  { id: 'dev-6', name: 'PicoWay®', model: 'Candela-PW', serialNumber: 'SN-V1W2X3Y4', clinicId: 'clinic-9', status: 'Operational', lastMaintenance: '2024-07-01' },
  { id: 'dev-7', name: 'Vbeam Perfecta®', model: 'Candela-VB', serialNumber: 'SN-Z5A6B7C8', clinicId: 'clinic-10', status: 'Needs Attention', lastMaintenance: '2024-06-18' },
];

export const distributorLocations: DistributorLocation[] = [
  { id: 'dist-5', name: 'PT Regenesis Indonesia', type: 'Distributor', position: { lat: -6.224, lng: 106.805 }, applicationStatus: 'Active', licenseDuration: '365 days remaining', clinicCount: 5, lastLogin: '2024-07-22', contact: { email: 'info@regenesis.co.id', phone: '021-1234-5678' }, avatarUrl: 'https://placehold.co/100x100/1e40af/FFFFFF', address: 'Gedung Sahid Sudirman Center, Jl. Jend. Sudirman Kav. 86, Jakarta' },
  { id: 'dist-2', name: 'PT Innomed Jaya Utama', type: 'Distributor', position: { lat: -6.18, lng: 106.83 }, applicationStatus: 'Active', licenseDuration: '150 days remaining', clinicCount: 0, lastLogin: '2024-07-21', contact: { email: 'support@innomed.asia', phone: '021-987-6543' }, avatarUrl: 'https://placehold.co/100x100/10B981/FFFFFF', address: "Jl. Kramat Raya No. 45, Jakarta" },
  { id: 'dist-3', name: 'PT Redo Marketing Indonesia', type: 'Distributor', position: { lat: -6.25, lng: 106.80 }, applicationStatus: 'Expired', licenseDuration: 'Expired 15 days ago', clinicCount: 0, lastLogin: '2024-06-15', contact: { email: 'info@redo.co.id', phone: '021-555-1234' }, avatarUrl: 'https://placehold.co/100x100/EF4444/FFFFFF', address: "Jl. Wolter Monginsidi No. 10, Jakarta Selatan" },
  { id: 'dist-4', name: 'PT Estetika Pro International', type: 'Distributor', position: { lat: -6.21, lng: 106.85 }, applicationStatus: 'Active', licenseDuration: '320 days remaining', clinicCount: 0, lastLogin: '2024-07-19', contact: { email: 'sales@espro.co.id', phone: '021-222-3333' }, avatarUrl: 'https://placehold.co/100x100/6366F1/FFFFFF', address: "Jl. KH. Wahid Hasyim No. 50, Jakarta Pusat" },
];

export const distributorClinics: ClinicLocation[] = [
    { id: 'clinic-6', name: 'Klinik Dr. Ananda', type: 'Clinic', distributorId: 'dist-5', position: { lat: -6.4025, lng: 106.7942 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'info@ananda-depok.com', phone: '021-777-1111'}, address: 'Jl. Margonda Raya No. 5, Depok'},
    { id: 'clinic-7', name: 'Klinik Pratama Divine', type: 'Clinic', distributorId: 'dist-5', position: { lat: -6.1751, lng: 106.8650 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'contact@divineclinic.com', phone: '021-888-2222'}, address: 'Jl. Gatot Subroto No. 12, Jakarta'},
    { id: 'clinic-8', name: 'Klinik Surya Medika', type: 'Clinic', distributorId: 'dist-5', position: { lat: -6.1783, lng: 106.6319 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'cs@suryamedika.co.id', phone: '021-999-3333'}, address: 'Jl. Daan Mogot No. 8, Tangerang'},
    { id: 'clinic-9', name: 'Klinik Meiril Center', type: 'Clinic', distributorId: 'dist-5', position: { lat: -6.2383, lng: 106.9756 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'support@meiril.com', phone: '021-111-4444'}, address: 'Jl. Patriot No. 1, Bekasi'},
    { id: 'clinic-10', name: 'Klinik Baruna', type: 'Clinic', distributorId: 'dist-5', position: { lat: -6.5950, lng: 106.8062 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'hello@baruna.clinic', phone: '021-222-5555'}, address: 'Jl. Pajajaran No. 9, Bogor'},
];

export const technicianLocations: TechnicianLocation[] = [
    { id: 'tech-1', name: 'Budi Teknisi', type: 'Technician', distributorId: 'dist-5', position: { lat: -6.36, lng: 106.82 }, dutyStatus: 'On Duty', handlingStatus: 'Dalam Perjalanan', destinationClinicId: 'clinic-6', handledDeviceId: 'dev-2', contact: { email: 'budi.t@tech.com', phone: '0812-1111-2222' }, avatarUrl: 'https://placehold.co/100x100/F97316/FFFFFF', address: "Jl. Teknisi No. 1, Jakarta" },
    { id: 'tech-2', name: 'Citra Ayu', type: 'Technician', distributorId: 'dist-5', position: { lat: -6.17, lng: 106.80 }, dutyStatus: 'On Duty', handlingStatus: 'Menangani', destinationClinicId: 'clinic-10', handledDeviceId: 'dev-7', contact: { email: 'citra.a@tech.com', phone: '0812-3333-4444' }, avatarUrl: 'https://placehold.co/100x100/8B5CF6/FFFFFF', address: "Jl. Teknisi No. 2, Jakarta" },
    { id: 'tech-3', name: 'Agus Setiawan', type: 'Technician', distributorId: 'dist-5', position: { lat: -6.24, lng: 106.99 }, dutyStatus: 'On Duty', handlingStatus: 'Selesai', destinationClinicId: 'clinic-7', handledDeviceId: 'dev-3', contact: { email: 'agus.s@tech.com', phone: '0812-5555-6666' }, avatarUrl: 'https://placehold.co/100x100/0EA5E9/FFFFFF', address: "Jl. Teknisi No. 3, Bekasi" },
    { id: 'tech-4', name: 'Dewi Lestari', type: 'Technician', distributorId: 'dist-5', position: { lat: -6.59, lng: 106.81 }, dutyStatus: 'Off Duty', contact: { email: 'dewi.l@tech.com', phone: '0812-7777-8888' }, avatarUrl: 'https://placehold.co/100x100/EC4899/FFFFFF', address: "Jl. Teknisi No. 4, Bogor" },
    { id: 'tech-5', name: 'Eko Nugroho', type: 'Technician', distributorId: 'dist-5', position: { lat: -6.18, lng: 106.63 }, dutyStatus: 'On Duty', handlingStatus: 'Standby', contact: { email: 'eko.n@tech.com', phone: '0812-9999-0000' }, avatarUrl: 'https://placehold.co/100x100/14B8A6/FFFFFF', address: "Jl. Teknisi No. 5, Tangerang" }
];


export const locations: Location[] = [
  ...distributorLocations,
  ...distributorClinics,
  ...technicianLocations,
];

export const maintenanceChecklist: MaintenanceChecklistItem[] = [
  { id: 'check-1', label: 'Kalibrasi output laser', checked: false },
  { id: 'check-2', label: 'Inspeksi sistem pendingin', checked: false },
  { id: 'check-3', label: 'Bersihkan komponen optik', checked: false },
  { id: 'check-4', label: 'Verifikasi tombol darurat', checked: false },
  { id: 'check-5', label: 'Perbarui firmware perangkat', checked: false },
  { id: 'check-6', label: 'Periksa stabilitas catu daya', checked: false },
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
    { id: 'hist-1', deviceId: 'dev-1', date: '2024-05-01', technicianName: 'Budi Teknisi', description: 'Kalibrasi tahunan dan pemeriksaan sistem pendingin.' },
    { id: 'hist-2', deviceId: 'dev-2', date: '2024-04-15', technicianName: 'Citra Ayu', description: 'Mengganti filter optik dan pembaruan firmware.' },
    { id: 'hist-3', deviceId: 'dev-3', date: '2024-03-20', technicianName: 'Citra Ayu', description: 'Diagnostik catu daya. Perlu penggantian.' },
    { id: 'hist-4', deviceId: 'dev-1', date: '2023-11-10', technicianName: 'Budi Teknisi', description: 'Uji tombol darurat dan pembersihan umum.' },
    { id: 'hist-5', deviceId: 'dev-7', date: '2024-06-18', technicianName: 'Agus Setiawan', description: 'Masalah perangkat lunak teratasi.' },
    { id: 'hist-6', deviceId: 'dev-10', date: '2024-07-15', technicianName: 'Budi Teknisi', description: 'Pengaturan awal dan kalibrasi.' },
];

export const purchaseHistory: PurchaseHistoryRecord[] = [
    { id: 'pur-1', deviceId: 'dev-1', deviceName: 'PicoWay®', purchaseDate: '2023-01-15', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-01-15' },
    { id: 'pur-2', deviceId: 'dev-2', deviceName: 'Vbeam Perfecta®', purchaseDate: '2022-11-20', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2024-11-20' },
    { id: 'pur-3', deviceId: 'dev-3', deviceName: 'Cellec V', purchaseDate: '2023-03-10', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-03-10' },
    { id: 'pur-4', deviceId: 'dev-4', deviceName: 'BeautiFill', purchaseDate: '2023-06-01', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-06-01' },
    { id: 'pur-5', deviceId: 'dev-6', deviceName: 'PicoWay®', purchaseDate: '2023-08-01', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-08-01' },
    { id: 'pur-6', deviceId: 'dev-7', deviceName: 'Vbeam Perfecta®', purchaseDate: '2023-09-01', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-09-01' },
];

    

    



    