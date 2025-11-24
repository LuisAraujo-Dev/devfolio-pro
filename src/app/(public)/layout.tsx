import { Rocket, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; 

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          
          {/* --- BRANDING COMPLETO (LINHA ÚNICA) --- */}
          <Link href="/" className="flex items-center gap-4 group select-none">
            
            {/* 1. Logo DevFolio + Nome */}
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                 <Rocket className="size-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">DevFolio</span>
            </div>

            {/* Separador Vertical */}
            <div className="h-5 w-px bg-white/10 hidden sm:block"></div>

            {/* 2. Assinatura + Sua Logo */}
            <div className="flex items-center gap-3 sm:flex">
               <span className="text-xs text-muted font-medium uppercase tracking-wide">
                 um projeto de <span className="text-white font-bold normal-case ml-1">Luís Araújo</span>
               </span>
               
               <div className="relative size-10 flex items-center justify-center overflow-hidden">
                  <Image src="/logo.png" alt="Luis Logo" fill className="object-cover" />

                  {/* OPÇÃO B: Placeholder (Ícone Preto num fundo branco pra destacar) */}
                  <div className="size-3 bg-black rounded-full"></div> 
               </div>
            </div>

          </Link>
          
          {/* --- Navegação --- */}
          <nav className="flex items-center gap-6 text-sm font-medium text-muted">
            <Link href="/about" className="hover:text-white transition-colors">Sobre</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projetos</Link>
            
            <Link 
              href="/cv.pdf" 
              target="_blank"
              className="hidden md:flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all text-xs uppercase font-bold tracking-wide"
            >
              <FileText className="size-3" />
              Curriculo
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
        <div className="container mx-auto px-6 flex flex-col items-center gap-2">
           <p className="text-muted text-sm">
            © {new Date().getFullYear()} <strong>DevFolio</strong>. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}