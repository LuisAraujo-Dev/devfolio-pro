// src/app/(admin)/layout.tsx
import Link from "next/link";
import { LayoutDashboard, FolderKanban, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Fixa */}
      <aside className="w-64 border-r border-white/10 bg-surface hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="text-lg font-bold text-white">Admin Panel</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2 p-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-white/5 rounded-md">
            <LayoutDashboard className="size-5 text-primary" />
            Dashboard
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <FolderKanban className="size-5" />
            Projetos
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted hover:text-white hover:bg-white/5 rounded-md transition-colors">
            <Settings className="size-5" />
            Configurações
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-md transition-colors">
            <LogOut className="size-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-background">
           <h2 className="font-semibold text-white">Visão Geral</h2>
           {/* Aqui entrará o UserMenu futuramente */}
           <div className="size-8 rounded-full bg-primary/20"></div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}