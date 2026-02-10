import { define } from "@/utils.ts";

export const handler = define.handlers({
  GET() {
    return Response.redirect("https://bsky.app/profile/lcas.dev");
  },
});
