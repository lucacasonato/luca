//! This module is responsible for preparing and rendering the markdown files in
//! the manual.

import { ammonia, comrak, frontmatterParse } from "../deps.ts";

export function prepareMarkdown<T>(markdown: string): {
  content: string;
  data: T;
} {
  console.time("parse markdown");
  const { content, data } = frontmatterParse(markdown);
  console.timeEnd("parse markdown");
  return { content, data: data as T };
}

const COMRAK_OPTIONS: comrak.ComrakOptions = {
  extension: {
    autolink: true,
    headerIDs: "",
    strikethrough: true,
    table: true,
    tagfilter: true,
    tasklist: true,
  },
  render: {
    unsafe: true, // HTML is always passed through ammonia to sanitize.
  },
};

const HIGHLIGHTER_LANGUAGES = [
  // js
  "javascript",
  "js",
  // ts
  "typescript",
  "ts",
  // json
  "json",
  "jsonc",
  // markup
  "markup",
  "mathml",
  "html",
  "xml",
  "rss",
  "ssml",
  "ssml",
  "ssml",
  // wasm
  "wasm",
  // yaml
  "yml",
  "yaml",
  // toml
  "toml",
  // rust
  "rust",
];

const AMMONIA_BUILDER = new ammonia.AmmoniaBuilder();
AMMONIA_BUILDER.allowedClasses.set("svg", new Set(["octicon", "octicon-link"]));
AMMONIA_BUILDER.allowedClasses.set(
  "code",
  new Set(HIGHLIGHTER_LANGUAGES.map((lang) => `language-${lang}`)),
);
AMMONIA_BUILDER.allowedClasses.set("a", new Set(["anchor"]));
AMMONIA_BUILDER.tagAttributes.get("a")!.add("aria-hidden");
AMMONIA_BUILDER.tagAttributes.get("a")!.add("id");
const AMMONIA = AMMONIA_BUILDER.build();

const OCTICON_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true" class="octicon octicon-link"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg></a>`;

/** Render a markdown file to HTML. */
export function renderMarkdown(markdown: string): string {
  // Render the markdown to HTML.
  console.time("render markdown");
  let html = comrak.markdownToHTML(markdown, COMRAK_OPTIONS);
  console.timeEnd("render markdown");

  // Sanitize the HTML using ammonia.
  console.time("sanitize html");
  html = AMMONIA.clean(html);
  console.timeEnd("sanitize html");

  // Inject the octicon icon into header links.
  console.time("inject octicons");
  html = html.replaceAll(
    /<a href="#[a-zA-Z\d-]*" aria-hidden="true" class="anchor" id="[a-zA-Z\d-]*" rel="noopener noreferrer"><\/a>/g,
    (match) => match.replace("</a>", OCTICON_SVG),
  );
  console.timeEnd("inject octicons");

  return html;
}

/** Turn an arbitrary string into unformatted HTML. */
export function sanitizeText(html: string): string {
  return ammonia.cleanText(html);
}
