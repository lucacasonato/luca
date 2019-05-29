---
title: Finishing Antibuild
layout: post
date: 2019-05-29 23:18:00
tags:
  - antibuild
  - go
---

If you have not heard of it before: Antibuild is a super duper crazy fast and modular static site generator written in Go. It has an extensive library of integrated features and is easy to use. You can learn more **[here](https://build.antipy.com)**.

## Refactoring

Antibuild was feature complete around the end of April. We sprinted to include the last major feature: iterators. These are a way to dynamically create pages depending on some content. I implemented these in about 5 hours. Then Jaap worked on making them fast for the next 5 hours...

We are currently in the phase were we are looking at every single line of code, checking if it is necessary and making sure the way a specific feature is implemented is _the right way_. This is costing is quite a bit of time.

## Error handling & logging

We added a new error handling system which has theoretical support for localization, extensibility and very accurate logging. This meant we had to replace every single error instance of the code base. We now have about 400 lines of defining errors and about 200 that specify how they are meant to be printed. This works very well.

We also changed how we log our output to completly decouple it from our engine. This was also a great success. You can now implement your on ui / cli on top of the antibuild engine. We might potentially very posibly be trying to get antibuild to run in wasm, but who knows. I'm not confirming anything... :-)

## Release

We hope to release antibuild around the end of June. Fingers crossed that will work out. If you have any questions or want to participate in building antibuild, just message me on Twitter. Have fun coding!
