# NemoReefRecord Tests

This section documents the experimental validation of the NemoReefRecord acquisition system.

Testing focuses on four complementary aspects of the system:

<div class="grid cards" markdown>

-   :material-battery-charging:{ .lg .middle } **Recording & Battery**

    ---

    Recording autonomy, thermal behaviour, battery consumption and generated data volume.

    [:octicons-arrow-right-24: Recording & Battery](recording.md)

-   :material-camera-outline:{ .lg .middle } **Field of View**

    ---

    Camera coverage, comparison of recording formats and validation of the selected 4K 4:3 configuration.

    [:octicons-arrow-right-24: Field of View](field-of-view.md)

-   :material-clock-outline:{ .lg .middle } **Scheduling**

    ---

    Evaluation of GoPro Labs recording instructions, relative loops and predefined absolute recording windows.

    [:octicons-arrow-right-24: Scheduling](scheduling.md)

-   :material-sync:{ .lg .middle } **Synchronization**

    ---

    Inter-camera synchronization, acoustic markers, clock drift and comparison between open-air and underwater recordings.

    [:octicons-arrow-right-24: Synchronization](synchronization.md)

</div>


## Current validation status

| Component | Status | Main result |
|---|---|---|
| Recording configuration | **Validated** | 4K 4:3, 60 fps, 8-bit, stabilization OFF retained |
| Battery/autonomy | **Characterized** | Recording duration strongly affects autonomy |
| Field of view | **Validated** | 4:3 retained for increased vertical coverage |
| Relative scheduling | **Tested** | Sequence timing accumulates processing delays |
| Absolute scheduling | **Tested** | Removes relative-loop accumulation but does not guarantee inter-camera synchronization |
| Acoustic synchronization | **Validated in principle** | CAM1 acoustic markers can be automatically detected |
| Open-air synchronization | **Tested** | Very strong acoustic-marker detection |
| Underwater synchronization | **Tested** | Markers remain detectable but acoustic environment is more complex |
| Long-term clock drift | **Under investigation** | MISSION 1 `DRFS` behaviour remains unresolved |


## Experimental strategy

The validation process distinguishes three timing problems that should not be confused:

1. **Scheduling accuracy** — whether a camera starts and stops recording when requested.
2. **Initial synchronization** — the relative offset between cameras at the beginning of a recording.
3. **Clock drift** — whether this relative offset changes during the recording.

This distinction is important because cameras can follow the same experimental schedule without being synchronized at frame level.

Conversely, cameras that start with a measurable offset may remain highly stable relative to each other during the recording.