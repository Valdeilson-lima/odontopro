"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { Prisma } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller } from "react-hook-form";
import imageTest from "../../../../../../public/foto1.png";
import { updateProfile } from "../_actions/update-profile";
import { ProfileFormData, useUserProfileForm } from "./profile-form";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfileContentProps {
  user: UserWithSubscription;
}

export default function ProfileContent({ user }: ProfileContentProps) {
  const [selectedHours, setSelectedHours] = useState<string[]>(
    user.times ?? []
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useUserProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    timeZone: user.timeZone,
  });
  const {
    formState: { errors },
  } = form;

  function generateTimeSlots(): string[] {
    const hours: string[] = [];
    for (let i = 8; i <= 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");
        hours.push(`${hour}:${minute}`);
      }
    }
    return hours;
  }

  const hours = generateTimeSlots();

  function toggleHourSelection(hour: string) {
    setSelectedHours((prevSelectedHours) => {
      if (prevSelectedHours.includes(hour)) {
        return prevSelectedHours.filter((h) => h !== hour);
      } else {
        return [...prevSelectedHours, hour].sort();
      }
    });
  }

  async function handleSubmit(data: ProfileFormData) {
    const profileData = {
      ...data,
      selectedHours: selectedHours,
    };
    if (user) {
      const response = await updateProfile({
        name: profileData.name,
        address: profileData.address,
        phone: profileData.phone,
        status: profileData.status,
        timeZone: profileData.timeZone,
        times: selectedHours || [],
      });
      if (response.error) {
        toast.add({
          description: response.error,
          type: "error",
        });
      } else {
        toast.add({
          description: response.success,
          type: "success",
        });
      }
    }
  }

  const timeZones = Intl.supportedValuesOf("timeZone").filter(
    (tz) =>
      tz.startsWith("America/Sao_Paulo") ||
      tz.startsWith("America/Bahia") ||
      tz.startsWith("America/Recife") ||
      tz.startsWith("America/Fortaleza") ||
      tz.startsWith("America/Cuiaba") ||
      tz.startsWith("America/Porto_Velho") ||
      tz.startsWith("America/Manaus") ||
      tz.startsWith("America/Boa_Vista") ||
      tz.startsWith("America/Rio_Branco") ||
      tz.startsWith("America/Belem") ||
      tz.startsWith("America/Campo_Grande") ||
      tz.startsWith("America/Santarem") ||
      tz.startsWith("America/Araguaina") ||
      tz.startsWith("America/Maceio") ||
      tz.startsWith("America/Noronha") ||
      tz.startsWith("America/Atikokan") ||
      tz.startsWith("America/Blanc-Sablon") ||
      tz.startsWith("America/Cayenne") ||
      tz.startsWith("America/Paramaribo") ||
      tz.startsWith("America/Asuncion") ||
      tz.startsWith("America/Montevideo") ||
      tz.startsWith("America/Santiago") ||
      tz.startsWith("America/Buenos_Aires")
  );

  return (
    <div className="mx-auto p-1 md:p-0">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Perfil da Clinica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="relative h-40 w-40 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={user.image || imageTest}
                  alt="Profile Image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="name" className="font-semibold">
                        Nome Completo da clinica
                      </FieldLabel>
                      <Input
                        id="name"
                        {...field}
                        placeholder="Digite o nome da clinica..."
                      />
                      <FieldError errors={[errors.name]} />
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup>
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="address" className="font-semibold">
                        Endereço da clinica
                      </FieldLabel>
                      <Input
                        id="address"
                        {...field}
                        placeholder="Digite o endereço da clinica..."
                      />
                      <FieldError errors={[errors.address]} />
                    </Field>
                  )}
                />
              </FieldGroup>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                <FieldGroup>
                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="phone" className="font-semibold">
                          Telefone da clinica
                        </FieldLabel>
                        <Input
                          id="phone"
                          {...field}
                          placeholder="Digite o telefone da clinica..."
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <FieldError errors={[errors.phone]} />
                      </Field>
                    )}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Controller
                    name="status"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="status" className="font-semibold">
                          Status da clinica
                        </FieldLabel>
                        <Select
                          value={
                            field.value ? "Clinica Ativa" : "Clinica Inativa"
                          }
                          onValueChange={(val) =>
                            field.onChange(val === "Clinica Ativa")
                          }
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Selecione o status da clinica..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Clinica Ativa">
                              Clinica Ativa
                            </SelectItem>
                            <SelectItem value="Clinica Inativa">
                              Clinica Inativa
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-3">
                <Label className="font-semibold">
                  Configurar horários da clinica
                </Label>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger
                    render={
                      <Button
                        variant="outline"
                        className="flex w-full justify-between cursor-pointer"
                      >
                        Clique aqui para configurar os horários da clinica
                        <ArrowBigRight className="ml-2 h-4 w-4" />
                      </Button>
                    }
                  ></DialogTrigger>
                  <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">
                        Configurar Horários
                      </DialogTitle>
                      <DialogDescription className="text-sm text-muted-foreground">
                        Aqui você pode configurar os horários de funcionamento
                        da clinica.
                      </DialogDescription>
                    </DialogHeader>
                    <section className="py-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Clique nos horários abaixo para marcar ou desmarcar!
                      </p>
                      <div className="grid grid-cols-5 gap-2">
                        {hours.map((hour) => (
                          <Button
                            variant="outline"
                            key={hour}
                            className={cn(
                              "border-2 h-10 cursor-pointer",
                              selectedHours.includes(hour)
                                ? "border-emerald-500"
                                : ""
                            )}
                            onClick={() => toggleHourSelection(hour)}
                          >
                            {hour}
                          </Button>
                        ))}
                      </div>
                      <Button
                        type="button"
                        className="bg-emerald-500 hover:bg-emerald-400 font-bold cursor-pointer mt-4 py-4 w-full"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Salvar horários selecionados
                      </Button>
                    </section>
                  </DialogContent>
                </Dialog>
              </div>

              <FieldGroup>
                <Controller
                  name="timeZone"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="timeZone" className="font-semibold">
                        Fuso horário da clinica
                      </FieldLabel>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="timeZone">
                          <SelectValue placeholder="Selecione o fuso horário da clinica..." />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZones.map((tz) => (
                            <SelectItem key={tz} value={tz}>
                              {tz}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={[errors.timeZone]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 font-bold cursor-pointer mt-2 py-5 w-full text-xl"
            >
              Salvar alterações
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
