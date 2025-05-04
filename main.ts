/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.js";

const kv = await Deno.openKv();
const build = await kv.get(["builds", Deno.env.get("DENO_DEPLOYMENT_ID")]);
if (build.value === null) {
  console.log("Do a build step here!");
  await kv.set(["builds", Deno.env.get("DENO_DEPLOYMENT_ID")], "built");
}

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
