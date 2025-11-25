// src/app/(admin)/admin/certifications/new/page.tsx
import { createCertification } from "@/src/app/lib/actions";
import { TechSelector } from "@/src/components/admin/TechSelector";
import { PrismaClient } from "@prisma/client";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'; 

const prisma = new PrismaClient();

export default async function NewCertificationPage() {
  const allTechs = await prisma.technology.findMany({ 
    orderBy: { name: 'asc' } 
  });

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/certifications" className="rounded-full p-2 hover:bg-white/5 text-muted hover:text-white transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Nova Certificação</h1>
      </div>

      <form action={createCertification} className="space-y-6">
        
        <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Nome do Curso</label>
              <input name="name" required placeholder="Ex: Ignite Node.js" className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Instituição</label>
              <input name="institution" required placeholder="Ex: Rocketseat" className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Data de Emissão</label>
              <input type="date" name="issuedAt" required className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none [color-scheme:dark]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Link da Credencial (Opcional)</label>
              <input name="credentialUrl" placeholder="https://..." className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Imagem do Certificado</label>
            <div className="relative">
               <input type="file" name="file" accept="image/*" required className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer border border-white/10 rounded-md bg-background" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Pontos Relevantes / Highlights</label>
            <textarea name="highlights" required rows={3} placeholder="O que você aprendeu de mais importante?" className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white resize-none focus:border-primary focus:outline-none" />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
          <h3 className="font-semibold text-white">Tecnologias Utilizadas</h3>
          <TechSelector availableTechs={allTechs} initialSelectedIds={[]} />
        </div>

        <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          <Save className="size-4" /> Salvar Certificação
        </button>
      </form>
    </div>
  );
}