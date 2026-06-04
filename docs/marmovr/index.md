# MarmoVR

<img src="../assets/logos/marmovr.png" width="64">

MarmoVR is an immersive Virtual Reality platform developed for behavioral experiments in freely moving marmosets.

The system combines real-time tracking, pose estimation, virtual environment rendering and automated behavioral analysis in a closed-loop experimental framework.

---

## Overview

MarmoVR is composed of two interconnected computers.

| Computer     | Operating System | Main Responsibilities                              |
| ------------ | ---------------- | -------------------------------------------------- |
| Tracking PC  | Ubuntu Linux     | Detection, tracking, DeepLabCut, 3D reconstruction |
| Rendering PC | Windows          | Unreal Engine, nDisplay, experiment control        |

The platform is organized around four main software modules.

| Module      | Computer     | Role                                                 |
| ----------- | ------------ | ---------------------------------------------------- |
| Calibration | Tracking PC  | Camera calibration and system setup                  |
| Tracking    | Tracking PC  | Real-time detection, tracking and pose estimation    |
| Rendering   | Rendering PC | VR environment rendering with Unreal Engine          |
| Viewer      | Rendering PC | Experiment replay, visualization and post-processing |

---

## System Diagram

<img src="../assets/marmovr/MarmoVR-diagram.jpg" width="100%">

---

## Documentation

<div class="grid cards" markdown>

-   <img src="../assets/marmovr/Puppet%20in%20the%20cave.jpg" style="width:100%; height:220px; object-fit:cover;">

    ## Quick Start

    Learn how to start the complete MarmoVR system and launch an experiment.

    [Open Quick Start](quick-start.md)

-   <img src="../assets/marmovr/Setup%20overview.png" style="width:100%; height:220px; object-fit:cover;">

    ## Hardware

    Description of the cave, cameras, lenses, computers, projectors and network architecture.

    [Open Hardware](hardware.md)

-   <img src="../assets/marmovr/Tracking%20UI%20running.png" style="width:100%; height:220px; object-fit:cover;">

    ## Software

    Overview of the tracking, rendering, calibration and viewer software modules.

    [Open Software](software.md)

-   <img src="../assets/marmovr/UE-models.png" style="width:100%; height:220px; object-fit:cover;">

    ## Troubleshooting

    Common issues, checks and recovery procedures.

    [Open Troubleshooting](troubleshooting.md)

</div>

## Software Modules

| Module         | Computer     | Repository                                                   | Documentation |
| -------------- | ------------ | ------------------------------------------------------------ | ------------- |
| 🎯 Calibration | Tracking PC  | [GitHub](https://github.com/ANR-BrAInVR/MarmoVR-Calibration) | Coming soon   |
| 🐒 Tracking    | Tracking PC  | [GitHub](https://github.com/ANR-BrAInVR/MarmoVR-Tracking)    | Coming soon   |
| 🧊 Rendering   | Rendering PC | [GitHub](https://github.com/ANR-BrAInVR/MarmoVR-Rendering)   | Coming soon   |
| 🖥️ Viewer     | Rendering PC | [GitHub](https://github.com/ANR-BrAInVR/MarmoVR-Viewer)      | Coming soon   |

---

!!! info
MarmoVR is under active development. Documentation will be updated progressively as each software module is stabilized.
