"use server";
import prisma from "@/lib/prisma";

interface GetUserDataProps {
  userId: string;
}

export async function getInfoUser({ userId }: GetUserDataProps) {
  try {
    if (!userId) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        times: true,
        subscription: true,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error;
  }
}
