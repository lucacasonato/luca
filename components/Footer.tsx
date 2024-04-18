import { SocialLinks } from "./SocialLinks.tsx";

export function Footer() {
  return (
    <div class="flex gap(4 md:8)">
      <img
        src="/me.jpg"
        alt="luca casonato"
        width="500"
        height="500"
        class="w(24 md:32) h(24 md:32) rounded-full"
      />
      <div class="flex flex-col justify-center gap-2">
        <p class="leading-tight text(gray-900 2xl md:4xl) font-bold dark:text-gray-100">
          <a href="/" class="hover:underline focus:underline">
            Luca Casonato
          </a>
        </p>
        <p class="leading-tight text(gray-900 base md:xl) dark:text-gray-100">
          Software person.{" "}
          <a href="https://deno.com/blog/the-deno-company">@deno_land</a>{" "}
          core team. <a href="https://fresh.deno.dev">Fresh</a> builder.{" "}
          <a href="https://tc39.es">@tc39</a>{" "}
          delegate. he/him 🏳️‍🌈&nbsp;🌍&nbsp;🌻&nbsp;💚
        </p>
        <SocialLinks class="mt-1" tight />
      </div>
    </div>
  );
}
