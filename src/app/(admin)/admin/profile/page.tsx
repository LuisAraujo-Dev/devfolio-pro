import { ProfileForm } from "@/src/components/admin/ProfileForm";
import { PrismaClient } from "@prisma/client";
import { User } from "lucide-react";

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

      <ProfileForm initialData={profile} />
    </div>
  );
}