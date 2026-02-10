import { define } from "@/utils.ts";

export const handler = define.handlers({
  GET() {
    return Response.redirect(
      "https://github.com/lucacasonato/modernfrontends2022-bench",
    );
  },
});
