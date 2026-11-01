---
title: "Trying Wi-Fi Sensing with RuView: What a Laptop and Router Can Actually Do"
date: "2026-10-28"
summary: "A practical exploration of Wi-Fi sensing, CSI capture requirements, and the gap between a software demo and usable through-wall sensing."
tags: ["Wi-Fi", "Computer Networks", "Experiment", "Hardware"]
project: "RuView"
status: "published"
---

## The idea

Wi-Fi signals change as they travel through an environment. In research systems, measurements of those changes can be used to infer movement or other coarse environmental activity.

I explored RuView to understand what a Wi-Fi sensing workflow looks like and whether I could experiment with it using the hardware already available: a Windows laptop and a regular Wi-Fi router.

## The hardware question comes first

The laptop uses a Realtek RTL8852BE Wi-Fi 6 adapter. Identifying the adapter and driver was an important first step, but a Wi-Fi 6 label does not automatically mean that the device exposes the low-level measurements a sensing system needs.

Many Wi-Fi sensing approaches rely on Channel State Information (CSI). CSI is not the same as an ordinary Wi-Fi connection or a list of nearby networks. It is lower-level channel measurement data, and access to it depends on chipset, firmware, driver, and capture-tool support.

That distinction changes the whole setup. Installing a package cannot create CSI access if the driver does not expose it.

## What I checked

I explored the project's onboarding and demo workflow, checked the wireless adapter details in Windows, and looked into whether the existing driver could provide the required capture data.

The main lesson was that software compatibility and hardware compatibility are separate questions. A demo can show what a sensing pipeline is intended to do without proving that a particular laptop can capture the required signal measurements.

## Why I stopped short of claiming detection

A convincing through-wall sensing claim needs repeatable measurements and controlled tests. It is not enough to run a demo or observe a visualization. The setup must show what data is being captured, how it changes under known conditions, and how reliably the system distinguishes movement from noise.

With only a standard laptop adapter and router, I did not establish a reliable CSI capture pipeline. So I am treating this as a hardware feasibility experiment, not a successful through-wall people detector.

## Takeaway

The most useful outcome was learning to validate the measurement path before investing time in the model or interface. For hardware-dependent machine-learning projects, the sensor and driver can be the actual bottleneck.
