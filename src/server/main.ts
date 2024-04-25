import { z } from "zod";
import { Hono } from "hono";
import { routes } from "./router";

export function initApp(_env: typeof process.env) {
  const env = z
    .object({
      // TODO: define your env vars zod schema here
    })
    .parse(_env);

  const app = new Hono();
  app.route("/", routes());
  return app;
}
