import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json(
      { error: "Acesso não autorizado" },
      { status: 401 }
    );
  }

  const clinicId = req.auth?.user?.id;

  if (!clinicId) {
    return NextResponse.json(
      { error: "ID da clínica não especificado" },
      { status: 400 }
    );
  }

  try {
    const searchParams = new URL(req.url).searchParams;
    const dateString =
      searchParams.get("date") ?? new Date().toISOString().slice(0, 10);

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return NextResponse.json({ error: "Data inválida" }, { status: 400 });
    }

    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    );
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    );

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: clinicId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true,
          },
        },
      },
      orderBy: [{ appointmentDate: "asc" }, { time: "asc" }],
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Erro ao buscar agendamentos da clínica:", error);
    return NextResponse.json(
      { error: "Erro ao buscar agendamentos da clínica" },
      { status: 500 }
    );
  }
});
