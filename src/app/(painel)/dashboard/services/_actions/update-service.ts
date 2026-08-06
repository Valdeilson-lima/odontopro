"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const createServiceSchema = z.object({
  serviceId: z.string().min(1, { message: "O ID do serviço é obrigatório" }),
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

export async function updateService(
  data: CreateServiceData & { serviceId: string }
) {
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
    const updatedService = await prisma.service.update({
      where: { id: data.serviceId, userId: session.user.id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
      },
    });

    revalidatePath("/dashboard/services");

    return {
      data: updatedService,
      success: "Serviço atualizado com sucesso.",
    };
  } catch (error) {
    return { error: "Erro ao atualizar o serviço." };
  }
}
