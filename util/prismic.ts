import Prismic from "prismic-javascript";
import { DefaultClient } from "prismic-javascript/d.ts/client";

export const apiEndpoint = "https://lcas-dev.cdn.prismic.io/api/v2";

// Client method to query documents from the Prismic repo
export const Client = (req = null): DefaultClient =>
  Prismic.client(apiEndpoint, createClientOptions(req));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};
