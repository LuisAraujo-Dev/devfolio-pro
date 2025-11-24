import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      
      <div className="relative mb-6 flex size-24 items-center justify-center rounded-full bg-surface border border-white/10">
         <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
         <AlertCircle className="size-10 text-red-500 relative z-10" />
      </div>

      <h1 className="text-4xl font-extrabold text-white mb-2">Página não encontrada</h1>
      <p className="text-lg text-muted max-w-md mb-8">
        Ops! Parece que você tentou acessar uma dimensão desconhecida. O link pode estar quebrado ou a página foi removida.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-black hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Voltar para a base
      </Link>
    </div>
  );
}