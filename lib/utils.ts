import { ReactDOMServer, join } from "./deps.ts";

export async function generate(
  file: string,
  component: any,
  hotReloadEnabled: boolean
) {
  const markup = ReactDOMServer.renderToStaticMarkup(component);

  const final = hotReloadEnabled
    ? markup.replace(
        "</head>",
        `<script>fetch("/__wait").catch(()=>{}).then(()=>{setInterval(()=>fetch("/__alive").then(t=>{t.ok&&window.location.reload()}),200)});</script></head>`
      )
    : markup;

  await Deno.writeTextFile(join("static", file), `<!DOCTYPE html>${final}`);
}
