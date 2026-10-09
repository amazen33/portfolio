// Static-first build (docs/adr/0001-hosting.md). Edge features live in /functions (Cloudflare Pages Functions).
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://amazen33.dev',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'never'
  },
  // Emit every script as a file so the Content Security Policy can forbid inline scripts (public/_headers).
  vite: {
    build: { assetsInlineLimit: 0 }
  }
});
