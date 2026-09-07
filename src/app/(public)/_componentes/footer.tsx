export default function Footer() {
  return (
    <footer className="border-t border-[#d9e8e1] bg-[#f4f8f6] py-7">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm text-[#71867f] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <p>
          &copy; {new Date().getFullYear()} OdontoPro. Todos os direitos
          reservados.
        </p>
        <div className="flex gap-5">
          <a href="#" className="transition-colors hover:text-[#17624f]">
            Política de Privacidade
          </a>
          <a href="#" className="transition-colors hover:text-[#17624f]">
            Termos de Serviço
          </a>
        </div>
      </div>
    </footer>
  );
}
