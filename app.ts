import { Application } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import * as middleware from "./middlewares/middlewares.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { router } from "./routes/routes.ts";
import { Context } from "./types.ts";

const port = 8000;
const app = new Application<Context>();

app.use(oakCors());
app.use(middleware.loggerMiddleware);
app.use(middleware.errorMiddleware);
app.use(middleware.timingMiddleware);

app.use(middleware.JWTAuthMiddleware);
app.use(middleware.requestIdMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on localhost:${port}`);

await app.listen({ port });
