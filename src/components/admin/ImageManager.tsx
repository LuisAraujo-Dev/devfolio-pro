// src/components/admin/ImageManager.tsx
'use client';
import { addImage, setCoverImage, deleteImage } from '@/src/app/lib/actions';
import { Trash2, Star, Monitor, Smartphone, Plus, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image'; 
import { useState } from 'react';

interface ProjectImage {
  id: string;
  url: string;
  type: string;
  isCover: boolean;
}

interface ImageManagerProps {
  projectId: string;
  images: ProjectImage[];
}

export function ImageManager({ projectId, images }: ImageManagerProps) {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('DESKTOP');
  const [isAdding, setIsAdding] = useState(false);

  // Wrapper para adicionar imagem
  const handleAdd = async () => {
    if (!url) return;
    setIsAdding(true);
    
    const formData = new FormData();
    formData.append('url', url);
    formData.append('type', type);
    
    await addImage(projectId, formData);
    
    setUrl('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      
      {/* --- Área de Adicionar --- */}
      <div className="flex gap-2 items-end rounded-lg border border-white/10 bg-surface/50 p-4">
        <div className="flex-1 space-y-2">
          <label className="text-xs font-medium text-muted">URL da Imagem</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted">Tipo de Mockup</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-[38px] rounded-md border border-white/10 bg-background px-3 text-sm text-white focus:border-primary focus:outline-none"
          >
            <option value="DESKTOP">Laptop</option>
            <option value="MOBILE">Celular</option>
          </select>
        </div>

        <button
          onClick={handleAdd}
          disabled={!url || isAdding}
          className="h-[38px] px-4 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isAdding ? <span className="animate-pulse">...</span> : <Plus className="size-4" />}
        </button>
      </div>

      {/* --- Grid de Imagens --- */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-video rounded-lg border border-white/10 bg-black overflow-hidden">
            <Image 
              src={img.url} 
              alt="Project Preview" 
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              unoptimized
            />
            
            {/* Badges (Tipo) */}
            <div className="absolute top-2 left-2 z-10">
              <span className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-white border border-white/10">
                {img.type === 'DESKTOP' ? <Monitor className="size-3" /> : <Smartphone className="size-3" />}
                {img.type}
              </span>
            </div>

            {/* Ações (Overlay) */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
              
              {/* Botão Capa */}
              <form action={async () => { await setCoverImage(img.id, projectId) }}>
                <button
                  title="Definir como Capa"
                  className={`p-2 rounded-full transition-colors ${img.isCover ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <Star className={`size-4 ${img.isCover ? 'fill-black' : ''}`} />
                </button>
              </form>

              {/* Botão Deletar */}
              <form action={async () => { await deleteImage(img.id, projectId) }}>
                <button
                  title="Excluir Imagem"
                  className="p-2 rounded-full bg-white/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </form>
            </div>

            {/* Indicador de Capa Ativa */}
            {img.isCover && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-bold text-yellow-500 bg-black/80 px-2 py-1 rounded-full border border-yellow-500/30 z-10">
                <Star className="size-3 fill-yellow-500" /> CAPA PRINCIPAL
              </div>
            )}
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-2 flex flex-col items-center justify-center py-10 border border-dashed border-white/10 rounded-lg text-muted">
            <ImageIcon className="size-8 mb-2 opacity-50" />
            <p className="text-sm">Nenhuma imagem adicionada</p>
          </div>
        )}
      </div>
    </div>
  );
}