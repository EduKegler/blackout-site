import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import site from '../site.config.json' with { type: 'json' };

const base = '/';
for (const route of ['index.html', 'support/index.html', 'privacy/index.html', '404.html']) {
  const html = await readFile(`dist/${route}`, 'utf8');
  assert.match(html, /<html lang="pt-BR"/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.ok(!/<script\b|<form\b/i.test(html), `${route}: script ou formulário inesperado`);
  for (const crawler of ['robots', 'googlebot', 'bingbot']) {
    assert.match(html, new RegExp(`<meta name="${crawler}" content="noindex, nofollow,`));
  }
  assert.ok(!html.includes('Prévia local'), `${route}: aviso de prévia no build aprovado`);
  if (route.startsWith('support/') || route.startsWith('privacy/')) {
    assert.ok(html.includes(`href="mailto:${site.email}"`), `${route}: contato ausente ${site.email}`);
  }
  for (const path of [base, `${base}support/`, `${base}privacy/`]) {
    assert.ok(html.includes(`href="${path}"`), `${route}: link ausente ${path}`);
  }
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
    assert.ok(match[1].startsWith(base), `Caminho fora da base: ${match[1]}`);
    const relative = match[1].slice(base.length);
    await readFile(`dist/${relative}${relative.endsWith('/') || !relative ? 'index.html' : ''}`);
  }
}
const files = await readdir('dist', { recursive: true });
assert.ok(!files.some(file => file.endsWith('.js')), 'JavaScript publicado no navegador');
assert.ok(!files.some(file => /sitemap|feed|rss/i.test(file)), 'Arquivo de descoberta publicado');
console.log('Quatro páginas verificadas: links/assets, bloqueios de indexação permanentes, sem sitemap, JavaScript ou formulário.');
