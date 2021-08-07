import { start } from "./server_deps.ts";
import routes from "./routes.gen.ts";

let i = 0;
setInterval(() => console.log("stamp", ++i, new Date()), 250);

start(routes);
