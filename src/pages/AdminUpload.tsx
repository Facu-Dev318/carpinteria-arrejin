import { useState, useEffect } from 'react';
import { supabase, Project } from '../lib/supabase';
import { Upload, CheckCircle, XCircle, Loader, Trash2, CreditCard as Edit2 } from 'lucide-react';

interface FileUploadStatus {
  name: string;
  uploadName: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
}

export default function AdminUpload() {
  const [files, setFiles] = useState<FileUploadStatus[]>([]);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('cocinas');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoadingProjects(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('category', { ascending: true })
      .order('id', { ascending: true });

    if (data && !error) {
      setProjects(data);
    }
    setLoadingProjects(false);
  };

  const extractWAFileName = (fileName: string): string => {
    const waMatch = fileName.match(/WA\d{4}\.jpg/i);
    if (waMatch) {
      return waMatch[0];
    }
    return fileName;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const fileStatuses: FileUploadStatus[] = Array.from(selectedFiles).map(file => ({
      name: file.name,
      uploadName: extractWAFileName(file.name),
      status: 'pending',
    }));

    setFiles(fileStatuses);
  };

  const uploadFiles = async (event: React.FormEvent) => {
    event.preventDefault();
    setUploading(true);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (!input?.files) return;

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];

      setFiles(prev => prev.map((f, idx) =>
        idx === i ? { ...f, status: 'uploading' } : f
      ));

      try {
        const uploadName = files[i].uploadName;
        const uploadPath = `${category}/${uploadName}`;

        const { data, error } = await supabase.storage
          .from('projects')
          .upload(uploadPath, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('projects')
          .getPublicUrl(uploadPath);

        setFiles(prev => prev.map((f, idx) =>
          idx === i ? {
            ...f,
            status: 'success',
            url: urlData.publicUrl
          } : f
        ));
      } catch (error) {
        setFiles(prev => prev.map((f, idx) =>
          idx === i ? {
            ...f,
            status: 'error',
            error: error instanceof Error ? error.message : 'Error desconocido'
          } : f
        ));
      }
    }

    setUploading(false);
  };

  const resetForm = () => {
    setFiles([]);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) input.value = '';
  };

  const updateProjectCategory = async (projectId: number, category: string) => {
    const { error } = await supabase
      .from('projects')
      .update({ category })
      .eq('id', projectId);

    if (!error) {
      setProjects(prev => prev.map(p =>
        p.id === projectId ? { ...p, category } : p
      ));
      setEditingProject(null);
      setNewCategory('');
    } else {
      alert('Error al actualizar la categoría');
    }
  };

  const deleteProject = async (projectId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      return;
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (!error) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } else {
      alert('Error al eliminar la imagen');
    }
  };

  const groupedProjects = projects.reduce((acc, project) => {
    const cat = project.category || 'sin categoría';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">Subir Imágenes</h1>
          <p className="text-neutral-600">Administración de imágenes del bucket projects</p>
        </div>

        <form onSubmit={uploadFiles} className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Categoría de destino
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={uploading}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="cocinas">Cocinas</option>
              <option value="revestimientos">Revestimientos</option>
              <option value="escaleras">Escaleras</option>
              <option value="puertas">Puertas</option>
              <option value="vanitory">Vanitory</option>
              <option value="bibliotecas">Bibliotecas y repisas</option>
              <option value="vestidor">Vestidor</option>
              <option value="filosofia">Filosofía</option>
              <option value="capacidad">Capacidad Productiva</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-4">
              <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg hover:border-neutral-400 transition-colors cursor-pointer">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
                  <span className="text-sm text-neutral-600">
                    Seleccionar archivos
                  </span>
                </div>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">
                Archivos seleccionados ({files.length})
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      {file.status === 'pending' && (
                        <div className="w-5 h-5 rounded-full border-2 border-neutral-300" />
                      )}
                      {file.status === 'uploading' && (
                        <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                      )}
                      {file.status === 'success' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {file.status === 'error' && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}

                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        {file.name !== file.uploadName && (
                          <p className="text-xs text-neutral-500 mt-0.5">→ {file.uploadName}</p>
                        )}
                        {file.status === 'error' && file.error && (
                          <p className="text-xs text-red-600 mt-1">{file.error}</p>
                        )}
                        {file.status === 'success' && file.url && (
                          <p className="text-xs text-green-600 mt-1">Subido exitosamente</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Subiendo...' : 'Subir Archivos'}
            </button>

            {!uploading && files.length > 0 && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
        </form>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h3 className="font-medium text-blue-900 mb-2">Información</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>Las imágenes se subirán al bucket "projects" en la subcarpeta seleccionada (ej: projects/cocinas/)</li>
            <li>Los archivos con formato IMG-20260326-WA0016.jpg se renombrarán automáticamente a WA0016.jpg</li>
            <li>Si un archivo con el mismo nombre existe, será reemplazado</li>
            <li>Las URLs públicas estarán disponibles inmediatamente</li>
            <li>Formatos recomendados: JPG, PNG, WebP</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-light mb-6">Gestión de Imágenes</h2>

          {loadingProjects ? (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 mx-auto mb-4 text-neutral-400 animate-spin" />
              <p className="text-neutral-600">Cargando imágenes...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedProjects).map(([categoryName, categoryProjects]) => (
                <div key={categoryName} className="border-b border-neutral-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4 capitalize">
                    {categoryName} ({categoryProjects.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {categoryProjects.map((project) => (
                      <div key={project.id} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                        <div className="flex-shrink-0 w-24 h-24 bg-neutral-200 rounded overflow-hidden">
                          {project.images && project.images.length > 0 && (
                            <img
                              src={project.images[0]}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-neutral-900 truncate">{project.title}</p>
                          <p className="text-sm text-neutral-500">{project.images?.length || 0} imagen(es)</p>
                        </div>

                        {editingProject === project.id ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                            >
                              <option value="">Seleccionar...</option>
                              <option value="cocinas">Cocinas</option>
                              <option value="revestimientos">Revestimientos</option>
                              <option value="vanitory">Vanitorys</option>
                              <option value="bibliotecas y repisas">Bibliotecas y Repisas</option>
                              <option value="puertas">Puertas</option>
                              <option value="escaleras">Escaleras</option>
                              <option value="filosofia">Filosofía</option>
                              <option value="capacidad">Capacidad Productiva</option>
                            </select>
                            <button
                              onClick={() => updateProjectCategory(project.id, newCategory)}
                              disabled={!newCategory}
                              className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => {
                                setEditingProject(null);
                                setNewCategory('');
                              }}
                              className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingProject(project.id);
                                setNewCategory(project.category);
                              }}
                              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                              title="Cambiar categoría"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteProject(project.id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar imagen"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
