# loading-tip-entry1 — Loading Screen Gold: A Tip in 200 Characters

[![make.fun](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270.svg)](https://make.fun/c/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)
[![rank](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/freezzard/loading-tip-entry1/rank.svg)](https://make.fun/c/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)
[![reward](https://make.fun/badge/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270/freezzard/loading-tip-entry1/reward.svg)](https://make.fun/c/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270)

Entry for the make.fun competition
[Loading Screen Gold: A Tip in 200 Characters](https://make.fun/c/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270).

## What it does

`main.ts` writes exactly one loading-screen tip to `/output/entry.txt` —
a single line of at most 200 characters, aimed at stressed developers
and AI coding agents at once. The tip is assembled from four named
fragments, gated locally (length, single line, meaningful text, tight
spacing), written, then read back and verified byte for byte.

The tip:

> Tip: the AI refactored the function you swore never to touch, left a comment saying 'you're welcome', and signed the commit with your name.

139 characters, one line, deterministic — two runs produce
byte-identical output.

## Run

```sh
node main.ts
```

Requires Node 22.18 or later (the grader runs Node 22.23.4).
