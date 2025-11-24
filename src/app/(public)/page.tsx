// src/app/page.tsx
import { ProjectCard } from "@/src/components/public/ProjectCard";
import { PrismaClient } from "@prisma/client";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    where: { isVisible: true },
    orderBy: [
      { featured: "desc" },
      { updatedAt: "desc" }, 
    ],
    include: {
      technologies: true,
      images: true,
    },
  });

  return (
    <div className="pb-20">
      {/* --- Hero Section --- */}
      <section className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden px-6 pt-20">
        {/* Background Glow Effect */}
        <div className="absolute -top-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Disponível para novos projetos
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:leading-tight">
            Transformando ideias em <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
              experiências digitais.
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
            Olá, eu sou o Luís. Engenheiro de Software focado em construir aplicações web performáticas, escaláveis e com design excepcional.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-white hover:bg-primary/90 transition-all hover:scale-105"
            >
              Ver Projetos
              <ArrowRight className="size-4" />
            </Link>
            
            <div className="flex items-center gap-4 px-4">
              <a href="#" className="text-muted hover:text-white transition-colors"><Github className="size-6"/></a>
              <a href="#" className="text-muted hover:text-white transition-colors"><Linkedin className="size-6"/></a>
              <a href="#" className="text-muted hover:text-white transition-colors"><Mail className="size-6"/></a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects" className="container mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Projetos Selecionados</h2>
            <p className="mt-2 text-muted">Uma coleção do meu melhor trabalho.</p>
          </div>
          <Link href="/projects" className="hidden text-sm font-medium text-primary hover:underline sm:block">
            Ver todos os projetos -{'>'}
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-xl bg-surface/30">
            <p className="text-muted">Nenhum projeto publicado ainda.</p>
            <p className="text-xs text-muted mt-1">Acesse o /admin para cadastrar.</p>
          </div>
        )}
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/projects" className="text-sm font-medium text-primary hover:underline">
             Ver todos os projetos -{'>'}
          </Link>
        </div>
      </section>
    </div>
  );
}