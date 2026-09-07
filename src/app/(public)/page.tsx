import Footer from "./_componentes/footer";
import Header from "./_componentes/header";
import Hero from "./_componentes/hero";
import Professionals from "./_componentes/professionals";
import { getProfessionals } from "./_data-access/get-professionals";

export const metadata = {
  title: "OdontoPro - Encontre profissionais de odontologia",
  description:
    "Encontre profissionais de odontologia qualificados e agende consultas com facilidade.",
};
export const revalidate = 60;
export default async function Page() {
  const professionals = await getProfessionals();

  return (
    <div className="min-h-screen bg-[#f4f8f6] text-slate-950">
      <Header />
      <main>
        <Hero />
        <Professionals professionals={professionals || []} />
      </main>
      <Footer />
    </div>
  );
}
