import { PrismaClient } from "@prisma/client";
import { FolderKanban, Eye, EyeOff, Cpu } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const [totalProjects, publishedProjects, draftProjects, totalTechs] = await Promise.all([
    prisma.project.count(), // Total
    prisma.project.count({ where: { isVisible: true } }), 
    prisma.project.count({ where: { isVisible: false } }), 
    prisma.technology.count(), // Total de Techs
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-muted">Visão geral do seu portfólio.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Card: Total de Projetos */}
        <div className="rounded-xl border border-white/10 bg-surface p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total de Projetos</p>
              <h3 className="mt-2 text-3xl font-bold text-white">{totalProjects}</h3>
            </div>
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FolderKanban className="size-6" />
            </div>
          </div>
        </div>

        {/* Card: Publicados */}
        <div className="rounded-xl border border-white/10 bg-surface p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Publicados</p>
              <h3 className="mt-2 text-3xl font-bold text-green-400">{publishedProjects}</h3>
            </div>
            <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
              <Eye className="size-6" />
            </div>
          </div>
        </div>

        {/* Card: Rascunhos */}
        <div className="rounded-xl border border-white/10 bg-surface p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Rascunhos</p>
              <h3 className="mt-2 text-3xl font-bold text-yellow-400">{draftProjects}</h3>
            </div>
            <div className="flex size-12 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-400">
              <EyeOff className="size-6" />
            </div>
          </div>
        </div>

        {/* Card: Tecnologias */}
        <div className="rounded-xl border border-white/10 bg-surface p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Tecnologias</p>
              <h3 className="mt-2 text-3xl font-bold text-blue-400">{totalTechs}</h3>
            </div>
            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Cpu className="size-6" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}