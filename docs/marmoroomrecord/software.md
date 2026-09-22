# Software

MarmoRoomRecord includes a dedicated Python acquisition application for configuring, synchronizing, monitoring and recording the eight Basler cameras.

The software is intentionally kept lightweight: camera discovery, configuration and acquisition are handled directly through the Basler pylon SDK, with OpenCV used for image conversion and live preview.

---

## Software stack

| Component | Role |
|---|---|
| Python 3.11 | Main acquisition application |
| Basler pylon / pypylon | Camera discovery, configuration and image acquisition |
| OpenCV | Image conversion and live preview |
| JSON | Persistent acquisition settings |
| ntfy | Remote recording notifications |

The application runs on Windows on the dedicated acquisition computer.

---

## Application structure

The acquisition program is deliberately compact and currently revolves around two main files:

```text
MarmoRoomRecord/
├── main.py
├── settings.json
└── Recordings/
```

`main.py` contains the graphical interface and acquisition logic. `settings.json` stores the camera and recording parameters so that the experimental configuration can be modified without editing the Python source code.

The `Recordings` directory is kept outside the development source directory in the local project layout, preventing recorded videos from being mixed with source files or committed to Git.

---

## Camera configuration

At startup, the application detects the configured Basler cameras by serial number and applies the parameters defined in `settings.json`.

The software controls parameters including:

- camera serial numbers;
- image resolution;
- frame rate;
- exposure time;
- gain;
- GigE packet and resend settings;
- bandwidth limits;
- PTP synchronization;
- recording parameters and output path.

Using serial numbers rather than camera enumeration order ensures that each physical camera keeps a stable identity between sessions.

---

## Acquisition pipeline

For each camera, the application receives raw **BayerRG8** images from pypylon. Frames used for display are converted with OpenCV using:

```python
cv2.COLOR_BAYER_RG2BGR
```

Recording is separated as much as possible from the GUI preview so that display operations do not unnecessarily limit acquisition performance.

The current target is simultaneous acquisition from eight cameras at **1920 × 1200 pixels and 50 fps**.

---

## Recording

The application records the acquired camera streams to a dedicated `Recordings` directory. Recording is handled separately from the live preview as much as possible so that display operations do not unnecessarily interfere with acquisition.

The exact recording implementation and file format are deliberately not specified here until they are verified against the current `main.py`. What matters at the acquisition level is that the software distinguishes between the camera frame rate, successfully received frames and frames successfully written during recording.

The recording path is defined relative to the application whenever possible, allowing the project folder to be moved without rewriting machine-specific absolute paths.

---

## Graphical interface

The GUI provides a single control point for the acquisition system. Its current functions include:

- camera detection and connection status;
- live camera preview;
- start and stop recording controls;
- visible recording-in-progress status;
- per-camera PTP synchronization status;
- per-camera temperature display;
- recording and acquisition diagnostics.

PTP status is displayed per camera so that the operator can verify that the cameras have reached the expected master/slave state before starting an experimental recording.

---

## Monitoring and notifications

The application can send remote notifications through **ntfy**. Notifications are used to report important recording events without requiring the acquisition GUI to remain under constant observation.

The current notification workflow includes:

- successful recording start;
- successful recording completion;
- interrupted or abnormal recording termination.

This is particularly useful for long-duration tests and recordings performed while the acquisition computer is located in a separate room.

---

## Performance validation

Development has included progressive tests from one camera to the complete eight-camera architecture.

Single- and dual-camera testing showed that high frame rates are sensitive to network and host acquisition parameters: incomplete frames can appear when packet handling cannot keep up with the incoming GigE stream. Basler pylon Viewer has therefore also been used as a reference when separating camera/network limitations from Python application performance.

Current validation focuses on the complete acquisition chain:

```text
Basler cameras
      ↓
pypylon acquisition
      ↓
frame handling / preview
      ↓
recording pipeline
      ↓
video files
```

The objective is sustained eight-camera recording with no acquisition or recorder drops over long sessions.

---

## Future integration

MarmoRoomRecord currently focuses on reliable synchronized video acquisition. The recordings will subsequently feed the broader BrAInVR analysis pipeline, including multi-animal pose estimation, individual tracking, 3D reconstruction and automated behavioural analysis.

These analysis components are intentionally kept separate from the acquisition application so that recording reliability does not depend on the computational cost or development state of the downstream AI pipeline.
