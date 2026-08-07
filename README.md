# Lead Capture & Form Flow App

Aplicação web para captura e qualificação de leads através de formulários dinâmicos e interativos, integrada com Supabase.

## 🚀 Tecnologias

- **React 19** + **TypeScript**
- **Vite**
- **TanStack Router** (Roteamento baseado em arquivos)
- **Tailwind CSS v4**
- **Supabase** (`@supabase/supabase-js`)
- **React IMask** (Máscaras de entrada)

## 📋 Pré-requisitos

- Node.js (v18+ recomendado)
- Bun ou NPM / PNPM

## 🔧 Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as credenciais do seu projeto Supabase:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 🛠️ Como Executar

### 1. Instalar as dependências

```bash
bun install
# ou
npm install
```

### 2. Rodar em ambiente de desenvolvimento

```bash
bun run dev
# ou
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### 3. Scripts disponíveis

- `bun run dev`: Inicia o servidor de desenvolvimento Vite (porta 3000).
- `bun run generate-routes`: Gera o arquivo de rotas do TanStack Router.
- `bun run build`: Cria a build de produção.
- `bun run preview`: Visualiza a build de produção localmente.

## 📁 Estrutura do Projeto

```text
lead/
├── src/
│   ├── components/     # Componentes de formulário e UI (InitialBlock, QuestionSingle, QuestionMulti, FormContainer, etc.)
│   ├── context/        # Contextos React (FormState, Supabase, etc.)
│   ├── hooks/          # Custom hooks (ex: useFormFlow)
│   ├── lib/            # Clientes e utilitários (Supabase client)
│   ├── routes/         # Páginas e rotas (TanStack Router)
│   └── styles.css      # Estilos globais e Tailwind CSS
├── public/
├── index.html
├── package.json
└── vite.config.ts
```
