# Voidy

Site de início, suporte e privacidade. Astro gera HTML e CSS estáticos. Não há JavaScript no navegador, fontes externas, analytics ou backend.

## Rodar

Node 22.12 ou superior.

```sh
npm ci
npm run dev
```

Abra `http://localhost:4321/`.

```sh
npm run check
npm run build:preview
npm run verify
npm run preview
```

`build:preview` serve somente para revisão local. `build` exige responsável, contato, autorização de publicação e revisão da política em `site.config.json`. Não publique uma prévia.

## Conteúdo e política

`src/pages/privacy.astro` (inglês, o padrão) e `src/pages/pt/privacy.astro` (português) são a fonte da política pública, e o suporte e o início seguem o mesmo par. O texto vem do código e dos SDKs do jogo, no iPhone, iPad e Android: GameAnalytics e Sentry só com o aceite da primeira abertura, AdMob com o pedido de rastreamento da Apple para adultos no iOS e sem personalização no Android, idade da primeira abertura, compra Sem anúncios e, no Android, Unity IAP. A política precisa bater com a Segurança dos dados do Google Play. Quando o jogo mudar o que coleta ou mostra, revise os dois idiomas no mesmo PR e mude a data em `site.config.json`.

Antes da publicação, Eduardo revisa nome, contato, texto e operação do suporte, inclusive fundamento e descarte de mensagens.

`public/app-ads.txt` leva a linha do AdMob. O AdMob procura o arquivo um nível de subdomínio acima do site do desenvolvedor, então para `voidy.kegler.dev` ele lê `kegler.dev/app-ads.txt`: o arquivo da raiz mora no site pessoal e precisa da mesma linha. [Doc do Google](https://support.google.com/admob/answer/9363762).

Configuração operacional remota não faz parte deste site. Foi retirada da integração do app em 01/10/2026. Links de suporte e privacidade não autorizam coleta.

## Publicação

Destino: repositório público `EduKegler/blackout-site`, no domínio próprio `voidy.kegler.dev`:

* `https://voidy.kegler.dev/`
* `https://voidy.kegler.dev/support/`
* `https://voidy.kegler.dev/privacy/`
* as mesmas três em português, sob `/pt/`
* `https://voidy.kegler.dev/app-ads.txt`

Eduardo aprovou a política e a publicação em 01/10/2026. O workflow `.github/workflows/pages.yml` roda somente por pedido manual, depois do merge na main. Settings → Pages → Source usa GitHub Actions. Ele só constrói e publica o site; não liga CI ou review do jogo.

Os aceites, o domínio e o contato estão registrados em `site.config.json`. O site fica na raiz do domínio, sem prefixo de repositório.

O domínio vem de Settings → Pages → Custom domain, não de arquivo `CNAME`: com publicação por GitHub Actions o arquivo é ignorado. O DNS do `kegler.dev` fica na Vercel, com `CNAME voidy -> edukegler.github.io`. Com o domínio configurado, o endereço antigo em `edukegler.github.io/blackout-site/` redireciona para ele.

Depois do deploy, conferir HTTPS e acesso sem login nas três URLs, links, contato e conteúdo. Registrar os endereços na BLACK-144 e entregar à distribuição e integração do app. Em App Store Connect, suporte fica em Support URL e política em Privacy Policy URL. A inclusão no app e no pacote de distribuição pertence às tasks desses componentes.

## Atualizar e reverter

Alterar o conteúdo por PR, rodar as verificações locais, mergear e executar o workflow manual. Alterar a data em `site.config.json` quando o texto mudar.

Para reverter, criar um PR com `git revert <commit>`, validar, mergear e publicar novamente. Não reescrever o histórico. Reverter conteúdo não substitui revisar se a política ainda corresponde ao app distribuído.

## Indexação

Todas as páginas, inclusive a 404, recebem `noindex`, `nofollow`, `nosnippet`, `noimageindex` e limites zero de prévia. Também há instruções explícitas para Google e Bing e pedido de não arquivar onde suportado. Isso independe dos aceites de publicação. Não há sitemap, feed, dados estruturados ou divulgação em mecanismos de busca. Links externos não enviam o endereço da página como referrer.

Essas regras pedem exclusão aos robôs que as respeitam. O site e seu código são públicos; não há garantia de acesso apenas por link, bloqueio de robôs hostis ou proteção por senha. GitHub Pages não oferece configuração de headers HTTP personalizados para acrescentar `X-Robots-Tag` neste projeto.

Não bloquear buscadores com `Disallow`: eles precisam ler o HTML para reconhecer `noindex`, ou o endereço ainda pode aparecer em resultados. Por isso o site não publica `robots.txt`. [Google: noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) e [localização do robots.txt](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec), conferidos em 01/10/2026.

## Referências

Conferidas em 01/10/2026: [Astro no Pages](https://docs.astro.build/en/guides/deploy/github/), [disponibilidade do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) e [privacidade do GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
