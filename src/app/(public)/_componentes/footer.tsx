export default function Footer() {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-800 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} OdontoPro. Todos os direitos
            reservados.
          </p>
          <div className="flex flex-col md:flex-row text-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
            <a
              href="#"
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
            >
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
