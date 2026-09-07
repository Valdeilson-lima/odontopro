import { ArrowDown, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import image from "../../../../public/doctor-hero.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#d9e8e1] bg-[#e7f2ed] pt-24">
      <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#c8e3d7]/60 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#f4c7a9]/35 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pb-20">
        <article className="max-w-2xl py-8 lg:py-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b9d9ca] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#17624f] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Cuidado que começa pela escolha certa
          </div>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-[#12352e] sm:text-5xl lg:text-7xl">
            Seu sorriso merece uma boa conexão.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#49645d] sm:text-lg">
            Encontre clínicas odontológicas de confiança, conheça seus
            profissionais e escolha o melhor momento para cuidar de você.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#profissionais"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#17624f] px-5 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_#17624f] transition-colors hover:bg-[#104b3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17624f]"
            >
              Encontrar uma clínica
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-[#17624f] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17624f]"
            >
              Como funciona
              <ArrowDown className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-[#537168]">
            <ShieldCheck className="h-5 w-5 text-[#e77d52]" />
            Profissionais verificados pela OdontoPro
          </div>
        </article>

        <div className="relative mx-auto w-full max-w-md self-end lg:max-w-lg">
          <div className="absolute inset-x-8 bottom-3 h-8 rounded-full bg-[#7aa895]/30 blur-xl" />
          <div className="relative flex min-h-105 items-end justify-center overflow-hidden rounded-[2rem] border border-white/70 bg-[#cfe6db] px-8 pt-8 shadow-[0_24px_70px_-35px_#17483b] sm:min-h-125">
            <Image
              src={image}
              alt="Profissional de odontologia sorrindo"
              width={440}
              height={520}
              className="h-auto w-full max-w-[25rem] object-contain object-bottom"
              quality={100}
              priority
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-lg sm:left-0">
            <p className="text-2xl font-semibold tracking-tight text-[#12352e]">
              + cuidado
            </p>
            <p className="text-xs text-[#6a8179]">em cada atendimento</p>
          </div>
        </div>
      </div>
      <div
        id="como-funciona"
        className="relative mx-auto flex max-w-7xl items-center gap-3 px-5 pb-7 text-xs font-medium text-[#6a8179] sm:px-8 lg:px-12"
      >
        <span className="h-px w-8 bg-[#a9cbbc]" />
        Escolha. Agende. Respire melhor.
      </div>
    </section>
  );
}
