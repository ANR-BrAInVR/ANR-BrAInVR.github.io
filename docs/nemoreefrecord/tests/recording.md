# Recording & Battery Tests

This page documents recording autonomy, thermal behaviour, battery consumption and generated data volume for the GoPro MISSION 1 cameras used in NemoReefRecord.


## Initial recording tests

Recording tests were performed to evaluate camera autonomy and thermal behaviour under different acquisition cycles.

| Test | Configuration | Cycle | Total recorded video | Main observation |
|---|---|---|---:|---|
| **24–25/09** | **8-bit, stabilization OFF** | **5 min REC / 35 min pause** | **≈ 45 min** | 9/24 sequences; ~8.0 GB |
| **24/09** | **8-bit, stabilization OFF** | **5 min REC / 15 min pause** | **≈ 1 h 30 min** | 18/24 sequences; ~21.8 GB |
| **23/09 pm** | **8-bit, stabilization OFF** | **10 min REC / 10 min pause** | **≈ 1 h 52 min** | 11 complete sequences + ~2 min; ~47 GB |
| **23/09 am** | **8-bit, stabilization OFF** | **10 min REC / 10 min pause** | **≈ 1 h 52 min** | 11 complete sequences + ~2 min; ~48.5 GB |
| **22/09 pm** | **10-bit** | **20 min REC / 1 min pause** | **≈ 1 h 39 min** | Probable battery depletion |
| **22/09 am** | **10-bit** | **20 min REC / 1 min pause** | **1 h 14 min 51 s** | Thermal shutdown |

The two tests performed with the selected **8-bit / stabilization OFF / 10 min REC / 10 min pause** configuration both provided approximately **1 h 52 min of recorded video**, showing consistent recording autonomy across repeated tests.

The earlier 10-bit tests with long recording periods resulted in either probable battery depletion or thermal shutdown.

These observations contributed to the selection of the current recording configuration:

- **4K 4:3**
- **60 fps**
- **8-bit**
- **stabilization OFF**
- **GPS OFF**
- **wireless OFF**


!!! tip "Wi-Fi / iPhone setup"
    During Wi-Fi / iPhone configuration, **do not connect the GoPro to external power**.


## Battery experiment — 7 October 2026

Battery level and cumulative recorded duration were monitored throughout four consecutive experimental blocks performed on **7 October 2026**.

CAM1 was used as the acoustic-reference camera and recorded **3 min per session**.

CAM2–CAM4 recorded **5 min per session**.


### Battery evolution

| Time | CAM1 battery | CAM2 | CAM3 | CAM4 | CAM1 recorded | CAM2 | CAM3 | CAM4 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 10:11 | 100% | 100% | 100% | 100% | 0 min | 0 min | 0 min | 0 min |
| 12:40 | 85% | 80% | 77% | 78% | 15 min | 25 min | 25 min | 25 min |
| 15:45 | 67% | 52% | 49% | 51% | 30 min | 50 min | 50 min | 50 min |
| 19:39 | 46% | 24% | 20% | 22% | 45 min | 75 min | 75 min | 75 min |
| 22:05 | 28% | 7% | 5% | 6% | 60 min | 91 min | 87 min | 88 min |


### End-of-day results

| Camera | Recorded duration | Battery remaining | Battery used | Generated data |
|---|---:|---:|---:|---:|
| CAM1 | 60 min | 28% | 72% | 18.2 GB |
| CAM2 | 91 min | 7% | 93% | 31.3 GB |
| CAM3 | 87 min | 5% | 95% | 28.4 GB |
| CAM4 | 88 min | 6% | 94% | 28.6 GB |

CAM1 recorded substantially less video because its acoustic-reference sequences lasted only **3 min**, compared with **5 min** for CAM2–CAM4.

This difference is clearly reflected in the remaining battery level at the end of the day.


## Low-battery shutdown

The final open-air experiment could not be completed by CAM2–CAM4.

| Camera | Sessions recorded |
|---|---:|
| CAM1 | **5 / 5** |
| CAM2 | **4 / 5** |
| CAM3 | **3 / 5** |
| CAM4 | **3 / 5** |

CAM2–CAM4 stopped because of low battery before completing the protocol.

When subsequently powered on, the cameras still displayed approximately **5–7% remaining battery**.

!!! warning "Low-battery shutdown"
    These observations show that the cameras can stop recording before the displayed battery level reaches 0%.

    This experiment does **not** establish a precise MISSION 1 shutdown threshold.

    The battery percentage displayed after restarting should therefore not be interpreted as the exact battery level at which shutdown occurred.


## Battery consumption and recorded duration

Across the measurements collected during the experiment, cumulative recorded duration was strongly associated with battery consumption.

The Pearson correlation between cumulative recorded duration and battery consumed was approximately:

**r = 0.994**

Generated data volume was similarly associated with battery consumption:

**r = 0.981**

These relationships should be interpreted descriptively rather than causally because elapsed time, recorded duration and generated data volume increase together throughout the experiment.

!!! success "Main observation"
    Recording duty cycle has a major impact on MISSION 1 autonomy.

    The reference-camera strategy, with CAM1 recording only 3 min per session instead of 5 min, substantially reduced its battery consumption over the experimental day.


## Next steps

Further autonomy tests will evaluate:

- battery consumption during the final NemoReefRecord duty cycle;
- autonomy over a complete field deployment;
- variability between cameras;
- influence of underwater operation on autonomy;
- relationship between recording duration, generated data volume and battery consumption.