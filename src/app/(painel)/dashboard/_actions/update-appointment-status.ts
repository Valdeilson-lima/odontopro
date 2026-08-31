"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateAppointmentStatusSchema = z.object({
  appointmentId: z
    .string()
    .min(1, { message: "O ID do agendamento é obrigatório" }),
  status: z.enum(["pending", "concluido", "cancelado"]),
});

type UpdateAppointmentStatusData = z.infer<
  typeof updateAppointmentStatusSchema
>;

export async function updateAppointmentStatus(
  data: UpdateAppointmentStatusData
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }

  const schema = updateAppointmentStatusSchema.safeParse(data);
  if (!schema.success) {
    return {
      error: "Dados inválidos.",
      issues: schema.error.issues,
    };
  }

  try {
    await prisma.appointment.update({
      where: {
        id: schema.data.appointmentId,
        userId: session.user.id,
      },
      data: {
        status: schema.data.status,
      },
    });

    revalidatePath("/dashboard");

    return { success: "Status do agendamento atualizado com sucesso." };
  } catch (error) {
    console.error("Erro ao atualizar o status do agendamento:", error);
    return { error: "Erro ao atualizar o status do agendamento." };
  }
}
