---
title: "From Accident Detection Model to a Reviewable Emergency Dashboard"
date: "2026--10-30"
summary: "How I approached connecting a computer-vision accident classifier to a web dashboard, including evidence capture and the limits of a prototype."
tags: ["Python", "Computer Vision", "FastAPI", "Next.js", "AI/ML"]
project: "Surakshan"
status: "published"
---

## The problem I wanted to solve

An accident-detection model is only one part of an emergency-response workflow. A prediction on its own does not tell an operator where an incident happened, what the camera saw, or whether the alert should be acted on.

Surakshan is an accident detection and reporting project. The broader direction is to connect camera-based detection with a dashboard that lets authorized users inspect incidents and coordinate a response.

## Training the first classifier

For the initial experiment, I organized the image dataset into training, validation, and test splits. The training run used 889 training images, 98 validation images, and 100 test images, with two labels: Accident and Non Accident.

That dataset is a starting point, not enough evidence for a dependable real-world safety system. A small image dataset can help validate the pipeline, but it does not establish performance across different roads, weather, camera angles, lighting, or rare accident scenarios.

## Why the dashboard needs evidence

A dashboard with a review button is not useful unless the detection pipeline preserves something that an operator can review.

For each candidate incident, the system should retain the relevant frame or image along with the timestamp, camera identifier, model output, and review state. The evidence should be stored and linked to the incident record, rather than relying on a browser preview that disappears when the request ends.

This also creates a clearer separation between machine-generated alerts and human decisions. A model can flag a possible incident; an operator should be able to inspect the evidence before the event is treated as confirmed.

## Separating the application layers

I have been working toward a web dashboard rather than keeping the interface tied to a model-demo framework. The intended architecture separates:

- **Detection service:** receives frames and runs the computer-vision model.
- **Backend API:** records candidate incidents, metadata, evidence references, and review actions.
- **Web dashboard:** presents incidents and supports role-based access for operational users.

This separation makes it easier to test the model independently from authentication, incident storage, and the interface.

## Prototype limitations

There are several gaps between a college prototype and a deployable emergency system. Live camera ingestion, reliable evidence storage, authentication, access control, alert delivery, and operational monitoring all need to work together.

Most importantly, a false negative can be dangerous and a false positive can waste responders' time. Any serious deployment would need representative data, independent evaluation, human oversight, and agreements with the organizations receiving alerts. The current project should be treated as a prototype, not as a live emergency service.

## What I would build next

The next milestone is an end-to-end test: submit a frame, generate a candidate alert, save its evidence, display it in the dashboard, and record a review decision. Once that path is reliable, it becomes possible to evaluate streaming cameras and notification workflows without confusing a model prediction with a confirmed accident.

The central lesson is simple: detection is not the whole product. The surrounding workflow determines whether the output can be checked, understood, and acted on responsibly.
