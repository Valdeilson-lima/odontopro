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
import { toast } from "@/components/ui/toast";
import { AppointmentStatus } from "@/generated/prisma/browser";
import { formatCurrency } from "@/utils/formatCurrency";
import { addMinutes, format, parse } from "date-fns";
import { Check, Clock3, Eye, Loader2, User, X } from "lucide-react";
import { useState } from "react";
import { updateAppointmentStatus } from "../../_actions/update-appointment-status";
import {
  formatAppointmentDate,
  statusConfig,
  type AppointmentWithService,
} from "./appointment-types";

interface AppointmentCardProps {
  appointment: AppointmentWithService;
  onStatusChange: () => void;
}

export function AppointmentCard({
  appointment,
  onStatusChange,
}: AppointmentCardProps) {
  const [isUpdating, setIsUpdating] = useState<AppointmentStatus | null>(null);
  const [confirmStatus, setConfirmStatus] = useState<AppointmentStatus | null>(
    null
  );

  const status = statusConfig[appointment.status];
  const endTime = format(
    addMinutes(
      parse(appointment.time, "HH:mm", new Date()),
      appointment.service.duration
    ),
    "HH:mm"
  );

  const isPending = appointment.status === "pending";

  async function handleUpdateStatus(nextStatus: AppointmentStatus) {
    setIsUpdating(nextStatus);

    const response = await updateAppointmentStatus({
      appointmentId: appointment.id,
      status: nextStatus,
    });

    setIsUpdating(null);

    if (response.error) {
      toast.add({
        title: "Erro!",
        description: response.error,
        type: "error",
      });
      return;
    }

    toast.add({
      title: "Sucesso!",
      description: response.success,
      type: "success",
    });
    onStatusChange();
  }

  return (
    <>
      <Dialog>
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Clock3 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {appointment.time} – {endTime}
                </p>
                <p className="text-xs text-muted-foreground">
                  {appointment.service.name} • {appointment.service.duration}{" "}
                  min
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

          <div className="mt-3 flex items-center gap-2 border-t border-amber-100 pt-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-amber-700 ring-1 ring-amber-200">
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
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-amber-100 pt-3">
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-200 bg-white text-amber-700 hover:bg-amber-100 cursor-pointer"
                >
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  Detalhes
                </Button>
              }
            />

            <div className="ml-auto flex items-center gap-2">
              {isPending && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isUpdating !== null}
                  onClick={() => setConfirmStatus("concluido")}
                  className="border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-100 cursor-pointer"
                >
                  {isUpdating === "concluido" ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Check className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  Concluir
                </Button>
              )}

              {isPending && (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isUpdating !== null}
                  onClick={() => setConfirmStatus("cancelado")}
                  className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
                >
                  {isUpdating === "cancelado" ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <X className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        </div>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-amber-600" />
              {appointment.time} – {endTime}
            </DialogTitle>
            <DialogDescription>
              Detalhes do agendamento do paciente.
            </DialogDescription>
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
                <p className="text-xs font-medium text-muted-foreground">
                  Data
                </p>
                <p className="text-sm font-medium text-foreground">
                  {formatAppointmentDate(appointment.appointmentDate)}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 px-3 py-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Valor
                </p>
                <p className="text-sm font-semibold text-emerald-700">
                  {formatCurrency(appointment.service.price / 100)}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmStatus !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmStatus(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {confirmStatus === "concluido"
                ? "Concluir agendamento?"
                : "Cancelar agendamento?"}
            </DialogTitle>
            <DialogDescription>
              {confirmStatus === "concluido"
                ? `Deseja marcar como concluído o agendamento de ${appointment.name} (${appointment.time} – ${endTime})?`
                : `Deseja cancelar o agendamento de ${appointment.name} (${appointment.time} – ${endTime})? O horário será liberado.`}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              disabled={isUpdating !== null}
              onClick={() => setConfirmStatus(null)}
            >
              Voltar
            </Button>

            <Button
              variant={
                confirmStatus === "cancelado" ? "destructive" : "default"
              }
              disabled={isUpdating !== null}
              onClick={async () => {
                if (!confirmStatus) return;
                await handleUpdateStatus(confirmStatus);
                setConfirmStatus(null);
              }}
              className={
                confirmStatus === "concluido"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : undefined
              }
            >
              {isUpdating === confirmStatus ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : confirmStatus === "concluido" ? (
                <Check className="mr-1.5 h-3.5 w-3.5" />
              ) : (
                <X className="mr-1.5 h-3.5 w-3.5" />
              )}
              {confirmStatus === "concluido"
                ? "Sim, concluir"
                : "Sim, cancelar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
