# Integração de leads — 07/10/2026

O formulário usa `/api/lead` de mesma origem. POST cria e emite cookie HttpOnly assinado; PATCH exige esse cookie e o mesmo ID. Os dados privados do Supabase ficam no servidor. Vite e Vercel usam o mesmo handler. Saves são aguardados; erro conserva respostas e impede avanço/conclusão falsa.

## Desenvolvimento de teste
Configuração separada já criada em .env.staging.local (ignorada). Rodar `node node_modules/vite/bin/vite.js --mode staging --host 127.0.0.1 --port 3000 --strictPort`. Não iniciar staging por Bun que pode pré-carregar .env original. `npm test`, `npm run typecheck`, `npm run build` verificam código; tests controlam somente a resposta do banco. O fluxo completo já passou com Supabase staging real e leitura pela UZZINA.

## Publicação

Domínio confirmado: `https://lead.cnvt.com.br`. Usar `LEADS_ORIGIN=https://lead.cnvt.com.br`, sem barra final.
Configurar SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, LEAD_SESSION_SECRET (aleatório >=32 caracteres) e LEADS_ORIGIN (origem HTTPS exata sem barra final) no servidor. Não usar prefixo VITE_ para segredos. Todos os arquivos `.env*` ficam fora do Git; os nomes necessários estão descritos acima. Para desenvolvimento habitual, usar .env.local equivalente; .env original não foi alterado.

Primeiro publicar/testar este formulário/API, depois fechar permissões da tabela no pacote compatível da UZZINA. Migration `20261007232335_external_leads_authorization.sql` depende de is_active_member e foi aplicada SOMENTE no staging. API nunca lê a tabela para visitante e não aceita ID como autorização isolada. O SELECT privado continua disponível a membros ativos da equipe.

Não há retomada após reload/entre dispositivos. Cookie24h autoriza um formulário ativo por navegador. Sem revogação individual ou idempotência da criação; resposta de POST perdida pode deixar registro incompleto/duplicado no retry. Origin não bloqueia bots: revisar proteção de abuso/WAF na publicação. Não anunciar produção protegida enquanto a versão antiga continuar publicada.

Relatório completo: `/Users/euchicosousa/vercel/uzzina/docs/audits/2026-10-07-passo-2-leads-externos.md`.


## Chave moderna —07/10
A variável SUPABASE_SERVICE_ROLE_KEY aceita uma secret key moderna sb_secret_... (nome mantido para evitar migração de configuração). O handler envia essa chave somente em apikey, sem apresentá-la como JWT em Authorization. Chaves legadas continuam compatíveis apenas onde ainda estejam habilitadas, como o staging desta rodada. Não reativar legado no projeto atual. O arquivo privado .env.vercel-production.local foi preparado com novo LEAD_SESSION_SECRET; atualizar a chave a partir de .env.local antes de importar/publicar.
