import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { UserConfig } from 'vite'
import vercel from 'vite-plugin-vercel';

const config: UserConfig = {
  plugins: [react(), vike(), vercel()]
}

export default config
