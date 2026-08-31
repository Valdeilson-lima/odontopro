"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const reminderFormSchema = z.object({
  description: z.string().min(1, { message: "A descrição é obrigatória" }),
});

export type ReminderFormData = z.infer<typeof reminderFormSchema>;

export function useReminderForm() {
  const form = useForm<ReminderFormData>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      description: "",
    },
  });
  return form;
}
