import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getSession from "@/lib/getSession";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Apointments } from "./_components/appointments/appointments";
import { ButtonCopyLink } from "./_components/button-copy-link";
import Reminders from "./_components/reminder/reminders";
import { getUserData } from "./profile/_data-access/get-info-user";

export default async function DashboardPage() {
  const session = await getSession();
  const user = session?.user?.id
    ? await getUserData({ userId: session.user.id })
    : null;

  return (
    <main>
      <Card className="mb-7 overflow-hidden border-[#d9e8e1] bg-white shadow-[0_18px_45px_-35px_#17483b]">
        <CardHeader className="relative flex flex-col gap-6 px-5 py-6 sm:px-7 md:flex-row md:items-center md:justify-between md:py-7">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[#17624f]" />
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.08em] text-[#e77d52]">
              Visão geral da clínica
            </p>
            <CardTitle className="text-2xl font-semibold tracking-[-0.035em] text-[#12352e] sm:text-3xl">
              {user?.name || "Sua clínica"}
            </CardTitle>
            <CardDescription className="max-w-xl text-sm leading-6 text-[#607770]">
              Organize sua agenda, acompanhe os atendimentos e mantenha sua
              clínica em movimento.
            </CardDescription>
            <div className="flex items-start gap-1.5 text-sm text-[#71867f]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e77d52]" />
              <span>{user?.address || "Endereço não informado"}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
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
                className="flex flex-1 cursor-pointer items-center bg-[#17624f] font-semibold text-white transition-colors hover:bg-[#104b3d] md:flex-none"
              >
                <Calendar className="h-5 w-5" />
                <span>Novo Agendamento</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Apointments userId={session?.user?.id!} />
        <Reminders userId={session?.user?.id!} />
      </section>
    </main>
  );
}
