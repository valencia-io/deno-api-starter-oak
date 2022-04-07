import {
  Context,
  CreateUser,
  LoginCredential,
  RefreshToken,
} from "./../types.ts";

import * as authService from "./../services/auth.service.ts";

export const register = async (ctx: Context) => {
  const request = ctx.request;
  const userData = (await request.body()).value as unknown as CreateUser;
  const user = await authService.registerUser(userData);
  ctx.response.body = user;
};

export const login = async (ctx: Context) => {
  const request = ctx.request;
  const credential = (await request.body()).value as unknown as LoginCredential;
  const token = await authService.loginUser(credential);
  ctx.response.body = token;
};

export const refreshToken = async (ctx: Context) => {
  const request = ctx.request;
  const data = (await request.body()).value as unknown as RefreshToken;

  const token = await authService.refreshToken(
    data["refresh_token"],
  );
  ctx.response.body = token;
};
