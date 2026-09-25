# NemoReefRecord — Quickstart

NemoReefRecord uses **8 GoPro Mission 1 cameras** configured and scheduled using **GoPro Labs QR codes**.

The cameras are synchronized and programmed before deployment using the following procedure.

---

## Quick procedure

```text
1. Synchronize camera clocks
        ↓
2. Generate the GoPro Labs instruction
        ↓
3. Convert the instruction to a QR code
        ↓
4. Scan the QR code with each camera
        ↓
5. Install cameras and deploy
```

### 1. Synchronize camera clocks

Open:

[GoPro Labs — Precision Time](https://gopro.github.io/labs/control/precisiontime/){ target="_blank" rel="noopener" }

1. Check that the computer or phone clock is correct.
2. Select the local timezone.
3. Display the animated synchronization QR code to each camera individually.
4. Repeat for all cameras shortly before deployment.

### 2. Generate the GoPro Labs instruction

Use the **GoPro Labs AI Chat Bot** to generate the acquisition instruction:

[GoPro Labs AI Chat Bot](https://bit.ly/chat_gp_labs){ target="_blank" rel="noopener" }

In the chat, always provide the information in the following order:

1. **List all required camera parameters.**
2. **Describe the desired recording sequence.**

For the current NemoReefRecord configuration, provide the following camera parameters:

```text
Video mode: Video
Resolution: 4K 4:3
Frame rate: 60 fps
Lens: Wide
Bit depth: 8-bit
Stabilization: OFF
GPS: OFF
Wireless: OFF
LEDs: OFF
Beeps: OFF
Display: OFF after 2 s
```

Then describe the desired recording sequence, including:

- acquisition start time;
- recording duration;
- pause duration;
- number of recording sequences.

For example:

```text
Start recording at 09:00.
Record for 10 minutes.
Pause for 10 minutes.
Repeat for 18 recording sequences.
```

The assistant can then generate the corresponding GoPro Labs instruction.

For this example:

```text
<09:00!09:00NmVr4Tp60fWd0e0g0oW0oV0oD0!S!2NoDO!598E!2N<l17!598R
```

!!! important
    Always provide the **complete camera configuration first, followed by the desired recording sequence**.

    Do not rely on parameters from a previous conversation when generating a new instruction.

### 3. Generate the QR code

Open:

[GoPro Labs — Custom QR Code Creator](https://gopro.github.io/labs/control/custom/){ target="_blank" rel="noopener" }

Paste the GoPro Labs instruction generated in the previous step into the **Custom QR Code Creator**.

The page generates the corresponding QR code.

### 4. Program the cameras

Display the generated QR code to **each GoPro individually**.

Repeat the operation for all cameras.

### 5. Install and deploy

Install the cameras on the NemoReefRecord structure.

The cameras are now synchronized and programmed for autonomous acquisition.

## Recording configuration

The current recording configuration was selected after preliminary autonomy, thermal and field-of-view tests.

| Setting | Value | GoPro Labs |
|---|---|---|
| Video mode | Video | `mV` |
| Resolution | **4K 4:3** | `r4T` |
| Frame rate | **60 fps** | `p60` |
| Lens | **Wide** | `fW` |
| Bit depth | **8-bit** | `d0` |
| Stabilization | **OFF** | `e0` |
| GPS | **OFF** | `g0` |
| Wireless | **OFF** | `oW0` |
| LEDs | **OFF** | `oV0` |
| Beeps | **OFF** | `oD0` |
| Display | **OFF after 2 s** | `!2NoDO` |
| Standard recording cycle | **10 min REC / 10 min pause** | GoPro Labs schedule |

The corresponding video configuration is:

```text
mVr4Tp60fWd0e0g0oW0oV0oD0
```

---

## Clock synchronization details

GoPro Labs **Precision Date and Time** is used to align the internal clocks of the cameras shortly before deployment.

!!! warning
    GoPro Labs time synchronization aligns the cameras' internal clocks but does **not** provide hardware-level synchronization such as genlock or PTP.

    Although the Precision Time page displays time with millisecond resolution, the effective visual timing precision is also limited by the refresh rate of the screen displaying the QR code.

    For a typical **60 Hz laptop display, a new frame is displayed approximately every 16.7 ms**, so millisecond-level display resolution does not imply millisecond-level synchronization accuracy.

---

## Reference camera

For the final 8-camera setup, **7 cameras will use the standard recording schedule**.

The **8th camera will act as a reference camera**, using the same video configuration but slightly modified recording periods. The objective is to generate identifiable acoustic events at the beginning and end of the sequences.

The exact schedule will be added after validation with the Mission 1:

```text
[Reference camera schedule — to be validated]
```

A **physical acoustic signal recorded by all eight cameras** can then be used to refine temporal alignment during post-processing.

!!! important
    The acoustic marker must be physically audible to all cameras. A sound present only in the reference camera's own audio track cannot synchronize the other seven cameras.

---

## Tests and validation

Recording autonomy, thermal behaviour, GoPro Labs schedules and field-of-view comparisons are documented on the **[NemoReefRecord Tests](tests.md){ target="_blank" rel="noopener" }** page.

---

## GoPro resources

The [GoPro Labs GitHub repository](https://github.com/gopro/labs){ target="_blank" rel="noopener" } is the main technical reference for GoPro Labs commands, scripting syntax and camera compatibility.

- [GoPro Mission 1 — official page](https://gopro.com/fr/fr/shop/learn-cameras/mission-1){ target="_blank" rel="noopener" }
- [GoPro Labs — GitHub repository](https://github.com/gopro/labs){ target="_blank" rel="noopener" }
- [GoPro Labs — Custom QR Code Creator](https://gopro.github.io/labs/control/custom/){ target="_blank" rel="noopener" }
- [GoPro Labs — Precision Time](https://gopro.github.io/labs/control/precisiontime/){ target="_blank" rel="noopener" }
- [GoPro Labs AI Chat Bot](https://bit.ly/chat_gp_labs){ target="_blank" rel="noopener" } — assistant for creating and checking GoPro Labs scripts

!!! note "Development status"
    This procedure is provisional and will be updated after validation with the complete **8-camera NemoReefRecord system**.