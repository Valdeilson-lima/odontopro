import { AppointmentStatus, Prisma } from "@/generated/prisma/browser";
import { format, parseISO } from "date-fns";

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>;

export function formatAppointmentDate(date: Date | string) {
  const dateString =
    typeof date === "string"
      ? date.slice(0, 10)
      : date.toISOString().slice(0, 10);

  return format(parseISO(dateString), "dd/MM/yyyy");
}

export const statusConfig: Record<
  AppointmentStatus,
  { label: string; badgeClassName: string; dotClassName: string }
> = {
  pending: {
    label: "Pendente",
    badgeClassName: "bg-amber-100 text-amber-700",
    dotClassName: "bg-amber-500",
  },
  concluido: {
    label: "Concluído",
    badgeClassName: "bg-emerald-100 text-emerald-700",
    dotClassName: "bg-emerald-500",
  },
  cancelado: {
    label: "Cancelado",
    badgeClassName: "bg-rose-100 text-rose-700",
    dotClassName: "bg-rose-500",
  },
};
