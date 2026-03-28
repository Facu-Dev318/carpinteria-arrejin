/*
  # Fix typo in project title

  1. Changes
    - Update project title from "Biblioteca lacada con retroiluminación" to "Biblioteca laqueada con retroiluminación"
    
  2. Details
    - Corrects the word "lacada" to "laqueada" in the project title
    - Only affects the specific project with this title
*/

-- Update the project title to fix the typo
UPDATE projects
SET title = 'Biblioteca laqueada con retroiluminación'
WHERE title = 'Biblioteca lacada con retroiluminación';
