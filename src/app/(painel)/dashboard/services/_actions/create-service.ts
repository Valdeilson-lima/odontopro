"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createServiceSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  description: z.string().optional(),
  price: z
    .number()
    .min(1, { message: "O preço deve ser maior ou igual a zero" }),
  duration: z.number(),
});

type CreateServiceData = z.infer<typeof createServiceSchema>;

export async function createNewService(data: CreateServiceData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }
  const schema = createServiceSchema.safeParse(data);
  if (!schema.success) {
    return {
      error: "Preencha todos os campos obrigatórios corretamente.",
      issues: schema.error.issues,
    };
  }

  try {
    const newService = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
        userId: session.user.id,
      },
    });

    return {
      data: newService,
      success: "Serviço criado com sucesso.",
    };
  } catch (error) {
    return { error: "Erro ao criar o serviço." };
  }
}
