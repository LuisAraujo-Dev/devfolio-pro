// src/components/admin/SidebarNav.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, User, Cpu } from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(path);
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Projetos",
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      name: "Tecnologias",
      href: "/admin/techs",
      icon: Cpu,
    },
    {
      name: "Meu Perfil",
      href: "/admin/profile",
      icon: User,
    },
  ];

  return (
    <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
      {menuItems.map((item) => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors
              ${
                active
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted hover:text-white hover:bg-white/5 border border-transparent" 
              }
            `}
          >
            <Icon className={`size-5 ${active ? "text-primary" : ""}`} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}