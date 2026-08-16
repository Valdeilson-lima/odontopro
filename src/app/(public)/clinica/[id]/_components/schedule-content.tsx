"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { Prisma } from "@/generated/prisma/client";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatPhone } from "@/utils/formatPhone";
import { format } from "date-fns";
import { CircleAlert, MapPin } from "lucide-react";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import image from "../../../../../../public/foto1.png";
import { createNewAppointment } from "../_actions/create-appointment";
import { DateTimePicker } from "./date-picker";
import { AppointmentFormData, useAppointmentForm } from "./schedule-form";
import ScheduleTimesList from "./schedule-time-list";
import { isSlotinThePast } from "./schedule-utils";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    services: true;
    subscription: true;
  };
}>;

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

export default function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;
  const {
    formState: { errors },
  } = form;

  const selectedDate = watch("date");
  const selectedServiceId = watch("serviceId");

  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loaddinSlots, setLoadingSlots] = useState(false);

  const fetchbolckedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingSlots(true);
      try {
        const dateString = format(date, "yyyy-MM-dd");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`
        );
        const data = await response.json();
        if (response.ok) {
          const blockedTimes: string[] = Array.isArray(data)
            ? data
            : (data.blockedTimes ?? []);
          return blockedTimes;
        } else {
          console.error("Erro ao buscar horários bloqueados:", data.error);
          return [];
        }
      } catch (error) {
        console.error("Erro ao buscar horários bloqueados:", error);
        return [];
      } finally {
        setLoadingSlots(false);
      }
    },
    [clinic.id]
  );

  useEffect(() => {
    if (selectedDate) {
      fetchbolckedTimes(selectedDate).then((blockedTimes) => {
        const safeBlockedTimes = blockedTimes ?? [];
        const times = clinic.times || [];

        const selectedService = clinic.services.find(
          (service) => service.id === selectedServiceId
        );
        const requiredSlots = selectedService
          ? Math.ceil(selectedService.duration / 30)
          : 1;

        const finalSlots = times.map((time) => {
          const startIndex = times.indexOf(time);
          const fitsInSchedule =
            startIndex !== -1 && startIndex + requiredSlots <= times.length;

          return {
            time,
            isAvailable:
              !safeBlockedTimes.includes(time) &&
              !isSlotinThePast(time, selectedDate) &&
              fitsInSchedule,
          };
        });

        setAvailableTimeSlots(finalSlots);

        const stillAvailable = finalSlots.some(
          (slot) => slot.time === selectedTime && slot.isAvailable
        );

        if (!stillAvailable) {
          setSelectedTime("");
        }
      });
    }
  }, [
    selectedDate,
    selectedServiceId,
    clinic.times,
    fetchbolckedTimes,
    selectedTime,
  ]);

  async function handleRegisterAppointment(formData: AppointmentFormData) {
    if (!selectedDate || !selectedTime) {
      toast.add({
        title: "Erro ao agendar consulta",
        description: "Selecione uma data e horário válidos.",
        type: "error",
      });
      return;
    }

    const response = await createNewAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      serviceId: formData.serviceId,
      time: selectedTime,
      clinicId: clinic.id,
    });

    if ("errors" in response) {
      toast.add({
        title: "Erro ao agendar consulta",
        description: response.errors,
        type: "error",
      });
    } else {
      toast.add({
        title: "Consulta agendada com sucesso",
        description:
          "Sua consulta foi agendada com sucesso. Em breve você receberá um e-mail de confirmação.",
        type: "success",
      });
      form.reset();
      setSelectedTime("");
    }
  }

  return (
    <div className="min-h-screen flex flex-col mb-4">
      <div className="h-32 bg-emerald-500" />
      <section className="container mx-auto px-4 -mt-18">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center gap-4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
              <Image
                src={clinic.image || image}
                alt="Imagem de uma clínica odontológica"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold">{clinic.name}</h1>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500 inline-block" />
              <span className="text-gray-500">
                {clinic.address ? clinic.address : "Endereço não disponível"}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-3xl mx-auto mt-6 w-full">
        <form
          className="mx-2 space-y-4 bg-white border rounded-md shadow-md p-6"
          onSubmit={form.handleSubmit(handleRegisterAppointment)}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="name" className="font-semibold">
                    Nome Completo
                  </FieldLabel>
                  <Input
                    id="name"
                    {...field}
                    placeholder="Digite seu nome completo..."
                  />
                  <FieldError errors={[errors.name]} />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="email" className="font-semibold">
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    {...field}
                    placeholder="Digite seu email..."
                  />
                  <FieldError errors={[errors.email]} />
                </Field>
              )}
            />
          </FieldGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="phone" className="font-semibold">
                      Telefone
                    </FieldLabel>
                    <Input
                      {...field}
                      id="phone"
                      placeholder="(00) 0000-0000"
                      onChange={(e) => {
                        const formattedPhone = formatPhone(e.target.value);
                        field.onChange(formattedPhone);
                      }}
                    />
                    <FieldError errors={[errors.phone]} />
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="date"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="date" className="font-semibold">
                      Data do Agendamento
                    </FieldLabel>
                    <DateTimePicker
                      initialDate={new Date()}
                      className="w-full rounded border border-gray-300 p-2 uppercase"
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          <FieldGroup>
            <Controller
              name="serviceId"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="serviceId" className="font-semibold">
                    Selecione o Serviço
                  </FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="serviceId" className="w-full">
                      <SelectValue placeholder="Selecione o serviço desejado...">
                        {(value) => {
                          const service = clinic.services.find(
                            (s) => s.id === value
                          );
                          return service
                            ? `${service.name}`
                            : "Selecione o serviço desejado...";
                        }}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {clinic.services.map((service, index) => (
                        <Fragment key={service.id}>
                          {index > 0 && <SelectSeparator />}
                          <SelectItem value={service.id}>
                            <span className="flex w-full flex-col py-1">
                              <span className="flex items-center justify-between gap-4">
                                <span className="truncate font-medium">
                                  {service.name}
                                </span>
                                <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                  {formatCurrency(service.price / 100)}
                                </span>
                              </span>
                              <span className="mt-1 text-xs text-muted-foreground">
                                Duração: {Math.floor(service.duration / 60)}h{" "}
                                {service.duration % 60}min
                              </span>
                            </span>
                          </SelectItem>
                        </Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[errors.serviceId]} />
                </Field>
              )}
            />
          </FieldGroup>

          {selectedServiceId && (
            <div className="space-y-2">
              <Label className="font-semibold">Horários Disponíveis</Label>
              <div className="bg-gray-100 p-4 rounded-lg">
                {loaddinSlots ? (
                  <p className="text-sm text-muted-foreground">
                    Carregando horários disponíveis...
                  </p>
                ) : availableTimeSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhum horário disponível no momento.
                  </p>
                ) : (
                  <ScheduleTimesList
                    onSelectTime={(time) => setSelectedTime(time)}
                    selectedTime={selectedTime}
                    availableTimeSlots={availableTimeSlots}
                  />
                )}
              </div>
            </div>
          )}

          {clinic.status ? (
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-emerald-500 p-4 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-emerald-600"
              disabled={
                !watch("name") ||
                !watch("email") ||
                !watch("phone") ||
                !watch("date")
              }
            >
              Agendar Consulta
            </Button>
          ) : (
            <span
              role="status"
              className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <CircleAlert
                className="mt-0.5 size-5 shrink-0"
                aria-hidden="true"
              />
              <span className="flex flex-col gap-1">
                <span className="font-semibold">Clínica fechada</span>
                <span className="leading-relaxed text-red-600">
                  Esta clínica está fechada no momento. Entre em contato com a
                  clínica para mais informações.
                </span>
              </span>
            </span>
          )}
        </form>
      </section>
    </div>
  );
}
