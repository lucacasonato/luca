import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    return Response.redirect(
      "https://github.com/lucacasonato/modernfrontends2022-bench",
    );
  },
};
