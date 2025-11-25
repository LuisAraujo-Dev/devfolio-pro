import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TechBadge } from "./TechBadge";

interface ProjectCardProps {
  project: {
    title: string;
    slug: string;
    description: string;
    technologies: { name: string; iconKey: string }[];
    images: { url: string; isCover: boolean }[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const coverImage = project.images.find((img) => img.isCover) || project.images[0];

  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-black/50">
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">Sem imagem</div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent opacity-60" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-1" title={project.title}>
              {project.title}
            </h3>
            <ArrowRight className="size-5 -translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-primary" />
        </div>
        
        <p className="text-sm text-muted line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {project.technologies.slice(0, 5).map((tech) => (
            <TechBadge key={tech.name} name={tech.name} iconKey={tech.iconKey} />
          ))}
          {project.technologies.length > 5 && (
            <span className="text-[10px] text-muted py-1">+{project.technologies.length - 5}</span>
          )}
        </div>
      </div>
    </Link>
  );
}