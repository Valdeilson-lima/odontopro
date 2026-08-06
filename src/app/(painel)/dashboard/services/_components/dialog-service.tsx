"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { convertRealToCents } from "@/utils/convertCurrency";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { createNewService } from "../_actions/create-service";
import {
  DialogServiceFormData,
  useDialogServiceForm,
} from "./dialog-service-form";

interface DialogServiceProps {
  clsoseModal?: () => void;
}

export default function Dialogservice({ clsoseModal }: DialogServiceProps) {
  const [loading, setLoading] = useState(false);
  const form = useDialogServiceForm();
  const router = useRouter();

  const {
    formState: { errors },
  } = form;

  async function onSubmit(data: DialogServiceFormData) {
    setLoading(true);
    const priceInCents = convertRealToCents(data.price);
    const hours = parseInt(data.hours || "0", 10);
    const minutes = parseInt(data.minutes || "0", 10);
    const durationInMinutes = hours * 60 + minutes;

    const serviceData = {
      name: data.name,
      description: data.description,
      price: priceInCents,
      duration: durationInMinutes,
    };

    const response = await createNewService(serviceData);
    setLoading(false);

    if (response.error) {
      toast.add({
        title: "Erro!",
        description: response.error,
        type: "error",
      });
    } else {
      toast.add({
        title: "Sucesso!",
        description: response.success,
        type: "success",
      });
    }

    closeModal();
    router.refresh();
  }

  function closeModal() {
    form.reset();
    if (clsoseModal) {
      clsoseModal();
    }
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");
    if (value) {
      value = (parseInt(value) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      value = `R$ ${value}`;
    }
    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          Novo serviço
        </DialogTitle>
        <DialogDescription>
          Adicione um novo serviço à sua clínica.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2 pb-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="name" className="font-semibold">
                    Nome do serviço
                  </FieldLabel>
                  <Input
                    id="name"
                    {...field}
                    placeholder="Digite o nome do serviço..."
                  />
                  <FieldError errors={[errors.name]} />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="description" className="font-semibold">
                    Descrição do serviço
                  </FieldLabel>
                  <Textarea
                    id="description"
                    {...field}
                    placeholder="Digite a descrição do serviço..."
                  />
                  <FieldError errors={[errors.description]} />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="price"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="price" className="font-semibold">
                    Preço do serviço
                  </FieldLabel>
                  <Input
                    id="price"
                    {...field}
                    onChange={changeCurrency}
                    placeholder="Digite o preço do serviço..."
                  />
                  <FieldError errors={[errors.price]} />
                </Field>
              )}
            />
          </FieldGroup>

          <Card className="p-4 border border-gray-300 rounded-md">
            <Label className="font-semibold">Duração do serviço:</Label>

            <div className="grid grid-cols-2 gap-4">
              <FieldGroup>
                <Controller
                  name="hours"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="hours" className="font-semibold">
                        Horas
                      </FieldLabel>
                      <Input
                        id="hours"
                        {...field}
                        placeholder="Digite as horas..."
                      />
                      <FieldError errors={[errors.hours]} />
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup>
                <Controller
                  name="minutes"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="minutes" className="font-semibold">
                        Minutos
                      </FieldLabel>
                      <Input
                        id="minutes"
                        {...field}
                        placeholder="Digite os minutos..."
                      />
                      <FieldError errors={[errors.minutes]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
          </Card>
          <Button
            type="submit"
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white cursor-pointer transition-all py-4 duration-300 ease-in-out font-bold"
            disabled={loading}
          >
            <Save className="h-4 w-4" />
            {loading ? "Salvando..." : "Salvar serviço"}
          </Button>
        </form>
      </div>
    </>
  );
}
