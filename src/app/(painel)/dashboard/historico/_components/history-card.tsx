"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/utils/formatCurrency";
import { addMinutes, format, parse } from "date-fns";
import { Clock3, Eye, User } from "lucide-react";
import {
  statusConfig,
  type AppointmentWithService,
} from "../../_components/appointments/appointment-types";

interface HistoryCardProps {
  appointment: AppointmentWithService;
}

export function HistoryCard({ appointment }: HistoryCardProps) {
  const status = statusConfig[appointment.status];
  const endTime = format(
    addMinutes(
      parse(appointment.time, "HH:mm", new Date()),
      appointment.service.duration
    ),
    "HH:mm"
  );

  return (
    <Dialog>
      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-colors hover:border-gray-300">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              <Clock3 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {format(new Date(appointment.appointmentDate), "dd/MM/yyyy")} •{" "}
                {appointment.time} – {endTime}
              </p>
              <p className="text-xs text-muted-foreground">
                {appointment.service.name} • {appointment.service.duration} min
              </p>
            </div>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${status.badgeClassName}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${status.dotClassName}`}
            />
            {status.label}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 ring-1 ring-gray-200">
            <User className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {appointment.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {appointment.email} • {appointment.phone}
            </p>
          </div>

          <div className="ml-auto shrink-0">
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                >
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  Detalhes
                </Button>
              }
            />
          </div>
        </div>
      </div>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-gray-600" />
            {appointment.time} – {endTime}
          </DialogTitle>
          <DialogDescription>Detalhes do agendamento.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">
              Status
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${status.badgeClassName}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${status.dotClassName}`}
              />
              {status.label}
            </span>
          </div>

          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground">
              Paciente
            </p>
            <p className="text-sm font-medium text-foreground">
              {appointment.name}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {appointment.email} • {appointment.phone}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-xs font-medium text-muted-foreground">
                Serviço
              </p>
              <p className="text-sm font-medium text-foreground">
                {appointment.service.name}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-xs font-medium text-muted-foreground">
                Duração
              </p>
              <p className="text-sm font-medium text-foreground">
                {appointment.service.duration} min
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-xs font-medium text-muted-foreground">Data</p>
              <p className="text-sm font-medium text-foreground">
                {format(new Date(appointment.appointmentDate), "dd/MM/yyyy")}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <p className="text-xs font-medium text-muted-foreground">Valor</p>
              <p className="text-sm font-semibold text-emerald-700">
                {formatCurrency(appointment.service.price / 100)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
