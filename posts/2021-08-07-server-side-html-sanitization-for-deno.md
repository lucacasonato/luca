---
title: Safe server-side HTML sanitization in Deno using WebAssembly and Rust
description: How do you make the HTML parser you are using on the server behave like the browser's HTML parser? You just use the same HTML parser as the browser!
date: 2021-08-07T14:00:00Z
---

While working on a new rendering engine for the [Deno Manual][manual] a few
weeks ago, I needed a high quality server side HTML sanitizer to use in Deno. If
you are somewhat security conscious, you might be asking yourself:

[manual]: https://deno.land/manual

## Server side HTML sanitization, isn't that bad?

Generally I would agree with you: HTML sanitization is most effective when done
on the client (for example with [DOMPurify][dompurify]). LiveOverflow created an
[excellent video on the topic][liveoverflow_video] a few years back. Simplified,
the argument boils down to the client and server sometimes subtly disagreeing
about how to parse a given piece of HTML. This means the server could parse a
given bit of HTML to check if it contains JS, determine it doesn't, and send it
to a browser. The browser will also parse the HTML, but subtly differently: in
it's parse, it did find some JS! The browser executes the JS, and boom...
possibly an XSS vector.

[dompurify]: https://github.com/cure53/DOMPurify
[liveoverflow_video]: https://www.youtube.com/watch?v=lG7U3fuNw3A

So how do you make the HTML parser you are using on the server behave like the
browser's HTML parser? You just use the same HTML parser as the browser! 😉

## Choosing an HTML parser

There are three major browsers today, each with their own HTML parsers: the one
in Blink (Chromium), `htmlparser` used in Gecko (Firefox), and the one used by
WebKit (Safari). These are all written in C++. In addition to these three, there
is also the `html5ever` parser for Servo. [Servo][servo] is an experimental web
browser incubated at Mozilla that is written in Rust. All four parsers are
highly compliant with the HTML spec, and are tested by the
[html5lib tests][html5lib-tests], the de facto standard HTML parsing tests used
by all browser engines.

[servo]: https://github.com/servo/servo
[html5lib-tests]: https://github.com/html5lib/html5lib-tests

All of these parsers are written in Rust or C++ - that means I can't just import
this code directly into my Deno program written in TypeScript. I can however
compile the parsers to WebAssembly and execute them portably inside my secure
JavaScript sandbox. This has the additional benefit of shielding the host system
from possible memory corruption bugs in any of the parsers.

The parser only lets us parse the HTML. We also need some code to actually
remove problematic elements (like `<script>` tags). There is an excellent HTML
sanitizer library written in Rust that uses the `html5ever` parser:
[`ammonia`][ammonia]. It has a super simple API we will use: it takes an
untrusted HTML string as input and returns a sanitized version.

[ammonia]: https://crates.io/crates/ammonia

## Compiling `ammonia` to WebAssembly

First thing to do is to install Rust with the WebAssembly target, and
[wasm-pack][wasmpack]:

```shell
# First install rust using rustup. Exact procedure might vary per system.
# See https://rustup.rs for details
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install the wasm target (wasm32-unknown-unknown) with rustup.
$ rustup target add wasm32-unknown-unknown

# Install wasm-pack. Procedure might vary per system. For details see
# https://rustwasm.github.io/wasm-pack/installer/
$ curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

To get started, we have to create a new Rust project using `cargo`:

```shell
$ cargo new --lib ammonia_deno
```

This will generate a `Cargo.toml` and a `src/lib.rs`. The `Cargo.toml` defines
of all the details about our crate (what Rust calls a package), while
`src/lib.rs` contains the actual source code.

Let's start by adding all the required dependencies. Firstly, we will obviously
need `ammonia` as that is what we want to compile to WebAssembly. We will also
use `wasm-bindgen`: it simplifies the setup we need to do to call from Rust into
JS, or JS into Rust.

```toml
# Cargo.toml

[package]
name = "ammonia_deno"
version = "0.1.0"
edition = "2018"

[lib]
# This tells the Cargo that our crate is a dynamic library which exports a C
# interface.
crate-type = ["cdylib"]

[dependencies]
ammonia = "3.1.2"
wasm-bindgen = "0.2.74"
```

Now that dependencies are configured, let's write our actual code:

```rs
// main.rs

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn clean(src: &str) -> String {
    ammonia::clean(src)
}
```

Well, that was simple! We are exporting a function called `clean` that takes a
string, passes it to `ammonia`'s `clean` function, and returns it's returned
string. The `#[wasm_bindgen]` macro tells wasm-bindgen about this function, and
instructs it to generate all the binding glue code, so we can eventually call
this function from JavaScript.

Now that all the code is written, let's have wasm-pack compile the Rust into
WebAssembly, and generate all the glue code:

```shell
$ wasm-pack build --target web --release
```

This will output a `ammonia_deno.js`, `ammonia_deno.d.ts`, and
`ammonia_deno_bg.wasm` file to `pkg/`.

This is already enough to instantiate the WASM module, and sanitize some HTML.
Let's try it:

```js
// main.js

// @deno-types="./pkg/ammonia_deno.d.ts"
import { clean, default as init } from "./pkg/ammonia_deno.js";

const wasm = await Deno.readFile("./pkg/ammonia_deno_bg.wasm");
await init(wasm);

const unsanitized = `<p>Hello World</p><script>alert(1)</script>`;
const sanitized = clean(unsanitized);
console.log(sanitized);
```

```shell
$ deno run --allow-read main.js
<p>Hello World</p>
```

It works! The `<script>` tag was removed 🎉

[wasmpack]: https://rustwasm.github.io/wasm-pack

### Conclusion

You can see that, with very little effort, it is possible to compile some
existing Rust libraries to WebAssembly. This blog post only covers the basics. A
more fully fledged package would probably compile the WASM with flags to
optimize for size, run it through [`wasm-opt`][wasmopt], provide easy methods
for instantiating the WebAssembly. If you want to learn more about this, dive
into the [wasm-pack book][wasmpack_book].

I actually turned the ammonia module from this blog post into a more fully
fledged project: https://deno.land/x/ammonia. Instead of just a `clean`
function, this module also provides a way to customize the options for
sanitization. In [the repo][ammoniawasm_repo] you will find a `build.ts` script
that does some more optimizing of the .wasm file, compresses it, and embeds it
in a JS file for portable consumption.

[wasmopt]: https://github.com/WebAssembly/binaryen
[wasmpack_book]: https://rustwasm.github.io/wasm-pack/book
[ammoniawasm_repo]: https://github.com/lucacasonato/ammonia-wasm
