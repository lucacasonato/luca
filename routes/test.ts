import { Handler } from "$fresh/server.ts";

export const handler: Handler = (req) => {
  console.log(req.headers);
  return new Response("Hello, world!");
};
