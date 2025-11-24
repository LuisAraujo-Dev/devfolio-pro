import { put } from '@vercel/blob';

export async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;

  try {
    const blob = await put(filename, file, {
      access: 'public',
    });

    return blob.url;
  } catch (error) {
    console.error('Erro ao fazer upload para Vercel Blob:', error);
    throw new Error('Falha no upload da imagem.');
  }
}