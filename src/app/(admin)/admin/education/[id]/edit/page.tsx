import { deleteEducation, updateEducation } from "@/src/app/lib/actions";
import { PrismaClient } from "@prisma/client";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const edu = await prisma.education.findUnique({ where: { id } });

  if (!edu) return notFound();

  const updateAction = updateEducation.bind(null, edu.id);
  const formattedStart = edu.startDate.toISOString().split('T')[0];
  const formattedEnd = edu.endDate ? edu.endDate.toISOString().split('T')[0] : "";

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/education" className="rounded-full p-2 hover:bg-white/5 text-muted hover:text-white transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Editar Formação</h1>
      </div>

      <div className="rounded-xl border border-white/10 bg-surface p-6">
        <form action={updateAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Instituição</label>
              <input name="institution" defaultValue={edu.institution} required className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Curso / Grau</label>
              <input name="course" defaultValue={edu.course} required className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Início</label>
              <input type="date" name="startDate" defaultValue={formattedStart} required className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none scheme:dark]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Fim</label>
              <input type="date" name="endDate" defaultValue={formattedEnd} className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none scheme:dark" />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button type="submit" className="flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              <Save className="size-4" /> Salvar Alterações
            </button>

            <div className="pt-4 border-t border-white/5">
                <button 
                  formAction={async () => { "use server"; await deleteEducation(edu.id); }}
                  className="w-full flex items-center justify-center gap-2 rounded-md border border-red-900/50 bg-red-900/10 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="size-4" /> Excluir
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}