export function Footer() {
  return (
    <footer className=" text-gray-600 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-xl">
          &copy; {new Date().getFullYear()} OdontoPro. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
