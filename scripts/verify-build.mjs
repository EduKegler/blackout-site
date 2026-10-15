import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import site from '../site.config.json' with { type: 'json' };

const base = '/';
const routes = ['index.html', 'support/index.html', 'privacy/index.html', '404.html', 'pt/index.html', 'pt/support/index.html', 'pt/privacy/index.html'];
for (const route of routes) {
  const html = await readFile(`dist/${route}`, 'utf8');
  const portuguese = route.startsWith('pt/');
  const prefix = portuguese ? `${base}pt/` : base;
  assert.match(html, portuguese ? /<html lang="pt-BR"/ : /<html lang="en"/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.ok(!/<script\b|<form\b/i.test(html), `${route}: script ou formulário inesperado`);
  for (const crawler of ['robots', 'googlebot', 'bingbot']) {
    assert.match(html, new RegExp(`<meta name="${crawler}" content="noindex, nofollow,`));
  }
  assert.ok(!html.includes('Prévia local'), `${route}: aviso de prévia no build aprovado`);
  if (/(^|\/)(support|privacy)\//.test(route)) {
    assert.ok(html.includes(`href="mailto:${site.email}"`), `${route}: contato ausente ${site.email}`);
  }
  for (const path of [prefix, `${prefix}support/`, `${prefix}privacy/`]) {
    assert.ok(html.includes(`href="${path}"`), `${route}: link ausente ${path}`);
  }
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
    assert.ok(match[1].startsWith(base), `Caminho fora da base: ${match[1]}`);
    const relative = match[1].slice(base.length);
    await readFile(`dist/${relative}${relative.endsWith('/') || !relative ? 'index.html' : ''}`);
  }
}
const ads = await readFile('dist/app-ads.txt', 'utf8');
assert.ok(ads.split('\n').includes('google.com, pub-4706417285476926, DIRECT, f08c47fec0942fa0'), 'app-ads.txt sem a linha do AdMob');
for (const route of ['privacy/index.html', 'pt/privacy/index.html']) {
  const html = await readFile(`dist/${route}`, 'utf8');
  assert.ok(!/posthog/i.test(html), `${route}: PostHog na política`);
  for (const term of ['GameAnalytics', 'AdMob']) assert.ok(html.includes(term), `${route}: falta ${term}`);
}
const files = await readdir('dist', { recursive: true });
assert.ok(!files.some(file => file.endsWith('.js')), 'JavaScript publicado no navegador');
assert.ok(!files.some(file => /sitemap|feed|rss/i.test(file)), 'Arquivo de descoberta publicado');
console.log('Sete páginas e o app-ads.txt verificados: links/assets, bloqueios de indexação permanentes, sem sitemap, JavaScript ou formulário.');
