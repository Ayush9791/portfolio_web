---
title: "Preparing Spiral Drawings for Parkinson's Screening"
date: "11-10-2026"
summary: "Notes on building a repeatable image-preprocessing pipeline for a handwriting-based Parkinson's screening project."
tags: ["AI/ML", "Python", "Computer Vision"]
project: "ParkinsonAI"
status: "published"
---

## Why preprocessing matters

A machine-learning model can only learn from the signal preserved in its input. For spiral drawings, inconsistent image sizes, background noise, and differences in contrast can make comparisons harder.

My final-year project explores Parkinson's disease screening from handwriting and spiral-drawing images. I am treating preprocessing as a separate, testable stage rather than mixing it into model training.

## The current pipeline

The preprocessing work uses Python and OpenCV to standardize input images. The pipeline includes:

- Converting inputs to a consistent grayscale representation.
- Applying thresholding to separate the drawing from the background.
- Using denoising where it helps preserve the stroke.
- Resizing outputs to a consistent image size.
- Checking that the resulting images remain valid for downstream feature extraction.

Otsu thresholding is a useful starting point, while adaptive thresholding can help when lighting or background intensity varies. Neither should be assumed to work best for every sample without visual inspection.

## What comes next

The next stage is feature extraction. Candidate features include shape descriptors, texture features, frequency-domain features, and measurements specific to spiral geometry.

I will compare these features using a consistent evaluation setup rather than treating a single accuracy score as proof of clinical usefulness.

## A note on limitations

This is an academic screening experiment, not a diagnostic tool. Dataset quality, participant-level data leakage, class balance, and validation design all affect how trustworthy the results are. Any reported performance needs to be measured on held-out data and described with those limitations.

## Takeaway

Keeping preprocessing reproducible makes it easier to inspect failures, compare feature extraction methods, and understand what information the model is actually receiving.
