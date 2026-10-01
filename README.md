# Blackout.io

Site de início, suporte e privacidade. Astro gera HTML e CSS estáticos. Não há JavaScript no navegador, fontes externas, analytics ou backend.

## Rodar

Node 22.12 ou superior.

```sh
npm ci
npm run dev
```

Abra `http://localhost:4321/blackout-site/`.

```sh
npm run check
npm run build:preview
npm run verify
npm run preview
```

`build:preview` serve somente para revisão local. `build` exige responsável, contato, autorização de publicação e revisão da política em `site.config.json`. Não publique uma prévia.

## Conteúdo e política

`src/pages/privacy.astro` é a fonte canônica da política pública. App e pacote de distribuição devem usar a URL dessa página e revisar suas declarações quando o app mudar. A política cobre armazenamento local e coleta de teste via PostHog Cloud US, com ID persistente por instalação e opt-out. Não autoriza coleta de produção nem promete anonimização ou exclusão física em prazo não confirmado.

Antes da publicação, Eduardo revisa nome, contato, texto e operação do suporte, inclusive fundamento e descarte de mensagens. Antes de ativar telemetria, a política precisa refletir a versão implementada, dados enviados, fornecedor/região, finalidade/fundamento, público, retenção, opção ligada por padrão, opt-out e exclusão realmente disponível. A preferência ligada não representa consentimento.

Configuração operacional remota não faz parte deste site. Foi retirada da integração do app em 01/10/2026. Links de suporte e privacidade não autorizam coleta.

## Publicação

Destino: repositório público `EduKegler/blackout-site`:

* `https://edukegler.github.io/blackout-site/`
* `https://edukegler.github.io/blackout-site/support/`
* `https://edukegler.github.io/blackout-site/privacy/`

Eduardo aprovou a política e a publicação em 01/10/2026. O workflow `.github/workflows/pages.yml` roda somente por pedido manual, depois do merge na main. Settings → Pages → Source usa GitHub Actions. Ele só constrói e publica o site; não liga CI ou review do jogo.

Os aceites estão registrados em `site.config.json`. Sem domínio próprio ou compra de serviço.

Depois do deploy, conferir HTTPS e acesso sem login nas três URLs, links, contato e conteúdo. Registrar os endereços na BLACK-144 e entregar à distribuição e integração do app. Em App Store Connect, suporte fica em Support URL e política em Privacy Policy URL. A inclusão no app e no pacote de distribuição pertence às tasks desses componentes.

## Atualizar e reverter

Alterar o conteúdo por PR, rodar as verificações locais, mergear e executar o workflow manual. Alterar a data em `site.config.json` quando o texto mudar.

Para reverter, criar um PR com `git revert <commit>`, validar, mergear e publicar novamente. Não reescrever o histórico. Reverter conteúdo não substitui revisar se a política ainda corresponde ao app distribuído.

## Indexação

Todas as páginas, inclusive a 404, recebem `noindex`, `nofollow`, `nosnippet`, `noimageindex` e limites zero de prévia. Também há instruções explícitas para Google e Bing e pedido de não arquivar onde suportado. Isso independe dos aceites de publicação. Não há sitemap, feed, dados estruturados ou divulgação em mecanismos de busca. Links externos não enviam o endereço da página como referrer.

Essas regras pedem exclusão aos robôs que as respeitam. O site e seu código são públicos; não há garantia de acesso apenas por link, bloqueio de robôs hostis ou proteção por senha. GitHub Pages não oferece configuração de headers HTTP personalizados para acrescentar `X-Robots-Tag` neste projeto.

Não bloquear buscadores com `Disallow`: eles precisam ler o HTML para reconhecer `noindex`, ou o endereço ainda pode aparecer em resultados. `robots.txt` vale na raiz do host; um arquivo em `/blackout-site/robots.txt` não controlaria esse site de projeto. Não criar outro repo ou alterar outros sites para fingir essa proteção. [Google: noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) e [localização do robots.txt](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec), conferidos em 01/10/2026.

## Referências

Conferidas em 01/10/2026: [Astro no Pages](https://docs.astro.build/en/guides/deploy/github/), [disponibilidade do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) e [privacidade do GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
