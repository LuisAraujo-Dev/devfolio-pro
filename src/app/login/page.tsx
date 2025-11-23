// src/app/login/page.tsx
'use client';

import { useActionState } from 'react'; // Hook novo do React 19 (ou useFormState no Next 14)
import { Rocket, Loader2 } from 'lucide-react';
import { authenticate } from '../lib/actions'; // Vamos criar isso no passo 6

export default function LoginPage() {
  // Estado do formulário [mensagem de erro, ação de dispatch, isPending]
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-white/10 bg-surface p-8 shadow-2xl">
        
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/20">
            <Rocket className="size-6 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">Acesso Admin</h2>
          <p className="text-muted">Entre com suas credenciais de mestre.</p>
        </div>

        <form action={dispatch} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="admin@devfolio.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted">
              Senha
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="mt-1 block w-full rounded-md border border-white/10 bg-background px-3 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {errorMessage && (
            <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              'Entrar no Painel'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}