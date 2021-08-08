dev:
	deno run -A --unstable --no-check --watch main.ts

typecheck:
	deno cache --unstable main.ts

fmt:
	deno fmt

lint:
	deno lint
