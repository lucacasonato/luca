import { define } from "@/utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Luca Casonato</title>
      </head>
      <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Component />
      </body>
    </html>
  );
});
