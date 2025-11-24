// src/app/(admin)/layout.tsx
import { signOut } from "@/src/auth";
import { SidebarNav } from "@/src/components/admin/SidebarNav";
import { LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Fixa */}
      <aside className="w-64 border-r border-white/10 bg-surface hidden md:flex flex-col fixed h-full left-0 top-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-lg font-bold text-white">DevFolio Admin</span>
        </div>

        {/* Componente de Navegação (Client Side) */}
        <SidebarNav />

        <div className="p-4 border-t border-white/10 mt-auto">
          {/* Server Action para Logout */}
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

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 flex flex-col md:ml-64 min-w-0 min-h-screen">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-background sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
          <h2 className="font-semibold text-white">Painel de Controle</h2>
          <div className="size-8 rounded-full bg-primary/20 border border-primary/50"></div>
        </header>

        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}