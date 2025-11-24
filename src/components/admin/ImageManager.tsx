// src/components/admin/ImageManager.tsx
'use client';

import { addImage, setCoverImage, deleteImage } from '@/src/app/lib/actions';
import { Trash2, Star, Monitor, Smartphone, UploadCloud, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';

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
  const [type, setType] = useState('DESKTOP');
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = async () => {
    if (!fileInputRef.current?.files?.[0]) return;

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    formData.append("type", type);
    
    try {
        // 3. Chamar a Server Action
        await addImage(projectId, formData);
        
        // 4. Limpar o input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao fazer upload da imagem.");
    } finally {
        setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* --- Área de Upload (AGORA É UMA DIV, NÃO FORM) --- */}
      <div className="flex flex-col sm:flex-row gap-4 items-end rounded-lg border border-white/10 bg-surface/50 p-4">
        
        {/* Input Arquivo */}
        <div className="flex-1 space-y-2 w-full">
          <label className="text-xs font-medium text-muted">Selecionar Arquivo</label>
          <div className="relative">
            <input
              ref={fileInputRef}
              name="file"
              type="file"
              accept="image/*"
              className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
            />
          </div>
        </div>
        
        {/* Select Tipo */}
        <div className="space-y-2 w-full sm:w-auto">
          <label className="text-xs font-medium text-muted">Tipo de Mockup</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-[38px] rounded-md border border-white/10 bg-background px-3 text-sm text-white focus:border-primary focus:outline-none"
          >
            <option value="DESKTOP">Laptop</option>
            <option value="MOBILE">Celular</option>
          </select>
        </div>

        {/* Botão de Ação (Type="button" para não submeter o form pai) */}
        <button
          type="button" 
          onClick={handleUploadClick}
          disabled={isUploading}
          className="h-[38px] px-6 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {isUploading ? (
            <>
              <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Enviando...
            </>
          ) : (
            <>
              <UploadCloud className="size-4" />
              Upload
            </>
          )}
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

            {/* Ações (Overlay) - REMOVIDO <FORM> DAQUI TAMBÉM */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
              
              {/* Botão Capa */}
              <button
                type="button"
                onClick={async () => await setCoverImage(img.id, projectId)}
                title="Definir como Capa"
                className={`p-2 rounded-full transition-colors ${img.isCover ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <Star className={`size-4 ${img.isCover ? 'fill-black' : ''}`} />
              </button>

              {/* Botão Deletar */}
              <button
                type="button"
                onClick={async () => await deleteImage(img.id, projectId)}
                title="Excluir Imagem"
                className="p-2 rounded-full bg-white/10 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            {/* Indicador de Capa */}
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
            <p className="text-sm">Nenhuma imagem enviada</p>
          </div>
        )}
      </div>
    </div>
  );
}