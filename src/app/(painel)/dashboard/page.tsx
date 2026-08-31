import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getSession from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Apointments } from "./_components/appointment.tsx/appointments";
import { ButtonCopyLink } from "./_components/button-copy-link";
import Reminders from "./_components/reminder/reminders";

export default async function DashboardPage() {
  const session = await getSession();
  return (
    <main>
      <Card className="mb-6 border border-gray-300">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-foreground">
              Dashboard da clínica
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Acompanhe o desempenho da sua clínica e acesse rapidamente os
              principais atalhos.
            </CardDescription>
          </div>

          <div className="flex  gap-2 sm:flex-row sm:items-center sm:justify-end">
            <ButtonCopyLink
              link={`${process.env.NEXT_PUBLIC_API_URL}/clinica/${session?.user?.id}`}
            />
            <Link
              href={`/clinica/${session?.user?.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                size="lg"
                className="flex items-center bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-300 cursor-pointer flex-1 md:flex-none font-bold"
              >
                <Calendar className="h-5 w-5" />
                <span>Novo Agendamento</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-6">
        <Apointments userId={session?.user?.id!} />
        <Reminders userId={session?.user?.id!} />
      </section>
    </main>
  );
}
