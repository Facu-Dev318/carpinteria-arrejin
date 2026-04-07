/*
  # Enable anonymous uploads to CVs bucket

  1. Changes
    - Ensure the 'cvs' bucket exists and is public
    - Add policy to allow anonymous users to upload CVs
    - Add policy to allow public read access to CVs

  2. Security
    - Anonymous users can INSERT files into the cvs bucket
    - Anonymous users can SELECT/read files from the cvs bucket
    - This is necessary for the job application form to work for unauthenticated users
*/

-- Ensure the cvs bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cvs', 'cvs', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow anonymous uploads to cvs bucket
CREATE POLICY "Allow anonymous uploads to cvs"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'cvs');

-- Allow public read on cvs bucket
CREATE POLICY "Allow public read on cvs"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'cvs');