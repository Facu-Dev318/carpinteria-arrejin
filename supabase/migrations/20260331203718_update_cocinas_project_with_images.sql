/*
  # Update cocinas project with multiple images

  1. Changes
    - Updates the "cocinas" category project (order_index 25)
    - Sets title to "Cocinas a medida"
    - Updates images array with 20 kitchen photos from the cocinas subfolder
    - Sets featured to true
    - Updates typology to "Residencial"

  2. Notes
    - This migration updates existing data only
    - Images are stored in the projects/cocinas/ bucket subfolder
    - Images column is jsonb type, so we use JSON array format
*/

UPDATE projects
SET
  title = 'Cocinas a medida',
  images = '[
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0124.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0125.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0126.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0127.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0128.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0129.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0130.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0131.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0132.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0133.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0134.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0135.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0136.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0137.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0138.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0139.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0140.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0141.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0142.jpg",
    "https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/cocinas/WA0143.jpg"
  ]'::jsonb,
  featured = true,
  typology = 'Residencial'
WHERE order_index = 25 AND category = 'cocinas';
