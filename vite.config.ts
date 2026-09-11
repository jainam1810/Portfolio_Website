import path from 'node:path'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Preloads the three faces the first screen needs.
 *
 * Without this the browser only discovers them after it has parsed the CSS, so
 * the first paint uses whatever sans-serif the operating system supplies - which
 * is a different font on macOS, Windows and Android. Preloading starts them in
 * parallel with the stylesheet, so they are usually there before first paint.
 *
 * The tags are written at build time because Vite hashes font filenames; a
 * hardcoded path in index.html would go stale on every build.
 */
function preloadFonts(): Plugin {
  const critical = [
    'anton-latin-400-normal',
    'geist-latin-wght-normal',
    'jetbrains-mono-latin-wght-normal',
  ]

  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const tags = Object.keys(ctx.bundle)
          .filter((file) => file.endsWith('.woff2'))
          .filter((file) => critical.some((name) => file.split('/').pop()!.startsWith(name)))
          .map((file) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              href: `/${file}`,
              // Fonts are always fetched anonymously, so this is required even
              // same-origin or the preload is discarded and fetched twice.
              crossorigin: '',
            },
            injectTo: 'head-prepend' as const,
          }))
        return { html, tags }
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  build: { outDir: 'build', sourcemap: false },
})
