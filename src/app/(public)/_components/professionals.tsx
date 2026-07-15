import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import img from "../../../../public/foto1.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Professionals() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 pt-2 pb-4 sm:pb-0 sm:px-0 lg:px-0">
        <h2 className="text-3xl font-bold text-center mb-8">
          Clinicas Disponiveis
        </h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-0 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <CardContent className="p-0 ">
              <div className="relative h-48">
                <Image
                  src={img}
                  alt="Foto 1"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>

              <div className="p-4 space-y-4">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Clinica Saúde Prime</h3>
                    <div className="bg-emerald-800 w-3 h-3 rounded-full"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rua Exemplo, 123, Centro, Cajazeiras - PB
                  </p>
                </div>
                <Link href="/clinica/1">
                  <button className="bg-emerald-800 text-white py-2 px-4 rounded-md hover:bg-emerald-700 flex items-center justify-center w-full cursor-pointer transition-all duration-300 gap-2">
                    Agendar Consulta
                    <ArrowRight className="mr-2" />
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}
