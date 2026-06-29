import { define } from "@/utils.ts";

export const handler = define.handlers({
  GET() {
    return Response.redirect(
      "https://www.autoriteitpersoonsgegevens.nl/en/themes/identification/passport-and-identity-card/copy-of-your-id-what-can-you-do",
    );
  },
});
