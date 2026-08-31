"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarDays, Clock3, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AppointmentCard } from "./appointment-card";
import type { AppointmentWithService } from "./appointment-types";

interface ApointmentsListProps {
  times: string[];
}

export function ApointmentsList({ times }: ApointmentsListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["get-appointments", date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), "yyyy-MM-dd");
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/appointments?date=${activeDate}`;
      const response = await fetch(url);
      const result = (await response.json()) as {
        appointments: AppointmentWithService[];
      };

      if (!response.ok) {
        return [];
      }

      return result.appointments;
    },
    // Dados considerados "frescos" por 5 minutos antes de um novo fetch
    staleTime: 1 * 60 * 1000,
    // Rebusca ao focar a janela (novo agendamento vindo da página pública)
    refetchOnWindowFocus: true,
    // Rebusca automática a cada 5 minutos para manter a agenda atualizada
    refetchInterval: 1 * 60 * 1000,
    refetchIntervalInBackground: false,
  });

  const selectedDate = date ? new Date(date) : new Date();
  const formattedDate = isNaN(selectedDate.getTime())
    ? "Selecionar data"
    : selectedDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  const occupantMap: Record<string, AppointmentWithService> = {};

  if (data && data.length > 0) {
    for (const appointment of data) {
      // Apenas agendamentos pendentes ocupam os slots da agenda.
      // Concluídos e cancelados liberam o horário.
      if (appointment.status !== "pending") {
        continue;
      }

      const requiredSlot = Math.ceil(appointment.service.duration / 30);

      const startindex = times.indexOf(appointment.time);
      if (startindex !== -1) {
        for (let i = 0; i < requiredSlot; i++) {
          const slotIndex = startindex + i;
          if (slotIndex < times.length) {
            const slotTime = times[slotIndex];
            occupantMap[slotTime] = appointment;
          }
        }
      }
    }
  }

  // Agendamentos únicos (um card por agendamento, não por slot)
  const appointments = Object.values(occupantMap).filter(
    (appointment, index, self) =>
      self.findIndex((item) => item.id === appointment.id) === index
  );

  // Horários que não possuem agendamento
  const availableTimes = times.filter((time) => !occupantMap[time]);

  return (
    <Card className="border border-gray-300 shadow-sm">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <CalendarDays className="h-5 w-5 text-emerald-500" />
            Agendamentos
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Acompanhe os horários e atendimentos da sua clínica.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 md:w-auto"
        >
          {formattedDate}
        </Button>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-3 flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-700">
              Agenda
            </p>
            <p className="text-sm text-emerald-800">{formattedDate}</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            {times.length} horários • {appointments.length} agendamento
            {appointments.length !== 1 ? "s" : ""}
          </span>
        </div>

        <ScrollArea className="h-[calc(100vh-20rem)] w-full rounded-md border border-gray-200 bg-muted/20 lg:h-[calc(100vh-21rem)]">
          <div className="grid gap-2 p-3">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-xl border border-gray-200 bg-white p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="h-4 w-16 rounded-full bg-gray-200" />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-gray-200" />
                    <div className="space-y-1.5">
                      <div className="h-3 w-28 rounded bg-gray-200" />
                      <div className="h-3 w-40 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))
            ) : isError ? (
              <div className="flex min-h-45 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-rose-300 bg-white px-4 py-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Erro ao carregar os agendamentos.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    Não foi possível buscar os horários desta data.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="border-rose-200 text-rose-700 hover:bg-rose-50"
                >
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Tentar novamente
                </Button>
              </div>
            ) : appointments.length === 0 && availableTimes.length === 0 ? (
              <div className="flex min-h-45 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-8 text-center">
                <CalendarDays className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm font-medium text-muted-foreground">
                  Nenhum horário disponível.
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Adicione um novo agendamento para aparecer aqui.
                </p>
              </div>
            ) : (
              <>
                {appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onStatusChange={refetch}
                  />
                ))}

                {availableTimes.map((time) => (
                  <div
                    key={time}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/30"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                        <Clock3 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {time}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Horário disponível
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-medium text-emerald-700">
                      Disponível
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
