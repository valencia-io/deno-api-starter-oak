import { Context } from "./../types.ts";
import { Middleware } from "https://deno.land/x/oak@v10.4.0/mod.ts";

/**
 * requestId middleware
 * attach requestId in request & response header
 */
const requestIdMiddleware: Middleware = async (ctx: Context, next) => {
  let requestId = ctx.request.headers.get("X-Response-Id") ||  globalThis.crypto.randomUUID()
  await next();
  /** add request id in response header */
  ctx.response.headers.set("X-Response-Id", requestId);
};

export { requestIdMiddleware };
