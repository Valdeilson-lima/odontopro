import Footer from "./_componentes/footer";
import Header from "./_componentes/header";
import Hero from "./_componentes/hero";
import Professionals from "./_componentes/professionals";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Hero />
        <Professionals />

        <Footer />
      </div>
    </div>
  );
}
