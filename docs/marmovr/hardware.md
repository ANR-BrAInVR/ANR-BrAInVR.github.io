# Hardware

## Overview

The MarmoVR setup consists of a behavioural cave surrounded by tracking cameras and immersive projection screens.

The system is split across two computers:

- **Tracking PC** running Ubuntu Linux
- **Rendering PC** running Microsoft Windows

Each computer runs a dedicated set of [software modules](software/index.md).

---

## Main Components

### Cave

Experimental arena in which the marmoset moves freely.

The cave is surrounded by:

- 4 tracking cameras
- 3 projection screens
- 3 video projectors

---

### Tracking Cameras

The setup uses four Ximea USB3 industrial cameras.

| Specification | Value |
|---|---|
| Manufacturer | Ximea |
| Camera family | xiQ USB3 |
| Sensor | onsemi PYTHON1300 |
| Resolution | 1280 × 1024 |
| Sensor size | 1/2" |
| Pixel size | 4.8 µm |
| Shutter | Global shutter |
| Interface | USB3 |
| Maximum frame rate | 210 FPS |

**Reference**

- [Camera](https://www.ximea.com/products/usb-vision-industrial/xiq-usb3-compact-cmos-cameras/onsemi-python1300-spartan-7-usb3-color-compact-camera){ target="_blank" rel="noopener" }

#### Responsibilities

| Function | Description |
|---|---|
| Position tracking | Animal localisation inside the cave |
| Pose estimation | Body posture reconstruction |
| DeepLabCut inference | Marker prediction using neural networks |
| 3D reconstruction | Multi-camera triangulation |

---

### Camera Lenses

Each Ximea camera is equipped with a Thorlabs MVL6WA lens.

| Specification | Value |
|---|---|
| Manufacturer | Thorlabs |
| Model | MVL6WA |
| Focal length | 6 mm |
| Maximum aperture | f/1.4 |
| Camera format | 1/2" |
| Mount | C-Mount |

**Reference**

- [Lens](https://www.thorlabs.com/camera-lenses-for-machine-vision?tabName=Overview){ target="_blank" rel="noopener" }

---

### Tracking PC

!!! info "Ubuntu Linux"
    Dedicated computer responsible for camera acquisition, real-time tracking and three-dimensional reconstruction.

#### Responsibilities

| Function | Description |
|---|---|
| Video acquisition | Camera control and image capture |
| Detection | Animal segmentation and localisation |
| DeepLabCut | Neural-network inference |
| Triangulation | 3D reconstruction |
| Communication | Real-time data transmission to the Rendering PC |

#### Software modules

- [Calibration](software/calibration/index.md) — defines the geometric relationships between the cameras, cave and virtual environment.
- [Tracking](software/tracking/index.md) — performs real-time detection, pose estimation and 3D reconstruction.
- [Post-processing](software/postprocessing/index.md) — processes and analyses recorded experimental data.

---

### Rendering PC

!!! info "Microsoft Windows"
    Dedicated computer responsible for experimental control, virtual-environment rendering and visualisation.

#### Responsibilities

| Function | Description |
|---|---|
| Unreal Engine | Virtual-environment execution |
| Experimental control | Behavioural protocol management |
| Rendering | Real-time scene generation |
| nDisplay | Multi-projector synchronisation |

#### Software modules

- [Rendering](software/rendering/index.md) — runs the virtual environment and updates it according to the animal's behaviour.
- [Viewer](software/viewer/index.md) — provides visualisation and replay tools for recorded experiments.

---

### Projectors

The setup uses three synchronized video projectors.

| Specification | Value |
|---|---|
| Quantity | 3 |
| Model | To be documented |
| Resolution | To be documented |
| Refresh rate | To be documented |

#### Responsibilities

| Function | Description |
|---|---|
| Immersive display | Projection of the virtual environment |
| Visual stimulation | Presentation of experimental stimuli |
| Perspective rendering | Animal-centred viewpoint update |

---

### Network

The Tracking PC and Rendering PC communicate through a dedicated Ethernet network.

#### Responsibilities

| Function | Description |
|---|---|
| Tracking → Rendering | Real-time transmission of animal position and posture |
| Rendering → Tracking | Experiment control and synchronization |

---

## Hardware Architecture

```text
4 Ximea Cameras
        ↓
Tracking PC (Ubuntu Linux)
  • Calibration
  • Tracking
  • Post-processing
        ↓
Ethernet
        ↓
Rendering PC (Windows)
  • Rendering
  • Viewer
        ↓
Unreal Engine + nDisplay
        ↓
3 Projectors
        ↓
Marmoset
```

---

## Hardware Summary

| Component | Quantity | Role |
|---|---:|---|
| Ximea USB3 cameras | 4 | Tracking and pose estimation |
| Thorlabs MVL6WA lenses | 4 | Image acquisition |
| Tracking PC | 1 | Acquisition, tracking and 3D reconstruction |
| Rendering PC | 1 | Experimental control and virtual-environment rendering |
| Video projectors | 3 | Immersive projection |
| Ethernet network | 1 | Communication between computers |