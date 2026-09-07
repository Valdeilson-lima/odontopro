"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { Prisma } from "@/generated/prisma/client";
import { formatCurrency } from "@/utils/formatCurrency";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteService } from "../_actions/delete-service";
import Dialogservice from "./dialog-service";

type Service = Prisma.ServiceGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    price: true;
    duration: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

interface ServiceListProps {
  services: Service[];
}

export default function ServiceList({ services }: ServiceListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const router = useRouter();

  async function handleDeleteService(serviceId: string) {
    // Implement the logic to delete the service with the given serviceId
    const response = await deleteService({ serviceId });

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

    router.refresh(); // Refresh the page to reflect the changes
  }

  function handleEditService(service: Service) {
    console.log("Edit service:", service);
    setEditingService(service);
    setIsDialogOpen(true);
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setEditingService(null);
        }
        setIsDialogOpen(open);
      }}
    >
      <section className="w-full">
        <Card className="mb-7 overflow-hidden border-[#d9e8e1] bg-white shadow-[0_18px_45px_-35px_#17483b]">
          <CardHeader className="relative flex flex-col gap-4 px-5 py-6 sm:px-7 md:flex-row md:items-center md:justify-between">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-[#17624f]" />
            <div className="space-y-2 self-start">
              <p className="text-xs font-semibold tracking-[0.08em] text-[#e77d52]">
                Catálogo da clínica
              </p>
              <CardTitle className="text-2xl font-semibold tracking-[-0.035em] text-[#12352e]">
                Seus serviços
              </CardTitle>
              <CardDescription className="text-sm leading-6 text-[#607770]">
                Mantenha preços, duração e informações sempre atualizados.
              </CardDescription>
            </div>
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  className="mt-2 flex w-full cursor-pointer items-center gap-2 bg-[#17624f] font-semibold text-white hover:bg-[#104b3d] hover:text-white md:mt-0 md:mx-0 md:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar serviço
                </Button>
              }
            ></DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <Dialogservice
                key={editingService?.id ?? "new"}
                clsoseModal={() => {
                  setIsDialogOpen(false);
                  setEditingService(null);
                }}

                serviceId={editingService?.id ?? undefined}
                initialValues={
                  editingService
                    ? {
                        name: editingService.name,
                        description: editingService.description,
                        price: (editingService.price / 100)
                          .toFixed(2)
                          .replace(".", ","),
                        hours: Math.floor(
                          editingService.duration / 60
                        ).toString(),
                        minutes: (editingService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>
        </Card>
        <div>
          {services.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#b9d9ca] bg-white px-6 py-12 text-center">
              <p className="text-base font-semibold text-[#12352e]">
                Nenhum serviço cadastrado
              </p>
              <p className="mt-1 text-sm text-[#71867f]">
                Adicione seu primeiro serviço para começar a organizar os
                atendimentos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className="flex flex-col border-[#d9e8e1] bg-white shadow-[0_14px_35px_-30px_#17483b] transition-colors hover:border-[#a9cbbc]"
                >
                  <CardHeader className="gap-2 pb-3">
                    <CardTitle className="text-lg font-semibold text-[#12352e]">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="min-h-10 leading-5 text-[#71867f]">
                      {service.description || "Sem descrição"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <div className="flex items-end justify-between rounded-xl bg-[#f4f8f6] px-3 py-2.5">
                      <div>
                        <p className="text-xs font-medium text-[#71867f]">
                          Valor
                        </p>
                        <p className="text-lg font-semibold text-[#17624f]">
                          {formatCurrency(service.price / 100)}
                        </p>
                      </div>
                      <p className="text-right text-xs font-medium text-[#71867f]">
                        {service.duration
                          ? `Duração: ${service.duration} minutos`
                          : "Duração não informada"}
                      </p>
                    </div>
                    <p className="text-xs text-[#8aa098]">
                      Criado em:{" "}
                      {new Date(service.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-[#8aa098]">
                      Atualizado em:{" "}
                      {new Date(service.updatedAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </CardContent>
                  <div className="mt-auto grid grid-cols-2 gap-2 px-5 pb-5">
                    <Button
                      variant="outline"
                      className="cursor-pointer border-[#b9d9ca] text-[#17624f] hover:bg-[#e7f2ed] hover:text-[#104b3d]"
                      onClick={() => handleEditService(service)}
                    >
                      <SquarePen className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      className="cursor-pointer text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Excluir
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* <section className="mx-auto mt-4">
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle>Serviços desativados</CardTitle>
            <CardDescription>
              Lista de serviços que foram desativados na clínica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Nenhum serviço desativado encontrado.
            </p>
          </CardContent>
        </Card>
      </section> */}
    </Dialog>
  );
}
