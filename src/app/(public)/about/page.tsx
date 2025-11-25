// src/app/(public)/about/page.tsx
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { FadeIn } from "@/src/components/animations/FadeIn";

const prisma = new PrismaClient();

export default async function AboutPage() {
  const profile = await prisma.profile.findFirst();

  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  const data = {
    name: profile?.name || "Luís",
    headline: profile?.headline || "Engenheiro de Software",
    about:
      profile?.about ||
      "Olá! Configure seu texto de 'Sobre Mim' acessando o painel administrativo.",
    profileUrl: profile?.profileUrl,
  };

  return (
    <div className="min-h-screen pb-20 pt-24"> 
      <div className="container mx-auto px-6 max-w-3xl"> 
        
        <section className="mb-20 text-center">
          <FadeIn>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/30 blur-[80px] rounded-full transform scale-150 opacity-50"></div>
              
              <div className="relative size-40 md:size-52 mx-auto rounded-full p-1.5 border-2 border-white/10 bg-surface shadow-2xl">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                  {data.profileUrl ? (
                    <Image
                      src={data.profileUrl}
                      alt={data.name}
                      fill
                      className="object-cover"
                      unoptimized
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted">Sem Foto</div>
                  )}
                </div>
              </div>
            </div>

            <h1 className="mt-8 text-4xl md:text-5xl font-bold text-white tracking-tight">
              {data.name}
            </h1>
            <p className="mt-3 text-lg text-primary font-medium">
              {data.headline}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-10">
            <div className="prose prose-invert prose-lg max-w-none text-muted leading-relaxed whitespace-pre-wrap text-left md:text-justify">
              {data.about}
            </div>
          </FadeIn>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent my-16"></div>

        <section className="mb-20">
          <FadeIn delay={0.3}>
            <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary">
                 <Briefcase className="size-5" />
              </div>
              Experiência Profissional
            </h2>

            <div className="space-y-12 border-l border-white/10 ml-5 pl-10 relative">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  <span className="absolute -left-[45px] top-1.5 flex size-2.5 rounded-full bg-white/20 ring-4 ring-background group-hover:bg-primary group-hover:ring-primary/20 transition-all duration-300"></span>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                    <span className="text-xs font-mono text-muted uppercase tracking-wider bg-white/5 px-2 py-1 rounded mt-2 sm:mt-0 w-fit">
                      {new Date(exp.startDate).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })} 
                      {' — '} 
                      {exp.endDate ? new Date(exp.endDate).toLocaleDateString("pt-BR", { month: "short", year: "numeric" }) : "Atualmente"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted mb-4">
                    <span className="text-white font-medium">{exp.company}</span>
                    <span>•</span>
                    {exp.isRemote && (
                      <span className="flex items-center gap-1 text-green-400 text-xs bg-green-400/10 px-2 py-0.5 rounded-full">
                        <MapPin className="size-3" /> Remoto
                      </span>
                    )}
                  </div>

                  <p className="text-muted leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                    {exp.description}
                  </p>
                </div>
              ))}

              {experiences.length === 0 && (
                <p className="text-muted italic">Nenhuma experiência cadastrada.</p>
              )}
            </div>
          </FadeIn>
        </section>

        <section>
          <FadeIn delay={0.4}>
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary">
                 <GraduationCap className="size-5" />
              </div>
              Formação Acadêmica
            </h2>

            <div className="grid gap-4">
              <div className="group flex items-center justify-between p-5 rounded-xl border border-white/5 bg-surface hover:border-white/10 transition-colors">
                <div>
                  <h3 className="font-semibold text-white">Engenharia de Software</h3>
                  <p className="text-sm text-muted mt-1">UNICSUL - Bacharelado</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-primary font-medium mb-1">Em andamento</span>
                  <span className="text-xs text-muted">2025 - 2029</span>
                </div>
              </div>

              <div className="group flex items-center justify-between p-5 rounded-xl border border-white/5 bg-surface hover:border-white/10 transition-colors">
                <div>
                  <h3 className="font-semibold text-white">Programador Full-Stack</h3>
                  <p className="text-sm text-muted mt-1">SENAI - Qualificação</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-muted font-medium mb-1">Em andamento</span>
                  <span className="text-xs text-muted">2025 - 2026</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

      </div>
    </div>
  );
}