/*
  # Add Storage Policies for Projects Bucket

  1. Changes
    - Add public SELECT policy for projects bucket to allow viewing images
    - Add public INSERT policy for projects bucket to allow uploading images
    - Add public UPDATE policy for projects bucket to allow replacing existing images
    - Add public DELETE policy for projects bucket to allow deleting images

  2. Security Notes
    - These policies allow public access to the projects bucket for admin upload functionality
    - The policies are scoped specifically to the 'projects' bucket only
    - Other buckets remain protected by default RLS rules
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view projects images" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload to projects bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public can update projects images" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete projects images" ON storage.objects;

-- Allow public SELECT on projects bucket
CREATE POLICY "Public can view projects images"
ON storage.objects FOR SELECT
USING (bucket_id = 'projects');

-- Allow public INSERT on projects bucket
CREATE POLICY "Public can upload to projects bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'projects');

-- Allow public UPDATE on projects bucket
CREATE POLICY "Public can update projects images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'projects')
WITH CHECK (bucket_id = 'projects');

-- Allow public DELETE on projects bucket
CREATE POLICY "Public can delete projects images"
ON storage.objects FOR DELETE
USING (bucket_id = 'projects');
