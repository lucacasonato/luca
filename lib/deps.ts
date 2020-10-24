// @deno-types="https://raw.githubusercontent.com/soremwar/deno_types/master/react/v16.13.1/react.d.ts"
import React from "https://jspm.dev/react@16.13.1";
// @deno-types="https://raw.githubusercontent.com/soremwar/deno_types/master/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@16.13.1/server";
import { join } from "https://deno.land/std@0.74.0/path/mod.ts";
import { copy } from "https://deno.land/std@0.74.0/fs/copy.ts";

export { copy, join, React, ReactDOMServer };
