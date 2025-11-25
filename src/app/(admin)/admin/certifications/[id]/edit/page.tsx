// src/app/(admin)/admin/certifications/[id]/edit/page.tsx
import { PrismaClient } from "@prisma/client";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { updateCertification, deleteCertification } from "@/src/app/lib/actions";
import { TechSelector } from "@/src/components/admin/TechSelector";

const prisma = new PrismaClient();

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cert = await prisma.certification.findUnique({
    where: { id },
    include: { technologies: true },
  });

  const allTechs = await prisma.technology.findMany({ orderBy: { name: "asc" } });

  if (!cert) {
    return notFound();
  }

  const selectedTechIds = cert.technologies.map((t) => t.id);
  const updateAction = updateCertification.bind(null, cert.id);

  const formattedDate = cert.issuedAt.toISOString().split('T')[0];

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/certifications"
            className="rounded-full p-2 hover:bg-white/5 text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Editar Certificação</h1>
            <p className="text-sm text-muted">ID: {cert.id.slice(0, 8)}...</p>
          </div>
        </div>
      </div>

      <form action={updateAction} className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Nome do Curso</label>
              <input
                name="name"
                defaultValue={cert.name}
                required
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Instituição</label>
              <input
                name="institution"
                defaultValue={cert.institution}
                required
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Data de Emissão</label>
              <input
                type="date"
                name="issuedAt"
                defaultValue={formattedDate}
                required
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none scheme:dark"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Link da Credencial (Opcional)</label>
              <input
                name="credentialUrl"
                defaultValue={cert.credentialUrl || ""}
                placeholder="https://..."
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Imagem do Certificado</label>
            <div className="flex items-center gap-4">
              <div className="relative size-20 rounded-md overflow-hidden border border-white/10">
                <Image 
                  src={cert.imageUrl} 
                  alt="Atual" 
                  fill 
                  className="object-cover" 
                  unoptimized 
                />
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer border border-white/10 rounded-md bg-background"
                />
                <p className="text-[10px] text-muted mt-1">Deixe vazio para manter a imagem atual.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Pontos Relevantes / Highlights</label>
            <textarea
              name="highlights"
              defaultValue={cert.highlights}
              required
              rows={3}
              className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white resize-none focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
          <h3 className="font-semibold text-white">Tecnologias Utilizadas</h3>
          <TechSelector availableTechs={allTechs} initialSelectedIds={selectedTechIds} />
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Save className="size-4" /> Salvar Alterações
          </button>

          <div className="pt-4 border-t border-white/5">
             <h3 className="text-sm font-medium text-red-400 mb-2">Zona de Perigo</h3>
             <button
                formAction={async () => {
                  "use server";
                  await deleteCertification(cert.id);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-md border border-red-900/50 bg-red-900/10 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="size-4" /> Excluir Certificação
              </button>
          </div>
        </div>
      </form>
    </div>
  );
}