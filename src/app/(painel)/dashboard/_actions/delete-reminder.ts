"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deleteReminderSchema = z.object({
  id: z
    .string({ message: "ID do lembrete é obrigatório" })
    .min(1, { message: "ID do lembrete não pode ser vazio" }),
});

type DeleteReminderData = z.infer<typeof deleteReminderSchema>;

export async function deleteReminder(data: DeleteReminderData) {
  const schema = deleteReminderSchema.safeParse(data);
  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    await prisma.reminder.delete({
      where: {
        id: data.id,
      },
    });

    revalidatePath("/dashboard");
    return {
      success: "Lembrete excluído com sucesso",
    };
  } catch (error) {
    return {
      error: "Erro ao excluir lembrete",
    };
  }
}
