/*
  # Add Anonymous Storage Policies for Projects Bucket

  1. Changes
    - Adds RLS policy to allow anonymous (anon) users to read objects from the projects bucket
    - This enables the frontend to display project images in production without authentication
  
  2. Security
    - Only allows SELECT operations for anonymous users on the projects bucket
    - Write operations remain restricted to authenticated users
*/

-- Allow anonymous users to read from the projects bucket
CREATE POLICY "Anonymous users can view projects images"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'projects');
