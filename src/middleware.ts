import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Regex para proteger apenas as rotas necessárias, ignorando estáticos e api
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};