import { Context as OakContext } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { AuthUser } from "./../auth/auth-user.ts";

/**
 * Custom application context
 */
export class Context extends OakContext {
  user?: AuthUser;
}
