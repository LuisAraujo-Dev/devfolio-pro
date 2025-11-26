import { Rocket, FileText } from "lucide-react";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          
          {/* --- BRANDING (LADO ESQUERDO) --- */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            
            {/* 1. Logo DevFolio + Nome */}
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                 <Rocket className="size-5" />
              </div>
              {/* No mobile, fonte um pouco menor (text-lg), no desktop normal (text-xl) */}
              <span className="text-lg md:text-xl font-bold text-white tracking-tight">DevFolio</span>
            </div>

            {/* 2. Separador e Assinatura (SOMENTE DESKTOP - hidden no mobile, flex no md) */}
            <div className="hidden md:flex items-center gap-3">
               <div className="h-5 w-px bg-white/10 ml-2"></div>
               
               <span className="text-xs text-muted font-medium uppercase tracking-wide">
                 um projeto de <span className="text-white font-bold normal-case ml-1">Luís Araújo</span>
               </span>
               
               {/* Avatar Pequeno (Desktop) */}
               <div className="relative size-6 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-white/10">
                  {/* <Image src="/logo.png" alt="Logo" fill className="object-cover" /> */}
                  <div className="size-3 bg-black rounded-full"></div> 
               </div>
            </div>

          </Link>
          
          {/* --- NAVEGAÇÃO (LADO DIREITO) --- */}
          <nav className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-medium text-muted">
            <Link href="/about" className="hover:text-white transition-colors py-2">Sobre</Link>
            <Link href="/projects" className="hover:text-white transition-colors py-2">Projetos</Link>
            
            {/* Botão Currículo: No mobile mostra só ícone, no desktop mostra texto completo */}
            <Link 
              href="/cv.pdf" 
              target="_blank"
              className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 md:px-4 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <FileText className="size-3.5 md:size-3" />
              <span className="hidden sm:inline uppercase font-bold tracking-wide text-[10px] md:text-xs">CV</span>
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