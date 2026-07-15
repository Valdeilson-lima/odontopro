# OdontoPro

Sistema de gestão odontológica desenvolvido com Next.js.

## Stack

- **Framework:** Next.js 16 + React 19
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 4 + shadcn/ui
- **Banco de Dados:** MySQL via Prisma 7 + MariaDB
- **Autenticação:** NextAuth 5
- **Pagamentos:** Stripe (subscription)

## Funcionalidades

- Página pública com apresentação da clínica
- Dashboard administrativo
- Gerenciamento de serviços odontológicos
- Agendamento de consultas
- Sistema de planos (BASIC / PROFESSIONAL)
- Perfil do usuário
- Autenticação com provedores OAuth e WebAuthn

## Pré-requisitos

- Node.js 20+
- MySQL

## Como Rodar

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais do banco e chaves de API

# Rodar migrations
npx prisma migrate dev

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando         | Descrição                          |
| --------------- | ---------------------------------- |
| `npm run dev`   | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção                  |
| `npm run start` | Inicia servidor de produção        |

## Commits

Este projeto usa [Conventional Commits](https://www.conventionalcommits.org/). Commits que não seguirem o padrão serão rejeitados pelos hooks do Husky.

```
feat: adicionar nova funcionalidade
fix: corrigir bug
chore: tarefa de manutenção
docs: atualizar documentação
```

## Projeto

```
src/
├── app/
│   ├── (public)/          # Página pública (landing page)
│   └── (painel)/
│       └── dashboard/     # Painel administrativo
│           ├── services/
│           ├── plans/
│           └── profile/
├── components/ui/         # Componentes shadcn/ui
└── lib/                   # Utilitários e configurações
prisma/
└── schema.prisma          # Schema do banco de dados
```
