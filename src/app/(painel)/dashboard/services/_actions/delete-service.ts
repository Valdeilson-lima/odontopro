"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const createServiceSchema = z.object({
  serviceId: z.string().min(1, { message: "O ID do serviço é obrigatório" }),
});

type CreateServiceData = z.infer<typeof createServiceSchema>;

export async function deleteService(data: CreateServiceData) {
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
    await prisma.service.update({
      where: { id: data.serviceId, userId: session.user.id },
      data: {
        status: false,
      },
    });
    revalidatePath("/dashboard/services");

    return {
      success: "Serviço excluído com sucesso.",
    };
  } catch (error) {
    return { error: "Erro ao excluir o serviço." };
  }
}
