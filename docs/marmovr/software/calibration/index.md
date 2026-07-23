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