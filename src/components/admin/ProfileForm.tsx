'use client';

import { saveProfile } from "@/src/app/lib/actions";
import { Save, Image as ImageIcon, Upload, FileText } from "lucide-react"; 
import Image from "next/image";
import { useState, useRef } from "react";

interface ProfileData {
  name: string;
  headline: string;
  bio: string;
  about: string;
  profileUrl: string | null;
  cvUrl: string | null; // Adicionado
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
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <form action={saveProfile} className="space-y-8">
      
      <input type="hidden" name="profileUrl" value={initialData?.profileUrl || ""} />
      <input type="hidden" name="cvUrl" value={initialData?.cvUrl || ""} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Informações Básicas</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Seu Nome</label>
                <input name="name" defaultValue={initialData?.name || ""} required className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Headline</label>
                <input name="headline" defaultValue={initialData?.headline || ""} required className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Bio Curta</label>
                <textarea name="bio" rows={3} defaultValue={initialData?.bio || ""} className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white resize-none focus:border-primary focus:outline-none" />
              </div>
           </div>

           <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Sobre Mim</h3>
              <textarea name="about" rows={10} defaultValue={initialData?.about || ""} className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white font-mono text-sm focus:border-primary focus:outline-none" />
           </div>
        </div>

        <div className="space-y-6">
          
          <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
            <h3 className="font-semibold text-white">Foto de Perfil</h3>
            <div className="flex flex-col items-center gap-4">
              <div 
                className="size-40 rounded-full border-4 border-white/10 bg-black overflow-hidden relative cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <Image src={previewUrl} alt="Preview" fill className="object-cover group-hover:opacity-75 transition-opacity" unoptimized />
                ) : (
                  <div className="flex h-full items-center justify-center"><ImageIcon className="size-10 text-muted" /></div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="size-6 text-white" />
                </div>
              </div>
              <input ref={fileInputRef} type="file" name="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs text-primary hover:underline">Alterar Foto</button>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <FileText className="size-4 text-primary" /> Currículo (PDF)
            </h3>
            
            <div className="space-y-3">
              {initialData?.cvUrl && (
                <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 p-2 rounded border border-green-400/20">
                  <FileText className="size-3" />
                  <span>Arquivo atual cadastrado</span>
                </div>
              )}
              
              <label className="block w-full text-sm text-muted">
                Selecione um novo PDF para substituir:
              </label>
              <input 
                type="file" 
                name="cvFile" 
                accept=".pdf" 
                className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer border border-white/10 rounded-md bg-background" 
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
            <h3 className="font-semibold text-white">Redes Sociais</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">GitHub URL</label>
              <input name="githubUrl" defaultValue={initialData?.githubUrl || ""} className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">LinkedIn URL</label>
              <input name="linkedinUrl" defaultValue={initialData?.linkedinUrl || ""} className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Email</label>
              <input name="email" defaultValue={initialData?.email || ""} className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none" />
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <Save className="size-4" /> Salvar Perfil
          </button>
        </div>
      </div>
    </form>
  );
}