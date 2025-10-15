import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import sirv from 'sirv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const mountParentStatic = (): PluginOption => {
  const parent = resolve(__dirname, '..')
  const serveParent = sirv(parent, { dev: true, etag: true })
  const prefixes = ['/css/', '/images/', '/fonts/', '/js/']
  return {
    name: 'mount-parent-static',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? ''
        if (prefixes.some(prefix => url.startsWith(prefix))) {
          serveParent(req, res, next)
        } else {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    mountParentStatic()
  ],
  publicDir: false,
  server: {
    port: 5173,
    fs: {
      allow: [resolve(__dirname, '..')]
    }
  },
  build: {
    outDir: 'dist'
  }
})
