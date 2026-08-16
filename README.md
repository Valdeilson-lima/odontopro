# OdontoPro

Plataforma para clínicas odontológicas: página pública da clínica com agendamento de consultas, painel administrativo com gestão de serviços, perfil e cadastro de clínicas.

## Tecnologias

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Prisma ORM 7](https://www.prisma.io) + PostgreSQL
- [NextAuth 5](https://next-auth.js.org) (autenticação via GitHub)
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)

## Pré-requisitos

- Node.js 20+
- PostgreSQL em execução

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo `.env` a partir do exemplo:

   ```bash
   cp .env.example .env
   ```

3. Preencha as variáveis de ambiente (veja `.env.example`). Para o login com GitHub, crie um OAuth App em GitHub → Settings → Developer settings → OAuth Apps.

4. Configure o banco de dados e rode as migrações:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando             | Descrição                            |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Inicia o servidor de desenvolvimento |
| `npm run build`     | Gera a build de produção             |
| `npm run start`     | Inicia a build de produção           |
| `npx prisma studio` | Abre o Prisma Studio para o banco    |

## Estrutura

```
src/
├── app/
│   ├── (painel)/       # Área administrativa (dashboard, serviços, perfil)
│   └── (public)/       # Páginas públicas (home, página da clínica com agendamento)
│   └── api/            # Rotas de API (agendamentos, etc.)
├── components/         # Componentes UI (shadcn)
└── lib/                # Utilitários (auth, prisma)
```

## Variáveis de ambiente

| Variável              | Descrição                                         |
| --------------------- | ------------------------------------------------- |
| `DATABASE_URL`        | URL de conexão do PostgreSQL                      |
| `BETTER_AUTH_SECRET`  | Segredo para assinatura de sessões/tokens         |
| `AUTH_GITHUB_ID`      | Client ID do OAuth App do GitHub                  |
| `AUTH_GITHUB_SECRET`  | Client Secret do OAuth App do GitHub              |
| `NEXT_PUBLIC_API_URL` | URL pública da API (ex.: `http://localhost:3000`) |
