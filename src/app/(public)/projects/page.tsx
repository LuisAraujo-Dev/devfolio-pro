import { ProjectCard } from "@/src/components/public/ProjectCard";
import { PrismaClient } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function ProjectsListPage() {
  const projects = await prisma.project.findMany({
    where: { isVisible: true },
    orderBy: { updatedAt: "desc" },
    include: {
      technologies: true,
      images: true,
    },
  });

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="size-4" />
          Voltar para Home
        </Link>
        <h1 className="text-3xl font-bold text-white">Todos os Projetos</h1>
        <p className="text-muted">Explore meu portfólio completo.</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-white/10 rounded-xl">
          <p className="text-muted">Nenhum projeto encontrado.</p>
        </div>
      )}
    </div>
  );
}