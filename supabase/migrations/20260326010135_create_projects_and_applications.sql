/*
  # Create Carpintería Arrejin Database Schema

  ## Overview
  This migration sets up the database structure for the Carpintería Arrejin institutional website,
  including project portfolio management and job application handling.

  ## New Tables

  ### 1. projects
  Stores architectural woodwork projects for the portfolio section
  - `id` (uuid, primary key) - Unique project identifier
  - `title` (text) - Project name
  - `location` (text) - Project location
  - `typology` (text) - Project type (residential, hospitality, commercial, etc.)
  - `year` (integer) - Completion year
  - `description` (text) - Detailed project description
  - `images` (jsonb) - Array of image URLs
  - `featured` (boolean) - Whether to feature on homepage
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. job_applications
  Stores job applications from the "Trabajá con nosotros" form
  - `id` (uuid, primary key) - Unique application identifier
  - `name` (text) - Applicant name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `message` (text) - Application message
  - `cv_url` (text) - URL to uploaded CV file
  - `status` (text) - Application status (new, reviewed, archived)
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for projects (portfolio display)
  - Authenticated-only write access for projects (admin management)
  - Public insert for job applications (form submissions)
  - Authenticated-only read for job applications (admin review)
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  typology text NOT NULL,
  year integer NOT NULL,
  description text NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  cv_url text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Anyone can view published projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Job applications policies
CREATE POLICY "Anyone can submit job applications"
  ON job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view job applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update application status"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created ON job_applications(created_at DESC);

-- Insert sample projects
INSERT INTO projects (title, location, typology, year, description, images, featured, order_index) VALUES
(
  'Residencia Nordelta',
  'Nordelta, Buenos Aires',
  'Residencial',
  2024,
  'Proyecto integral de carpintería arquitectónica para residencia de 450m². Incluye revestimientos de madera en muros, pisos de entablonado, puertas de diseño y mobiliario a medida en maderas nobles.',
  '["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"]'::jsonb,
  true,
  1
),
(
  'Hotel Boutique Palermo',
  'Palermo, Buenos Aires',
  'Hospitalidad',
  2023,
  'Carpintería de alto nivel para 28 habitaciones y espacios comunes. Trabajo en nogal europeo y guatambú con terminaciones naturales. Incluye paneles decorativos, celosías y mobiliario fijo.',
  '["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"]'::jsonb,
  true,
  2
),
(
  'Edificio Corporativo Puerto Madero',
  'Puerto Madero, Buenos Aires',
  'Corporativo',
  2023,
  'Ejecución de carpintería arquitectónica para oficinas corporativas en 3 pisos. Mobiliario de dirección, salas de reuniones, paneles acústicos y revestimientos en roble americano.',
  '["https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg"]'::jsonb,
  true,
  3
),
(
  'Casa Country San Isidro',
  'San Isidro, Buenos Aires',
  'Residencial',
  2024,
  'Desarrollo completo de carpintería interior y exterior. Deck en lapacho, pérgolas, aberturas de gran formato y equipamiento interior a medida en maderas macizas.',
  '["https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"]'::jsonb,
  false,
  4
),
(
  'Restaurante Recoleta',
  'Recoleta, Buenos Aires',
  'Hospitalidad',
  2022,
  'Proyecto gastronómico de alta gama. Barra principal en guatambú, mesas y sillas de diseño, revestimientos decorativos y elementos arquitectónicos únicos.',
  '["https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg"]'::jsonb,
  false,
  5
),
(
  'Loft Belgrano',
  'Belgrano, Buenos Aires',
  'Residencial',
  2024,
  'Intervención arquitectónica integral en loft de 200m². Divisores de ambientes en madera y vidrio, cocina de diseño, vestidores y biblioteca a medida.',
  '["https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"]'::jsonb,
  false,
  6
);