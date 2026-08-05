"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { extracPhoneNumber } from "@/utils/formatPhone";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string(),
  times: z.array(z.string()),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export async function updateProfile(data: UpdateProfileData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }
  const schema = updateProfileSchema.safeParse(data);
  if (!schema.success) {
    return {
      error: "Preencha todos os campos obrigatórios corretamente.",
      issues: schema.error.issues,
    };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone ? extracPhoneNumber(data.phone) : null,
        status: data.status,
        timeZone: data.timeZone,
        times: data.times,
      },
    });
    revalidatePath("/dashboard/profile");

    return {
      success: "Perfil atualizado com sucesso.",
    };
  } catch (error) {
    return { error: "Erro ao atualizar o perfil." };
  }
}
