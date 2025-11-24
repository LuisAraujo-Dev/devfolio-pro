// src/app/(public)/page.tsx
import { PrismaClient } from "@prisma/client";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProjectCard } from "@/src/components/public/ProjectCard";

const prisma = new PrismaClient();

export default async function HomePage() {
  const profile = await prisma.profile.findFirst();

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

  const data = {
    name: profile?.name || "Luís",
    headline:
      profile?.headline || "Transformando ideias em experiências digitais.",
    bio:
      profile?.bio ||
      "Engenheiro de Software focado em construir aplicações web performáticas, escaláveis e com design excepcional.",
    profileUrl: profile?.profileUrl,
    github: profile?.githubUrl,
    linkedin: profile?.linkedinUrl,
    email: profile?.email,
  };

  return (
    <div className="pb-20">
      {/* --- Hero Section --- */}
      <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden px-6 pt-20">
        {/* Background Glow Effect */}
        <div className="absolute -top-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="container mx-auto max-w-6xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Lado Esquerdo: Textos */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Disponível para novos projetos
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:leading-tight">
              {data.headline}
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted md:text-xl leading-relaxed">
              Olá, eu sou o <strong className="text-white">{data.name}</strong>.{" "}
              {data.bio}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-white hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
              >
                Ver Projetos
                <ArrowRight className="size-4" />
              </Link>

              <div className="flex items-center gap-4 px-4">
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    className="text-muted hover:text-white transition-colors"
                  >
                    <Github className="size-6" />
                  </a>
                )}
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    className="text-muted hover:text-white transition-colors"
                  >
                    <Linkedin className="size-6" />
                  </a>
                )}
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="text-muted hover:text-white transition-colors"
                  >
                    <Mail className="size-6" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Lado Direito: Foto de Perfil (NOVO) */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div className="relative size-[280px] sm:size-[350px] lg:size-[400px]">
              {/* Glow atrás da foto */}
              <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-full transform scale-90"></div>

              {/* Moldura da Foto */}
              <div className="relative w-full h-full rounded-full border-2 border-white/10 bg-surface/50 p-2 backdrop-blur-sm shadow-2xl">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-black/40">
                  {data.profileUrl ? (
                    <Image
                      src={data.profileUrl}
                      alt={data.name}
                      fill
                      className="object-cover"
                      unoptimized // Permite URLs externas
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted text-sm">
                      Sem Foto
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section
        id="projects"
        className="container mx-auto max-w-6xl px-6 py-20"
      >
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Projetos Selecionados
            </h2>
            <p className="mt-2 text-muted">Uma coleção do meu melhor trabalho.</p>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm font-medium text-primary hover:underline sm:block"
          >
            Ver todos os projetos -&gt;
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
            <p className="text-xs text-muted mt-1">
              Acesse o /admin para cadastrar.
            </p>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver todos os projetos -&gt;
          </Link>
        </div>
      </section>
    </div>
  );
}