# Rendering

<p align="right">
  <a
    href="https://github.com/ANR-BrAInVR/MarmoVR"
    target="_blank"
    rel="noopener"
  >
    GitHub repository ↗
  </a>
</p>

!!! info "Rendering PC (Windows)"
    This module runs on the [Rendering PC](../../hardware.md#rendering-pc) under Microsoft Windows.

The rendering module executes virtual environments and experimental protocols. It receives tracking information from the Tracking PC and continuously updates the displayed scene to match the animal's position and orientation.

The [Rendering PC hardware](../../hardware.md#rendering-pc) is responsible for running Unreal Engine, managing the experimental protocol and synchronizing the three projectors through nDisplay.

## Responsibilities

| Function | Description |
|---|---|
| Unreal Engine environment | Runs virtual environments and behavioural tasks |
| Experimental protocols | Controls experiment logic and stimulus presentation |
| Real-time rendering | Updates the scene perspective according to the animal's position |
| nDisplay synchronization | Synchronizes rendering across multiple projectors |

---

## Related documentation

- [Rendering PC hardware](../../hardware.md#rendering-pc)
- [MarmoVR hardware architecture](../../hardware.md#hardware-architecture)
- [GitHub repository](https://github.com/ANR-BrAInVR/MarmoVR){ target="_blank" rel="noopener" }