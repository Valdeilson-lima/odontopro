"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import Dialogservice from "./dialog-service";

export default function ServiceList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto ">
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-center justify-between">
            <div className="space-y-1 self-start">
              <CardTitle className="text-lg font-semibold">
                Serviços da clínica
              </CardTitle>
              <CardDescription>
                Lista de todos os serviços disponíveis na clínica
              </CardDescription>
            </div>
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full md:mx-0 md:w-auto bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out font-bold"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar serviço
                </Button>
              }
            ></DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <Dialogservice clsoseModal={() => setIsDialogOpen(false)} />
            </DialogContent>
          </CardHeader>
        </Card>
      </section>
    </Dialog>
  );
}
