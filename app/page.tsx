// src/app/page.tsx
import { Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-primary">DevFolio Pro</h1>
      <p className="text-muted text-lg">Painel Administrativo & Portfólio</p>
      
      <button className="flex items-center gap-2 rounded-lg bg-surface px-6 py-3 font-semibold hover:bg-opacity-80 transition-all">
        <Rocket className="size-5 text-primary" />
        <span>Iniciar Projeto</span>
      </button>
    </div>
  );
}