import { updateProject } from "@/src/app/lib/actions";
import { TechSelector } from "@/src/components/admin/TechSelector";
import { PrismaClient } from "@prisma/client";
import { ArrowLeft, Save, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      technologies: true,
    },
  });

  const allTechs = await prisma.technology.findMany({
    orderBy: { name: "asc" },
  });

  if (!project) {
    return notFound();
  }

  const selectedTechIds = project.technologies.map((t) => t.id);

  const updateProjectWithId = updateProject.bind(null, project.id);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <form action={updateProjectWithId} className="space-y-6">
        {/* --- Cabeçalho com Ações --- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/projects"
              className="rounded-full p-2 hover:bg-white/5 text-muted hover:text-white transition-colors"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Editar Projeto</h1>
              <div className="flex items-center gap-2 text-sm text-muted">
                <span>ID: {project.id.slice(0, 8)}...</span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="hover:text-primary flex items-center gap-1"
                  >
                    <ExternalLink className="size-3" /> Ver online
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Botão Salvar */}
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Save className="size-4" />
              Salvar Alterações
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* --- Coluna Principal (Esquerda) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Infos Básicas */}
            <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Informações Principais</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Título</label>
                <input
                  name="title"
                  defaultValue={project.title}
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Slug</label>
                <input
                  name="slug"
                  defaultValue={project.slug}
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-muted focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">
                  Descrição Curta
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={project.description}
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white resize-none focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Editor de Conteúdo */}
            <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Conteúdo Detalhado</h3>
              <p className="text-xs text-muted">
                Use Markdown ou HTML para descrever o desafio e solução.
              </p>
              <textarea
                name="content"
                rows={10}
                defaultValue={project.content}
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white font-mono text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* --- Coluna Lateral (Direita) --- */}
          <div className="space-y-6">
            {/* Seletor de Tecnologias (NOVO) */}
            <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Tecnologias Usadas</h3>
              <TechSelector
                availableTechs={allTechs}
                initialSelectedIds={selectedTechIds}
              />
            </div>

            {/* Status e Visibilidade */}
            <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Configurações</h3>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="isVisible"
                  className="text-sm text-muted cursor-pointer select-none"
                >
                  Visível no Site?
                </label>
                <input
                  id="isVisible"
                  name="isVisible"
                  type="checkbox"
                  defaultChecked={project.isVisible}
                  className="size-4 accent-primary"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <label
                  htmlFor="featured"
                  className="text-sm text-muted cursor-pointer select-none"
                >
                  Projeto em Destaque?
                </label>
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  defaultChecked={project.featured}
                  className="size-4 accent-primary"
                />
              </div>
            </div>

            {/* Links Externos */}
            <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Links</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">
                  GitHub Repo
                </label>
                <input
                  name="githubUrl"
                  defaultValue={project.githubUrl || ""}
                  placeholder="https://..."
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">
                  Live Demo
                </label>
                <input
                  name="liveUrl"
                  defaultValue={project.liveUrl || ""}
                  placeholder="https://..."
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Zona de Perigo */}
            <div className="rounded-xl border border-red-900/20 bg-surface p-6">
              <h3 className="font-semibold text-red-400 mb-4">Zona de Perigo</h3>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-md border border-red-900/50 bg-red-900/10 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="size-4" />
                Excluir Projeto
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}