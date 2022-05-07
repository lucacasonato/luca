/** @jsx h */
import { h, Head, tw } from "../deps.client.ts";

import { GitHubIcon, MastodonIcon, TwitterIcon } from "../components/Icons.tsx";
import { IconLink } from "../components/Icons.tsx";

export default function Home() {
  const linkClass = tw
    `text-blue(600 hover:500) hover:underline transition duration-75 ease-in-out`;

  return (
    <div
      class={tw`mx-auto max-w-screen-md px(4 sm:6 md:8) my(12 sm:20 md:32)`}
    >
      <Head>
        <title>Home - Luca Casonato</title>
        <meta
          name="description"
          content="Software person. @deno_land core team. @tc39 delegate. he/him 🏳️‍🌈🌍🌻💚"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div class={tw`flex flex(col sm:row) gap-8`}>
        <img
          src="/me.jpg"
          alt="luca casonato"
          width="500"
          height="500"
          class={tw`w(24 md:32) h(24 md:32) rounded-full`}
        />
        <div class={tw`flex flex-col justify-center`}>
          <p class={tw`leading-tight text(gray-900 2xl md:3xl)`}>
            Hello, I'm
          </p>
          <h1 class={tw`leading-tight text(gray-900 4xl md:5xl) font-semibold`}>
            Luca Casonato
          </h1>
        </div>
      </div>
      <div class={tw`mt-10 leading-7 text(gray-900 lg)`}>
        I'm a developer and{" "}
        <a href="https://github.com/lucacasonato" class={linkClass}>
          open source enthusiast
        </a>
        . I like Rust, Go, TypeScript, and fast websites. I work at the{" "}
        <a href="https://deno.com/blog/the-deno-company" class={linkClass}>
          Deno
        </a>{" "}
        company, building{" "}
        <a href="https://deno.land" class={linkClass}>
          Deno
        </a>{" "}
        and{" "}
        <a href="https://deno.com/deploy" class={linkClass}>
          Deno Deploy
        </a>, and serving as a delegate at{" "}
        <a href="https://tc39.es" class={linkClass}>TC39</a>. I built{" "}
        <a href="https://github.com/lucacasonato/fresh" class={linkClass}>
          fresh
        </a>
        ,{" "}
        <a
          href="https://github.com/lucacasonato/deno-puppeteer"
          class={linkClass}
        >
          deno-puppeteer
        </a>
        , and a few other open source libraries. Probably reading some web spec
        right now.
      </div>
      <div class={tw`mt-10 leading-7 text(lg gray-900)`}>
        Wanna talk about something? DM me on{" "}
        <a href="https://twitter.com/lcasdev" class={linkClass}>
          Twitter
        </a>{" "}
        or email me at{" "}
        <a href="mailto:hello@lcas.dev" class={linkClass}>
          hello@lcas.dev
        </a>
        .
      </div>
      <div class={tw`mt-10 flex gap-4`}>
        <IconLink
          href="https://github.com/lucacasonato"
          title="GitHub"
          icon={GitHubIcon}
        />
        <IconLink
          href="https://twitter.com/lcasdev"
          title="Twitter"
          icon={TwitterIcon}
        />
        <IconLink
          href="https://mastodon.social/@lcasdev"
          title="Mastodon"
          rel="me"
          icon={MastodonIcon}
        />
      </div>
    </div>
  );
}
