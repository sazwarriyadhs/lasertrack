--
-- PostgreSQL database schema for the LaserTrack Lite application
--

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define ENUM types for status fields to ensure data integrity
CREATE TYPE user_role AS ENUM ('Super Admin', 'Distributor', 'Clinic', 'Technician');
CREATE TYPE device_status AS ENUM ('Operational', 'Under Maintenance', 'Decommissioned', 'Needs Attention');
CREATE TYPE distributor_status AS ENUM ('Active', 'Inactive', 'Expired');
CREATE TYPE technician_duty_status AS ENUM ('On Duty', 'Off Duty');
CREATE TYPE technician_handling_status AS ENUM ('Dalam Perjalanan', 'Menangani', 'Selesai', 'Standby');

-- Table for users and their credentials
-- This table centralizes login information for all roles.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for distributors
CREATE TABLE distributors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE SET NULL, -- Link to a user account
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    avatar_url VARCHAR(255),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    application_status distributor_status NOT NULL DEFAULT 'Active',
    license_duration_days INT DEFAULT 365,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for clinics, associated with a distributor
CREATE TABLE clinics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    distributor_id UUID NOT NULL REFERENCES distributors(id) ON DELETE CASCADE,
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE SET NULL, -- Link to a user account
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    avatar_url VARCHAR(255),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for devices, located at a specific clinic
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    model VARCHAR(100),
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    status device_status NOT NULL DEFAULT 'Operational',
    install_date DATE,
    warranty_end_date DATE,
    last_maintenance_date DATE,
    assigned_technician_id UUID, -- Will be a foreign key after technicians table is defined
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for technicians, associated with a distributor
CREATE TABLE technicians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    distributor_id UUID NOT NULL REFERENCES distributors(id) ON DELETE CASCADE,
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE SET NULL, -- Link to a user account
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    avatar_url VARCHAR(255),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    duty_status technician_duty_status NOT NULL DEFAULT 'Off Duty',
    handling_status technician_handling_status,
    destination_clinic_id UUID REFERENCES clinics(id) ON DELETE SET NULL,
    handled_device_id UUID REFERENCES devices(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add the foreign key constraint from devices to technicians now that technicians table is defined
ALTER TABLE devices ADD CONSTRAINT fk_assigned_technician
FOREIGN KEY (assigned_technician_id) REFERENCES technicians(id) ON DELETE SET NULL;

-- Table for purchase history and warranty information
CREATE TABLE purchase_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    distributor_id UUID NOT NULL REFERENCES distributors(id),
    purchase_date DATE NOT NULL,
    warranty_end_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for maintenance history records
CREATE TABLE maintenance_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    technician_id UUID NOT NULL REFERENCES technicians(id),
    service_date DATE NOT NULL,
    description TEXT NOT NULL,
    report_url VARCHAR(255), -- Link to the generated PDF report
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for chat conversations
CREATE TABLE chat_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Junction table for conversation participants
CREATE TABLE chat_participants (
    conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

-- Table for chat messages
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text_content TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for activity logs
CREATE TABLE activity_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_devices_clinic_id ON devices(clinic_id);
CREATE INDEX idx_devices_serial_number ON devices(serial_number);
CREATE INDEX idx_technicians_distributor_id ON technicians(distributor_id);
CREATE INDEX idx_clinics_distributor_id ON clinics(distributor_id);
CREATE INDEX idx_maintenance_history_device_id ON maintenance_history(device_id);
CREATE INDEX idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX idx_chat_participants_user_id ON chat_participants(user_id);

