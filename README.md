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

`src/pages/privacy.astro` é a fonte canônica da política pública. App e pacote de distribuição devem usar a URL dessa página e revisar suas declarações quando o app mudar. O texto inicial descreve a versão sem telemetria enviada ao desenvolvedor. Não vale para uma versão instrumentada.

Antes da publicação, Eduardo revisa nome, contato, texto e operação do suporte, inclusive fundamento e descarte de mensagens. Antes de ativar telemetria, a política precisa refletir a versão implementada, dados enviados, fornecedor/região, finalidade/fundamento, público, retenção, opção ligada por padrão, opt-out e exclusão realmente disponível. A preferência ligada não representa consentimento.

Configuração operacional remota não faz parte deste site. Foi retirada da integração do app em 01/10/2026. Links de suporte e privacidade não autorizam coleta.

## Publicação

Destino: repositório público `EduKegler/blackout-site`. URLs planejadas, ainda sem publicação conferida:

* `https://edukegler.github.io/blackout-site/`
* `https://edukegler.github.io/blackout-site/support/`
* `https://edukegler.github.io/blackout-site/privacy/`

Somente após autorização, instalar `deployment/pages.yml` em `.github/workflows/pages.yml`, marcar os dois aceites em `site.config.json`, fazer PR e configurar Settings → Pages → Source → GitHub Actions. Rodar o workflow manual. Ele só constrói e publica o site; não liga CI ou review do jogo.

O mecanismo remoto de publicação exige autorização específica durante a suspensão geral de CI/review. O template não roda enquanto estiver em `deployment/`. Sem domínio próprio ou compra de serviço.

Depois do deploy, conferir HTTPS e acesso sem login nas três URLs, links, contato e conteúdo. Registrar os endereços na BLACK-144 e entregar à distribuição e integração do app. Em App Store Connect, suporte fica em Support URL e política em Privacy Policy URL. A inclusão no app e no pacote de distribuição pertence às tasks desses componentes.

## Atualizar e reverter

Alterar o conteúdo por PR, rodar as verificações locais, mergear e executar o workflow manual. Alterar a data em `site.config.json` e a data exibida na política quando o texto mudar.

Para reverter, criar um PR com `git revert <commit>`, validar, mergear e publicar novamente. Não reescrever o histórico. Reverter conteúdo não substitui revisar se a política ainda corresponde ao app distribuído.

## Referências

Conferidas em 01/10/2026: [Astro no Pages](https://docs.astro.build/en/guides/deploy/github/), [disponibilidade do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) e [privacidade do GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
