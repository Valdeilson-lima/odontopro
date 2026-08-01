import { Button } from "@base-ui/react";
import Image from "next/image";
import image from "../../../../public/doctor-hero.png";

export default function Hero() {
  return (
    <section className="pt-5">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="flex-2 space-y-8 max-w-3xl flex flex-col items-center text-center md:text-left md:items-start">
            <h1 className="text-3xl lg:text-5xl font-bold max-w-2xl tracking-tight">
              Encontre os melhores profissionais em um único local!
            </h1>
            <p className="text-base lg:text-lg text-gray-600">
              Nos somos uma plataforma que conecta você com os melhores
              profissionais da área odontológica, garantindo qualidade e
              confiança em cada atendimento.
            </p>
            <Button className="w-full lg:w-fit bg-emerald-500 text-white px-4 py-2 lg:py-1 rounded hover:bg-emerald-600 transition-colors duration-300 cursor-pointer font-bold">
              Agende sua consulta
            </Button>
          </article>

          <div className="hidden md:block md:ml-8 lg:ml-16">
            <Image
              src={image}
              alt="Imagem do médico"
              width={340}
              height={400}
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  );
}
