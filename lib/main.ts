import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { buildPages } from "../pages.tsx";
import { copy } from "./deps.ts";

switch (Deno.args[0]) {
  case "build":
    await copy("./public", "./static", { overwrite: true });
    await buildPages(false);
    console.log("Built pages");
    break;
  case "dev": {
    await copy("./public", "./static", { overwrite: true });
    await buildPages(true);

    const router = new Router();
    router.get("/__wait", async (ctx) => {
      await new Promise(() => {});
    });
    router.get("/__alive", (ctx) => {
      ctx.response.body = "ok";
    });
    const app = new Application();
    app.use(router.allowedMethods());
    app.use(router.routes());
    app.use(async (context) => {
      await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/static`,
        index: "index.html",
      });
    });
    console.log("Listening on http://localhost:8000");
    await app.listen({ port: 8000 });
    break;
  }
  default:
    console.log("Missing 'build' or 'dev' argument.");
    break;
}
