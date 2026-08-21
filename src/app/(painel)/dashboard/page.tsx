import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { ButtonCopyLink } from "./_components/button-copy-link";
import Reminders from "./_components/reminders";

export default async function DashboardPage() {
  const session = await getSession();
  return (
    <main>
      <div className=" flex justify-end items-center gap-4 md:justify-between">
        <h1 className="hidden md:block text-2xl font-bold">
          Dashboard Da Clínica
        </h1>
        <div className="space-x-2 flex items-center justify-end">
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
      </div>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-6">
        <div className="bg-red-200">Agenda</div>
        <Reminders />
      </section>
    </main>
  );
}
