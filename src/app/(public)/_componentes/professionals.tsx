"use client";

import type { User } from "@/generated/prisma/client";
import { ArrowRight, MapPin, Stethoscope } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import foto from "../../../../public/foto1.png";
import { loginWithGitHub } from "../_actions/login";

interface ProfessionalsProps {
  professionals: User[];
}
export default function Professionals({ professionals }: ProfessionalsProps) {
  const { status } = useSession();

  async function handleLogin() {
    await loginWithGitHub("github");
  }

  return (
    <section id="profissionais" className="bg-[#f4f8f6] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold text-[#e77d52]">
              Rede OdontoPro
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#12352e] sm:text-4xl">
              Clínicas para cuidar do seu próximo sorriso
            </h2>
            <p className="mt-3 text-base leading-7 text-[#607770]">
              Compare as opções disponíveis e escolha o atendimento que faz
              sentido para você.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#607770]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dceee5] text-[#17624f]">
              <MapPin className="h-4 w-4" />
            </span>
            Atendimento perto de você
          </div>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {professionals.map((professional) => (
            <article
              key={professional.id}
              className="group flex min-h-64 flex-col rounded-2xl border border-[#d9e8e1] bg-white p-5 shadow-[0_16px_35px_-28px_#17483b] transition-all hover:-translate-y-1 hover:border-[#a9cbbc] hover:shadow-[0_20px_40px_-25px_#17483b]"
            >
              <div className="flex items-start justify-between">
                <Image
                  src={professional.image || foto}
                  alt={professional.name || "Profissional"}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
                <span className="rounded-full bg-[#e7f2ed] px-2.5 py-1 text-xs font-medium text-[#17624f]">
                  Disponível
                </span>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold text-[#12352e]">
                  {professional.name || "Clínica OdontoPro"}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[#71867f]">
                  <Stethoscope className="h-3.5 w-3.5" />
                  Clínica odontológica
                </p>
                <p className="mt-2 flex items-start gap-1.5 text-sm leading-5 text-[#71867f]">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#e77d52]" />
                  <span>
                    {professional.address || "Endereço não informado"}
                  </span>
                </p>
              </div>
              <Link
                href={`/clinica/${professional.id}`}
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#17624f] transition-colors group-hover:text-[#e77d52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17624f]"
              >
                Ver clínica{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </section>
        {professionals.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#b9d9ca] bg-white/60 px-6 py-10 text-center text-sm text-[#607770]">
            Novas clínicas estarão disponíveis em breve.
          </div>
        )}
      </div>
      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 lg:px-12">
        {status === "unauthenticated" && (
          <section className="flex flex-col justify-between gap-6 rounded-3xl bg-[#12352e] px-6 py-8 text-white sm:px-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                Você cuida de pessoas?
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-[#c5ddd3]">
                Faça parte de uma rede que aproxima bons profissionais de quem
                precisa de cuidado.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#f4c7a9] px-5 py-3 text-sm font-semibold text-[#6f3821] transition-colors hover:bg-[#f7d6bf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c7a9]"
            >
              Quero fazer parte <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        )}
      </div>
    </section>
  );
}
