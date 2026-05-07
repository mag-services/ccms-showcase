import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * GitHub Pages project URL: https://<owner>.github.io/<repo>/
 * - In GitHub Actions, `GITHUB_REPOSITORY` sets this automatically.
 * - Override anytime: `VITE_BASE_PATH=/my-repo/ npm run build`
 */
function productionBase(): string {
  const explicit = process.env.VITE_BASE_PATH?.trim()
  if (explicit) {
    const lead = explicit.startsWith('/') ? explicit : `/${explicit}`
    return lead.endsWith('/') ? lead : `${lead}/`
  }
  const gh = process.env.GITHUB_REPOSITORY
  if (gh?.includes('/')) {
    return `/${gh.split('/')[1]}/`
  }
  return '/ccms-showcase/'
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? productionBase() : '/',
  plugins: [react(), tailwindcss()],
}))
