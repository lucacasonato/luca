import { React } from "./lib/deps.ts";
import { generate } from "./lib/utils.ts";
import Layout from "./components/Layout.tsx";

export async function buildPages(hotReloadEnabled: boolean) {
  await generate("index.html", <Layout title="hello" />, hotReloadEnabled);
}
