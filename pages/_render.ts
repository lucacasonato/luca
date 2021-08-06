// This module adds twind support.

import {
  getStyleTagProperties,
  virtualSheet,
} from "https://esm.sh/twind/sheets";
import { h, setup } from "../deps.ts";
import { RenderContext, RenderFn } from "../server_deps.ts";

const sheet = virtualSheet();
const initial = sheet.reset();
setup({ sheet });

export function render(ctx: RenderContext, render: RenderFn) {
  const snapshot = ctx.state.get("twindSnapshot") as unknown[] | null;
  sheet.reset(snapshot || initial);
  render();
  const newSnapshot = sheet.reset(initial);
  ctx.state.set("twindSnapshot", newSnapshot);
}

export function postRender(ctx: RenderContext) {
  // viewport
  ctx.head.push(
    h("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    }),
  );

  // title and description
  if (ctx.route === "/") {
    ctx.head.push(h("title", {}, "Home - Luca Casonato"));
    ctx.head.push(h("meta", {
      name: "description",
      content:
        "Programmer - love Rust, Go, Typescript & fast websites. Full time @denoland. 🚀 🏳️‍🌈 🌻 💚",
    }));
  }

  // favicon
  ctx.head.push(
    h("link", {
      rel: "shortcut icon",
      href: "/favicon.ico",
      type: "image/x-icon",
    }),
  );

  // twind css
  const snapshot = ctx.state.get("twindSnapshot") as unknown[] | null;
  if (snapshot !== null) {
    sheet.reset(snapshot);
    const { id, textContent } = getStyleTagProperties(sheet);
    ctx.head.push(
      h("style", { id, dangerouslySetInnerHTML: { __html: textContent } }),
    );
  }
  sheet.reset(initial);
}
