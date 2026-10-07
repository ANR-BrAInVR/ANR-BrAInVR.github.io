# Camera Synchronization Tests

This page documents the development and validation of the NemoReefRecord synchronization strategy.

The objective is to determine the actual temporal relationship between independently recording GoPro MISSION 1 cameras.

Three distinct effects are considered:

1. **initial recording offset** between cameras;
2. **within-recording clock drift**;
3. **sequence-to-sequence variability**.


## Clock synchronization and drift

### Precision Time drift test

A first drift-calibration test was performed using the GoPro Labs **Precision Time QR code**.

The procedure was:

1. synchronize the MISSION 1 internal clock using Precision Time;
2. enable automatic drift calibration:
   ```text
   *DRFT=1
   ```
3. leave the camera clock running for approximately **72 h**;
4. present a second Precision Time QR code;
5. inspect the recorded metadata.

The metadata confirms that:

```text
DRFT 1
```

is correctly stored by the MISSION 1.

However, no `DRFS` value was generated or found after the second synchronization.

The same behaviour was observed in a separate test using GPS clock synchronization with approximately **24 h** between two synchronization events.

A question has been opened in the official GoPro Labs discussions:

[GoPro Labs Discussion #1830 — MISSION 1 clock drift / DRFT / DRFS](https://github.com/gopro/labs/discussions/1830){ target="_blank" rel="noopener" }

!!! warning "DRFS availability on MISSION 1"
    `DRFT=1` is confirmed to be stored in MISSION 1 metadata, but no `DRFS` value has yet been observed after repeated Precision Time or GPS synchronization tests.

    Confirmation from the GoPro Labs developers is currently pending.


## External synchronization references

Two external tests provide useful context for multi-GoPro synchronization:

- [Reddit — Timecode synchronization and drift on GoPro HERO12](https://www.reddit.com/r/gopro/comments/18uxnv0/timecode_synchronization_and_drift_on_gopro_hero12/){ target="_blank" rel="noopener" }
- [YouTube — GoPro HERO12 timecode synchronization test](https://www.youtube.com/watch?v=Upz1ksiH_lE&t=572s){ target="_blank" rel="noopener" }

The Reddit experiment reports approximately **233 ms of relative drift after 90 min**, corresponding to about **14 frames at 60 fps**.

The linked YouTube experiment reports substantially better behaviour, approximately **within one frame over nearly two hours**.

!!! warning "Different camera model"
    These experiments used **GoPro HERO12** cameras.

    NemoReefRecord uses **GoPro MISSION 1** cameras, so these values are used only as methodological references.


# Acoustic synchronization

Because scheduling alone cannot guarantee frame-level synchronization, a dedicated acoustic reference strategy was developed.

One camera, **CAM1**, generates acoustic markers that are recorded by the other cameras.

The marker can then be detected during post-processing to determine the effective temporal relationship between recordings.


## Open-air relative-loop experiment

Eight MISSION 1 cameras executed five recording sessions.

CAM2–CAM8 recorded for **5 min**.

CAM1 started approximately **1 min later**, recorded for approximately **3 min**, and generated acoustic markers.

| CAM1 marker | Content | Use |
|---|---:|---|
| Start | 4 beeps | Initial alignment |
| End | 5 beeps | Drift measurement |

Session 1 was excluded because CAM1 did not emit the expected markers.

Sessions **2–5** were analysed.


### Analysis method

1. **Reference:** CAM2, session 2.
2. Initial marker positions (**52.7 s** and **240.0 s**) were used as anchors.
3. Each acoustic burst was re-detected within **±2 s** using its RMS envelope.
4. Fixed **1 s acoustic templates** were extracted.
5. Normalized cross-correlation searched for each template within **±30 s** in every target video.
6. Start and end offsets were measured independently.


### Example — start marker

![Detection of the 4-beep start marker](../../assets/nemoreefrecord/open_air_relative_loop_CAM3_session02_start.png)


### Example — end marker

![Detection of the 5-beep end marker](../../assets/nemoreefrecord/open_air_relative_loop_CAM3_session02_end.png)


### Results

All **24 camera/session pairs**, corresponding to **48 cross-correlations**, were usable.

Initial offsets varied between sessions by up to approximately **0.50 s**.

Within individual sequences, however, relative camera timing remained highly stable.

| Camera | Maximum start → stop variation |
|---|---:|
| CAM3 | 2.6 ms |
| CAM4 | 1.8 ms |
| CAM5 | 3.4 ms |
| CAM6 | 4.1 ms |
| CAM7 | **5.0 ms** |
| CAM8 | 4.7 ms |

At 60 fps, one frame corresponds to approximately **16.7 ms**.

The maximum observed timing change of **5.0 ms** was therefore substantially below one video frame.

![Open-air relative-loop synchronization summary](../../assets/nemoreefrecord/open_air_relative_loop_sync_summary.png)

!!! success "Main result"
    Sequence-to-sequence recording offsets can reach several hundred milliseconds.

    Once a sequence has started, however, relative camera timing remained stable to within only a few milliseconds.

    Each sequence must therefore be aligned independently.


# Absolute-scheduling synchronization tests — 7 October 2026

Three datasets from the absolute-scheduling experiments were analysed:

| Dataset | Environment | Scheduling | Sessions |
|---|---|---|---:|
| `test_drft4` | Underwater | Absolute | 5 |
| `test_drft5` | Underwater | Absolute | 5 |
| `test_drft6` | Open air | Absolute | Incomplete due to battery depletion |

For these experiments, CAM1 generated a single acoustic marker immediately after each programmed recording start.

The marker was searched in CAM2–CAM4.

The analysis estimates:

- marker arrival time within each video;
- relative marker offset between cameras;
- normalized cross-correlation quality.


## Underwater — `test_drft4`

The first dataset was acquired underwater using predefined absolute recording windows.

![CAM1 marker synchronization summary — test_drft4 underwater](../../assets/nemoreefrecord/test_drft4_underwater_absolute_sync_summary.png)


### Underwater marker detection examples

Underwater recordings contain substantial acoustic background and transient signals.

The CAM1 tone is therefore detected using its characteristic filtered energy in addition to the initial cross-correlation estimate.

![Underwater CAM1 beep detection — CAM2 session 3](../../assets/nemoreefrecord/test_drft4_underwater_CAM2_session03_beep_detection.png)

![Underwater CAM1 beep detection — CAM3 session 4](../../assets/nemoreefrecord/test_drft4_underwater_CAM3_session04_beep_detection.png)

These examples illustrate why raw cross-correlation alone is not always sufficient underwater.


## Underwater — `test_drft5`

The second underwater dataset used the same absolute scheduling strategy.

![CAM1 marker synchronization summary — test_drft5 underwater](../../assets/nemoreefrecord/test_drft5_underwater_absolute_sync_summary.png)

Marker arrival time again varies between cameras and between sessions despite the use of predefined absolute recording times.

The normalized cross-correlation values provide an additional quality-control metric for the automatic detections.


## Open air — `test_drft6`

The final analysed dataset was acquired in open air.

![CAM1 marker synchronization summary — test_drft6 open air](../../assets/nemoreefrecord/test_drft6_open_air_absolute_sync_summary.png)


### Open-air marker detection examples

The acoustic conditions are substantially cleaner than underwater.

Individual CAM1 tones are clearly visible in the raw waveform and generate strong peaks in the filtered-energy signal.

![Open-air CAM1 beep detection — CAM3 session 1](../../assets/nemoreefrecord/test_drft6_open_air_CAM3_session01_beep_detection.png)

![Open-air CAM1 beep detection — CAM2 session 1](../../assets/nemoreefrecord/test_drft6_open_air_CAM2_session01_beep_detection.png)

The examples show normalized correlations approaching **1.0**.


## Preliminary comparison

The current results demonstrate that **absolute scheduling and synchronization are separate problems**.

Explicitly programming the same recording windows on several cameras does not guarantee that the effective video start times are identical.

Some analysed sessions show relative marker offsets of several hundred milliseconds, with some apparent differences approaching or exceeding **1 s**.

!!! warning "Large-offset validation"
    The largest apparent offsets in `test_drft4` and `test_drft5` should be validated against the raw acoustic signal before being interpreted as true camera-start offsets.

    A high cross-correlation value alone does not guarantee that the correct acoustic event was selected in a complex underwater recording.


!!! important "Absolute scheduling ≠ camera synchronization"
    Absolute GoPro Labs recording times provide a reproducible experimental schedule but should not be interpreted as frame-level synchronization.

    Acoustic markers remain necessary to measure the effective temporal relationship between cameras.


## Current test matrix

| Environment | Scheduling | Acoustic synchronization | Status |
|---|---|---|---|
| Open air | Relative loop | Start + end markers | **Analysed** |
| Underwater | Absolute | Start marker | **Analysed** |
| Open air | Absolute | Start marker | **Analysed** |
| Underwater | Relative loop | — | Not yet analysed |


## Next steps

Further synchronization analysis will focus on:

- validation of the large apparent offsets in underwater recordings;
- comparison of marker-detection reliability in air and underwater;
- quantitative comparison of relative and absolute scheduling;
- distribution of initial inter-camera offsets;
- longer start/end-marker experiments to measure within-recording drift;
- synchronization stability over approximately **12 h**;
- automatic quality-control criteria for acoustic-marker detection;
- post-processing correction of residual timing offsets.