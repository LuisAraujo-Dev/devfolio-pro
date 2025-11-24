'use client';

import { saveProfile } from "@/src/app/lib/actions";
import { Save, Image as ImageIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

interface ProfileData {
  name: string;
  headline: string;
  bio: string;
  about: string;
  profileUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  email: string | null;
}

export function ProfileForm({ initialData }: { initialData: ProfileData | null }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.profileUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <form action={saveProfile} className="space-y-8">
      
      <input type="hidden" name="profileUrl" value={initialData?.profileUrl || ""} />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* --- Coluna Esquerda: Textos --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
            <h3 className="font-semibold text-white">Informações Básicas</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Seu Nome</label>
              <input
                name="name"
                defaultValue={initialData?.name || ""}
                placeholder="Ex: Luís Silva"
                required
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Headline (Home)</label>
              <input
                name="headline"
                defaultValue={initialData?.headline || ""}
                placeholder="Ex: Engenheiro de Software..."
                required
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Bio Curta (Home)</label>
              <textarea
                name="bio"
                rows={3}
                defaultValue={initialData?.bio || ""}
                placeholder="Resumo rápido..."
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white resize-none focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
            <h3 className="font-semibold text-white">Sobre Mim (Página Sobre)</h3>
            <textarea
              name="about"
              rows={10}
              defaultValue={initialData?.about || ""}
              className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white font-mono text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* --- Coluna Direita: Foto e Links --- */}
        <div className="space-y-6">
          
          <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
            <h3 className="font-semibold text-white">Foto de Perfil</h3>
            
            <div className="flex flex-col items-center gap-4">
              {/* Círculo de Preview */}
              <div 
                className="size-40 rounded-full border-4 border-white/10 bg-black overflow-hidden relative cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <Image 
                    src={previewUrl} 
                    alt="Preview" 
                    fill 
                    className="object-cover group-hover:opacity-75 transition-opacity" 
                    unoptimized 
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="size-10 text-muted" />
                  </div>
                )}
                
                {/* Overlay de Hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="size-6 text-white" />
                </div>
              </div>

              {/* Botão para Selecionar (Input File Invisível) */}
              <input 
                ref={fileInputRef}
                type="file" 
                name="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-primary hover:underline"
              >
                Alterar Foto
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
            <h3 className="font-semibold text-white">Redes Sociais</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">GitHub URL</label>
              <input
                name="githubUrl"
                defaultValue={initialData?.githubUrl || ""}
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">LinkedIn URL</label>
              <input
                name="linkedinUrl"
                defaultValue={initialData?.linkedinUrl || ""}
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Email Contato</label>
              <input
                name="email"
                defaultValue={initialData?.email || ""}
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Save className="size-4" />
            Salvar Perfil
          </button>
        </div>
      </div>
    </form>
  );
}