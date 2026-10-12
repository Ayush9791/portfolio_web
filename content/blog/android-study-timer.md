---
title: "Building a Local-First Android Study Timer"
date: "11-10-2026"
summary: "Design choices behind a simple Android study timer that records sessions locally instead of requiring an account."
tags: ["Android", "Kotlin", "Productivity"]
project: "timer"
status: "published"
---

## The idea

I wanted a study timer that does more than count upward. It should let me pause a session, finish and save it, and review the time spent studying later.

The project is a native Android app built with Kotlin and Jetpack Compose.

## Keep the data local

Session records are stored on the device using local preferences. That means the app does not need an account or a network connection at runtime.

This is a deliberate trade-off: local storage is simple and private, but it also means sessions do not automatically sync across devices. Uninstalling the app or clearing its data removes the saved history.

## The session workflow

The core workflow separates timing from saving:

1. Start or resume the timer.
2. Pause without losing the current session.
3. Finish the session and confirm its subject, duration, and optional notes.
4. Review previous sessions and daily or weekly totals.

Keeping these steps separate avoids treating every pause as a completed study session.

## What I would improve next

Useful follow-up work includes CSV export, clearer recovery behavior after an app process is killed, and testing orientation changes during a running timer. These improvements should preserve the basic local-first approach.

## Takeaway

A small utility becomes more useful when it records meaningful history, not just elapsed seconds. The challenge is keeping the workflow fast enough that recording a session does not become a chore.
