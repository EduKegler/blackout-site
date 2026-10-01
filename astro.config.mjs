import { defineConfig } from 'astro/config';
import site from './site.config.json' with { type: 'json' };

export default defineConfig({
  site: site.owner ? `https://${site.owner.toLowerCase()}.github.io` : undefined,
  base: `/${site.repository}`,
  output: 'static',
  trailingSlash: 'always',
});
