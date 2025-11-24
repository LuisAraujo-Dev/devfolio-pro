// src/components/public/ProjectCard.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: {
    title: string;
    slug: string;
    description: string;
    technologies: { name: string }[];
    images: { url: string; isCover: boolean }[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const coverImage = project.images.find((img) => img.isCover) || project.images[0];

  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Imagem de Capa */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/50">
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            Sem imagem
          </div>
        )}
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent opacity-60" />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {project.title}
            </h3>
            <ArrowRight className="size-5 -translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-primary" />
        </div>
        
        <p className="mt-2 line-clamp-2 text-sm text-muted flex-1">
          {project.description}
        </p>

        {/* Tecnologias (Tags) */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech.name} 
              className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-medium text-muted border border-white/5"
            >
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] text-muted py-1">+{project.technologies.length - 3}</span>
          )}
        </div>
      </div>
    </Link>
  );
}