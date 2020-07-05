import { React } from "../lib/deps.ts";

function Layout(props: { title: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}!</title>
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body>
        <h1 className="text-red-900 m-4">Hello!!</h1>
      </body>
    </html>
  );
}

export default Layout;
