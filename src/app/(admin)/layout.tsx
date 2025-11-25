import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { LogOut } from "lucide-react";
import { SidebarNav } from "@/src/components/admin/SidebarNav";
import { signOut } from "@/src/auth";

const prisma = new PrismaClient();

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await prisma.profile.findFirst();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-white/10 bg-surface hidden md:flex flex-col fixed h-full left-0 top-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/10 gap-3">
          <div className="size-6 rounded bg-white flex items-center justify-center overflow-hidden relative">
             <div className="size-3 bg-black rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted font-medium">Painel Admin</span>
            <span className="text-sm font-bold text-white">DevFolio</span>
          </div>
        </div>

        <SidebarNav />

        <div className="p-4 border-t border-white/10 mt-auto">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-md transition-colors cursor-pointer"
            >
              <LogOut className="size-5" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 flex flex-col md:ml-64 min-w-0 min-h-screen">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-background sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
          <h2 className="font-semibold text-white">Painel de Controle</h2>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted hidden sm:block">Olá, {profile?.name || "Admin"}</span>
            <div className="relative size-9 rounded-full border border-white/10 bg-surface overflow-hidden">
              {profile?.profileUrl ? (
                <Image 
                  src={profile.profileUrl} 
                  alt="Avatar" 
                  fill 
                  className="object-cover" 
                  unoptimized 
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold">
                  {profile?.name?.[0] || "A"}
                </div>
              )}
            </div>
          </div>

        </header>

        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}