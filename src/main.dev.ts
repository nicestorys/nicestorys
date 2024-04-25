import { initApp } from "./server/main";
import { serve } from "@hono/node-server";

const app = initApp(process.env);

serve({ fetch: app.fetch, port: 3000 });
