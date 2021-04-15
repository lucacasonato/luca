// 'chalk' isn't happy with the following polyfill
// So we require it before poylfill. This avoids the problem.
require("chalk");
// Polyfill for Object.prototype.__proto__
require("@kt3k/proto-polyfill");
// Runs the cli of tailwindcss
require("./node_modules/.bin/tailwind");
