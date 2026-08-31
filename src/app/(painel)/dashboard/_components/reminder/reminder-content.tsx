"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { createReminder } from "../../_actions/create-reminder";
import { ReminderFormData, useReminderForm } from "./reminder-form";

interface ReminderContentProps {
  onClose?: () => void;
}

export function ReminderForm({ onClose }: ReminderContentProps) {
  const form = useReminderForm();
  const {
    formState: { errors },
  } = form;
  const router = useRouter();

  async function onSubmit(formData: ReminderFormData) {
    form.reset();
    const result = await createReminder(formData);
    if (result.error) {
      toast.add({
        title: "Erro",
        description: result.error,
        type: "error",
      });
    } else {
      toast.add({
        title: "Sucesso",
        description: result.success,
        type: "success",
      });
    }
    form.reset();
    router.refresh();
    if (onClose) {
      onClose();
    }
  }
  return (
    <div className="grid gap-4 py-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FieldGroup>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="description" className="font-semibold">
                  Descrição do lembrete
                </FieldLabel>
                <Textarea
                  id="description"
                  {...field}
                  placeholder="Digite a descrição do lembrete..."
                />
                <FieldError errors={[errors.description]} />
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          className="bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer transition-all duration-300 ease-in-out"
        >
          Salvar
        </Button>
      </form>
    </div>
  );
}
