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
      <section className="mx-auto ">
        <Card className="border border-gray-300 mb-7">
          <CardHeader className="flex flex-col md:flex-row items-center justify-between mb-2">
            <div className="space-y-1 self-start">
              <CardTitle className="text-lg font-semibold">
                Serviços da clínica
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Lista de todos os serviços disponíveis na clínica
              </CardDescription>
            </div>
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full md:mx-0 md:w-auto bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out font-bold mt-2 py-4 md:mt-0"
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
            <p className="text-sm text-gray-500">
              Nenhum serviço encontrado. Adicione um novo serviço.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className="flex flex-col border border-gray-300"
                >
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>
                      {service.description || "Sem descrição"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(service.price / 100)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {service.duration
                        ? `Duração: ${service.duration} minutos`
                        : "Duração não informada"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Criado em:{" "}
                      {new Date(service.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      Atualizado em:{" "}
                      {new Date(service.updatedAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </CardContent>
                  <div className="mt-auto grid grid-cols-2 gap-2 px-4">
                    <Button
                      className="bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white font-bold cursor-pointer transition-all duration-300 ease-in-out"
                      onClick={() => handleEditService(service)}
                    >
                      <SquarePen />
                      Editar
                    </Button>
                    <Button
                      className="bg-red-500 text-white hover:bg-red-600 hover:text-white font-bold cursor-pointer transition-all duration-300 ease-in-out"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 />
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
