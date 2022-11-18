import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    return Response.redirect("https://mastodon.social/@lcasdev");
  },
};
