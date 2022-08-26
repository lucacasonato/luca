import { tw } from "twind";
import { css } from "twind/css";
import { Head } from "$fresh/runtime.ts";

import { SocialLinks } from "../components/SocialLinks.tsx";

const linkClass =
  "text-blue(600 hover:500) hover:underline transition duration-75 ease-in-out";
const rainbow = css`
height: 6px;
margin-bottom: 42px;
box-shadow: 0px 6px #e40303,
  0px 12px #ff8c00,
  0px 18px #ffed00,
  0px 24px #008026,
  0px 30px #004dff,
  0px 36px #750787;
`;

export default function Home() {
  const showRainbow = Math.random() < 0.5;
  return (
    <div class="mx-auto max-w-screen-md px(4 sm:6 md:8) my(12 sm:20 md:32)">
      <Head>
        <title>Home - Luca Casonato</title>
        <meta
          name="description"
          content="Software person. @deno_land core team. @tc39 delegate. he/him 🏳️‍🌈🌍🌻💚"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div class="flex flex(col sm:row) gap-8 w-full">
        <div class="flex justify-between items-center">
          <img
            src="/me.jpg"
            alt="luca casonato"
            width="500"
            height="500"
            class="w(24 md:32) h(24 md:32) rounded-full bg-white"
          />
        </div>
        <div class="flex flex-col justify-center">
          <p class="leading-tight text(gray-900 2xl md:3xl)">
            Hello, I'm
          </p>
          <div class="flex items-center">
            <h1 class="leading-tight text(gray-900 4xl md:5xl) font-semibold">
              Luca Casonato
            </h1>
          </div>
        </div>
      </div>
      <div class="mt-16 leading-7 text(gray-900 lg)">
        I'm a developer and{" "}
        <a href="https://github.com/lucacasonato" class={linkClass}>
          open source enthusiast
        </a>
        . I like Rust, Go, TypeScript, and fast websites. I work at the{" "}
        <a href="https://deno.com/blog/the-deno-company" class={linkClass}>
          Deno company
        </a>, building{" "}
        <a href="https://deno.land" class={linkClass}>
          Deno
        </a>,{" "}
        <a href="https://deno.com/deploy" class={linkClass}>
          Deno Deploy
        </a>, and{" "}
        <a href="https://fresh.deno.dev" class={linkClass}>
          Fresh
        </a>. I also serve as a delegate at{" "}
        <a href="https://tc39.es" class={linkClass}>TC39</a>. I build{" "}
        <a
          href="https://github.com/lucacasonato/deno-puppeteer"
          class={linkClass}
        >
          deno-puppeteer
        </a>
        , and a few other open source libraries. Probably reading some web spec
        right now.
      </div>
      <div class="mt-10 leading-7 text(lg gray-900)">
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
      <div class="flex items-center mt-12 h-10">
        <div
          class={tw(rainbow) +
            " mr-[0.5rem] ml-[-100.5rem] sm:(mr-[1rem] ml-[-101rem]) w-[100rem] z-[-1]"}
        />
        <SocialLinks />
        <div
          class={tw(rainbow) +
            " ml-[0.5rem] sm:ml-[1rem] mr-[-100rem] w-[100rem]"}
        />
      </div>
    </div>
  );
}
