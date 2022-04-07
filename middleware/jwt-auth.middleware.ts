import { AuthUser, Context } from "./../types.ts";
import { getJwtPayload } from "../helpers/jwt.ts";
import { Middleware } from "https://deno.land/x/oak@v10.4.0/mod.ts";

/** *
 * JWTAuth middleware
 * Decode authorization bearer token
 * and attach as an user in application context
 */
const JWTAuthMiddleware: Middleware = async (
  ctx: Context,
  next,
) => {
  try {
    const authHeader = ctx.request.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace(/^bearer/i, "").trim();
      const user = await getJwtPayload(token);

      if (user) {
        ctx.user = user as AuthUser;
      }
    }
  } catch (err) {
    console.error(err);
  }

  await next();
};

export { JWTAuthMiddleware };
