# Voidy

Home, support and privacy pages for Voidy. Astro generates static HTML and CSS. There is no JavaScript in the browser, no external fonts, no analytics and no backend.

## Run

Node 22.12 or later.

```sh
npm ci
npm run dev
```

Open `http://localhost:4321/`.

```sh
npm run check
npm run build:preview
npm run verify
npm run preview
```

`build:preview` is for local review only. `build` requires an owner, a contact, publication approval and a policy review in `site.config.json`. Do not publish a preview build.

## Content and policy

`src/pages/privacy.astro` (English, the default) and `src/pages/pt/privacy.astro` (Portuguese) are the source of the public policy, and the support and home pages follow the same pair. The text comes from the game's code and SDKs on iPhone, iPad and Android: GameAnalytics and Sentry only after consent on first launch, AdMob with Apple's tracking prompt for adults on iOS and without personalization on Android, age on first launch, the No ads purchase and, on Android, Unity IAP. The policy has to match the Google Play Data safety form. When the game changes what it collects or shows, update both languages in the same PR and change the date in `site.config.json`.

Before publishing, Eduardo reviews the name, contact, text and how support runs, including the legal basis and deletion of messages.

`public/app-ads.txt` holds the AdMob line. AdMob looks for the file one subdomain level above the developer site, so for `voidy.kegler.dev` it reads `kegler.dev/app-ads.txt`: the root file lives on the personal site and needs the same line. [Google docs](https://support.google.com/admob/answer/9363762).

Remote operational config is not part of this site. It was removed from the app integration on 2026-10-01. Support and privacy links do not authorize any data collection.

## Publishing

Target: the public repository `EduKegler/blackout-site`, on the custom domain `voidy.kegler.dev`:

* `https://voidy.kegler.dev/`
* `https://voidy.kegler.dev/support/`
* `https://voidy.kegler.dev/privacy/`
* the same three in Portuguese, under `/pt/`
* `https://voidy.kegler.dev/app-ads.txt`

Eduardo approved the policy and publication on 2026-10-01. The `.github/workflows/pages.yml` workflow only runs on manual dispatch, after merging to main. Settings → Pages → Source uses GitHub Actions. It only builds and publishes the site; it does not run the game's CI or review.

Approvals, domain and contact are recorded in `site.config.json`. The site sits at the domain root, with no repository prefix.

The domain comes from Settings → Pages → Custom domain, not from a `CNAME` file: with GitHub Actions publishing, that file is ignored. DNS for `kegler.dev` is on Vercel, with `CNAME voidy -> edukegler.github.io`. With the domain set, the old address at `edukegler.github.io/blackout-site/` redirects to it.

After deploying, check HTTPS and logged-out access on the three URLs, plus links, contact and content. Record the URLs in BLACK-144 and hand them to the app's distribution and integration. In App Store Connect, support goes in Support URL and the policy in Privacy Policy URL. Adding them to the app and the distribution package belongs to those components' tasks.

## Update and revert

Change content through a PR, run the local checks, merge and run the manual workflow. Change the date in `site.config.json` when the text changes.

To revert, open a PR with `git revert <commit>`, validate, merge and publish again. Do not rewrite history. Reverting content does not replace checking that the policy still matches the shipped app.

## Indexing

Every page, including the 404, gets `noindex`, `nofollow`, `nosnippet`, `noimageindex` and zero preview limits. There are also explicit rules for Google and Bing, and a no-archive request where supported. This does not depend on the publication approvals. There is no sitemap, feed, structured data or search engine submission. External links do not send the page address as referrer.

These rules ask robots that honor them to stay out. The site and its code are public; there is no link-only access guarantee, no blocking of hostile robots and no password protection. GitHub Pages does not offer custom HTTP headers to add `X-Robots-Tag` for this project.

Do not block search engines with `Disallow`: they need to read the HTML to see `noindex`, or the address can still show up in results. That is why the site does not publish a `robots.txt`. [Google: noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) and [robots.txt location](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec), checked on 2026-10-01.

## References

Checked on 2026-10-01: [Astro on Pages](https://docs.astro.build/en/guides/deploy/github/), [Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) and [GitHub privacy](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
