import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";
import { SocialLinks } from "@/components/SocialLinks.tsx";

export default define.page(function Home() {
  return (
    <div class="flex flex-col">
      <Head>
        <title>Home - Luca Casonato</title>
        <meta
          name="description"
          content="Software person. @deno_land core team.  @jsr project lead. @tc39 delegate. he/him 🏳️‍🌈🌍🌻💚"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main class="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 my-12 sm:my-20 md:my-32">
        <div class="flex flex-col sm:flex-row gap-8 w-full">
          <div class="flex justify-between items-center">
            <img
              src="/me.jpg"
              alt="luca casonato"
              width="500"
              height="500"
              class="w-24 md:w-32 h-24 md:h-32 rounded-full bg-white"
            />
          </div>
          <div class="flex flex-col justify-center">
            <p class="leading-tight text-2xl md:text-3xl text-gray-900 dark:text-gray-100">
              Hello, I'm
            </p>
            <div class="flex items-center">
              <h1 class="leading-tight text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100">
                Luca Casonato
              </h1>
            </div>
          </div>
        </div>
        <div class="mt-16 leading-7 text-lg text-gray-900 dark:text-gray-100">
          I'm a developer and{" "}
          <a href="https://github.com/lucacasonato" class="link">
            open source enthusiast
          </a>
          . I like Rust, TypeScript, PostgreSQL, and fast websites. I work at
          the{" "}
          <a href="https://deno.com/blog/the-deno-company" class="link">
            Deno company
          </a>, building{" "}
          <a href="https://deno.land" class="link">
            Deno
          </a>{" "}
          and{" "}
          <a href="https://deno.com/deploy" class="link">
            Deno Deploy
          </a>, working on the <a href="https://jsr.io" class="link">JSR</a>
          {" "}
          project, and contributing to{" "}
          <a href="https://fresh.deno.dev" class="link">
            Fresh
          </a>. I also serve as a delegate at{" "}
          <a href="https://tc39.es" class="link">TC39</a> and am a chair of{" "}
          <a href="https://wintertc.org" class="link">TC55 (WinterTC)</a>.
          Probably reading some web spec right now.
        </div>
        <div class="mt-10 leading-7 text-lg text-gray-900 dark:text-gray-100">
          Wanna talk about something? Message me on{" "}
          <a href="https://bsky.app/profile/lcas.dev" class="link">
            Bluesky
          </a>{" "}
          or email me at{" "}
          <a href="mailto:hello@lcas.dev" class="link">
            hello@lcas.dev
          </a>
          .
        </div>
      </main>
      <footer class="flex items-center mt-12 h-10 w-full justify-center">
        <div class="rainbow absolute left-0 right-0 w-screen z-[-1]" />
        <SocialLinks class="bg-white h-10 px-10 py-2 rounded-full shadow-lg dark:bg-gray-900" />
      </footer>
    </div>
  );
});
