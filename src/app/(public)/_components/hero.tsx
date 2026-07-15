import { Button } from "@/components/ui/button";
import img from "../../../../public/doctor-hero.png";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white/10 backdrop-blur-sm border-b border-[#F0EDE8] mt-6">
      <div className="container mx-auto pt-20 px-6 md:px-0">
        <main className="flex  items-center justify-center">
          <article className="space-y-8 max-w-3xl flex flex-col justify-center flex-2">
            <h1 className="text-4xl lg:text-6xl font-bold max-w-2xl tracking-tight">
              Encontre os melhores profissionais em um único lugar
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Nos somos uma plataforma que conecta pacientes a profissionais de
              saúde bucal qualificados, oferecendo uma experiência conveniente e
              confiável para agendar consultas e tratamentos odontológicos.
            </p>
            <Button
              variant="default"
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-5 py-2 h-auto text-sm shadow-none rounded-xl font-bold transition-all duration-300 cursor-pointer mb-3 md:mb-0 md:w-fit"
            >
              Encontre uma Clinica
            </Button>
          </article>

          <div className="hidden md:block ml-10">
            <Image
              src={img}
              alt="Imagem ilustrativa"
              width={340}
              height={400}
              quality={100}
              priority
              className="object-contain "
            />
          </div>
        </main>
      </div>
    </section>
  );
}
