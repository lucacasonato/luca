/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";

import { Footer } from "../components/Footer.tsx";

interface CVItem {
  start: Date;
  end: Date | null;
  title: string;
  company: string;
  description: string;
}

const CV: CVItem[] = [
  {
    start: new Date(2017, 5),
    end: new Date(2020, 8),
    title: "Web Developer",
    company: "freelance",
    description:
      "HTML + CSS + JS websites / webapps for various clients. Various backend services using Go and Node.js on GCP. Specialized on fast websites.",
  },
  {
    start: new Date(2019, 5),
    end: new Date(2019, 8),
    title: "Software Engineering Intern",
    company: "soft2tec GmbH",
    description:
      "Introduced new version control scheme and more CI workflows. Also worked on in-house iOS apps using Flutter.",
  },
  {
    start: new Date(2020, 7),
    end: null,
    title: "Software Engineer",
    company: "Deno Land Inc",
    description:
      "Engineering on the open source Deno project, and the Deno Deploy hosting service. I also facilitate communication with web standards bodies (WHATWG, W3C) and am a delegate at TC39.",
  },
];

export default function CVPage() {
  return (
    <div
      class={tw`mx-auto max-w-screen-md px(4 sm:6 md:8) my(12 sm:20 md:32)`}
    >
      <Head>
        <title>CV - Luca Casonato</title>
        <meta
          name="description"
          content="Software person. @deno_land core team. @tc39 delegate. he/him 🏳️‍🌈🌍🌻💚"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div class={tw`mb-24 space-y(8 md:12)`}>
        <h1 class={tw`leading-tight text(gray-900 4xl md:5xl) font-bold`}>
          Curriculum vitae
        </h1>
        <div>
          <h2 class={tw`leading-tight text(gray-900 3xl) font-semibold`}>
            Jobs
          </h2>
          <ul class={tw`mt-6 text-lg space-y-4`}>
            {CV.map((item) => <Item item={item} />)}
          </ul>
        </div>
        <div>
          <h2 class={tw`leading-tight text(gray-900 3xl) font-semibold`}>
            Skills
          </h2>
          <ul class={tw`mt-6 text-lg space-y-4`}>
            <li>
              Highly provicient in <b>Rust</b>, <b>JavaScript</b>,{" "}
              <b>TypeScript</b>, <b>Go</b>, <b>HTML</b>, and{" "}
              <b>CSS</b>. Experience with <b>Dart</b>, <b>Java</b>, and{" "}
              <b>C++</b>.
            </li>
            <li>
              Intimately familiar with the <b>web platform</b> and{" "}
              <b>JavaScript runtimes</b>. I have implemented much of the APIs
              specified in various WHATWG specifications, and am a delegate at
              TC39.
            </li>
            <li>
              Capable of architechting and implementing <b>scalable</b> and{" "}
              <b>performant</b> web services.
            </li>
            <li>
              Signficant experience in managing and maintaining{" "}
              <b>large open source projects</b>. I am a core team member of the
              {" "}
              <b>Deno project</b>{" "}
              which has over 700 contributors and over 7400 commits. We work
              through an average of 150 pull requests and 90 new issues a month.
            </li>
          </ul>
        </div>
        <div>
          <h2 class={tw`leading-tight text(gray-900 3xl) font-semibold`}>
            Projects
          </h2>
          <ul class={tw`mt-6 text-lg space-y-2`}>
            <li>
              <a
                href="https://github.com/denoland/deno"
                class={tw`font-semibold hover:underline`}
              >
                deno
              </a>{" "}
              - a modern runtime for JavaScript and TypeScript.
            </li>
            <li>
              <a
                href="https://github.com/lucacasonato/fresh"
                class={tw`font-semibold hover:underline`}
              >
                fresh
              </a>{" "}
              - a web framework for building very fast websites without needing
              a build step.
            </li>
            <li>
              <a
                href="https://github.com/lucacasonato/deno_aws_sign_v4"
                class={tw`font-semibold hover:underline`}
              >
                deno_aws_sign_v4
              </a>{" "}
              - generate AWS Signature V4 for AWS low-level REST APIs.
            </li>
            <li>
              <a
                href="https://github.com/lucacasonato/deno_s3"
                class={tw`font-semibold hover:underline`}
              >
                deno_s3
              </a>{" "}
              - Amazon S3 for Deno.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Item(props: { item: CVItem }) {
  const now = new Date();
  const start = props.item.start;
  const end = props.item.end ?? now;

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  const timeframe = end === now
    ? `${startYear} - present`
    : startYear === endYear
    ? startYear
    : `${startYear} - ${endYear}`;

  const startMonths = start.getFullYear() * 12 + start.getMonth();
  const endMonths = end.getFullYear() * 12 + end.getMonth();

  const monthDuration = endMonths - startMonths;

  const years = Math.floor(monthDuration / 12);
  const months = monthDuration % 12;

  let duration = "";
  if (years > 0) {
    duration += `${years} year${years > 1 ? "s" : ""} `;
  }
  if (months > 0 && years < 2) {
    duration += `${months} month${months > 1 ? "s" : ""} `;
  }

  return (
    <li class={tw`grid grid-cols-7 gap-x-2 gap-y-1`}>
      <span class={tw`col-span-2 font-semibold`}>{timeframe}</span>
      <span class={tw`col-span-3 font-bold`}>{props.item.title}</span>
      <span class={tw`col-span-2`}>
        {props.item.company === "freelance"
          ? <i>{props.item.company}</i>
          : props.item.company}
      </span>
      <span class={tw`col-span-2 italic text-base`}>{duration}</span>
      <span class={tw`col-span-5 text-base`}>{props.item.description}</span>
    </li>
  );
}
