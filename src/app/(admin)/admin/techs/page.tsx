// src/app/(admin)/admin/techs

import { createTechnology, deleteTechnology } from "@/src/app/lib/actions";
import { PrismaClient } from "@prisma/client";
import { Trash2, Cpu, Save } from "lucide-react";

const prisma = new PrismaClient();

export default async function TechsPage() {
  const techs = await prisma.technology.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { projects: true },
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Tecnologias</h1>
        <p className="text-muted">Cadastre as linguagens e frameworks que você domina.</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-surface p-6">
        <h3 className="mb-4 font-semibold text-white">Adicionar Nova Tech</h3>
        <form action={createTechnology} className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-muted">Nome</label>
            <input
              name="name"
              required
              placeholder="Ex: Next.js"
              className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-muted">
              Nome do Ícone (Lucide ou SimpleIcons)
            </label>
            <input
              name="iconKey"
              required
              placeholder="Ex: Cpu, Code, Database..."
              className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primary/90 transition-colors mb-[1px]"
          >
            <Save className="size-4" />
            Adicionar
          </button>
        </form>
        <p className="mt-2 text-xs text-muted">
          * Dica: Use nomes de ícones da biblioteca Lucide React.
        </p>
      </div>

      {/* --- Listagem --- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {techs.map((tech) => (
          <div
            key={tech.id}
            className="group flex items-center justify-between rounded-lg border border-white/10 bg-surface p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-white/5 text-primary">
                {/* Por enquanto um ícone genérico, depois faremos dinâmico */}
                <Cpu className="size-5" /> 
              </div>
              <div>
                <h4 className="font-medium text-white">{tech.name}</h4>
                <p className="text-xs text-muted">{tech._count.projects} projetos</p>
              </div>
            </div>

            {/* Ação de Deletar (Server Action inline) */}
            <form
              action={async () => {
                "use server";
                await deleteTechnology(tech.id);
              }}
            >
              <button
                type="submit"
                className="rounded-md p-2 text-muted hover:bg-red-500/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                title="Excluir"
              >
                <Trash2 className="size-4" />
              </button>
            </form>
          </div>
        ))}
      </div>
      
      {techs.length === 0 && (
        <p className="text-center text-muted py-10">Nenhuma tecnologia cadastrada.</p>
      )}
    </div>
  );
}