"use server";

import { prisma } from "@/lib/prisma";

export async function getAllServices({ userId }: { userId: string }) {
  if (!userId) {
    return { error: "Usuário não autenticado." };
  }

  try {
    const services = await prisma.service.findMany({
      where: { userId, status: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
      },
    });

    return {
      data: services,
    };
  } catch (error) {
    return { error: "Erro ao buscar os serviços." };
  }
}
