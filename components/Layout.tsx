import { React } from "../lib/deps.ts";

function Layout(props: { title: string; description: string; children: any }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
        <meta name="Description" content={props.description} />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
}

export default Layout;
