import type { Middleware } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import logger, { formatToAnsiColors } from "https://deno.land/x/garn_logger@0.0.16/mod.ts";

logger.use(formatToAnsiColors());

import { Context } from "./../types.ts";
const loggerMiddleware: Middleware = async (ctx: Context, next) => {
  await next();
  const reqTime = ctx.response.headers.get("X-Response-Time");
  const status = ctx.response.status;
  logger[status](ctx.request.method, ctx.request.url.pathname, reqTime);

};

export { loggerMiddleware };
