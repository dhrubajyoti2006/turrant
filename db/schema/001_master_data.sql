CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_type AS ENUM (
  'super_admin',
  'admin',
  'operations',
  'support',
  'compliance'
);

CREATE TYPE master_status AS ENUM (
  'active',
  'inactive',
  'suspended',
  'pending'
);

CREATE TYPE verification_status AS ENUM (
  'pending',
  'verified',
  'rejected',
  'needs_info'
);

CREATE TYPE vehicle_category AS ENUM (
  'sedan',
  'suv',
  'truck',
  'van',
  'other'
);

CREATE TABLE admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name VARCHAR(100) NOT NULL,
  role_code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  status master_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_role_id UUID REFERENCES admin_roles(id) ON DELETE RESTRICT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(30),
  password_hash TEXT NOT NULL,
  user_type user_type NOT NULL,
  status master_status NOT NULL DEFAULT 'active',
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL
);

ALTER TABLE admin_roles
  ADD CONSTRAINT admin_roles_created_by_fkey
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  ADD CONSTRAINT admin_roles_updated_by_fkey
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

CREATE TABLE fleet_owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_code VARCHAR(50) NOT NULL UNIQUE,
  legal_name VARCHAR(200) NOT NULL,
  display_name VARCHAR(200),
  registration_number VARCHAR(100) NOT NULL UNIQUE,
  tax_identifier VARCHAR(100),
  primary_contact_name VARCHAR(150),
  primary_contact_email VARCHAR(255),
  primary_contact_phone VARCHAR(30),
  status master_status NOT NULL DEFAULT 'pending',
  verification_status verification_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_code VARCHAR(50) NOT NULL UNIQUE,
  fleet_owner_id UUID NOT NULL REFERENCES fleet_owners(id) ON DELETE RESTRICT,
  registration_number VARCHAR(50) NOT NULL UNIQUE,
  category vehicle_category NOT NULL DEFAULT 'other',
  make VARCHAR(100),
  model VARCHAR(100) NOT NULL,
  model_year INT,
  color VARCHAR(50),
  chassis_number VARCHAR(100),
  engine_number VARCHAR(100),
  status master_status NOT NULL DEFAULT 'active',
  verification_status verification_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_code VARCHAR(50) NOT NULL UNIQUE,
  fleet_owner_id UUID NOT NULL REFERENCES fleet_owners(id) ON DELETE RESTRICT,
  current_vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  full_name VARCHAR(201) GENERATED ALWAYS AS (TRIM(first_name || ' ' || last_name)) STORED,
  phone VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE,
  date_of_birth DATE,
  license_number VARCHAR(100) NOT NULL UNIQUE,
  license_expiry_date DATE,
  status master_status NOT NULL DEFAULT 'active',
  verification_status verification_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_users_admin_role_id ON users(admin_role_id);
CREATE INDEX idx_fleet_owners_status ON fleet_owners(status);
CREATE INDEX idx_fleet_owners_verification_status ON fleet_owners(verification_status);
CREATE INDEX idx_vehicles_fleet_owner_id ON vehicles(fleet_owner_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_drivers_fleet_owner_id ON drivers(fleet_owner_id);
CREATE INDEX idx_drivers_current_vehicle_id ON drivers(current_vehicle_id);
CREATE INDEX idx_drivers_status ON drivers(status);
