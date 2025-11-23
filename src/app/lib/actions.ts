'use server';

import { AuthError } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/src/auth';

// Instância do Prisma (Idealmente mover para um singleton src/lib/prisma.ts no futuro)
const prisma = new PrismaClient();

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciais inválidas. Verifique e-mail e senha.';
        default:
          return 'Algo deu errado. Tente novamente.';
      }
    }
    throw error;
  }
}

export async function createProject(formData: FormData) {
  // Extraindo dados do formulário
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;

  try {
    // Criação no Banco de Dados
    await prisma.project.create({
      data: {
        title,
        slug,
        description,
        content: "", 
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        isVisible: false, 
        featured: false,
      },
    });
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    // Em um cenário real, poderíamos retornar o erro para o form exibir
    throw new Error("Erro ao criar projeto. Verifique se o Slug já existe.");
  }

  // Limpa o cache da página de lista e redireciona
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}