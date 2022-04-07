import { Application } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import * as middleware from "./middleware/middleware.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { router } from "./routes/routes.ts";
import { Context } from "./types.ts";

const port = 8000;
const app = new Application<Context>();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(middleware.loggerMiddleware);
app.use(middleware.timingMiddleware);

app.use(middleware.JWTAuthMiddleware);
app.use(middleware.errorMiddleware);

console.log(`Server running on http://localhost:${port}`);

await app.listen({ port });
