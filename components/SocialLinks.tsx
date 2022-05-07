/** @jsx h */
import { h, tw } from "../deps.client.ts";
import { GitHubIcon, IconLink, MastodonIcon, TwitterIcon } from "./Icons.tsx";

export function SocialLinks(props: { class?: string; tight?: boolean }) {
  return (
    <div class={tw`${props.class} flex ${props.tight ? "gap-2" : "gap-4"}`}>
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
  );
}
