import { saveProfile } from "@/src/app/lib/actions";
import { PrismaClient } from "@prisma/client";
import { Save, User, Image as ImageIcon } from "lucide-react";

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="size-8 text-primary" />
          Meu Perfil
        </h1>
        <p className="text-muted">
          Gerencie as informações que aparecem na Home e na página Sobre.
        </p>
      </div>

      <form action={saveProfile} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* --- Coluna Esquerda: Textos --- */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Informações Básicas</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Seu Nome</label>
                <input
                  name="name"
                  defaultValue={profile?.name || ""}
                  placeholder="Ex: Luís Silva"
                  required
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">
                  Headline (Título da Home)
                </label>
                <input
                  name="headline"
                  defaultValue={profile?.headline || ""}
                  placeholder="Ex: Transformando ideias em código..."
                  required
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">
                  Bio Curta (Texto da Home)
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  defaultValue={profile?.bio || ""}
                  placeholder="Resumo rápido sobre você..."
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white resize-none focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">
                Sobre Mim (Página Sobre)
              </h3>
              <p className="text-xs text-muted">
                Este texto aparecerá na página /about.
              </p>
              <textarea
                name="about"
                rows={10}
                defaultValue={profile?.about || ""}
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white font-mono text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* --- Coluna Direita: Foto e Links --- */}
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Foto de Perfil</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">
                  URL da Imagem
                </label>
                <input
                  name="profileUrl"
                  defaultValue={profile?.profileUrl || ""}
                  placeholder="https://github.com/seu-user.png"
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                />
              </div>

              {/* Preview Simples */}
              <div className="mt-4 flex justify-center">
                <div className="size-32 rounded-full border-2 border-white/10 bg-black overflow-hidden flex items-center justify-center relative">
                  {profile?.profileUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.profileUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-8 text-muted" />
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
              <h3 className="font-semibold text-white">Redes Sociais</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">
                  GitHub URL
                </label>
                <input
                  name="githubUrl"
                  defaultValue={profile?.githubUrl || ""}
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">
                  LinkedIn URL
                </label>
                <input
                  name="linkedinUrl"
                  defaultValue={profile?.linkedinUrl || ""}
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">
                  Email Contato
                </label>
                <input
                  name="email"
                  defaultValue={profile?.email || ""}
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Save className="size-4" />
              Salvar Perfil
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}