import { GitHubIcon, IconLink, MastodonIcon, TwitterIcon } from "./Icons.tsx";

export function SocialLinks(props: { class?: string; tight?: boolean }) {
  return (
    <div
      class={`${props.class ?? ""} flex items-center ${
        props.tight ? "gap-2" : "gap-4"
      }`}
    >
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
