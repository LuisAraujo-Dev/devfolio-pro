import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Cria um nome único para não sobrescrever: timestamp-nome-limpo
  const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
  
  // Define o caminho: public/uploads
  const uploadDir = join(process.cwd(), 'public/uploads');
  const path = join(uploadDir, filename);

  try {
    // Garante que a pasta existe
    await mkdir(uploadDir, { recursive: true });
    
    // Escreve o arquivo
    await writeFile(path, buffer);
    
    // Retorna a URL pública (começa com /)
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Erro ao salvar arquivo:', error);
    throw new Error('Falha no upload do arquivo');
  }
}