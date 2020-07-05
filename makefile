netlify:
	curl -fsSL https://deno.land/x/install/install.sh | sh
	export DENO_INSTALL="/opt/buildhome/.deno"
	export PATH="${DENO_INSTALL}/bin:${PATH}"
	deno install --allow-read --allow-run --allow-write --allow-net -f --unstable https://deno.land/x/denon@v2.2.0/denon.ts
	make build

build:
	env NODE_ENV=production yarn tailwindcss build app.css -o public/app.css
	deno run --allow-read --allow-write --unstable lib/main.ts build

dev:
	env NODE_ENV=development yarn tailwindcss build app.css -o public/app.css
	denon dev