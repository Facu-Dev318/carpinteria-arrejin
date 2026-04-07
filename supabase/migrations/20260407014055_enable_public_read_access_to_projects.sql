/*
  # Enable public read access to projects table

  1. Security Changes
    - Enable Row Level Security (RLS) on `projects` table
    - Add public read access policy to allow anonymous users to view projects
    
  2. Changes Made
    - `projects` table now has RLS enabled
    - New policy "Public read access" allows SELECT operations for all users (authenticated and anonymous)
    
  3. Important Notes
    - This allows the website to display projects in production without authentication
    - Only SELECT (read) operations are allowed publicly
    - Write operations (INSERT, UPDATE, DELETE) remain restricted
*/

-- Enable Row Level Security on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to all projects
CREATE POLICY "Public read access" ON projects
  FOR SELECT
  USING (true);