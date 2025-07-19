-- Users Table: Stores information for all user roles
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    avatar_url TEXT,
    address TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    distributor_id VARCHAR(255),
    clinic_id VARCHAR(255)
);

-- Distributors Table: Stores information specific to distributors
CREATE TABLE distributors (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    application_status VARCHAR(50) NOT NULL,
    license_duration VARCHAR(255),
    clinic_count INT DEFAULT 0,
    last_login_date DATE,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    avatar_url TEXT,
    address TEXT,
    position_lat DOUBLE PRECISION,
    position_lng DOUBLE PRECISION,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL
);

-- Clinics Table: Stores information for clinics managed by distributors
CREATE TABLE clinics (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    distributor_id VARCHAR(255) REFERENCES distributors(id) ON DELETE CASCADE,
    position_lat DOUBLE PRECISION,
    position_lng DOUBLE PRECISION,
    avatar_url TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL
);

-- Technicians Table: Stores information for technicians belonging to a distributor
CREATE TABLE technicians (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    distributor_id VARCHAR(255) REFERENCES distributors(id) ON DELETE CASCADE,
    duty_status VARCHAR(50) NOT NULL,
    handling_status VARCHAR(50),
    destination_clinic_id VARCHAR(255) REFERENCES clinics(id) ON DELETE SET NULL,
    position_lat DOUBLE PRECISION,
    position_lng DOUBLE PRECISION,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    avatar_url TEXT,
    address TEXT,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL
);

-- Devices Table: Stores information about each laser device
CREATE TABLE devices (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(100),
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    clinic_id VARCHAR(255) REFERENCES clinics(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    last_maintenance_date DATE,
    install_date DATE,
    warranty_end_date DATE,
    assigned_technician_id VARCHAR(255) REFERENCES technicians(id) ON DELETE SET NULL
);

-- Maintenance History Table: Logs all maintenance activities
CREATE TABLE maintenance_history (
    id VARCHAR(255) PRIMARY KEY,
    device_id VARCHAR(255) REFERENCES devices(id) ON DELETE CASCADE,
    maintenance_date DATE NOT NULL,
    technician_name VARCHAR(255),
    description TEXT,
    report_url TEXT -- URL to the generated PDF report
);

-- Purchase History Table: Logs device purchases
CREATE TABLE purchase_history (
    id VARCHAR(255) PRIMARY KEY,
    device_id VARCHAR(255) REFERENCES devices(id),
    device_name VARCHAR(255),
    purchase_date DATE,
    distributor_name VARCHAR(255),
    warranty_end_date DATE
);

-- Chat Conversations Table
CREATE TABLE chat_conversations (
    id VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Participants Table: Junction table for users and conversations
CREATE TABLE chat_participants (
    conversation_id VARCHAR(255) REFERENCES chat_conversations(id) ON DELETE CASCADE,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

-- Chat Messages Table
CREATE TABLE chat_messages (
    id VARCHAR(255) PRIMARY KEY,
    conversation_id VARCHAR(255) REFERENCES chat_conversations(id) ON DELETE CASCADE,
    sender_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    "text" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraints for user references
ALTER TABLE users ADD CONSTRAINT fk_distributor FOREIGN KEY (distributor_id) REFERENCES distributors(id) ON DELETE SET NULL;
ALTER TABLE users ADD CONSTRAINT fk_clinic FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE SET NULL;

-- Indexes for performance
CREATE INDEX idx_users_role ON users("role");
CREATE INDEX idx_devices_clinic_id ON devices(clinic_id);
CREATE INDEX idx_devices_status ON devices(status);
CREATE INDEX idx_technicians_distributor_id ON technicians(distributor_id);
CREATE INDEX idx_clinics_distributor_id ON clinics(distributor_id);
CREATE INDEX idx_chat_messages