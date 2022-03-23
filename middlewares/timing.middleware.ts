import { Middleware } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { Context } from "./../types.ts";
const timingMiddleware: Middleware = async (ctx: Context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
};

export { timingMiddleware };
