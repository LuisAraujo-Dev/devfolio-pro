import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  // 1. Busca a URL real no banco de dados
  const profile = await prisma.profile.findFirst();

  if (!profile?.cvUrl) {
    return new NextResponse("Currículo não encontrado.", { status: 404 });
  }

  try {
    const fileResponse = await fetch(profile.cvUrl);

    if (!fileResponse.ok) {
      throw new Error("Falha ao buscar arquivo");
    }

    const fileBuffer = await fileResponse.arrayBuffer();

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    

    headers.set("Content-Disposition", 'inline; filename="Luis_Araujo_CV.pdf"');
    
    headers.set("Cache-Control", "public, max-age=3600, immutable");

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error("Erro ao servir CV:", error);
    return new NextResponse("Erro interno ao gerar PDF.", { status: 500 });
  }
}