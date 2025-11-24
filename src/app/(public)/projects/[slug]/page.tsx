// src/app/(public)/projects/[slug]/page.tsx
import { LaptopMockup } from "@/src/components/mockups/LaptopMockup";
import { PhoneMockup } from "@/src/components/mockups/PhoneMockup";
import { PrismaClient } from "@prisma/client";

import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      technologies: true,
      images: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!project || !project.isVisible) {
    return notFound();
  }

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* --- Header de Navegação --- */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar para Home
          </Link>
        </div>

        {/* --- Título e Techs --- */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white md:text-5xl">
              {project.title}
            </h1>
            <p className="text-xl text-muted max-w-2xl">
              {project.description}
            </p>
            
            {/* Lista de Tecnologias */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.id}
                  className="rounded-full border border-white/10 bg-surface px-3 py-1 text-sm text-muted"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Links de Ação */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Ver Projeto Online
                <ExternalLink className="size-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-6 py-3 font-medium text-white hover:bg-white/5 transition-colors"
              >
                <Github className="size-4" />
                Código Fonte
              </a>
            )}
          </div>
        </div>

        {/* --- Galeria Dinâmica (Mockups) --- */}
        <section className="space-y-24">
          {/* CORREÇÃO: Removido o argumento 'index' que não estava sendo usado */}
          {project.images.map((img) => (
            <div key={img.id} className="relative">
              {/* Efeito de fundo sutil para destacar o mockup */}
              <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-700 hover:opacity-100" />
              
              {img.type === "MOBILE" ? (
                <div className="py-10">
                  <PhoneMockup src={img.url} alt={`Tela mobile do projeto ${project.title}`} />
                </div>
              ) : (
                <LaptopMockup src={img.url} alt={`Tela desktop do projeto ${project.title}`} />
              )}
            </div>
          ))}

          {project.images.length === 0 && (
             <div className="py-20 text-center border border-dashed border-white/10 rounded-xl">
               <p className="text-muted">Sem imagens cadastradas para este projeto.</p>
             </div>
          )}
        </section>

        {/* --- Sobre o Projeto (Conteúdo Rico) --- */}
        {project.content && (
          <section className="mt-24 border-t border-white/10 pt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Sobre o Desenvolvimento</h2>
            <div className="prose prose-invert prose-lg max-w-none text-muted leading-relaxed whitespace-pre-wrap">
              {project.content}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}