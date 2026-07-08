# Software Architecture

MarmoVR is composed of four main software modules running on two independent computers.

## Software Modules

<div class="grid cards" markdown>

-   ### Calibration

    **Tracking PC (Linux)**

    Defines the geometric relationship between the cameras, the cave and the virtual environment.

    *Documentation coming soon*

-   ### Tracking

    **Tracking PC (Linux)**

    Performs animal detection, pose estimation and 3D reconstruction in real time.

    *Documentation coming soon*

-   ### Rendering

    **Rendering PC (Windows)**

    Runs Unreal Engine and updates the virtual environment according to the animal's behavior.

    *Documentation coming soon*

-   ### Viewer

    **Rendering PC (Windows)**

    Provides visualization, replay and post-processing tools for recorded experiments.

    *Documentation coming soon*

</div>

---

## Calibration

!!! info "Tracking PC (Linux)"
This module runs on the Tracking PC under Ubuntu Linux.

The calibration module defines the geometric relationship between the cameras, the MarmoVR cave, and the virtual coordinate system. It is required before running reliable real-time tracking or closed-loop rendering.

| Resource      | Link                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| Repository    | *Documentation coming soon*                                             |
| Documentation | *Documentation coming soon*                                             |

### Responsibilities

| Function                   | Description                                                             |
| -------------------------- | ----------------------------------------------------------------------- |
| Lens distortion correction | Corrects optical distortions introduced by the camera lenses            |
| Space calibration          | Aligns the multi-camera system with the physical cave coordinate system |
| Exclusion masks            | Defines valid image regions and removes areas outside the cave          |
| Reference images           | Generates background images used for animal detection                   |

---

## Tracking

!!! info "Tracking PC (Linux)"
This module runs on the Tracking PC under Ubuntu Linux.

The tracking module processes images acquired from the four Ximea cameras to estimate the position, posture and behavior of the animal in real time. The resulting information is continuously transmitted to the Rendering PC.

| Resource      | Link                                                                 |
| ------------- | -------------------------------------------------------------------- |
| Repository    | [GitHub Repository](https://github.com/ANR-BrAInVR/MarmoVR-Tracking){ target="_blank" rel="noopener" } |
| Documentation | *Documentation coming soon*                                          |

### Responsibilities

| Function             | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| Camera acquisition   | Captures synchronized video streams from the Ximea cameras |
| Animal detection     | Detects the animal within the experimental arena           |
| DeepLabCut inference | Estimates body posture and key anatomical landmarks        |
| 3D reconstruction    | Triangulates detections from multiple cameras              |
| Communication        | Sends real-time tracking information to Unreal Engine      |

---

## Rendering

!!! info "Rendering PC (Windows)"
This module runs on the Rendering PC under Microsoft Windows.

The rendering module executes virtual environments and experimental protocols. It receives tracking information from the Tracking PC and continuously updates the displayed scene to match the animal's position and orientation.

| Resource      | Link                                                                  |
| ------------- | --------------------------------------------------------------------- |
| Repository    | [GitHub Repository](https://github.com/ANR-BrAInVR/MarmoVR){ target="_blank" rel="noopener" }           |
| Documentation | *Documentation coming soon*                                           |

### Responsibilities

| Function                  | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| Unreal Engine environment | Runs virtual environments and behavioral tasks         |
| Experimental protocols    | Controls experiment logic and stimulus presentation    |
| Real-time rendering       | Updates scene perspective according to animal position |
| nDisplay synchronization  | Synchronizes rendering across multiple projectors      |

---

## Viewer

!!! info "Rendering PC (Windows)"
This module runs on the Rendering PC under Microsoft Windows.

The viewer module is used after data acquisition to inspect, replay and analyze tracking results. It provides a user-friendly interface for visualization and quality control.

| Resource      | Link                                                               |
| ------------- | ------------------------------------------------------------------ |
| Repository    | [GitHub Repository](https://github.com/ANR-BrAInVR/MarmoVR-Viewer){ target="_blank" rel="noopener" } |
| Documentation | *Documentation coming soon*                                        |

### Responsibilities

| Function        | Description                                       |
| --------------- | ------------------------------------------------- |
| Replay          | Replays recorded experiments                      |
| Visualization   | Displays 2D and 3D tracking results               |
| Post-processing | Supports analysis and export of experimental data |

---

# Software Ecosystem Summary

| Module      | Computer               | Repository                                                | Documentation |
| ----------- | ---------------------- |-----------------------------------------------------------| ------------- |
| Calibration | Tracking PC (Linux)    | Coming soon                                               | Coming soon   |
| Tracking    | Tracking PC (Linux)    | [GitHub](https://github.com/ANR-BrAInVR/MarmoVR-Tracking){ target="_blank" rel="noopener" } | Coming soon   |
| Rendering   | Rendering PC (Windows) | [GitHub](https://github.com/ANR-BrAInVR/MarmoVR){ target="_blank" rel="noopener" }          | Coming soon   |
| Viewer      | Rendering PC (Windows) | [GitHub](https://github.com/ANR-BrAInVR/MarmoVR-Viewer){ target="_blank" rel="noopener" }   | Coming soon   |


### Additional Documentation

- DeepLabCut training
- DLC model export
- Tracking PC installation
- DLC3 / DLC-live3 installation

See the Tracking documentation for details.
