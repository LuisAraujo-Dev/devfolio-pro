// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'luisaraujo.dev@gmail.com' 
  const password = '12345678'     

  // Criptografa a senha antes de salvar
  const hashedPassword = await hash(password, 12)

  const user = await prisma.admin.upsert({
    where: { email },
    update: {}, 
    create: {
      email,
      password: hashedPassword,
    },
  })

  console.log(`Admin criado com sucesso: ${user.email}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })