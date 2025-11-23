// src/auth.config.ts

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Define nossa página customizada de login
  },
  providers: [], // Provedores vazios aqui para evitar erro no Edge
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redireciona para /login se não estiver logado
      }
      
      // Se estiver logado e na página de login, manda pro dashboard
      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/admin', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;