import { h, join, PageConfig, PageProps, tw, useData } from "../../deps.ts";
import { prepareMarkdown, renderMarkdown } from "../../utils/markdown.ts";

export const config: PageConfig = { runtimeJS: false };

async function fromDisk(path: string): Promise<string | null> {
  console.time(`load ${path} from disk`);
  try {
    const txt = await Deno.readTextFile(join("./", path));
    console.timeEnd(`load ${path} from disk`);
    return txt;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    throw err;
  }
}

export default function BlogPage(props: PageProps) {
  const markdown = useData(`/posts/${props.params.id}.md`, fromDisk);
  if (!markdown) {
    return "Blog post not found";
  }
  const { content, data } = prepareMarkdown<{ title: string; date: string }>(
    markdown,
  );
  const html = renderMarkdown(content);
  const date = new Date(data.date);
  return (
    <div class={tw`max-w-screen-sm mx-auto my-24 px-4`}>
      <p class={tw`mb-4`}>
        {date.toLocaleString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })}
      </p>
      <h1 class={tw`mb-12 text-4xl font-bold`}>{data.title}</h1>
      <div class="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
