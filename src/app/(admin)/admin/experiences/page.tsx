// src/app/(admin)/admin/experiences/page.tsx  
import { createExperience, deleteExperience } from "@/src/app/lib/actions";
import { PrismaClient } from "@prisma/client";
import { Briefcase, Calendar, MapPin, Plus, Trash2, Pencil } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function ExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase className="size-8 text-primary" />
          Experiência Profissional
        </h1>
        <p className="text-muted">Gerencie sua linha do tempo de carreira.</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-surface p-6">
        <h3 className="mb-4 font-semibold text-white">Adicionar Nova Experiência</h3>
        
        <form action={createExperience} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Empresa</label>
              <input 
                name="company" 
                required 
                placeholder="Ex: Google" 
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Cargo</label>
              <input 
                name="role" 
                required 
                placeholder="Ex: Senior Frontend Dev" 
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" 
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Início</label>
              <input 
                type="date" 
                name="startDate" 
                required 
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none scheme:dark" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Fim (Deixe vazio se for atual)</label>
              <input 
                type="date" 
                name="endDate" 
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none scheme:dark" 
              />
            </div>
            <div className="flex items-center gap-2 pt-8">
              <input 
                type="checkbox" 
                name="isRemote" 
                id="isRemote" 
                className="size-4 accent-primary" 
              />
              <label htmlFor="isRemote" className="text-sm text-white cursor-pointer select-none">Trabalho Remoto?</label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Descrição das Atividades</label>
            <textarea 
              name="description" 
              required 
              rows={3} 
              placeholder="Descreva suas principais responsabilidades e conquistas..." 
              className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white resize-none focus:border-primary focus:outline-none" 
            />
          </div>

          <button type="submit" className="flex items-center gap-2 rounded-md bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90 transition-colors">
            <Plus className="size-4" /> Adicionar Experiência
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="group relative flex flex-col gap-4 rounded-xl border border-white/10 bg-surface p-6 hover:border-white/20 transition-colors">
            
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link 
                  href={`/admin/experiences/${exp.id}/edit`}
                  className="rounded-md p-2 text-muted hover:bg-white/10 hover:text-white transition-colors"
                  title="Editar"
                >
                  <Pencil className="size-4" />
                </Link>

                <form action={async () => { "use server"; await deleteExperience(exp.id); }}>
                  <button 
                    className="rounded-md p-2 text-muted hover:bg-red-500/10 hover:text-red-400 transition-colors" 
                    title="Excluir"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-muted font-mono uppercase tracking-wide">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} 
                {' - '}
                {exp.endDate 
                  ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) 
                  : 'ATUALMENTE'}
              </span>
              {exp.isRemote && (
                <span className="flex items-center gap-1 text-green-400">
                  <MapPin className="size-3" /> Remoto
                </span>
              )}
            </div>

            {/* Descrição */}
            <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">
              {exp.description}
            </p>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="py-10 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-muted">Nenhuma experiência cadastrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}