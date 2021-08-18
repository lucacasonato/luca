/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

// fresh
export * from "https://raw.githubusercontent.com/lucacasonato/fresh/577c023b8abdd9a03f62d836ace1ed8d6880efd7/runtime.ts";
import { IS_BROWSER } from "https://raw.githubusercontent.com/lucacasonato/fresh/577c023b8abdd9a03f62d836ace1ed8d6880efd7/runtime.ts";

// twind
import { setup, tw } from "https://esm.sh/twind@0.16.16";
export { setup, tw };
if (IS_BROWSER) {
  setup({});
}

// x/comrak
import * as comrak from "https://deno.land/x/comrak@0.1.1/mod.ts";
await comrak.init();
export { comrak };

// x/ammonia
import * as ammonia from "https://deno.land/x/ammonia@0.3.1/mod.ts";
await ammonia.init();
export { ammonia };

// std
export { join } from "https://deno.land/std@0.105.0/path/mod.ts";

// frontmatter
export { parse as frontmatterParse } from "https://deno.land/x/frontmatter@v0.1.2/mod.ts";
