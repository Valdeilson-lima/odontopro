import { subscriptionPlans } from "@/utils/plans";
import { HeartPulse } from "lucide-react";
import PlanCard from "./plan-card";

export default function PlansContent() {
  return (
    <section className="w-full space-y-8">
      <header className="relative overflow-hidden rounded-2xl border border-[#d9e8e1] bg-white px-5 py-7 shadow-[0_18px_45px_-35px_#17483b] sm:px-8">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-[#17624f]" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.08em] text-[#e77d52]">
            Cresça no seu ritmo
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#12352e] sm:text-4xl">
            Planos para uma clínica mais organizada
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#607770] sm:text-base">
            Escolha a estrutura que combina com o momento da sua clínica e tenha
            mais tempo para se concentrar no cuidado dos pacientes.
          </p>
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-[#607770]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f2ed] text-[#17624f]">
            <HeartPulse className="h-4 w-4" />
          </span>
          Sem contrato longo. Mude quando sua clínica evoluir.
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-[#b9d9ca] bg-[#f4f8f6] px-5 py-5 text-center text-sm text-[#607770] sm:px-8">
        <p className="font-semibold text-[#12352e]">
          Planos pensados para a rotina real da clínica.
        </p>
        <p className="mt-1">
          Os recursos da sua conta continuam disponíveis enquanto você escolhe o
          melhor plano.
        </p>
      </div>
    </section>
  );
}
