import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const services = [
  {
    name: "Avaliação Odontológica",
    description:
      "Consulta inicial para avaliação da saúde bucal e elaboração do plano de tratamento.",
    duration: 30,
    price: 12000,
  },
  {
    name: "Limpeza Dental",
    description: "Remoção de placa bacteriana e tártaro.",
    duration: 45,
    price: 18000,
  },
  {
    name: "Clareamento Dental",
    description: "Tratamento estético para clareamento dos dentes.",
    duration: 90,
    price: 90000,
  },
  {
    name: "Tratamento de Canal",
    description: "Tratamento para eliminar infecções e preservar o dente.",
    duration: 90,
    price: 90000,
  },
  {
    name: "Implante Dentário",
    description: "Reposição de dentes perdidos com implantes de titânio.",
    duration: 120,
    price: 280000,
  },
];

const reminders = [
  {
    description: "Ligar para confirmar as consultas de amanhã.",
  },
  {
    description: "Enviar mensagem de retorno para os pacientes que faltaram.",
  },
  {
    description: "Verificar estoque de materiais odontológicos.",
  },
  {
    description: "Confirmar pagamentos pendentes da semana.",
  },
  {
    description: "Agendar retorno dos pacientes em tratamento de canal.",
  },
];

async function main() {
  const user = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });

  if (!user) {
    throw new Error(
      "Nenhum usuário encontrado. Crie uma conta antes de rodar o seed."
    );
  }

  let created = 0;

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { userId: user.id, name: service.name },
    });

    if (existing) continue;

    await prisma.service.create({
      data: {
        ...service,
        userId: user.id,
        status: true,
      },
    });
    created++;
  }

  console.log(
    `${created} serviço(s) criado(s) para o usuário ${user.email ?? user.id}.`
  );
  let remindersCreated = 0;

  for (const reminder of reminders) {
    const existing = await prisma.reminder.findFirst({
      where: { userId: user.id, description: reminder.description },
    });

    if (existing) continue;

    await prisma.reminder.create({
      data: {
        ...reminder,
        userId: user.id,
      },
    });
    remindersCreated++;
  }

  console.log(
    `${remindersCreated} lembrete(s) criado(s) para o usuário ${
      user.email ?? user.id
    }.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
