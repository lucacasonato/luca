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
    start: new Date(2020, 7),
    end: null,
    title: "Lead Software Engineer",
    company: "Deno Land Inc",
    description:
      "Technical lead for Deno Deploy product. Development on JSR (JavaScript Registry), and member of the JSR board. Engineering on the open source Deno project. Built the Fresh web framework. Work in web standards bodies as chair of TC55 (WinterTC) at ECMA, delegate of TC39 (committee that designs the JavaScript language), and contributions to WHATWG and W3C specs.",
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
    start: new Date(2017, 5),
    end: new Date(2020, 8),
    title: "Web Developer",
    company: "freelance",
    description:
      "HTML + CSS + JS websites / webapps for various clients. Various backend services using Go and Node.js on GCP. Specialized on fast websites.",
  },
];

export default function CVPage() {
  return (
    <div class="mx-auto max-w-screen-md px(4 sm:6 md:8) my(12 sm:20 md:32)">
      <Head>
        <title>CV - Luca Casonato</title>
        <meta
          name="description"
          content="Software person. @deno_land core team. @jsr project lead. @tc39 delegate. he/him 🏳️‍🌈🌍🌻💚"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div class="mb-24 space-y(8 md:12)">
        <h1 class="leading-tight text(gray-900 4xl md:5xl) font-bold dark:text-gray-100">
          Curriculum vitae
        </h1>
        <div>
          <h2 class="leading-tight text(gray-900 3xl) font-semibold dark:text-gray-100">
            Jobs
          </h2>
          <ul class="mt-6 text-lg space-y-4">
            {CV.map((item) => <Item item={item} />)}
          </ul>
        </div>
        <div>
          <h2 class="leading-tight text(gray-900 3xl) font-semibold dark:text-gray-100">
            Skills
          </h2>
          <ul class="mt-6 text-lg space-y-4">
            <li>
              Highly proficient in <b>Rust</b>, <b>JavaScript</b>,{" "}
              <b>TypeScript</b>, <b>Go</b>, <b>HTML</b>, and{" "}
              <b>CSS</b>. Experience with <b>Dart</b>, <b>Java</b>, and{" "}
              <b>C++</b>.
            </li>
            <li>
              Experienced in <b>web development</b>, <b>systems programming</b>,
              {" "}
              <b>networking</b>, and{" "}
              <b>cloud computing</b>. Significant experience with <b>React</b>,
              {" "}
              <b>Preact</b>, <b>TailwindCSS</b>, <b>Deno</b>, <b>Node.js</b>,
              {" "}
              <b>PostgreSQL</b>, <b>Google Cloud Platform</b>,{" "}
              <b>Open Telemetry</b>, and <b>Grafana</b>.
            </li>
            <li>
              Intimately familiar with the <b>web platform</b> and{" "}
              <b>JavaScript runtimes</b>. I have implemented much of the APIs
              specified in various WHATWG specifications, and am a delegate at
              TC39.
            </li>
            <li>
              Capable of architecting and implementing <b>scalable</b> and{" "}
              <b>performant</b> web services.
            </li>
            <li>
              Significant experience in managing and maintaining{" "}
              <b>large open source projects</b>. I am a core team member of the
              {" "}
              <b>Deno project</b>{" "}
              which has over 1000 contributors and over 13200 commits. We work
              through an average of 220 pull requests and 150 new issues a
              month.
            </li>
          </ul>
        </div>
        <div>
          <h2 class="leading-tight text(gray-900 3xl) font-semibold dark:text-gray-100 dark:text-gray-100">
            Projects
          </h2>
          <ul class="mt-6 text-lg space-y-2">
            <li>
              <a
                href="https://github.com/denoland/deno"
                class="font-semibold hover:underline"
              >
                Deno
              </a>{" "}
              - a modern runtime for JavaScript and TypeScript.
            </li>
            <li>
              <a
                href="https://jsr.io"
                class="font-semibold hover:underline"
              >
                JSR
              </a>{" "}
              - a modern package registry for JavaScript and TypeScript.
            </li>
            <li>
              <a
                href="https://fresh.deno.dev"
                class="font-semibold hover:underline"
              >
                Fresh
              </a>{" "}
              - a web framework for building very fast websites with great
              developer experience.
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
    <li class="grid grid-cols-7 gap-x-2 gap-y-1">
      <span class="col-span-2 font-semibold">{timeframe}</span>
      <span class="col-span-3 font-bold">{props.item.title}</span>
      <span class="col-span-2">
        {props.item.company === "freelance"
          ? <i>{props.item.company}</i>
          : props.item.company}
      </span>
      <span class="col-span-2 italic text-base">{duration}</span>
      <span class="col-span-5 text-base">{props.item.description}</span>
    </li>
  );
}
