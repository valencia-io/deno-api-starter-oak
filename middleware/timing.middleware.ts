import { Middleware } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { Context } from "./../types.ts";
const timingMiddleware: Middleware = async (ctx: Context, next) => {
  const start = performance.now();
  await next();
  const ms = Math.round(( performance.now() - start) * 100) / 100;

  ctx.response.headers.set("X-Response-Time", `${ms}ms`);

};

export { timingMiddleware };
