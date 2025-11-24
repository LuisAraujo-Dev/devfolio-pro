import { Certification, Technology } from "@prisma/client";
import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";
import { TechBadge } from "./TechBadge";

interface CertificationCardProps {
  certification: Certification & { technologies: Technology[] };
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-surface transition-all hover:border-primary/50 hover:shadow-lg">
      
      {/* Imagem */}
      <div className="relative h-48 w-full overflow-hidden bg-black/40">
        <Image
          src={certification.imageUrl}
          alt={certification.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent opacity-90" />
        
        {/* Data no topo */}
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/10">
          <Calendar className="size-3 text-primary" />
          {new Date(certification.issuedAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-6 -mt-12 relative z-10">
        <div className="mb-4">
           <h3 className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors">
             {certification.name}
           </h3>
           <p className="text-sm text-primary font-medium mt-1">{certification.institution}</p>
        </div>

        <p className="text-sm text-muted mb-6 flex-1">
          {certification.highlights}
        </p>

        {/* Techs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {certification.technologies.slice(0, 4).map((tech) => (
             <TechBadge key={tech.id} name={tech.name} size="sm" iconKey={tech.iconKey} />
          ))}
        </div>

        {/* Link Credencial */}
        {certification.credentialUrl && (
          <a 
            href={certification.credentialUrl}
            target="_blank"
            className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            Ver Credencial <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </div>
  );
}