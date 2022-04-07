import {
  helpers,
  httpErrors,
  Status,
} from "https://deno.land/x/oak@v10.4.0/mod.ts";
import * as userService from "./../services/user.service.ts";
import { Context, UserRole } from "./../types.ts";
import { hasUserRole } from "../helpers/roles.ts";
export const getUsers = async (ctx: Context) => {
  const users = await userService.getUsers();
  ctx.response.body = users;
};

export const getUserById = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const user = await userService.getUserById(+id);
  ctx.response.body = user;
};
export const updateUser = async (ctx: Context) => {
  /** get user id from params */
  const params = helpers.getQuery(ctx, { mergeParams: true });
  const id = Number(params.id);

  /** auth user */
  const authUser = ctx.user;

  if (authUser) {
    if (id === authUser.id || hasUserRole(authUser, UserRole.ADMIN)) {
      const request = ctx.request;
      const userData = (await request.body()).value;
      const user = await userService.updateUser(+id, userData);
      ctx.response.body = user;
      return;
    }
  }

  throw new httpErrors.Forbidden("Forbidden user role");
};

/**
 * Delete user by admin user
 */
export const deleteUser = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  await userService.deleteUser(+id);
  ctx.response.status = Status.NoContent;
};
