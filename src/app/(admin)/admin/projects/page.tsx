import Link from "next/link";
import { Plus, Search, FolderOpen, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { deleteProject } from "@/src/app/lib/actions";

const prisma = new PrismaClient();

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      technologies: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Meus Projetos</h1>
          <p className="text-muted">Gerencie seu portfólio e experiências.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" />
          Novo Projeto
        </Link>
      </div>

      <div className="flex items-center gap-2 rounded-md border border-white/10 bg-surface px-3 py-2">
        <Search className="size-4 text-muted" />
        <input
          type="text"
          placeholder="Buscar projetos..."
          className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
        />
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-surface/50 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-white/5">
            <FolderOpen className="size-8 text-muted" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">Nenhum projeto encontrado</h3>
          <p className="mt-2 text-sm text-muted max-w-xs mx-auto">
            Você ainda não cadastrou nenhum projeto. Comece criando o primeiro agora mesmo.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Projeto</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Atualizado em</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{project.title}</span>
                      <span className="text-xs text-muted">/{project.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {project.isVisible ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                          <Eye className="size-3" /> Publicado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-400">
                          <EyeOff className="size-3" /> Rascunho
                        </span>
                      )}
                      {project.featured && (
                        <span className="rounded-full border border-primary/30 px-2 py-1 text-xs text-primary">
                          Destaque
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {new Date(project.updatedAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-md p-2 hover:bg-white/10 text-muted hover:text-white transition-colors"
                        title="Editar"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      
                      <form
                        action={async () => {
                          "use server";
                          await deleteProject(project.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded-md p-2 hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </form>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}