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
  const isBlogPage = ctx.url.pathname.startsWith("/blog/");

  // viewport
  ctx.head.push(
    h("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    }),
  );

  if (isBlogPage) {
    // markdown stylesheet preload
    ctx.head.push(h("link", {
      rel: "preload",
      href: "/markdown.css",
      as: "style",
    }));
  }

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

  if (isBlogPage) {
    // prism
    ctx.head.push(h("script", { src: "/prism.js" }));

    ctx.head.push(
      h("style", {
        dangerouslySetInnerHTML: {
          __html: `
body {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  color: #24292e;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 16px;
  word-wrap: break-word;
}

@media (prefers-color-scheme: dark) {
  body {
    color: #c9d1d9;
    background-color: #0d1117;
  }
}
    `,
        },
      }),
    );
  }

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

  if (isBlogPage) {
    // markdown stylesheet
    ctx.head.push(h("link", { rel: "stylesheet", href: "/markdown.css" }));
  }
}
