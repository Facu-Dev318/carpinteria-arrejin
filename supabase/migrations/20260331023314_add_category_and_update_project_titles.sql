/*
  # Update project titles and add category field

  1. Schema Changes
    - Add `category` column (text) to `projects` table if it doesn't exist
  
  2. Data Updates
    - Update titles and categories for all 24 existing projects based on order_index
    - Add placeholder project for "cocinas" category (order_index 25)
  
  3. Categories
    - revestimientos
    - vestidor
    - escaleras
    - bibliotecas y repisas
    - puertas
    - vanitory
    - cocinas
*/

-- Add category column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'category'
  ) THEN
    ALTER TABLE projects ADD COLUMN category text;
  END IF;
END $$;

-- Update project 1
UPDATE projects SET title = 'Revestimiento', category = 'revestimientos' WHERE order_index = 1;

-- Update project 2
UPDATE projects SET title = 'Vestidor de madera y rafía', category = 'vestidor' WHERE order_index = 2;

-- Update project 3
UPDATE projects SET title = 'Escalera con iluminación LED', category = 'escaleras' WHERE order_index = 3;

-- Update project 4
UPDATE projects SET title = 'Escalera en madera maciza y vidrio', category = 'escaleras' WHERE order_index = 4;

-- Update project 5
UPDATE projects SET title = 'Biblioteca de guardado mixto', category = 'bibliotecas y repisas' WHERE order_index = 5;

-- Update project 6
UPDATE projects SET title = 'Revestimiento en petiribí', category = 'revestimientos' WHERE order_index = 6;

-- Update project 7
UPDATE projects SET title = 'Repisa en kiri e hidrolaca', category = 'bibliotecas y repisas' WHERE order_index = 7;

-- Update project 8
UPDATE projects SET title = 'Puertas tramadas', category = 'puertas' WHERE order_index = 8;

-- Update project 9
UPDATE projects SET title = 'Puertas corredizas en hierro y madera', category = 'puertas' WHERE order_index = 9;

-- Update project 10
UPDATE projects SET title = 'Rack de TV en madera maciza', category = 'bibliotecas y repisas' WHERE order_index = 10;

-- Update project 11
UPDATE projects SET title = 'Vanitory en madera natural', category = 'vanitory' WHERE order_index = 11;

-- Update project 12
UPDATE projects SET title = 'Cava curva en petiribí', category = 'bibliotecas y repisas' WHERE order_index = 12;

-- Update project 13
UPDATE projects SET title = 'Mueble con puertas corredizas, listones y luces LED', category = 'bibliotecas y repisas' WHERE order_index = 13;

-- Update project 14
UPDATE projects SET title = 'Escalera flotante en kiri y rafía', category = 'escaleras' WHERE order_index = 14;

-- Update project 15
UPDATE projects SET title = 'Revestimiento alistonado', category = 'revestimientos' WHERE order_index = 15;

-- Update project 16
UPDATE projects SET title = 'Mueble playroom', category = 'bibliotecas y repisas' WHERE order_index = 16;

-- Update project 17
UPDATE projects SET title = 'Revestimiento en cielorraso', category = 'revestimientos' WHERE order_index = 17;

-- Update project 18
UPDATE projects SET title = 'Revestimiento alistonado', category = 'revestimientos' WHERE order_index = 18;

-- Update project 19
UPDATE projects SET title = 'Vanitory', category = 'vanitory' WHERE order_index = 19;

-- Update project 20
UPDATE projects SET title = 'Revestimiento en madera natural con detalles ranurados', category = 'revestimientos' WHERE order_index = 20;

-- Update project 21
UPDATE projects SET title = 'Puertas tramadas', category = 'puertas' WHERE order_index = 21;

-- Update project 22
UPDATE projects SET title = 'Biblioteca laqueada', category = 'bibliotecas y repisas' WHERE order_index = 22;

-- Update project 23
UPDATE projects SET title = 'Mostrador y revestimiento en kiri', category = 'cocinas' WHERE order_index = 23;

-- Update project 24
UPDATE projects SET title = 'Vestidor con iluminación LED', category = 'vestidor' WHERE order_index = 24;

-- Insert placeholder project for cocinas category (with all required fields)
INSERT INTO projects (title, location, typology, year, description, category, order_index, featured, images, created_at)
VALUES (
  'Cocinas — próximamente',
  'Por definir',
  'Cocinas',
  2026,
  'Próximamente agregaremos proyectos de cocinas',
  'cocinas',
  25,
  false,
  '[]'::jsonb,
  now()
)
ON CONFLICT DO NOTHING;