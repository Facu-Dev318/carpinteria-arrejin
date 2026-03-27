/*
  # Replace Projects with Real Carpintería Arrejin Data

  1. Changes
    - Delete all existing projects from the `projects` table
    - Insert 24 real projects from Carpintería Arrejin with complete details
    - Each project includes:
      - Unique UUID identifier
      - Title and description in Spanish
      - Typology (Residencial, Corporativo, Hospitalidad, Comercial)
      - Year of completion (2022-2025)
      - Order index for display ordering
      - Featured flag (first 6 projects marked as featured)
      - Multiple image URLs from Supabase Storage
      - Empty location field (to be filled by client later)

  2. Project Categories
    - Residencial: Revestimientos, escaleras, placares, vanitorios, cavas, walk-in closets
    - Corporativo: Bibliotecas de estudio, oficinas premium, expositores
    - Hospitalidad: Barras, salones, salas con celosías
    - Comercial: Mostradores para locales

  3. Images
    - All images stored in Supabase Storage bucket 'projects'
    - Format: https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/FILENAME.jpg
*/

-- Delete all existing projects
DELETE FROM projects;

-- Insert real Carpintería Arrejin projects
INSERT INTO projects (id, title, description, typology, location, year, images, featured, order_index) VALUES
  (
    'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    'Revestimiento mural calado',
    'Panel de madera con módulos cuadrados calados en corredor residencial.',
    'Residencial',
    '',
    2025,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0016.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0019.jpg"]'::jsonb,
    true,
    1
  ),
  (
    'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    'Placares con inserto tapizado',
    'Frentes de placard en madera con paneles de tela, combinación de roble y lino.',
    'Residencial',
    '',
    2025,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0017.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0020.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0027.jpg"]'::jsonb,
    true,
    2
  ),
  (
    'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
    'Escalera con iluminación rasante',
    'Escalera flotante en madera maciza con luz LED bajo cada escalón.',
    'Residencial',
    '',
    2024,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0018.jpg"]'::jsonb,
    true,
    3
  ),
  (
    'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
    'Escalera con baranda de vidrio',
    'Escalera en madera con baranda de vidrio templado y herrajes negros.',
    'Residencial',
    '',
    2024,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0021.jpg"]'::jsonb,
    true,
    4
  ),
  (
    'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
    'Biblioteca de estudio en roble',
    'Biblioteca abierta en roble natural sobre hormigón visto, con mesa de trabajo.',
    'Corporativo',
    '',
    2024,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0022.jpg"]'::jsonb,
    true,
    5
  ),
  (
    'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
    'Barra con cielorraso en listones',
    'Cocina/barra con cielorraso y paredes en listones de madera, iluminación natural.',
    'Hospitalidad',
    '',
    2024,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0023.jpg"]'::jsonb,
    true,
    6
  ),
  (
    'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
    'Estantería expositor de materiales',
    'Mueble expositor de muestras en roble para showroom de arquitectura.',
    'Corporativo',
    '',
    2023,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0024.jpg"]'::jsonb,
    false,
    7
  ),
  (
    'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
    'Sala con celosía y cielorraso de listones',
    'Sala completa revestida en madera con cielorraso de listones y puertas de celosía calada.',
    'Hospitalidad',
    '',
    2023,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0026.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0041.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0050.jpg"]'::jsonb,
    false,
    8
  ),
  (
    'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
    'Puerta corredera madera y hierro',
    'Puerta corredera con estructura de hierro negro y paneles de roble natural.',
    'Residencial',
    '',
    2023,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0027.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0033.jpg"]'::jsonb,
    false,
    9
  ),
  (
    'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
    'Mueble TV con cajones circulares',
    'Rack de TV en madera con frentes de cajón con tirador circular y fondo tapizado.',
    'Residencial',
    '',
    2023,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0028.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0034.jpg"]'::jsonb,
    false,
    10
  ),
  (
    'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b',
    'Vanitory con mesada de mármol',
    'Vanitory flotante en madera con mesada y bachas en mármol, espejo enmarcado.',
    'Residencial',
    '',
    2023,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0029.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0040.jpg"]'::jsonb,
    false,
    11
  ),
  (
    'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c',
    'Cava de vinos circular',
    'Cava de vinos con estantería curva en madera, iluminación LED y mesa central de mármol.',
    'Residencial',
    '',
    2022,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0030.jpg"]'::jsonb,
    false,
    12
  ),
  (
    'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d',
    'Biblioteca lacada con retroiluminación',
    'Biblioteca en madera lacada oscura con iluminación cálida indirecta y celosía con retroiluminación dorada.',
    'Corporativo',
    '',
    2025,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0031.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0032.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0049.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0054.jpg"]'::jsonb,
    false,
    13
  ),
  (
    'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e',
    'Escalera flotante con baranda de tela',
    'Escalera con peldaños flotantes en madera y baranda enmarcada con inserto textil.',
    'Residencial',
    '',
    2024,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0033.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0048.jpg"]'::jsonb,
    false,
    14
  ),
  (
    'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f',
    'Revestimiento mural en listones verticales',
    'Pared revestida en listones de madera verticales con iluminación natural rasante.',
    'Residencial',
    '',
    2024,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0036.jpg"]'::jsonb,
    false,
    15
  ),
  (
    'd6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a',
    'Módulo funcional empotrado',
    'Nicho empotrado en hormigón visto con estantería y módulos en roble natural.',
    'Residencial',
    '',
    2024,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0037.jpg"]'::jsonb,
    false,
    16
  ),
  (
    'e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b',
    'Cielorraso nervado en roble',
    'Cielorraso estructural con nervios en roble natural formando módulos rectangulares.',
    'Residencial',
    '',
    2022,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0038.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0044.jpg"]'::jsonb,
    false,
    17
  ),
  (
    'f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c',
    'Salón Boca Juniors',
    'Espacio de hospitalidad completo con cielorraso en listones, celosías y mesa de madera maciza.',
    'Hospitalidad',
    '',
    2022,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0039.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0050.jpg"]'::jsonb,
    false,
    18
  ),
  (
    'a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d',
    'Vanitory con revestimiento de listones',
    'Baño con vanitory en roble, mesada de piedra y revestimiento de listones verticales.',
    'Residencial',
    '',
    2022,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0040.jpg"]'::jsonb,
    false,
    19
  ),
  (
    'b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e',
    'Revestimiento mural con bajorrelieve',
    'Panel mural en madera con diseño de listones y bajorrelieve decorativo.',
    'Residencial',
    '',
    2023,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0041.jpg"]'::jsonb,
    false,
    20
  ),
  (
    'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f',
    'Mueble de celosía para living',
    'Mueble de celosía calada en madera natural como divisor de ambientes.',
    'Residencial',
    '',
    2023,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0043.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0052.jpg"]'::jsonb,
    false,
    21
  ),
  (
    'd2e3f4a5-b6c7-4d8e-9f0a-1b2c3d4e5f6a',
    'Oficina con biblioteca lacada oscura',
    'Oficina premium con biblioteca lacada en gris oscuro, celosía y cielorraso calado.',
    'Corporativo',
    '',
    2025,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0049.jpg","https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0054.jpg"]'::jsonb,
    false,
    22
  ),
  (
    'e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b',
    'Mostrador comercial Pez',
    'Mostrador comercial en madera y mármol para local gastronómico.',
    'Comercial',
    '',
    2024,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0051.jpg"]'::jsonb,
    false,
    23
  ),
  (
    'f4a5b6c7-d8e9-4f0a-1b2c-3d4e5f6a7b8c',
    'Walk-in closet con iluminación',
    'Vestidor a medida en roble con iluminación LED perimetral y sistema de cajones.',
    'Residencial',
    '',
    2025,
    '["https://whpryuuxmngoxfhdxgek.supabase.co/storage/v1/object/public/projects/WA0055.jpg"]'::jsonb,
    false,
    24
  );
