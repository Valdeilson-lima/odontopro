"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Reminder } from "@/generated/prisma/client";
import { Bell, Plus, Trash2 } from "lucide-react";

interface ReminderListProps {
  reminders: Reminder[];
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ReminderContent({ reminders }: ReminderListProps) {
  const sortedReminders = [...reminders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col gap-3">
      <Card className="border border-gray-300">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Bell className="h-5 w-5 text-emerald-500" />
              Lembretes
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Acompanhe seus lembretes e afazeres do dia
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {reminders.length > 0 && (
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                {reminders.length}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 cursor-pointer bg-emerald-500 font-bold text-white transition-all duration-300 ease-in-out hover:bg-emerald-600 hover:text-white"
              title="Adicionar Lembrete"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Adicionar</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {sortedReminders.length > 0 ? (
            <ScrollArea className="h-70">
              <ul className="flex flex-col gap-1">
                {sortedReminders.map((reminder, index) => (
                  <li key={reminder.id}>
                    <article className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/60 cursor-pointer">
                      <div className="flex min-w-0 items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                        />
                        <div className="min-w-0 space-y-0.5">
                          <p className="truncate text-sm font-medium text-foreground">
                            {reminder.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(reminder.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 cursor-pointer text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Excluir Lembrete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </article>
                    {index < sortedReminders.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-10 text-center">
              <Bell className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm font-medium text-muted-foreground">
                Nenhum lembrete encontrado
              </p>
              <p className="text-xs text-muted-foreground/70">
                Clique em “Adicionar” para criar o seu primeiro lembrete.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
