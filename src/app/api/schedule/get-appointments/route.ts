import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("userId");
  const dateParam = searchParams.get("date");

  if (!userId || userId === "null" || !dateParam || dateParam === "null") {
    return NextResponse.json(
      { error: "Nenhum agendamento encontrado" },
      { status: 400 }
    );
  }

  try {
    const [year, month, day] = dateParam.split("-").map(Number);

    if (!year || !month || !day) {
      return NextResponse.json({ error: "Data inválida" }, { status: 400 });
    }

    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

    console.log("Buscando agendamentos para o usuário:", userId);
    console.log("Data de início:", startDate);
    console.log("Data de fim:", endDate);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Nenhum agendamento encontrado" },
        { status: 404 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    });

    //Monytar cpm todos ps ( slots ) horários bloqueados
    const blockedSlots = new Set<string>();
    for (const appointment of appointments) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30);
      const startIndex = user.times.indexOf(appointment.time);

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const blockedTimes = user.times[startIndex + i];
          if (blockedTimes) {
            blockedSlots.add(blockedTimes);
          }
        }
      }
    }

    const blockedTimes = Array.from(blockedSlots);
    console.log("Horários bloqueados encontrados:", blockedTimes);

    return NextResponse.json(blockedTimes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar agendamentos" },
      { status: 500 }
    );
  }
}
