# Hardware

## Overview

The MarmoVR setup consists of a behavioral cave surrounded by tracking cameras and immersive projection screens.

The system is split across two computers:

* **Tracking PC** running Ubuntu Linux
* **Rendering PC** running Windows

---

## Main Components

### Cave

Experimental arena where the marmoset freely moves.

The cave is surrounded by:

* 4 tracking cameras
* 3 projection screens
* 3 video projectors

---

### Tracking Cameras

The setup uses four Ximea USB3 industrial cameras.

| Specification      | Value             |
| ------------------ | ----------------- |
| Manufacturer       | Ximea             |
| Camera family      | xiQ USB3          |
| Sensor             | onsemi PYTHON1300 |
| Resolution         | 1280 × 1024       |
| Sensor size        | 1/2"              |
| Pixel size         | 4.8 µm            |
| Shutter            | Global shutter    |
| Interface          | USB3              |
| Maximum frame rate | 210 FPS           |

**Reference**

* https://www.ximea.com/products/usb-vision-industrial/xiq-usb3-compact-cmos-cameras/onsemi-python1300-spartan-7-usb3-color-compact-camera

#### Responsibilities

| Function             | Description                            |
| -------------------- | -------------------------------------- |
| Position tracking    | Animal localization inside the cave    |
| Pose estimation      | Body posture reconstruction            |
| DeepLabCut inference | Marker prediction from neural networks |
| 3D reconstruction    | Multi-camera triangulation             |

---

### Camera Lenses

Each Ximea camera is equipped with a Thorlabs MVL6WA lens.

| Specification    | Value    |
| ---------------- | -------- |
| Manufacturer     | Thorlabs |
| Model            | MVL6WA   |
| Focal length     | 6 mm     |
| Maximum aperture | f/1.4    |
| Camera format    | 1/2"     |
| Mount            | C-Mount  |

**Reference**

* https://www.thorlabs.com/camera-lenses-for-machine-vision?tabName=Overview

---

### Tracking PC

!!! info "Ubuntu Linux"

```
Dedicated computer responsible for real-time tracking.
```

#### Responsibilities

| Function          | Description                                 |
| ----------------- | ------------------------------------------- |
| Video acquisition | Camera control and image capture            |
| Detection         | Animal segmentation and localization        |
| DeepLabCut        | Neural network inference                    |
| Triangulation     | 3D reconstruction                           |
| Communication     | Real-time data transmission to Rendering PC |

---

### Rendering PC

!!! info "Microsoft Windows"

```
Dedicated computer responsible for virtual environment rendering.
```

#### Responsibilities

| Function             | Description                     |
| -------------------- | ------------------------------- |
| Unreal Engine        | Virtual environment execution   |
| Experimental control | Behavioral protocol management  |
| Rendering            | Real-time scene generation      |
| nDisplay             | Multi-projector synchronization |

---

### Projectors

The setup uses three synchronized video projectors.

| Specification | Value            |
| ------------- | ---------------- |
| Quantity      | 3                |
| Model         | To be documented |
| Resolution    | To be documented |
| Refresh rate  | To be documented |

#### Responsibilities

| Function              | Description                           |
| --------------------- | ------------------------------------- |
| Immersive display     | Projection of the virtual environment |
| Visual stimulation    | Presentation of experimental stimuli  |
| Perspective rendering | Animal-centered viewpoint update      |

---

### Network

The Tracking PC and Rendering PC communicate through a dedicated Ethernet network.

#### Responsibilities

| Function             | Description                                           |
| -------------------- | ----------------------------------------------------- |
| Tracking → Rendering | Real-time transmission of animal position and posture |
| Rendering → Tracking | Experiment control and synchronization                |

---

## Hardware Architecture

```text
4 Ximea Cameras
        ↓
Tracking PC (Ubuntu Linux)
        ↓
Ethernet
        ↓
Rendering PC (Windows)
        ↓
Unreal Engine + nDisplay
        ↓
3 Projectors
        ↓
Marmoset
```

---

## Hardware Summary

| Component              | Quantity | Role                            |
| ---------------------- | -------- | ------------------------------- |
| Ximea USB3 Cameras     | 4        | Tracking and pose estimation    |
| Thorlabs MVL6WA Lenses | 4        | Image acquisition               |
| Tracking PC            | 1        | Real-time tracking              |
| Rendering PC           | 1        | Virtual environment rendering   |
| Video Projectors       | 3        | Immersive projection            |
| Ethernet Network       | 1        | Communication between computers |
