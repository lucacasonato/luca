/** @jsx h */
import { h, tw } from "../deps.client.ts";
import { GitHubIcon, IconLink, TwitterIcon } from "./Icons.tsx";

export function Footer() {
  return (
    <div class={tw`flex gap(4 md:8)`}>
      <img
        src="/me.jpg"
        alt="luca casonato"
        width="500"
        height="500"
        class={tw`w(24 md:32) h(24 md:32) rounded-full`}
      />
      <div class={tw`flex flex-col justify-center gap-2`}>
        <p class={tw`leading-tight text(gray-900 2xl md:4xl) font-bold`}>
          <a href="/" class={tw`hover:underline focus:underline`}>
            Luca Casonato
          </a>
        </p>
        <p class={tw`leading-tight text(gray-900 base md:xl)`}>
          Software person.{" "}
          <a href="https://deno.com/blog/the-deno-company">@deno_land</a>{" "}
          core team. <a href="https://tc39.es">@tc39</a>{" "}
          delegate. he/him 🏳️‍🌈 🌍 🌻 💚
        </p>
        <div class={tw`flex gap-2`}>
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
        </div>
      </div>
    </div>
  );
}
