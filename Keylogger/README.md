# Keyboard Event Capture Experiment

A historical Electron experiment combining a window interface, `gkm` keyboard events, file output, and Nodemailer. Use source review or an explicitly consented local test environment when studying the project.

## Source layout

| Path | Purpose |
| --- | --- |
| [src/app.js](src/app.js) | Electron lifecycle, IPC handlers, keyboard events, file writes, and mail routine. |
| [src/views/index.html](src/views/index.html) | Renderer interface. |
| [package.json](package.json) | Electron 3 and other dependency declarations. |

## Existing behavior

The capture flow hides the window, registers global keyboard listeners, appends events to `data.txt`, and schedules an email routine using credentials supplied through the interface. Showing the window again does not explicitly remove the listeners or clear the interval. A visible window therefore does not prove capture has stopped; terminate the process to end a test session.

Do not use real passwords or other sensitive input while testing this historical implementation. It is not designed as a secure logging or credential-handling application.

## Commands and packaging status

The package declares `npm start` as `electron .`; starting and interacting with this application can activate the behavior described above. `npm test` is a placeholder that exits with an error. There is no declared build script or pinned `electron-builder` configuration, so the old installer instructions are not a reproducible packaging workflow.

For a source-only syntax check, run `node --check src/app.js`. This does not start Electron or install dependencies. No keyboard capture, email delivery, runtime test, or installer build was performed for this documentation update.

Return to the [Electron Lab overview](../README.md).
