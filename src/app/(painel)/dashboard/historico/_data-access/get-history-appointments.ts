"use server";

import { prisma } from "@/lib/prisma";

export async function getHistoryAppointments({ userId }: { userId: string }) {
  if (!userId) {
    return { error: "Usuário não autenticado." };
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
        status: { in: ["concluido", "cancelado"] },
      },
      include: {
        service: true,
      },
      orderBy: [{ appointmentDate: "desc" }, { time: "desc" }],
    });

    return { data: appointments };
  } catch (error) {
    console.error("Erro ao buscar histórico de agendamentos:", error);
    return { error: "Erro ao buscar o histórico de agendamentos." };
  }
}
