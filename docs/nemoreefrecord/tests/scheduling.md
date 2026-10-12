# Recording Scheduling Tests

| Current retained solution | Why |
|---|---|
| **Absolute GoPro Labs start/stop times for every acquisition window** | Each acquisition is independently anchored to a clock time, so delays from recording stop, processing or file finalization do not accumulate into later sessions. |

!!! info "What these tests revealed"
    **Scheduling and synchronization are different problems.** Absolute schedules prevent cumulative sequence-to-sequence timing errors, but they do not guarantee frame-level synchronization between independently recording cameras.

??? note "Other options tested"

    | Option | Why it was not retained |
    |---|---|
    | Relative recording loop | File-finalization and processing delays propagate into later sequences. |
    | Filename time as synchronization reference | Only one-second resolution; useful for schedule checks but insufficient for frame-level synchronization. |

This page evaluates how accurately GoPro Labs recording instructions control the effective recording schedule of the MISSION 1 cameras.


## Absolute scheduling tests — 7 October 2026

Four tests were performed on **7 October 2026** using explicitly predefined start and stop times. The first three were performed **underwater** and the fourth **in open air**.

The protocol used:

- **CAM1:** starts 1 min after CAM2–CAM4, records for 3 min and emits acoustic markers at start and stop;
- **CAM2–CAM4:** record for 5 min;
- five acquisition windows were programmed independently in each test.

!!! success "What this test revealed"
    Absolute scheduling removed the cumulative sequence-to-sequence shift observed with relative loops. It is therefore the retained scheduling strategy for NemoReefRecord.

    In Test 2, all five CAM2 filenames were stamped **+1 s** after the programmed start, with **no cumulative increase across sessions** at the one-second resolution of the filenames.

    This result validates the scheduling strategy only. Sub-second inter-camera alignment is evaluated separately on the synchronization page.

??? info "Detailed sequences and observations — 7 October 2026"

    ### Test 1 — underwater — 10:10–12:15

    **CAM1**

    ```text
    mVr4Tp60fWd0e0g0oW0oV7oD0oDO!10:11S!B0!10:14E!B0!10:41S!B0!10:44E!B0!11:11S!B0!11:14E!B0!11:41S!B0!11:44E!B0!12:11S!B0!12:14E!B0
    ```

    **CAM2–CAM4**

    ```text
    mVr4Tp60fWd0e0g0oW0oV0oD0oDO!10:10S!10:15E!10:40S!10:45E!11:10S!11:15E!11:40S!11:45E!12:10S!12:15E
    ```

    ---

    ### Test 2 — underwater — 13:15–15:20

    **CAM1**

    ```text
    mVr4Tp60fWd0e0g0oW0oV7oD0oDO!13:16S!B0!13:19E!B0!13:46S!B0!13:49E!B0!14:16S!B0!14:19E!B0!14:46S!B0!14:49E!B0!15:16S!B0!15:19E!B0
    ```

    **CAM2–CAM4**

    ```text
    mVr4Tp60fWd0e0g0oW0oV0oD0oDO!13:15S!13:20E!13:45S!13:50E!14:15S!14:20E!14:45S!14:50E!15:15S!15:20E
    ```

    **Observed CAM2 recording times**

    The CAM2 filenames provide the recording timestamp with a resolution of one second.

    | Session | Programmed start | CAM2 filename time | Observed offset |
    |---:|---:|---:|---:|
    | 1 | 13:15:00 | 13:15:01 | +1 s |
    | 2 | 13:45:00 | 13:45:01 | +1 s |
    | 3 | 14:15:00 | 14:15:01 | +1 s |
    | 4 | 14:45:00 | 14:45:01 | +1 s |
    | 5 | 15:15:00 | 15:15:01 | +1 s |

    All five recordings show the same **+1 s filename offset** relative to the programmed start. Unlike the relative-loop experiment, no cumulative timing shift is visible across successive sessions.

    ---

    ### Test 3 — underwater — 16:15–18:20

    For this test, CAM1 beep volume was increased from `oV7` to `oV9`.

    **CAM1**

    ```text
    mVr4Tp60fWd0e0g0oW0oV9oD0oDO!16:16S!B0!16:19E!B0!16:46S!B0!16:49E!B0!17:16S!B0!17:19E!B0!17:46S!B0!17:49E!B0!18:16S!B0!18:19E!B0
    ```

    **CAM2–CAM4**

    ```text
    mVr4Tp60fWd0e0g0oW0oV0oD0oDO!16:15S!16:20E!16:45S!16:50E!17:15S!17:20E!17:45S!17:50E!18:15S!18:20E
    ```

    ---

    ### Test 4 — open air — 20:00–22:05

    CAM1 beep volume remained at `oV9`.

    **CAM1**

    ```text
    mVr4Tp60fWd0e0g0oW0oV9oD0oDO!20:01S!B0!20:04E!B0!20:31S!B0!20:34E!B0!21:01S!B0!21:04E!B0!21:31S!B0!21:34E!B0!22:01S!B0!22:04E!B0
    ```

    **CAM2–CAM4**

    ```text
    mVr4Tp60fWd0e0g0oW0oV0oD0oDO!20:00S!20:05E!20:30S!20:35E!21:00S!21:05E!21:30S!21:35E!22:00S!22:05E
    ```


## Relative scheduling tests

!!! warning "What this test revealed"
    Relative loops accumulate timing error because the next waiting period begins only after recording stop, processing and file finalization. They are therefore not retained for NemoReefRecord.

A multi-camera test was performed in open air using a **relative GoPro Labs recording loop**. Instead of defining each recording from an absolute clock time, the next acquisition was triggered after a relative waiting period.

Each camera therefore successively:

1. records the video;
2. stops acquisition;
3. finalizes and writes the video;
4. waits for the requested duration;
5. starts the next recording.

Processing and file-finalization time can therefore affect the actual beginning of the following sequence.

### Observed file timestamps

This behaviour can be observed directly in the filenames generated by CAM02:

| Sequence | CAM02 video timestamp |
|---|---:|
| 1 | 13:00:03 |
| 2 | 13:30:09 |
| 3 | 14:01:16 |
| 4 | 14:30:23 |
| 5 | 15:00:30 |

The recordings do **not** remain on the theoretical 30-minute grid.

!!! important "Relative scheduling"
    A relative recording loop should not be considered an accurate common timebase because processing associated with one sequence can affect the effective timing of the next.


## Initial GoPro Labs recording tests

!!! info "What these tests revealed"
    Early schedules exposed practical edge cases, including a relative-loop instruction that did not continue correctly through midnight. These tests motivated the move to explicit absolute schedules.

??? note "Detailed initial schedules"

    ### 24–25 September — 5 min REC / 35 min pause

    ```text
    <18:15!18:15NmVr4Tp60fWd0e0g0oW0oV0oD0!S!2NoDO!298E!2N<l23!2098R
    ```

    **Midnight issue:** only **9 of the 24 expected sequences** were recorded. The instruction did not continue correctly past midnight.

    ---

    ### 24 September — 5 min REC / 15 min pause

    ```text
    <10:15!10:15NmVr4Tp60fWd0e0g0oW0oV0oD0!S!2NoDO!298E!2N<l23!898R
    ```

    ---

    ### 23 September pm — 10 min REC / 10 min pause

    ```text
    <17:10!17:10NmVr4Tp60fWd0e0g0oW0oV0oD0!S!2NoDO!598E!2N<l17!598R
    ```

    ---

    ### 23 September am — 10 min REC / 10 min pause

    ```text
    <09:00!09:00NmVr4Tp60fWd0e0g0oW0oV0oD0!S!2NoDO!598E!2N<l17!598R
    ```

    ---

    ### 22 September pm — 20 min REC / 1 min pause

    ```text
    !13:25NmVr4Tp60fWd1g0oW0oV0oD0!S!2NoDO!1198E!2N!13:46N!S!2NoDO!1198E!2N!14:07N!S!2NoDO!1198E!2N!14:28N!S!2NoDO!1198E!2N!14:49N!S!2NoDO!1198E!2N!15:10N!S!2NoDO!1198E!2N!15:31N!S!2NoDO!1198E!2N!15:52N!S!2NoDO!1198E!2N!16:13N!S!2NoDO!1198E
    ```

    ---

    ### 22 September am — 20 min REC / 1 min pause

    ```text
    !10:20NmVr4Tp60fWd1g0oW0oV0oD0!S!2NoDO!1198E!2N!10:41N!S!2NoDO!1198E!2N!11:02N!S!2NoDO!1198E!2N!11:23N!S!2NoDO!1198E!2N!11:44N!S!2NoDO!1198E!2N!12:05N!S!2NoDO!1198E!2N!12:26N!S!2NoDO!1198E!2N!12:47N!S!2NoDO!1198E!2N!13:08N!S!2NoDO!1198E
    ```
