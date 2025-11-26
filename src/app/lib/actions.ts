'use server';

import { AuthError } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadFile } from './upload';
import { signIn } from '@/src/auth';

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
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;

  try {
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
    throw new Error("Erro ao criar projeto. Verifique se o Slug já existe.");
  }

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

  const technologyIds = formData.getAll("technologies") as string[];

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
        technologies: {
          set: technologyIds.map((techId) => ({ id: techId })),
        },
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    throw new Error("Erro ao atualizar.");
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}/edit`);
  
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    throw new Error("Falha ao deletar o projeto.");
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  
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
    await prisma.technology.delete({ where: { id } });
  } catch (error) {
    console.error("Erro ao deletar tech:", error);
    throw new Error("Erro ao deletar tecnologia.");
  }
  revalidatePath("/admin/techs");
}

export async function addImage(projectId: string, formData: FormData) {
  const file = formData.get("file") as File;
  const type = formData.get("type") as string;

  if (!file) return;

  try {
    const publicUrl = await uploadFile(file);

    if (!publicUrl) {
      throw new Error("Falha ao gerar URL do arquivo");
    }

    await prisma.projectImage.create({
      data: {
        projectId,
        url: publicUrl,
        type: type || "DESKTOP",
        isCover: false,
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

export async function saveProfile(formData: FormData) {
  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const about = formData.get("about") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const linkedinUrl = formData.get("linkedinUrl") as string;
  const email = formData.get("email") as string;

  const file = formData.get("file") as File;
  let profileUrl = formData.get("profileUrl") as string;

  if (file && file.size > 0) {
    const uploadedPath = await uploadFile(file);
    if (uploadedPath) profileUrl = uploadedPath;
  }

  const cvFile = formData.get("cvFile") as File;
  let cvUrl = formData.get("cvUrl") as string;

  if (cvFile && cvFile.size > 0) {
    const uploadedCvPath = await uploadFile(cvFile);
    if (uploadedCvPath) cvUrl = uploadedCvPath;
  }

  try {
    const existingProfile = await prisma.profile.findFirst();

    if (existingProfile) {
      await prisma.profile.update({
        where: { id: existingProfile.id },
        data: { 
            name, 
            headline, 
            bio, 
            about, 
            profileUrl, 
            cvUrl,
            githubUrl, 
            linkedinUrl, 
            email 
        },
      });
    } else {
      await prisma.profile.create({
        data: { 
            name, 
            headline, 
            bio, 
            about, 
            profileUrl, 
            cvUrl, 
            githubUrl, 
            linkedinUrl, 
            email 
        },
      });
    }
  } catch (error) {
    console.error("Erro ao salvar perfil:", error);
    throw new Error("Erro ao salvar perfil.");
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/profile");
  redirect("/admin/profile");
}

export async function createExperience(formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const description = formData.get("description") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const isRemote = formData.get("isRemote") === "on";

  try {
    await prisma.experience.create({
      data: {
        company,
        role,
        description,
        startDate: new Date(startDateStr),
        endDate: endDateStr ? new Date(endDateStr) : null,
        isRemote,
      },
    });
  } catch (error) {
    console.error("Erro ao criar experiência:", error);
    throw new Error("Erro ao criar experiência.");
  }

  revalidatePath("/about");
  revalidatePath("/admin/experiences");
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({ where: { id } });
  } catch (error) {
    console.error("Erro ao deletar experiência:", error);
  }
  revalidatePath("/about");
  revalidatePath("/admin/experiences");
}

export async function createCertification(formData: FormData) {
  const name = formData.get("name") as string;
  const institution = formData.get("institution") as string;
  const issuedAtStr = formData.get("issuedAt") as string;
  const credentialUrl = formData.get("credentialUrl") as string;
  const highlights = formData.get("highlights") as string;
  
  const technologyIds = formData.getAll("technologies") as string[];
  const file = formData.get("file") as File;
  let imageUrl = "";
  
  if (file && file.size > 0) {
    const uploadedPath = await uploadFile(file);
    if (uploadedPath) imageUrl = uploadedPath;
  }

  if (!imageUrl) {
    console.error("Imagem é obrigatória");
  }

  try {
    await prisma.certification.create({
      data: {
        name,
        institution,
        issuedAt: new Date(issuedAtStr),
        credentialUrl: credentialUrl || null,
        highlights,
        imageUrl,
        technologies: {
          connect: technologyIds.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    console.error("Erro ao criar certificação:", error);
    throw new Error("Erro ao criar certificação.");
  }

  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function deleteCertification(id: string) {
  try {
    await prisma.certification.delete({ where: { id } });
  } catch (error) {
    console.error("Erro ao deletar certificação:", error);
  }
  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const institution = formData.get("institution") as string;
  const issuedAtStr = formData.get("issuedAt") as string;
  const credentialUrl = formData.get("credentialUrl") as string;
  const highlights = formData.get("highlights") as string;
  
  const technologyIds = formData.getAll("technologies") as string[];
  
  const file = formData.get("file") as File;
  let imageUrl = undefined; 
  
  if (file && file.size > 0) {
    const uploadedPath = await uploadFile(file);
    if (uploadedPath) imageUrl = uploadedPath;
  }

  try {
    await prisma.certification.update({
      where: { id },
      data: {
        name,
        institution,
        issuedAt: new Date(issuedAtStr),
        credentialUrl: credentialUrl || null,
        highlights,
        ...(imageUrl && { imageUrl }), 
        
        technologies: {
          set: technologyIds.map((techId) => ({ id: techId })),
        },
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar certificação:", error);
    throw new Error("Erro ao atualizar certificação.");
  }

  revalidatePath("/");
  revalidatePath("/admin/certifications");
  redirect("/admin/certifications");
}

export async function updateExperience(id: string, formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const description = formData.get("description") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const isRemote = formData.get("isRemote") === "on";

  try {
    await prisma.experience.update({
      where: { id },
      data: {
        company,
        role,
        description,
        startDate: new Date(startDateStr),
        endDate: endDateStr ? new Date(endDateStr) : null, 
        isRemote,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar experiência:", error);
    throw new Error("Erro ao atualizar experiência.");
  }

  revalidatePath("/about");
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function createEducation(formData: FormData) {
  const institution = formData.get("institution") as string;
  const course = formData.get("course") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;

  try {
    await prisma.education.create({
      data: {
        institution,
        course,
        startDate: new Date(startDateStr),
        endDate: endDateStr ? new Date(endDateStr) : null,
      },
    });
  } catch (error) {
    console.error("Erro ao criar formação:", error);
    throw new Error("Erro ao criar formação.");
  }

  revalidatePath("/about");
  revalidatePath("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  const institution = formData.get("institution") as string;
  const course = formData.get("course") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;

  try {
    await prisma.education.update({
      where: { id },
      data: {
        institution,
        course,
        startDate: new Date(startDateStr),
        endDate: endDateStr ? new Date(endDateStr) : null,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar formação:", error);
    throw new Error("Erro ao atualizar formação.");
  }

  revalidatePath("/about");
  revalidatePath("/admin/education");
  redirect("/admin/education");
}

export async function deleteEducation(id: string) {
  try {
    await prisma.education.delete({ where: { id } });
  } catch (error) {
    console.error("Erro ao deletar formação:", error);
  }
  revalidatePath("/about");
  revalidatePath("/admin/education");
}

