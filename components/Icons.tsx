/** @jsx h */
import { ComponentType, h, tw } from "../deps.ts";

export function GitHubIcon() {
  return (
    <svg
      class={tw`h-6 w-6 inline`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function TwitterIcon() {
  return (
    <svg
      class={tw`h-6 w-6 inline`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
    </svg>
  );
}

export function MastodonIcon() {
  return (
    <svg
      class={tw`h-6 w-6 inline`}
      fill="currentColor"
      viewBox="0 0 216.414 232.01"
    >
      <path d="M211.807 139.088c-3.18 16.366-28.492 34.277-57.562 37.748-15.159 1.809-30.084 3.471-45.999 2.741-26.027-1.192-46.565-6.212-46.565-6.212 0 2.534.156 4.946.469 7.202 3.384 25.687 25.47 27.225 46.391 27.943 21.116.723 39.919-5.206 39.919-5.206l.867 19.09s-14.77 7.931-41.08 9.39c-14.51.797-32.525-.365-53.507-5.919C9.232 213.82 1.406 165.311.209 116.091c-.365-14.613-.14-28.393-.14-39.918 0-50.33 32.976-65.083 32.976-65.083C49.672 3.454 78.204.242 107.865 0h.729c29.66.242 58.21 3.454 74.837 11.09 0 0 32.975 14.752 32.975 65.082 0 0 .414 37.134-4.599 62.916" />
      <path
        fill="#fff"
        d="M177.51 80.077v60.941h-24.144v-59.15c0-12.469-5.246-18.797-15.74-18.797-11.602 0-17.417 7.507-17.417 22.352V117.8H96.207V85.423c0-14.845-5.816-22.352-17.418-22.352-10.494 0-15.74 6.328-15.74 18.797v59.15H38.905V80.077c0-12.455 3.171-22.352 9.541-29.675 6.569-7.322 15.171-11.076 25.85-11.076 12.355 0 21.711 4.748 27.898 14.247l6.013 10.082 6.015-10.082c6.185-9.498 15.542-14.247 27.898-14.247 10.677 0 19.28 3.753 25.85 11.076 6.369 7.322 9.54 17.22 9.54 29.675"
      />
    </svg>
  );
}

export function IconLink(props: {
  href: string;
  title: string;
  rel?: string;
  icon: ComponentType;
}) {
  return (
    <a
      class={tw`text-gray(500 hover:900) transition duration-75 ease-in-out`}
      href={props.href}
      title={props.title}
      rel={props.rel}
    >
      <span class={tw`sr-only`}>{props.title}</span>
      {h(props.icon, {}, null)}
    </a>
  );
}
