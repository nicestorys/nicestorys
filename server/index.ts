// This file isn't processed by Vite, see https://github.com/vikejs/vike/issues/562
// Consequently:
//  - When changing this file, you needed to manually restart your server for your changes to take effect.
//  - To use your environment variables defined in your .env files, you need to install dotenv, see https://vike.dev/env
//  - To use your path aliases defined in your vite.config.js, you need to tell Node.js about them, see https://vike.dev/path-aliases

// If you want Vite to process your server code then use one of these:
//  - vavite (https://github.com/cyco130/vavite)
//     - See vavite + Vike examples at https://github.com/cyco130/vavite/tree/main/examples
//  - vite-node (https://github.com/antfu/vite-node)
//  - HatTip (https://github.com/hattipjs/hattip)
//    - You can use Bati (https://batijs.dev/) to scaffold a Vike + HatTip app. Note that Bati generates apps that use the V1 design (https://vike.dev/migration/v1-design) and Vike packages (https://vike.dev/vike-packages)
import { Hono } from 'hono'
import { serve } from "@hono/node-server"
import { renderPage } from 'vike/server'
import { serveStatic } from '@hono/node-server/serve-static'
import { compress } from 'hono/compress'

const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 3000

const app = new Hono()
app.use(compress())

if (isProduction) {
  app.use("/*", serveStatic({
    root: `./dist/client/`,
  }))
}
app.get("*", async (c, next) => {
  const pageContextInit = {
    urlOriginal: c.req.url
  }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext
  if (!httpResponse) {
    return next()
  } else {
    const { body, statusCode, headers } = httpResponse
    headers.forEach(([name, value]) => c.header(name, value))
    c.status(statusCode)

    return c.body(body)
  }
})

if (isProduction) {
  console.log(`Server listening on http://localhost:${port}`);
  serve({
      fetch: app.fetch,
      port: port
  });
}

export default app