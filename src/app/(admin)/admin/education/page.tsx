import { createEducation, deleteEducation } from "@/src/app/lib/actions";
import { PrismaClient } from "@prisma/client";
import { GraduationCap, Plus, Trash2, Pencil, Calendar } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function EducationPage() {
  const educations = await prisma.education.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="size-8 text-primary" />
          Formação Acadêmica
        </h1>
        <p className="text-muted">Gerencie seus cursos de graduação e cursos técnicos.</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-surface p-6">
        <h3 className="mb-4 font-semibold text-white">Adicionar Nova Formação</h3>
        
        <form action={createEducation} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Instituição</label>
              <input name="institution" required placeholder="Ex: USP" className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Curso / Grau</label>
              <input name="course" required placeholder="Ex: Ciência da Computação" className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Início</label>
              <input type="date" name="startDate" required className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none scheme:dark" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Fim (Vazio se cursando)</label>
              <input type="date" name="endDate" className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none scheme:dark" />
            </div>
          </div>

          <button type="submit" className="flex items-center gap-2 rounded-md bg-primary px-6 py-2 font-medium text-white hover:bg-primary/90 transition-colors">
            <Plus className="size-4" /> Adicionar Formação
          </button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {educations.map((edu) => (
          <div key={edu.id} className="group relative flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-surface p-6 hover:border-white/20 transition-colors">
            
            <div>
              <h3 className="text-lg font-bold text-white">{edu.course}</h3>
              <p className="text-primary font-medium">{edu.institution}</p>
              
              <div className="flex items-center gap-2 text-xs text-muted mt-2 font-mono uppercase">
                <Calendar className="size-3" />
                {new Date(edu.startDate).toLocaleDateString('pt-BR', { year: 'numeric' })} 
                {' - '}
                {edu.endDate 
                  ? new Date(edu.endDate).toLocaleDateString('pt-BR', { year: 'numeric' }) 
                  : 'EM ANDAMENTO'}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link 
                href={`/admin/education/${edu.id}/edit`}
                className="flex items-center gap-2 text-xs text-muted hover:text-white transition-colors"
              >
                <Pencil className="size-3" /> Editar
              </Link>

              <form action={async () => { "use server"; await deleteEducation(edu.id); }}>
                <button className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 className="size-3" /> Excluir
                </button>
              </form>
            </div>
          </div>
        ))}

        {educations.length === 0 && (
          <div className="col-span-full py-10 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-muted">Nenhuma formação cadastrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}