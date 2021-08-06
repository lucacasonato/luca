export * from "https://raw.githubusercontent.com/lucacasonato/fresh/03057623c903c936a48597e03f7ee0d9244c6cab/runtime.ts";
import { IS_BROWSER } from "https://raw.githubusercontent.com/lucacasonato/fresh/03057623c903c936a48597e03f7ee0d9244c6cab/runtime.ts";
import { setup, tw } from "https://esm.sh/twind";
export { setup, tw };
if (IS_BROWSER) {
  setup({});
}
