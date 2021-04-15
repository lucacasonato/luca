DENO=deno
DEPLOYCTL=deployctl
NODE=deno run --allow-read --allow-write --allow-env --unstable https://deno.land/std@0.93.0/node/cli.ts

build:
	env NODE_ENV=production $(NODE) tailwind.js build app.css -c tailwind.config.js -o static/app.css

dev:
	env NODE_ENV=development $(NODE) tailwind.js build app.css -c tailwind.config.js -o static/app.css
	deployctl run --libs=ns,fetchevent --watch main.tsx