import site from '../site.config.json' with { type: 'json' };

const missing = ['domain', 'responsible', 'email'].filter(key => !site[key]);
if (site.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email)) missing.push('email válido');
if (!site.publicationApproved) missing.push('autorização de publicação');
if (!site.privacyReviewed) missing.push('revisão da política para a versão distribuída');
if (missing.length) {
  console.error(`Publicação bloqueada: ${missing.join(', ')}. Use npm run build:preview para revisão local.`);
  process.exit(1);
}
