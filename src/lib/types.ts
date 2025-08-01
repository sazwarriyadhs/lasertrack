

export type Role = 'Super Admin' | 'Distributor' | 'Clinic' | 'Technician';

interface ContactInfo {
    email: string;
    phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  avatarUrl: string;
  distributorId?: string; 
  clinicId?: string;
  contact: ContactInfo;
  address: string;
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
  installDate: string;
  warrantyEndDate: string;
  assignedTechnicianId?: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'Distributor' | 'Clinic' | 'Technician';
  position: { lat: number; lng: number };
  distributorId?: string;
  contact: ContactInfo;
  avatarUrl: string;
  address: string;
}

export interface DistributorLocation extends Location {
  type: 'Distributor';
  applicationStatus: 'Active' | 'Inactive' | 'Expired';
  licenseDuration: string;
  clinicCount: number;
  lastLogin: string;
}

export interface ClinicLocation extends Location {
    type: 'Clinic';
    distributorId: string;
    devices?: Device[];
}

export type HandlingStatus = 'Dalam Perjalanan' | 'Menangani' | 'Selesai' | 'Standby';

export interface TechnicianLocation extends Location {
    type: 'Technician';
    distributorId: string;
    dutyStatus: 'On Duty' | 'Off Duty';
    handlingStatus?: HandlingStatus;
    destinationClinicId?: string;
    handledDeviceId?: string;
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

export interface MaintenanceRecord {
    id: string;
    deviceId: string;
    date: string;
    technicianName: string;
    description: string;
    fileUrl?: string;
}

export interface PurchaseHistoryRecord {
    id: string;
    deviceId: string;
    deviceName: string;
    purchaseDate: string;
    distributorName: string;
    warrantyEndDate: string;
}

export interface ChatConversation {
    id: string;
    participantIds: string[];
}

export interface ChatMessage {
    id: string;
    conversationId: string;
    senderId: string;
    timestamp: string;
    text: string;
}
