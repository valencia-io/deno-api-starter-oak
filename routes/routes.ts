import { Router } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { UserRole } from "./../types.ts";
import { userGuard } from "./../middleware/middleware.ts";

import * as authRoutes from "./auth.routes.ts";
import * as userRoutes from "./user.routes.ts";

const router: Router = new Router();

router.get("/health", (ctx) => {
  ctx.response.body = "everything is fine";
  ctx.response.status = 200;
});

router
  .post("/login", authRoutes.login)
  .post("/register", authRoutes.register)
  .post("/token", authRoutes.refreshToken);

router
  .get("/users", userGuard(UserRole.ADMIN), userRoutes.getUsers)
  .get("/users/:id", userGuard(UserRole.ADMIN), userRoutes.getUserById)
  .put("/users/:id", userGuard(UserRole.ADMIN), userRoutes.updateUser)
  .delete("/users/:id", userGuard(UserRole.ADMIN), userRoutes.deleteUser);

export { router };
