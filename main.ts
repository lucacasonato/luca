/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.js";

globalThis.URLPattern = new Proxy(globalThis.URLPattern, {
  construct: (target, args) => {
    console.log("URLPattern", args);
    return Reflect.construct(target, args);
  },
});

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
