# NemoReefRecord — Quickstart

NemoReefRecord uses **GoPro Mission 1 cameras** configured and scheduled using **GoPro Labs QR codes**.

GoPro Labs is used to configure the recording parameters, synchronize the camera clocks and program autonomous recording sequences. The configuration is generated as a QR code and scanned by each camera before deployment.

* [GoPro Labs — Custom QR Code Creator](https://gopro.github.io/labs/control/custom/)
* [GoPro Labs — Precision Time](https://gopro.github.io/labs/control/precisiontime/)

!!! note "Development status"
This procedure is provisional and will be updated after validation with the complete **8-camera NemoReefRecord system**.

## 1. Recording configuration

The current configuration was selected after preliminary autonomy and overheating tests.

| Setting         | Value                         | GoPro Labs          |
| --------------- | ----------------------------- | ------------------- |
| Video mode      | Video                         | `mV`                |
| Resolution      | **4K 4:3**                    | `r4T`               |
| Frame rate      | **60 fps**                    | `p60`               |
| Lens            | **Wide**                      | `fW`                |
| Bit depth       | **8-bit**                     | `d0`                |
| Stabilization   | **OFF**                       | `e0`                |
| GPS             | **OFF**                       | `g0`                |
| Wireless        | **OFF**                       | `oW0`               |
| LEDs            | **OFF**                       | `oV0`               |
| Beeps           | **OFF**                       | `oD0`               |
| Display         | **OFF after 2 s**             | `!2NoDO`            |
| Recording cycle | **10 min REC / 10 min pause** | GoPro Labs schedule |

The corresponding video configuration is:

```text
mVr4Tp60fWd0e0g0oW0oV0oD0
```

## 2. Synchronize the camera clocks

Before programming the recording schedule, synchronize each GoPro using the GoPro Labs **Precision Date and Time** QR code:

[GoPro Labs — Precision Time](https://gopro.github.io/labs/control/precisiontime/)

1. Check that the computer or phone clock is correct.
2. Select the local timezone.
3. Display the animated QR code to each GoPro individually.
4. Repeat for all cameras shortly before deployment.

!!! warning
GoPro Labs time synchronization aligns the cameras' internal clocks but does not provide hardware-level synchronization such as genlock or PTP.

## 3. Program the recording schedule

Recording schedules are generated with the:

[GoPro Labs — Custom QR Code Creator](https://gopro.github.io/labs/control/custom/)

After generation, display the QR code to each camera.

### Standard camera — 10 min REC / 10 min pause

Example with the first recording starting at **09:00**:

```text
<09:00!09:00NmVr4Tp60fWd0e0g0oW0oV0oD0!S!2NoDO!598E!2N<l17!598R
```

This configuration produces repeated recording periods:

```text
10 min REC → 10 min pause → repeat
```

The schedule above programs **18 recording sequences**.

### Reference camera — synchronization sequences

For the final 8-camera setup, **7 cameras will use the standard schedule**.

The **8th camera will act as a reference camera**, using the same video configuration but slightly modified recording periods. The objective is to generate identifiable acoustic events at the beginning and end of the sequences.

The exact schedule will be added here after validation with the Mission 1:

```text
[Reference camera schedule — to be validated]
```

A **physical acoustic signal recorded by all eight cameras** can then be used to refine temporal alignment during post-processing.

!!! important
The acoustic marker must be physically audible to all cameras. A sound present only in the reference camera's own audio track cannot synchronize the other seven cameras.

## 4. Autonomy tests

Preliminary tests were performed in **4K 4:3 / 60 fps / Wide** to evaluate battery life and overheating.

| Test                | Configuration                | Cycle                         |      Video obtained | Main observation               |
| ------------------- | ---------------------------- | ----------------------------- | ------------------: | ------------------------------ |
| **22/09 morning**   | 10-bit                       | 20 min REC / 1 min pause      | **1 h 14 min 51 s** | Thermal shutdown               |
| **22/09 afternoon** | 10-bit                       | 20 min REC / 1 min pause      |    **≈ 1 h 39 min** | Probable battery depletion     |
| **23/09**           | **8-bit, stabilization OFF** | **10 min REC / 10 min pause** |    **≈ 1 h 52 min** | Best result; ~48.5 GB recorded |

The **8-bit / stabilization OFF / 10 min REC / 10 min pause** configuration provided the best autonomy and is currently retained for NemoReefRecord.

Detailed test results will be moved to a dedicated **Tests** page as the 8-camera validation progresses.

!!! tip "Wi-Fi / iPhone setup"
During Wi-Fi / iPhone configuration, **do not connect the GoPro to external power**.
