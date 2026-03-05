import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";
import { Footer } from "@/components/Footer.tsx";

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
      "Technical lead for the Deno Deploy product. Development on JSR (JavaScript Registry), and member of the JSR board. Engineering on the open source Deno project. Built the Fresh web framework (v1). Work in web standards bodies as chair of TC55 (WinterTC) at ECMA, delegate at TC39 (committee that designs the JavaScript language), and contributions to WHATWG and W3C specs.",
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

export default define.page(function CVPage() {
  return (
    <div class="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 my-12 sm:my-20 md:my-32">
      <Head>
        <title>CV - Luca Casonato</title>
        <meta
          name="description"
          content="Software person. @deno_land core team. @jsr project lead. @tc39 delegate. he/him 🏳️‍🌈🌍🌻💚"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div class="mb-24 space-y-8 md:space-y-12">
        <h1 class="leading-tight text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          Curriculum vitae
        </h1>
        <div>
          <h2 class="leading-tight text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Jobs
          </h2>
          <ul class="mt-6 text-lg space-y-4">
            {CV.map((item) => <Item key={item.start} item={item} />)}
          </ul>
        </div>
        <div>
          <h2 class="leading-tight text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Skills
          </h2>
          <ul class="mt-6 text-lg space-y-4">
            <li>
              I am highly proficient in
              <b>TypeScript</b>, <b>JavaScript</b>, <b>Rust</b>,{" "}
              <b>HTML</b>, and <b>CSS</b>. I have experience with <b>Go</b>,
              {" "}
              <b>Dart</b>, <b>C++</b>.
            </li>
            <li>
              I have significant experience in <b>product engineering</b>,{" "}
              <b>software architecture engineering</b>,{" "}
              <b>(distributed) systems engineering</b>, and{" "}
              <b>web development</b>. Significant knowledge of <b>React</b>,
              {" "}
              <b>Preact</b>, <b>TailwindCSS</b>, <b>Deno</b>, <b>Node.js</b>,
              {" "}
              <b>PostgreSQL</b>, <b>GCP</b>, <b>AWS</b>, <b>Vultr</b> ,{" "}
              <b>Kubernetes</b>, <b>Open Telemetry</b>, <b>Clickhouse</b>,{" "}
              <b>Grafana</b>, and <b>Terraform</b>. Some experience with{" "}
              <b>Talos</b>, <b>Firecracker</b>, <b>WebAssembly</b>.
            </li>
            <li>
              I am intimately familiar with the <b>web platform</b> and{" "}
              <b>JavaScript runtimes</b>. I have implemented many APIs specified
              in various WHATWG specifications in Deno. I and am a delegate at
              TC39, where I have (successfully) proposed changes to the
              JavaScript language. I chair TC55 (WinterTC) at ECMA, which works
              to specify common APIs for use across server-side JavaScript
              runtimes.
            </li>
            <li>
              I am a strong communicator and have experience in public speaking
              (at conferences, on podcasts, and in product presentations),
              writing technical documentation, and writing technical and product
              blog posts. I very much enjoy talking to customers.
            </li>
            <li>
              I am very detail oriented and have the ability to convince others
              of my vision. I have experience in proposing, designing,
              implementing, testing, and overseeing the implementation of, large
              features involving multiple engineers and product stakeholders.
            </li>
            <li>
              I have significant experience in managing and maintaining{" "}
              <b>large open source projects</b>. I was a core team member of the
              {" "}
              <b>Deno project</b>{" "}
              for many years, which has over 1000 separate contributors and over
              15000 commits. The project works through an average of 300 pull
              requests and 150 new issues a month.
            </li>
          </ul>
        </div>
        <div>
          <h2 class="leading-tight text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Projects
          </h2>
          <ul class="mt-6 text-lg space-y-2">
            <li>
              <a
                href="https://deno.com/deploy"
                class="font-semibold hover:underline"
              >
                Deno Deploy
              </a>{" "}
              - the simplest platform to deploy your JavaScript and TypeScript
              applications.
            </li>
            <li>
              <a
                href="https://github.com/denoland/deno"
                class="font-semibold hover:underline"
              >
                Deno
              </a>{" "}
              - a modern server-side runtime for JavaScript and TypeScript.
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
              - a web framework for building very fast websites using Preact,
              with great developer experience.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
});

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
