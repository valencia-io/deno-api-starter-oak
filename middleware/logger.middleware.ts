import type { Middleware } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import logger, {
  formatToAnsiColors,
} from "https://deno.land/x/garn_logger@0.0.20/mod.ts";
import * as colors from "https://deno.land/std@0.133.0/fmt/colors.ts";

logger.use(formatToAnsiColors({ useColor: true, timestamp: false }));

import { Context } from "./../types.ts";
const loggerMiddleware: Middleware = async (ctx: Context, next) => {
  await next();
  const reqTime = ctx.response.headers.get("X-Response-Time");
  const status = ctx.response.status;
  logger[status](colors.cyan(ctx.request.method), colors.bgCyan(ctx.request.url.pathname), reqTime);
};

export { loggerMiddleware };
