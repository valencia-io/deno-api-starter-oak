import { Router } from "https://deno.land/x/oak@v10.4.0/mod.ts";

import * as authRoutes from "./auth.routes.ts";
import * as userRoutes from "./user.routes.ts";

const router: Router = new Router();

// router.get("", (ctx: Context) => {
//   ctx.response.body = "hello world";
// });

router
  .post("/login", (_, next) => next(), ...authRoutes.login)
  .post("/register", (_, next) => next(), ...authRoutes.register)
  .post("/token", (_, next) => next(), ...authRoutes.refreshToken);

router
  .get("/users", (_, next) => next(), ...userRoutes.getUsers)
  .get("/users/:id", (_, next) => next(), ...userRoutes.getUserById)
  .put("/users/:id", (_, next) => next(), ...userRoutes.updateUser)
  .delete("/users/:id", (_, next) => next(), ...userRoutes.deleteUser);

export { router };
