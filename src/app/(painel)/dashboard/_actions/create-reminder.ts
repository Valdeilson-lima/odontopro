"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createReminderSchema = z.object({
  description: z
    .string({ message: "Descrição do lembrete é obrigatória" })
    .min(1, { message: "Descrição do lembrete não pode ser vazio" }),
});

type CreateReminderData = z.infer<typeof createReminderSchema>;

export async function createReminder(data: CreateReminderData) {
  const schema = createReminderSchema.safeParse(data);
  const session = await auth();

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    await prisma.reminder.create({
      data: {
        description: data.description,
        userId: session?.user.id || "",
      },
    });
    revalidatePath("/dashboard");
    return {
      success: "Lembrete criado com sucesso",
    };
  } catch (error) {
    return {
      error: "Erro ao criar lembrete",
    };
  }
}
