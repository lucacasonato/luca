// This module adds twind support.

import { setup } from "../deps.client.ts";
import { RenderContext, RenderFn, virtualSheet } from "../deps.server.ts";

const sheet = virtualSheet();
sheet.reset();
setup({ mode: "strict", sheet });

export function render(ctx: RenderContext, render: RenderFn) {
  const snapshot = ctx.state.get("twindSnapshot") as unknown[] | null;
  sheet.reset(snapshot || undefined);
  render();
  ctx.styles.splice(0, ctx.styles.length, ...sheet.target);
  const newSnapshot = sheet.reset();
  ctx.state.set("twindSnapshot", newSnapshot);
}
