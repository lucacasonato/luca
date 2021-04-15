/** @jsx h */

import { h, jsx, serve, serveStatic } from "./deps.ts";
import { Home } from "./src/Home.tsx";

serve({
  "/": () => jsx(<Home />),
  "/static/:filename*": serveStatic("static", {
    baseUrl: import.meta.url,
  }),
});
