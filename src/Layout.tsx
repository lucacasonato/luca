/** @jsx h */

import { ComponentChild, h } from "../deps.ts";

function Layout(props: {
  title: string;
  description: string;
  children: ComponentChild;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
        <meta name="Description" content={props.description} />
        <link rel="stylesheet" href="/static/app.css" />
        <link
          rel="shortcut icon"
          href="/static/favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body>{props.children}</body>
    </html>
  );
}

export default Layout;
