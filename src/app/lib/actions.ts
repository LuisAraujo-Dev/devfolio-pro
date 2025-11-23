'use server';

import { signIn } from '@/src/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // O redirect acontece automaticamente aqui dentro se der sucesso
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    // Se o erro for de Auth, tratamos a mensagem
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