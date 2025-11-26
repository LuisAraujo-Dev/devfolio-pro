import { PrismaClient } from "@prisma/client";
import { ArrowRight, Github, Linkedin, Mail, Award, GraduationCap } from "lucide-react"; // Importe GraduationCap
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/src/components/animations/FadeIn";
import { ProjectCard } from "@/src/components/public/ProjectCard";
import { CertificationCard } from "@/src/components/public/CertificationCard";

const prisma = new PrismaClient();

export default async function HomePage() {
  // 1. Buscar Perfil
  const profile = await prisma.profile.findFirst();

  // 2. Buscar Projetos
  const projects = await prisma.project.findMany({
    where: { isVisible: true },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    include: { technologies: true, images: true },
    take: 6,
  });

  // 3. Buscar Certificações
  const certifications = await prisma.certification.findMany({
    orderBy: { issuedAt: "desc" },
    include: { technologies: true },
  });

  // 4. Buscar Formação (NOVO)
  const educations = await prisma.education.findMany({
    orderBy: { startDate: "desc" },
  });

  const data = {
    name: profile?.name || "Luís",
    headline: profile?.headline || "Transformando ideias em experiências digitais.",
    bio: profile?.bio || "Engenheiro de Software...",
    profileUrl: profile?.profileUrl,
    github: profile?.githubUrl,
    linkedin: profile?.linkedinUrl,
    email: profile?.email,
  };

  return (
    <div className="pb-20">
      
      {/* --- Hero Section --- */}
      <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden px-6 pt-20">
        <div className="absolute -top-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="container mx-auto max-w-6xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Disponível para novos projetos
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-white via-white to-primary/60 bg-clip-text text-transparent sm:text-6xl md:leading-tight pb-2">
                {data.headline}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-6 max-w-xl text-lg text-muted md:text-xl leading-relaxed">
                Olá, eu sou o <strong className="text-white">{data.name}</strong>. {data.bio}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#projects"
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-white hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                >
                  Ver Projetos
                  <ArrowRight className="size-4" />
                </Link>

                <div className="flex items-center gap-4 px-4">
                  {data.github && <a href={data.github} target="_blank" className="text-muted hover:text-white transition-colors"><Github className="size-6" /></a>}
                  {data.linkedin && <a href={data.linkedin} target="_blank" className="text-muted hover:text-white transition-colors"><Linkedin className="size-6" /></a>}
                  {data.email && <a href={`mailto:${data.email}`} className="text-muted hover:text-white transition-colors"><Mail className="size-6" /></a>}
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <FadeIn delay={0.2} direction="left">
              <div className="relative size-[280px] sm:size-[350px] lg:size-[400px]">
                <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-full transform scale-90"></div>
                <div className="relative w-full h-full rounded-full border-2 border-white/10 bg-surface/50 p-2 backdrop-blur-sm shadow-2xl">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-black/40">
                    {data.profileUrl ? (
                      <Image src={data.profileUrl} alt={data.name} fill className="object-cover" unoptimized priority />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted text-sm">Sem Foto</div>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects" className="container mx-auto max-w-6xl px-6 py-20">
        <FadeIn>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Projetos Selecionados</h2>
              <p className="mt-2 text-muted">Uma coleção do meu melhor trabalho.</p>
            </div>
            <Link href="/projects" className="hidden text-sm font-medium text-primary hover:underline sm:block">
              Ver todos os projetos -&gt;
            </Link>
          </div>
        </FadeIn>

        {projects.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-xl bg-surface/30">
            <p className="text-muted">Nenhum projeto publicado ainda.</p>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/projects" className="text-sm font-medium text-primary hover:underline">Ver todos os projetos -&gt;</Link>
        </div>
      </section>

      {/* --- Certifications Section --- */}
      <section id="certifications" className="container mx-auto max-w-6xl px-6 py-20 border-t border-white/10">
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Award className="size-8 text-primary" />
              Cursos & Certificações
            </h2>
            <p className="mt-2 text-muted">Aprimoramento constante e especializações.</p>
          </div>
        </FadeIn>

        {certifications.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <FadeIn key={cert.id} delay={index * 0.1}>
                <CertificationCard certification={cert} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-xl bg-surface/30">
            <p className="text-muted">Nenhuma certificação cadastrada ainda.</p>
          </div>
        )}
      </section>

      {/* --- NOVO: Education Section --- */}
      <section id="education" className="container mx-auto max-w-6xl px-6 py-20 border-t border-white/10">
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <GraduationCap className="size-8 text-primary" />
              Formação Acadêmica
            </h2>
            <p className="mt-2 text-muted">Minha base teórica e qualificações.</p>
          </div>
        </FadeIn>

        {educations.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {educations.map((edu, index) => (
              <FadeIn key={edu.id} delay={index * 0.1}>
                <div className="group flex items-center justify-between p-6 rounded-xl border border-white/5 bg-surface hover:border-primary/30 hover:shadow-lg transition-all">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{edu.course}</h3>
                    <p className="text-sm text-muted mt-1 font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <span className={`block text-xs font-bold mb-1 ${!edu.endDate ? 'text-green-400' : 'text-muted'}`}>
                      {!edu.endDate ? 'EM ANDAMENTO' : 'CONCLUÍDO'}
                    </span>
                    <span className="text-xs text-muted font-mono">
                      {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Atual'}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-xl bg-surface/30">
            <p className="text-muted">Nenhuma formação cadastrada ainda.</p>
          </div>
        )}
      </section>

    </div>
  );
}