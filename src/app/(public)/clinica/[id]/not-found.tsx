import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-medium text-muted-foreground">Erro 404</p>
      <h1 className="text-3xl font-bold tracking-tight">
        Clínica não encontrada
      </h1>
      <p className="max-w-md text-muted-foreground">
        Não encontramos o profissional ou clínica que você está procurando.
      </p>
      <Link
        href="/"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Voltar para o início
      </Link>
    </main>
  );
}
