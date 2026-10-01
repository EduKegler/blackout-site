import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import site from '../site.config.json' with { type: 'json' };

const base = `/${site.repository}/`;
for (const route of ['', 'support/', 'privacy/']) {
  const html = await readFile(`dist/${route}index.html`, 'utf8');
  assert.match(html, /<html lang="pt-BR"/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.ok(!/<script\b|<form\b/i.test(html), `${route}: script ou formulário inesperado`);
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
console.log('Três páginas verificadas: links e assets na base, HTML em português, sem JavaScript ou formulário.');
