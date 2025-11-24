// src/app/(admin)/admin/certifications/page.tsx
import { PrismaClient } from "@prisma/client";
import { Award, Plus, Trash2, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteCertification } from "@/src/app/lib/actions";

const prisma = new PrismaClient();

export default async function CertificationsPage() {
  const certs = await prisma.certification.findMany({
    orderBy: { issuedAt: "desc" },
    include: { technologies: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="size-6 text-primary" />
            Certificações
          </h1>
          <p className="text-muted">Gerencie seus diplomas e cursos.</p>
        </div>
        <Link
          href="/admin/certifications/new"
          className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" />
          Nova Certificação
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="group overflow-hidden rounded-xl border border-white/10 bg-surface flex flex-col"
          >
            {/* Preview da Imagem */}
            <div className="relative h-40 w-full bg-black/50">
              <Image
                src={cert.imageUrl}
                alt={cert.name}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent" />
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3
                    className="font-bold text-white line-clamp-1"
                    title={cert.name}
                  >
                    {cert.name}
                  </h3>
                  <p className="text-sm text-primary">{cert.institution}</p>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    className="text-muted hover:text-white"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted mb-4">
                <Calendar className="size-3" />
                {new Date(cert.issuedAt).toLocaleDateString("pt-BR")}
              </div>

              {/* Techs */}
              <div className="flex flex-wrap gap-1 mb-4">
                {cert.technologies.slice(0, 3).map((t) => (
                  <span
                    key={t.id}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-muted border border-white/5"
                  >
                    {t.name}
                  </span>
                ))}
                {cert.technologies.length > 3 && (
                  <span className="text-[10px] text-muted">
                    +{cert.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex justify-end">
                <form
                  action={async () => {
                    "use server";
                    await deleteCertification(cert.id);
                  }}
                >
                  <button className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 className="size-3" /> Excluir
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {certs.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-muted">Nenhuma certificação cadastrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}