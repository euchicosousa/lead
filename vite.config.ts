import { defineConfig, loadEnv } from 'vite'
import { leadApi } from './server/dev-api.ts'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "LEAD_SESSION_SECRET", "LEADS_ORIGIN"]) {
    if (env[key]) process.env[key] = env[key];
  }
  return {
  resolve: { tsconfigPaths: true },
  plugins: [
    leadApi(),
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
  ],
}})

export default config
