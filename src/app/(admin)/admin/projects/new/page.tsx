'use client';

import { createProject } from "@/src/app/lib/actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  // Função para transformar Título em Slug (ex: "Meu Projeto" -> "meu-projeto")
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Slugify simples
    const newSlug = newTitle
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-z0-9]+/g, "-") // Substitui espaços/símbolos por hífen
      .replace(/^-+|-+$/g, ""); // Remove hífens das pontas
      
    setSlug(newSlug);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form action={createProject} className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/projects"
              className="rounded-full p-2 hover:bg-white/5 text-muted hover:text-white transition-colors"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Novo Projeto</h1>
              <p className="text-muted text-sm">Preencha as informações básicas.</p>
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Save className="size-4" />
            Salvar Projeto
          </button>
        </div>

        {/* Campos do Formulário */}
        <div className="grid gap-6 rounded-xl border border-white/10 bg-surface p-6">
          
          {/* Linha 1: Título e Slug */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-white">
                Nome do Projeto <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="Ex: E-commerce Next.js"
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium text-white">
                Slug (URL) <span className="text-red-400">*</span>
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-muted placeholder-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Descrição Curta */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-white">
              Descrição Curta
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              placeholder="Uma breve explicação que aparecerá no card do projeto..."
              className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Links */}
          <div className="grid gap-6 md:grid-cols-2 pt-4 border-t border-white/5">
            <div className="space-y-2">
              <label htmlFor="githubUrl" className="text-sm font-medium text-muted">
                Repositório (GitHub)
              </label>
              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                placeholder="https://github.com/seu-usuario/repo"
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="liveUrl" className="text-sm font-medium text-muted">
                Projeto Online (Live URL)
              </label>
              <input
                id="liveUrl"
                name="liveUrl"
                type="url"
                placeholder="https://meu-projeto.com"
                className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}