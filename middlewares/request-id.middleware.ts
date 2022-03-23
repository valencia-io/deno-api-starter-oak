import { Context } from "./../types.ts";
import { Middleware } from "https://deno.land/x/oak@v10.4.0/mod.ts";

/**
 * requestId middleware
 * attach requestId in request & response header
 */
const requestIdMiddleware: Middleware = async (ctx: Context, next) => {
  let requestId = ctx.request.headers.get("X-Response-Id");
  if (!requestId) {
    /** if request id not being set, set unique request id */
    requestId = globalThis.crypto.randomUUID()
    ctx.request.headers.set("X-Response-Id", requestId.toString());
  }
  await next();
  /** add request id in response header */
  ctx.response.headers.set("X-Response-Id", requestId);
};

export { requestIdMiddleware };
