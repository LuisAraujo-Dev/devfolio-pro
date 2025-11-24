// src/app/(public)/about/page.tsx
import { Briefcase, GraduationCap, Calendar, MapPin, User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-10 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* --- Cabeçalho e Bio --- */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
            <User className="size-8 text-primary" />
            Sobre Mim
          </h1>
          <div className="rounded-xl border border-white/10 bg-surface p-8">
            <p className="text-lg text-muted leading-relaxed">
              Olá! Sou o <strong className="text-white">Luís</strong>, um Engenheiro de Software apaixonado por criar soluções que impactam a vida das pessoas. 
              Atualmente, foco meus estudos e projetos no ecossistema <span className="text-primary">React, Next.js e TypeScript</span>, 
              buscando sempre a melhor performance e experiência de usuário.
            </p>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Além de código, sou entusiasta de corrida e acredito que a disciplina do esporte reflete diretamente na qualidade do meu trabalho.
            </p>
          </div>
        </section>

        {/* --- Experiência Profissional (Timeline) --- */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Briefcase className="size-6 text-primary" />
            Experiência Profissional
          </h2>

          <div className="space-y-8 border-l-2 border-white/10 ml-3 pl-8 relative">
            {/* Item 1 */}
            <div className="relative">
              <span className="absolute -left-[41px] top-1 flex size-6 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                <Briefcase className="size-3 text-white" />
              </span>
              <h3 className="text-xl font-semibold text-white">Engenheiro de Software Fullstack</h3>
              <p className="text-primary font-medium">Empresa Atual (ou Freelancer)</p>
              <div className="flex items-center gap-4 text-sm text-muted mt-1 mb-3">
                <span className="flex items-center gap-1"><Calendar className="size-3"/> 2023 - Atualmente</span>
                <span className="flex items-center gap-1"><MapPin className="size-3"/> Remoto</span>
              </div>
              <p className="text-muted">
                Desenvolvimento de aplicações web modernas utilizando Next.js 15, Tailwind e integrações com APIs RESTful.
              </p>
            </div>

            {/* Item 2 (Exemplo) */}
            <div className="relative">
              <span className="absolute -left-[41px] top-1 flex size-6 items-center justify-center rounded-full bg-surface border border-white/10 ring-4 ring-background">
                <Briefcase className="size-3 text-muted" />
              </span>
              <h3 className="text-xl font-semibold text-white">Desenvolvedor Frontend Júnior</h3>
              <p className="text-muted font-medium">Tech Solutions Ltda</p>
              <div className="flex items-center gap-4 text-sm text-muted mt-1 mb-3">
                <span className="flex items-center gap-1"><Calendar className="size-3"/> 2021 - 2023</span>
                <span className="flex items-center gap-1"><MapPin className="size-3"/> São Paulo, SP</span>
              </div>
              <p className="text-muted">
                Manutenção de sistemas legados e implementação de novas interfaces responsivas.
              </p>
            </div>
          </div>
        </section>

        {/* --- Formação Acadêmica --- */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <GraduationCap className="size-6 text-primary" />
            Formação
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-surface p-6 hover:border-primary/30 transition-colors">
              <h3 className="font-semibold text-white">Engenharia de Software</h3>
              <p className="text-sm text-muted mt-1">Universidade XYZ</p>
              <p className="text-xs text-primary mt-2">Em andamento</p>
            </div>
            
            <div className="rounded-lg border border-white/10 bg-surface p-6 hover:border-primary/30 transition-colors">
              <h3 className="font-semibold text-white">Fullstack Master</h3>
              <p className="text-sm text-muted mt-1">Curso Intensivo / Bootcamp</p>
              <p className="text-xs text-muted mt-2">Concluído em 2022</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}