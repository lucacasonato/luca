import { Handler } from "$fresh/server.ts";

export const handler: Handler = (req) => {
  console.log(req.headers);
  console.log(req.headers.get("user-agent"));
  return new Response("Hello, world!");
};
