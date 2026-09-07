"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Inbox, Search } from "lucide-react";
import { useState } from "react";
import type { AppointmentWithService } from "../../_components/appointments/appointment-types";
import { HistoryCard } from "./history-card";

type Filter = "todos" | "concluido" | "cancelado";

interface HistoryListProps {
  appointments: AppointmentWithService[];
  error?: string;
}

const filters: { value: Filter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "concluido", label: "Concluídos" },
  { value: "cancelado", label: "Cancelados" },
];

export default function HistoryList({ appointments, error }: HistoryListProps) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [search, setSearch] = useState("");

  const concludedCount = appointments.filter(
    (appointment) => appointment.status === "concluido"
  ).length;
  const cancelledCount = appointments.filter(
    (appointment) => appointment.status === "cancelado"
  ).length;

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter !== "todos" && appointment.status !== filter) {
      return false;
    }

    const query = search.trim().toLowerCase();
    if (!query) {
      return true;
    }

    return (
      appointment.name.toLowerCase().includes(query) ||
      appointment.email.toLowerCase().includes(query) ||
      appointment.service.name.toLowerCase().includes(query)
    );
  });

  return (
    <Card className="border-[#d9e8e1] bg-white shadow-[0_18px_45px_-35px_#17483b]">
      <CardHeader className="relative flex flex-col gap-3 border-b border-[#edf3f0] px-5 py-6 md:flex-row md:items-center md:justify-between sm:px-7">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-[#17624f]" />
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#e77d52]">
            Registro da clínica
          </p>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold tracking-[-0.035em] text-[#12352e]">
            <History className="h-5 w-5 text-[#17624f]" />
            Histórico
          </CardTitle>
          <CardDescription className="text-sm leading-6 text-[#607770]">
            Consulte atendimentos concluídos e cancelados.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 py-5 sm:px-7">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-xl border border-[#d9e8e1] bg-[#f4f8f6] px-3 py-3">
            <p className="text-xs font-medium text-[#607770]">Concluídos</p>
            <p className="mt-1 text-xl font-semibold text-[#17624f]">
              {concludedCount}
            </p>
          </div>
          <div className="rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-3">
            <p className="text-xs font-medium text-rose-700">Cancelados</p>
            <p className="mt-1 text-xl font-semibold text-rose-700">
              {cancelledCount}
            </p>
          </div>
          <div className="rounded-xl border border-[#e6ece9] bg-[#fafcfb] px-3 py-3">
            <p className="text-xs font-medium text-[#607770]">Total</p>
            <p className="mt-1 text-xl font-semibold text-[#12352e]">
              {appointments.length}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-1 rounded-xl border border-[#e1ebe6] bg-[#f4f8f6] p-1 sm:w-fit">
            {filters.map((item) => (
              <Button
                key={item.value}
                variant={filter === item.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter(item.value)}
                className={
                  filter === item.value
                    ? "bg-white text-[#17624f] shadow-sm"
                    : "text-[#71867f] hover:text-[#17624f]"
                }
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#8aa098]" />
            <Input
              placeholder="Buscar por paciente, e-mail ou serviço..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="border-[#d9e8e1] bg-[#fafcfb] pl-8 focus-visible:border-[#17624f]"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-24rem)] w-full rounded-md border border-gray-200 bg-muted/20">
          <div className="grid gap-2 p-3">
            {error ? (
              <div className="flex min-h-45 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-rose-300 bg-white px-4 py-8 text-center">
                <p className="text-sm font-medium text-foreground">
                  Erro ao carregar o histórico.
                </p>
                <p className="text-xs text-muted-foreground/70">{error}</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="flex min-h-45 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-8 text-center">
                <Inbox className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm font-medium text-muted-foreground">
                  Nenhum agendamento encontrado.
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {appointments.length === 0
                    ? "Conclua ou cancele um agendamento para ele aparecer aqui."
                    : "Ajuste o filtro ou a busca para ver outros resultados."}
                </p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <HistoryCard key={appointment.id} appointment={appointment} />
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
