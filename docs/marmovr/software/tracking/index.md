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