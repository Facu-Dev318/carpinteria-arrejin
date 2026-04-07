/*
  # Enable Anonymous Read Access to Projects

  1. Changes
    - Adds a new RLS policy to allow anonymous (anon) users to read all projects
    - This enables the frontend to display projects in production without authentication
  
  2. Security
    - Only allows SELECT operations for anonymous users
    - Write operations (INSERT, UPDATE, DELETE) remain restricted to authenticated users
*/

-- Drop the policy if it exists and recreate it
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'projects' 
    AND policyname = 'Public read access on projects'
  ) THEN
    DROP POLICY "Public read access on projects" ON public.projects;
  END IF;
END $$;

-- Create policy for anonymous read access
CREATE POLICY "Public read access on projects" 
ON public.projects
FOR SELECT 
TO anon
USING (true);
