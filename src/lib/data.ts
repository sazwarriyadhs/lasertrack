
import type { User, Device, Location, MaintenanceChecklistItem, DistributorLocation, ActivityLog, UserActivity, ClinicLocation, TechnicianLocation, MaintenanceRecord, PurchaseHistoryRecord, ChatConversation, ChatMessage } from '@/lib/types';

export const users: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'superadmin@lasertrack.com', password: 'password', role: 'Super Admin', avatarUrl: 'https://placehold.co/100x100/4f46e5/ffffff', address: '123 Admin Plaza, Suite 100, Capital City', contact: {email: 'superadmin@lasertrack.com', phone: '555-0101'} },
  { id: 'user-2', name: 'PT Regenesis Indonesia', email: 'distributor@lasertrack.com', password: 'password', role: 'Distributor', avatarUrl: 'https://placehold.co/100x100/1e40af/FFFFFF', distributorId: 'dist-1', address: 'Gedung Regenesis, Jl. Jend. Sudirman Kav. 50, Jakarta, Indonesia', contact: {email: 'info@regenesis.co.id', phone: '021-1234-5678'} },
  { id: 'user-3', name: 'Klinik Baruna', email: 'clinic@lasertrack.com', password: 'password', role: 'Clinic', clinicId: 'clinic-5', distributorId: 'dist-1', avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', address: 'Jl. Pajajaran No. 9, Bogor', contact: {email: 'hello@baruna.clinic', phone: '021-222-5555'} },
  { id: 'tech-1', name: 'Budi Teknisi', email: 'tech@lasertrack.com', password: 'password', role: 'Technician', avatarUrl: 'https://placehold.co/100x100/F97316/FFFFFF', address: 'Jl. Teknisi No. 1, Jakarta', contact: {email: 'budi.t@tech.com', phone: '0812-1111-2222'}, distributorId: 'dist-1' },
  { id: 'user-5', name: 'PT Innomed Jaya Utama', email: 'distributor2@lasertrack.com', password: 'password', role: 'Distributor', avatarUrl: 'https://placehold.co/100x100/10B981/FFFFFF', distributorId: 'dist-2', address: 'Jl. Kramat Raya No. 45, Jakarta', contact: {email: 'support@innomed.asia', phone: '021-987-6543'} },
  { id: 'user-6', name: 'Klinik Dr. Ananda', email: 'clinic2@lasertrack.com', password: 'password', role: 'Clinic', clinicId: 'clinic-1', distributorId: 'dist-1', avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', address: 'Jl. Margonda Raya No. 5, Depok', contact: {email: 'info@ananda-depok.com', phone: '021-777-1111'} },
  { id: 'tech-2', name: 'Citra Ayu', email: 'tech2@lasertrack.com', password: 'password', role: 'Technician', avatarUrl: 'https://placehold.co/100x100/8B5CF6/FFFFFF', address: 'Jl. Teknisi No. 2, Jakarta', contact: {email: 'citra.a@tech.com', phone: '0812-3333-4444'}, distributorId: 'dist-1' },
  { id: 'dist-user-3', name: 'Mitra Medika Beta', email: 'distributor3@lasertrack.com', password: 'password', role: 'Distributor', avatarUrl: 'https://placehold.co/100x100/0ea5e9/ffffff', distributorId: 'dist-3', address: 'Jl. Asia Afrika No. 8, Bandung', contact: {email: 'info@mitramedika.com', phone: '022-423-8888'} },
  { id: 'clinic-user-6', name: 'Estetika Bandung Center', email: 'clinic6@lasertrack.com', password: 'password', role: 'Clinic', clinicId: 'clinic-6', distributorId: 'dist-3', avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', address: 'Jl. Merdeka No. 10, Bandung', contact: {email: 'info@ebc.com', phone: '022-420-1234'} },
  { id: 'tech-user-6', name: 'Rian Hidayat', email: 'tech6@lasertrack.com', password: 'password', role: 'Technician', avatarUrl: 'https://placehold.co/100x100/f59e0b/ffffff', distributorId: 'dist-3', address: 'Jl. Teknisi No. 6, Bandung', contact: {email: 'rian.h@tech.com', phone: '0812-6666-7777'} },
];

export const devices: Device[] = [
  { id: 'dev-1', name: 'PicoWay®', model: 'Candela-PW', serialNumber: 'SN-A1B2C3D4', clinicId: 'clinic-1', status: 'Operational', lastMaintenance: '2024-05-01', installDate: '2023-01-15', warrantyEndDate: '2025-01-15' },
  { id: 'dev-2', name: 'Vbeam Perfecta®', model: 'Candela-VB', serialNumber: 'SN-E5F6G7H8', clinicId: 'clinic-1', status: 'Under Maintenance', lastMaintenance: '2024-04-15', installDate: '2022-11-20', warrantyEndDate: '2024-11-20', assignedTechnicianId: 'tech-1' },
  { id: 'dev-3', name: 'Cellec V', model: 'Jeisys-CV', serialNumber: 'SN-I9J0K1L2', clinicId: 'clinic-2', status: 'Operational', lastMaintenance: '2024-03-20', installDate: '2023-03-10', warrantyEndDate: '2025-03-10' },
  { id: 'dev-4', name: 'BeautiFill', model: 'Alma-BF', serialNumber: 'SN-M3N4O5P6', clinicId: 'clinic-2', status: 'Operational', lastMaintenance: '2024-06-10', installDate: '2023-06-01', warrantyEndDate: '2025-06-01' },
  { id: 'dev-5', name: 'BiAxis QS™', model: 'BiAxis-QS', serialNumber: 'SN-Q7R8S9T0', clinicId: 'clinic-3', status: 'Decommissioned', lastMaintenance: '2023-12-01', installDate: '2022-05-20', warrantyEndDate: '2024-05-20' },
  { id: 'dev-6', name: 'PicoWay®', model: 'Candela-PW', serialNumber: 'SN-V1W2X3Y4', clinicId: 'clinic-4', status: 'Operational', lastMaintenance: '2024-07-01', installDate: '2023-08-01', warrantyEndDate: '2025-08-01' },
  { id: 'dev-7', name: 'Vbeam Perfecta®', model: 'Candela-VB', serialNumber: 'SN-Z5A6B7C8', clinicId: 'clinic-5', status: 'Needs Attention', lastMaintenance: '2024-06-18', installDate: '2023-09-01', warrantyEndDate: '2025-09-01', assignedTechnicianId: 'tech-2' },
  { id: 'dev-8', name: 'Transcranial Pulse Stimulation (TPS®)', model: 'Neurolith-STORZ', serialNumber: 'SN-TPS001', clinicId: 'clinic-6', status: 'Operational', lastMaintenance: '2024-07-10', installDate: '2023-10-01', warrantyEndDate: '2025-10-01' },
  { id: 'dev-9', name: 'CO₂ Fractional Laser', model: 'Lasering-SlimEvo', serialNumber: 'SN-CO2-987', clinicId: 'clinic-7', status: 'Operational', lastMaintenance: '2024-06-25', installDate: '2023-05-15', warrantyEndDate: '2025-05-15' },
  { id: 'dev-10', name: 'VISIA® Skin Analysis', model: 'Canfield-VISIA', serialNumber: 'SN-VISIA-456', clinicId: 'clinic-6', status: 'Needs Attention', lastMaintenance: '2024-07-20', installDate: '2023-10-01', warrantyEndDate: '2025-10-01', assignedTechnicianId: 'tech-6' },
];

export const distributorLocations: DistributorLocation[] = [
  { id: 'dist-1', name: 'PT Regenesis Indonesia', type: 'Distributor', position: { lat: -6.224, lng: 106.805 }, applicationStatus: 'Active', licenseDuration: '365 days remaining', clinicCount: 5, lastLogin: '2024-07-22', contact: { email: 'info@regenesis.co.id', phone: '021-1234-5678' }, avatarUrl: 'https://placehold.co/100x100/1e40af/FFFFFF', address: 'Gedung Sahid Sudirman Center, Jl. Jend. Sudirman Kav. 86, Jakarta' },
  { id: 'dist-2', name: 'PT Innomed Jaya Utama', type: 'Distributor', position: { lat: -6.18, lng: 106.83 }, applicationStatus: 'Active', licenseDuration: '150 days remaining', clinicCount: 2, lastLogin: '2024-07-21', contact: { email: 'support@innomed.asia', phone: '021-987-6543' }, avatarUrl: 'https://placehold.co/100x100/10B981/FFFFFF', address: "Jl. Kramat Raya No. 45, Jakarta" },
  { id: 'dist-3', name: 'Mitra Medika Beta', type: 'Distributor', position: { lat: 2.59, lng: 112.94 }, applicationStatus: 'Active', licenseDuration: '280 days remaining', clinicCount: 2, lastLogin: '2024-07-20', contact: { email: 'info@mitramedika.com', phone: '022-423-8888' }, avatarUrl: 'https://placehold.co/100x100/0ea5e9/ffffff', address: "Jl. Asia Afrika No. 8, Bandung" },
  { id: 'dist-4', name: 'Estetika Pro Delta', type: 'Distributor', position: { lat: -7.25, lng: 112.75 }, applicationStatus: 'Expired', licenseDuration: 'Expired 15 days ago', clinicCount: 0, lastLogin: '2024-06-15', contact: { email: 'sales@espro.co.id', phone: '021-222-3333' }, avatarUrl: 'https://placehold.co/100x100/EF4444/FFFFFF', address: "Jl. Tunjungan No. 12, Surabaya" },
  { id: 'dist-5', name: 'Solusi Estetika Gamma', type: 'Distributor', position: { lat: -6.91, lng: 107.61 }, applicationStatus: 'Inactive', licenseDuration: 'N/A', clinicCount: 0, lastLogin: '2024-05-01', contact: { email: 'contact@solusigamma.id', phone: '022-111-2222' }, avatarUrl: 'https://placehold.co/100x100/6366F1/FFFFFF', address: "Jl. Braga No. 99, Bandung" },
];

export const distributorClinics: ClinicLocation[] = [
    // Regenesis Clinics
    { id: 'clinic-1', name: 'Klinik Dr. Ananda', type: 'Clinic', distributorId: 'dist-1', position: { lat: -6.4025, lng: 106.7942 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'info@ananda-depok.com', phone: '021-777-1111'}, address: 'Jl. Margonda Raya No. 5, Depok'},
    { id: 'clinic-2', name: 'Klinik Pratama Divine', type: 'Clinic', distributorId: 'dist-1', position: { lat: -6.1751, lng: 106.8650 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'contact@divineclinic.com', phone: '021-888-2222'}, address: 'Jl. Gatot Subroto No. 12, Jakarta'},
    { id: 'clinic-3', name: 'Klinik Surya Medika', type: 'Clinic', distributorId: 'dist-1', position: { lat: -6.1783, lng: 106.6319 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'cs@suryamedika.co.id', phone: '021-999-3333'}, address: 'Jl. Daan Mogot No. 8, Tangerang'},
    { id: 'clinic-4', name: 'Klinik Meiril Center', type: 'Clinic', distributorId: 'dist-1', position: { lat: -6.2383, lng: 106.9756 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'support@meiril.com', phone: '021-111-4444'}, address: 'Jl. Patriot No. 1, Bekasi'},
    { id: 'clinic-5', name: 'Klinik Baruna', type: 'Clinic', distributorId: 'dist-1', position: { lat: -6.5950, lng: 106.8062 }, avatarUrl: 'https://placehold.co/100x100/16A34A/FFFFFF', contact: {email: 'hello@baruna.clinic', phone: '021-222-5555'}, address: 'Jl. Pajajaran No. 9, Bogor'},
    // Innomed Clinics
    { id: 'clinic-6', name: 'Estetika Bandung Center', type: 'Clinic', distributorId: 'dist-2', position: { lat: -6.903, lng: 107.618 }, avatarUrl: 'https://placehold.co/100x100/10B981/ffffff', contact: {email: 'info@ebc.com', phone: '022-420-1234'}, address: 'Jl. Merdeka No. 10, Bandung'},
    { id: 'clinic-7', name: 'Surabaya Skin Centre', type: 'Clinic', distributorId: 'dist-2', position: { lat: -7.27, lng: 112.79 }, avatarUrl: 'https://placehold.co/100x100/10B981/ffffff', contact: {email: 'info@surabayaskin.com', phone: '031-503-1234'}, address: 'Jl. Darmo Permai III, Surabaya'},
];

export const technicianLocations: TechnicianLocation[] = [
    // Regenesis Technicians
    { id: 'tech-1', name: 'Budi Teknisi', type: 'Technician', distributorId: 'dist-1', position: { lat: -6.36, lng: 106.82 }, dutyStatus: 'On Duty', handlingStatus: 'Dalam Perjalanan', destinationClinicId: 'clinic-1', handledDeviceId: 'dev-2', contact: { email: 'budi.t@tech.com', phone: '0812-1111-2222' }, avatarUrl: 'https://placehold.co/100x100/F97316/FFFFFF', address: "Jl. Teknisi No. 1, Jakarta" },
    { id: 'tech-2', name: 'Citra Ayu', type: 'Technician', distributorId: 'dist-1', position: { lat: -6.17, lng: 106.80 }, dutyStatus: 'On Duty', handlingStatus: 'Menangani', destinationClinicId: 'clinic-5', handledDeviceId: 'dev-7', contact: { email: 'citra.a@tech.com', phone: '0812-3333-4444' }, avatarUrl: 'https://placehold.co/100x100/8B5CF6/FFFFFF', address: "Jl. Teknisi No. 2, Jakarta" },
    { id: 'tech-3', name: 'Agus Setiawan', type: 'Technician', distributorId: 'dist-1', position: { lat: -6.24, lng: 106.99 }, dutyStatus: 'On Duty', handlingStatus: 'Selesai', destinationClinicId: 'clinic-2', handledDeviceId: 'dev-3', contact: { email: 'agus.s@tech.com', phone: '0812-5555-6666' }, avatarUrl: 'https://placehold.co/100x100/0EA5E9/FFFFFF', address: "Jl. Teknisi No. 3, Bekasi" },
    { id: 'tech-4', name: 'Dewi Lestari', type: 'Technician', distributorId: 'dist-1', position: { lat: -6.59, lng: 106.81 }, dutyStatus: 'Off Duty', contact: { email: 'dewi.l@tech.com', phone: '0812-7777-8888' }, avatarUrl: 'https://placehold.co/100x100/EC4899/FFFFFF', address: "Jl. Teknisi No. 4, Bogor" },
    { id: 'tech-5', name: 'Eko Nugroho', type: 'Technician', distributorId: 'dist-1', position: { lat: -6.18, lng: 106.63 }, dutyStatus: 'On Duty', handlingStatus: 'Standby', contact: { email: 'eko.n@tech.com', phone: '0812-9999-0000' }, avatarUrl: 'https://placehold.co/100x100/14B8A6/FFFFFF', address: "Jl. Teknisi No. 5, Tangerang" },
    // Innomed Technicians
    { id: 'tech-6', name: 'Rian Hidayat', type: 'Technician', distributorId: 'dist-2', position: { lat: -6.92, lng: 107.60 }, dutyStatus: 'On Duty', handlingStatus: 'Menangani', destinationClinicId: 'clinic-6', handledDeviceId: 'dev-10', contact: { email: 'rian.h@tech.com', phone: '0812-6666-7777' }, avatarUrl: 'https://placehold.co/100x100/f59e0b/ffffff', address: 'Jl. Teknisi No. 6, Bandung' },
    { id: 'tech-7', name: 'Sari Puspita', type: 'Technician', distributorId: 'dist-2', position: { lat: -7.28, lng: 112.78 }, dutyStatus: 'Off Duty', contact: { email: 'sari.p@tech.com', phone: '0812-8888-9999' }, avatarUrl: 'https://placehold.co/100x100/d946ef/ffffff', address: 'Jl. Teknisi No. 7, Surabaya' },
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
    { id: 'hist-6', deviceId: 'dev-10', date: '2024-07-15', technicianName: 'Rian Hidayat', description: 'Pengaturan awal dan kalibrasi sensor.' },
];

export const purchaseHistory: PurchaseHistoryRecord[] = [
    { id: 'pur-1', deviceId: 'dev-1', deviceName: 'PicoWay®', purchaseDate: '2023-01-15', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-01-15' },
    { id: 'pur-2', deviceId: 'dev-2', deviceName: 'Vbeam Perfecta®', purchaseDate: '2022-11-20', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2024-11-20' },
    { id: 'pur-3', deviceId: 'dev-3', deviceName: 'Cellec V', purchaseDate: '2023-03-10', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-03-10' },
    { id: 'pur-4', deviceId: 'dev-4', deviceName: 'BeautiFill', purchaseDate: '2023-06-01', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-06-01' },
    { id: 'pur-6', deviceId: 'dev-6', deviceName: 'PicoWay®', purchaseDate: '2023-08-01', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-08-01' },
    { id: 'pur-7', deviceId: 'dev-7', deviceName: 'Vbeam Perfecta®', purchaseDate: '2023-09-01', distributorName: 'PT Regenesis Indonesia', warrantyEndDate: '2025-09-01' },
    { id: 'pur-8', deviceId: 'dev-8', deviceName: 'Transcranial Pulse Stimulation (TPS®)', purchaseDate: '2023-10-01', distributorName: 'PT Innomed Jaya Utama', warrantyEndDate: '2025-10-01' },
    { id: 'pur-9', deviceId: 'dev-9', deviceName: 'CO₂ Fractional Laser', purchaseDate: '2023-05-15', distributorName: 'PT Innomed Jaya Utama', warrantyEndDate: '2025-05-15' },
];

// Chat Data
export const chatConversations: ChatConversation[] = [
    // Super Admin to Distributors
    { id: 'convo-1', participantIds: ['user-1', 'user-2'] }, // Admin <-> Regenesis
    { id: 'convo-2', participantIds: ['user-1', 'user-5'] }, // Admin <-> Innomed
    { id: 'convo-10', participantIds: ['user-1', 'dist-user-3']}, // Admin <-> Mitra Medika Beta
    
    // Distributor to Clinics
    { id: 'convo-3', participantIds: ['user-2', 'user-3'] }, // Regenesis <-> Klinik Baruna
    { id: 'convo-4', participantIds: ['user-2', 'user-6'] }, // Regenesis <-> Klinik Dr. Ananda
    { id: 'convo-11', participantIds: ['dist-user-3', 'clinic-user-6']}, // Mitra Medika <-> Estetika Bandung

    // Distributor to Technicians
    { id: 'convo-5', participantIds: ['user-2', 'tech-1'] }, // Regenesis <-> Budi Teknisi
    { id: 'convo-6', participantIds: ['user-2', 'tech-2'] }, // Regenesis <-> Citra Ayu
    { id: 'convo-12', participantIds: ['dist-user-3', 'tech-user-6']}, // Mitra Medika <-> Rian Hidayat
];

export const chatMessages: ChatMessage[] = [
    { id: 'msg-1', conversationId: 'convo-1', senderId: 'user-1', timestamp: '2024-07-22T10:00:00Z', text: 'Selamat pagi, mohon laporan bulanan untuk segera dikirimkan.' },
    { id: 'msg-2', conversationId: 'convo-1', senderId: 'user-2', timestamp: '2024-07-22T10:01:00Z', text: 'Baik Pak, sedang kami siapkan.' },
    { id: 'msg-7', conversationId: 'convo-1', senderId: 'user-1', timestamp: '2024-07-23T11:00:00Z', text: 'Terima kasih. Ditunggu laporannya sebelum jam 5 sore ya.' },
    { id: 'msg-8', conversationId: 'convo-1', senderId: 'user-2', timestamp: '2024-07-23T11:02:00Z', text: 'Siap, Pak. Pasti akan kami kirimkan tepat waktu.' },
    
    { id: 'msg-3', conversationId: 'convo-3', senderId: 'user-3', timestamp: '2024-07-21T14:30:00Z', text: 'Halo, kami ada kendala dengan perangkat Vbeam, butuh bantuan teknisi segera.' },
    { id: 'msg-4', conversationId: 'convo-3', senderId: 'user-2', timestamp: '2024-07-21T14:32:00Z', text: 'Baik, Ibu. Kami akan segera kirimkan teknisi. Mohon tunggu informasi selanjutnya.' },
    { id: 'msg-9', conversationId: 'convo-3', senderId: 'user-3', timestamp: '2024-07-22T09:15:00Z', text: 'Terima kasih, teknisinya sudah datang dan sedang menangani. Pelayanan cepat!' },
    { id: 'msg-10', conversationId: 'convo-3', senderId: 'user-2', timestamp: '2024-07-22T09:17:00Z', text: 'Sama-sama, Ibu. Senang bisa membantu. Mohon kabari jika ada perkembangan lebih lanjut.' },

    { id: 'msg-5', conversationId: 'convo-5', senderId: 'user-2', timestamp: '2024-07-21T14:35:00Z', text: 'Budi, tolong segera ke Klinik Baruna. Ada masalah di Vbeam mereka.' },
    { id: 'msg-6', conversationId: 'convo-5', senderId: 'tech-1', timestamp: '2024-07-21T14:36:00Z', text: 'Siap, saya segera meluncur.' },
    { id: 'msg-11', conversationId: 'convo-5', senderId: 'user-2', timestamp: '2024-07-21T17:00:00Z', text: 'Bagaimana perkembangannya, Budi?' },
    { id: 'msg-12', conversationId: 'convo-5', senderId: 'tech-1', timestamp: '2024-07-21T17:05:00Z', text: 'Sudah teratasi, Pak. Hanya masalah kecil pada kalibrasi. Laporan lengkap akan saya kirimkan.' },

    { id: 'msg-13', conversationId: 'convo-6', senderId: 'user-2', timestamp: '2024-07-23T13:00:00Z', text: 'Citra, ada jadwal maintenance rutin untuk PicoWay di Klinik Dr. Ananda besok. Tolong dipersiapkan ya.' },
    { id: 'msg-14', conversationId: 'convo-6', senderId: 'tech-2', timestamp: '2024-07-23T13:02:00Z', text: 'Baik, Bu. Akan saya siapkan semua peralatannya. Jam berapa saya harus ke sana?' },

    { id: 'msg-15', conversationId: 'convo-2', senderId: 'user-5', timestamp: '2024-07-23T15:00:00Z', text: 'Selamat sore, Pak Admin. Kami ingin mengonfirmasi pendaftaran 2 klinik baru kami.' },
    { id: 'msg-16', conversationId: 'convo-2', senderId: 'user-1', timestamp: '2024-07-23T15:01:00Z', text: 'Sore. Baik, saya lihat datanya sudah masuk. Akan segera saya proses aktivasinya.' },

    { id: 'msg-17', conversationId: 'convo-11', senderId: 'clinic-user-6', timestamp: '2024-07-23T16:00:00Z', text: 'Halo, kami butuh jadwal untuk training penggunaan alat VISIA.' },
    { id: 'msg-18', conversationId: 'convo-11', senderId: 'dist-user-3', timestamp: '2024-07-23T16:05:00Z', text: 'Tentu, Ibu. Tim kami akan segera menghubungi untuk penjadwalan. Apakah akhir minggu ini cocok?' },
];
    

    



    




    
