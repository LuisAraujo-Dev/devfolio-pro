// src/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

async function getUser(email: string) {
  try {
    return await prisma.admin.findUnique({ where: { email } });
  } catch (error) {
    console.error('Falha ao buscar usuário no banco:', error);
    throw new Error('Falha ao buscar usuário.');
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Correção do erro de Type: validamos se existe email e senha
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          console.log('Credenciais faltando');
          return null;
        }

        console.log('Tentando logar user:', email); // Log para debug

        const user = await getUser(email);
        if (!user) {
          console.log('Usuário não encontrado no banco.');
          return null;
        }

        const passwordsMatch = await compare(password, user.password);
        if (passwordsMatch) {
          console.log('Login aprovado!');
          return user;
        }

        console.log('Senha inválida.');
        return null;
      },
    }),
  ],
});