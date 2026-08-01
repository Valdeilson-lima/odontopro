import Header from "./_componentes/header";
import Hero from "./_componentes/hero";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Hero />
      </div>
    </div>
  );
}
