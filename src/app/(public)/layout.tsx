// src/app/(public)/layout.tsx
import { Rocket } from "lucide-react";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      {/* Header Simples */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Rocket className="size-6" />
            <span>DevFolio</span>
          </Link>
          
          <nav className="flex items-center gap-6 text-sm font-medium text-muted">
            <Link href="/about" className="hover:text-primary transition-colors">Sobre</Link>
            <Link href="/projects" className="hover:text-primary transition-colors">Projetos</Link>
            <Link 
              href="/cv.pdf" 
              target="_blank"
              className="rounded-md bg-primary/10 px-4 py-2 text-primary hover:bg-primary/20 transition-colors"
            >
              Currículo
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo da Página */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-surface py-8 text-center">
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} DevFolio Pro. Construído com Next.js 15 & Tailwind v4.
        </p>
      </footer>
    </div>
  );
}