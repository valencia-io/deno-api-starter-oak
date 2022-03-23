import {
  create,
  getNumericDate,
  verify
} from "https://deno.land/x/djwt@v2.4/mod.ts";

import type { Payload, Header } from "https://deno.land/x/djwt@v2.4/mod.ts";
import { config } from "./../config/config.ts";

const {
  JWT_ACCESS_TOKEN_EXP,
  JWT_REFRESH_TOKEN_EXP,
} = config;

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);



const header: Header = {
  alg: "HS256",
  typ: "JWT",
};

const getAuthToken = (user: any) => {
  const payload: Payload = {
    iss: "deno-api",
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    exp: getNumericDate(new Date().getTime() + parseInt(JWT_ACCESS_TOKEN_EXP)),
  };

  return create(header, payload, key);
};

const getRefreshToken = (user: any) => {
  const payload: Payload = {
    iss: "deno-api",
    id: user.id,
    exp: getNumericDate(new Date().getTime() + parseInt(JWT_REFRESH_TOKEN_EXP)),
  };

  return create(header, payload, key);
};

const getJwtPayload = async (token: string): Promise<any | null> => {
  try {
    const payload = await verify(token, key);
    return payload;
  } catch (err) { }
  return null;
};

export { getAuthToken, getRefreshToken, getJwtPayload };
