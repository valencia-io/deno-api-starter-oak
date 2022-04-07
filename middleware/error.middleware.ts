import {
  isHttpError,
  Middleware,
  Status,
} from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { config } from "./../config/config.ts";
import { Context } from "./../types.ts";

export const errorMiddleware: Middleware = async (ctx: Context, next) => {
  try {
    await next();
  } catch (err) {
    console.error("errorMiddleware start");

    let message = err.message;
    const status = err.status || err.statusCode || Status.InternalServerError;

    /**
     * considering all unhandled errors as internal server error,
     * do not want to share internal server errors to
     * end user in non "development" mode
     */
    if (!isHttpError(err)) {
      message = config.ENV === "dev" || config.ENV === "development"
        ? message
        : "Internal Server Error";
    }

    if (config.ENV === "dev" || config.ENV === "development") {
      console.log(err);
    }

    ctx.response.status = status;
    ctx.response.body = { status, message };
    console.error("errorMiddleware end!");
  }
};
