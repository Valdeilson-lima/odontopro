"use server";

import { prisma } from "@/lib/prisma";

export async function getInfoSchedule(userId: string) {
  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
      services: {
        where: {
          status: true,
        },
      },
    },
  });
}
