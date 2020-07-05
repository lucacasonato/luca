import { React } from "./lib/deps.ts";
import { generate } from "./lib/utils.ts";
import Home from "./components/Home.tsx";

export async function buildPages(hotReloadEnabled: boolean) {
  await generate("index.html", <Home />, hotReloadEnabled);
}
