"use server";

import { prisma } from "@/lib/prisma";
import { extracPhoneNumber } from "@/utils/formatPhone";
import { z } from "zod";

const createAppointmentSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email("O e-mail deve ser válido"),
  phone: z.string().min(1, "O telefone é obrigatório"),
  date: z.date(),
  serviceId: z.string().min(1, "O ID do serviço é obrigatório"),
  time: z.string().min(1, "O horário é obrigatório"),
  clinicId: z.string().min(1, "O ID do usuário é obrigatório"),
});

type FormSchema = z.infer<typeof createAppointmentSchema>;

export async function createNewAppointment(formData: FormSchema) {
  const schema = createAppointmentSchema.safeParse(formData);

  if (!schema.success) {
    return {
      errors: schema.error.issues[0].message,
    };
  }

  try {
    const [clinic, service] = await Promise.all([
      prisma.user.findUnique({
        where: { id: formData.clinicId },
      }),
      prisma.service.findUnique({
        where: { id: formData.serviceId },
      }),
    ]);

    if (!clinic || !service) {
      return {
        errors: "Clínica ou serviço não encontrado.",
      };
    }

    const clinicTimes = clinic.times || [];
    const startIndex = clinicTimes.indexOf(formData.time);
    const requiredSlots = Math.ceil(service.duration / 30);

    if (startIndex === -1 || startIndex + requiredSlots > clinicTimes.length) {
      return {
        errors:
          "O horário selecionado não comporta a duração do serviço. Selecione um horário mais cedo.",
      };
    }

    const selectedDate = new Date(formData.date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const appointmentDate = new Date(year, month, day, 0, 0, 0, 0);

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: extracPhoneNumber(formData.phone),
        appointmentDate: appointmentDate,
        time: formData.time,
        serviceId: formData.serviceId,
        userId: formData.clinicId,
        status: "pending",
      },
    });

    return { appointment: newAppointment };
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return {
      errors:
        "Ocorreu um erro ao criar o agendamento. Por favor, tente novamente.",
    };
  }
}
