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

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string; 
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  
  const isVisible = formData.get("isVisible") === "on";
  const featured = formData.get("featured") === "on";

  try {
    await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        content,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        isVisible,
        featured,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    throw new Error("Erro ao atualizar. Verifique os dados.");
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}/edit`);
  redirect("/admin/projects");
}

export async function createTechnology(formData: FormData) {
  const name = formData.get("name") as string;
  const iconKey = formData.get("iconKey") as string; 

  try {
    await prisma.technology.create({
      data: {
        name,
        iconKey: iconKey || "Code", 
      },
    });
  } catch (error) {
    console.error("Erro ao criar tech:", error);
    throw new Error("Erro ao criar tecnologia.");
  }

  revalidatePath("/admin/techs");
}

export async function deleteTechnology(id: string) {
  try {
    await prisma.technology.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Erro ao deletar tech:", error);
    throw new Error("Erro ao deletar tecnologia.");
  }
  revalidatePath("/admin/techs");
}

export async function addImage(projectId: string, formData: FormData) {
  const url = formData.get("url") as string;
  const type = formData.get("type") as string; // "DESKTOP" | "MOBILE"

  if (!url) return;

  try {
    await prisma.projectImage.create({
      data: {
        projectId,
        url,
        type: type || "DESKTOP",
        isCover: false, // Padrão false
      },
    });
  } catch (error) {
    console.error("Erro ao adicionar imagem:", error);
    throw new Error("Erro ao adicionar imagem.");
  }
  
  revalidatePath(`/admin/projects/${projectId}/edit`);
}

export async function deleteImage(imageId: string, projectId: string) {
  try {
    await prisma.projectImage.delete({ where: { id: imageId } });
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
  }
  revalidatePath(`/admin/projects/${projectId}/edit`);
}

export async function setCoverImage(imageId: string, projectId: string) {
  try {
    await prisma.$transaction([
      prisma.projectImage.updateMany({
        where: { projectId },
        data: { isCover: false },
      }),
      prisma.projectImage.update({
        where: { id: imageId },
        data: { isCover: true },
      }),
    ]);
  } catch (error) {
    console.error("Erro ao definir capa:", error);
  }
  revalidatePath(`/admin/projects/${projectId}/edit`);
}