# Electron Lab

A collection of historical Electron experiments. The current repository contains one project: a keyboard-event capture experiment in `Keylogger`.

## Included experiment

| Directory | Purpose |
| --- | --- |
| [Keylogger](Keylogger) | Electron UI, global keyboard events, local text logging, and an email-delivery routine. |

Read the [experiment documentation](Keylogger/README.md) before inspecting or running the application. Its behavior extends beyond the Electron window: it can capture keyboard events and send captured text by email.

## Repository status

This is legacy coursework using Electron 3-era dependencies. It is not a maintained desktop application or a general-purpose Electron starter. There is no root build command; the experiment has its own package manifest and lockfile.

This documentation update describes the existing source without activating capture, configuring mail credentials, or producing an installer. Third-party package compatibility and runtime behavior have not been verified.
