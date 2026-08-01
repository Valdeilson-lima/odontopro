import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import foto from "../../../../public/foto1.png";

export default function Professionals() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-12 text-center">
          Clinicas Disponíveis
        </h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-0 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="">
                <div className="relative h-48">
                  <Image
                    src={foto}
                    alt="Foto do profissional"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="">Clinica Centro</h3>
                    <p className="text-sm text-gray-500">
                      Av. Paulista, 1000, São Paulo - SP
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>

                <Link
                  href="/clinica/centro"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white text-center py-3 md:py-2 px-4 rounded-md flex items-center justify-center font-medium md:text-base md:font-bold transition-all duration-200"
                >
                  Agendar Horário
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="p-0 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="">
                <div className="relative h-48">
                  <Image
                    src={foto}
                    alt="Foto do profissional"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="">Clinica Centro</h3>
                    <p className="text-sm text-gray-500">
                      Av. Paulista, 1000, São Paulo - SP
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>

                <Link
                  href="/clinica/centro"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white text-center py-3 md:py-2 px-4 rounded-md flex items-center justify-center font-medium md:text-base md:font-bold transition-all duration-200"
                >
                  Agendar Horário
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="p-0 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="">
                <div className="relative h-48">
                  <Image
                    src={foto}
                    alt="Foto do profissional"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="">Clinica Centro</h3>
                    <p className="text-sm text-gray-500">
                      Av. Paulista, 1000, São Paulo - SP
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>

                <Link
                  href="/clinica/centro"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white text-center py-3 md:py-2 px-4 rounded-md flex items-center justify-center font-medium md:text-base md:font-bold transition-all duration-200"
                >
                  Agendar Horário
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="p-0 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <CardContent className="p-0">
              <div className="">
                <div className="relative h-48">
                  <Image
                    src={foto}
                    alt="Foto do profissional"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="">Clinica Centro</h3>
                    <p className="text-sm text-gray-500">
                      Av. Paulista, 1000, São Paulo - SP
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>

                <Link
                  href="/clinica/centro"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white text-center py-3 md:py-2 px-4 rounded-md flex items-center justify-center font-medium md:text-base md:font-bold transition-all duration-200"
                >
                  Agendar Horário
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}
