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
    <Card className="border border-gray-300 shadow-sm">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <History className="h-5 w-5 text-emerald-500" />
            Histórico de agendamentos
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Consulte os atendimentos concluídos e cancelados da sua clínica.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
            <p className="text-xs font-medium text-emerald-700">Concluídos</p>
            <p className="text-lg font-bold text-emerald-700">
              {concludedCount}
            </p>
          </div>
          <div className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2">
            <p className="text-xs font-medium text-rose-700">Cancelados</p>
            <p className="text-lg font-bold text-rose-700">{cancelledCount}</p>
          </div>
          <div className="col-span-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 sm:col-span-1">
            <p className="text-xs font-medium text-gray-600">Total</p>
            <p className="text-lg font-bold text-gray-700">
              {appointments.length}
            </p>
          </div>
        </div>

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-fit items-center gap-1 rounded-lg bg-muted/50 p-1">
            {filters.map((item) => (
              <Button
                key={item.value}
                variant={filter === item.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter(item.value)}
                className={
                  filter === item.value
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente, e-mail ou serviço..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-8"
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
