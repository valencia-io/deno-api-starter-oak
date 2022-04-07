import { httpErrors, Middleware } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { Context, UserRole } from "./../types.ts";
import { hasUserRole } from "../helpers/roles.ts";

/**
 * has user role middleware
 * checks authorization for context user, user roles
 */
const userGuard = (roles?: UserRole | UserRole[]) => {
  const middleware: Middleware = async (ctx: Context, next) => {
    // if auth user not found, throw error
    const { user } = ctx;
    if (!user) {
      throw new httpErrors.Unauthorized("Unauthorized user");
    }

    //if roles specified, then check auth user's roles
    if (roles) {
      const isRoleMatched = hasUserRole(user, roles);

      //if no role mached throw forbidden error
      if (!isRoleMatched) {
        throw new httpErrors.Forbidden("Forbidden user role");
      }
    }

    await next();
  };
  return middleware;
};

export { userGuard };
