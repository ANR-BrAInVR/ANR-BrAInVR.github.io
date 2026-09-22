# Hardware and technical details

MarmoRoomRecord is built around eight synchronized GigE cameras installed around the indoor marmoset living room. The acquisition architecture is designed to sustain simultaneous high-resolution video streams while keeping the acquisition computer outside the animal room.

---

## Current configuration

| Component | Description |
|---|---|
| Cameras | 8 × Basler ace 2 a2A1920-51gcBAS GigE cameras |
| Sensor output | 1920 × 1200 pixels, BayerRG8 |
| Target acquisition rate | 50 frames per second per camera |
| Synchronization | IEEE 1588 Precision Time Protocol (PTP) |
| Camera network | 1 Gigabit Ethernet per camera |
| Switch | TP-Link Omada SG2210XMP-M2 PoE+ switch |
| Acquisition uplink | 10 Gigabit Ethernet |
| Acquisition interface | Basler 10GigE PCIe network interface |
| Location | MPRC, CNRS Joseph Aiguier campus, Marseille |

---

## Cameras

The platform uses eight **Basler ace 2 a2A1920-51gcBAS** cameras. Each camera acquires 1920 × 1200 pixel Bayer images and is configured for operation up to 50 fps.

[Basler ace 2 a2A1920-51gcBAS — official product page and technical specifications](https://www.baslerweb.com/en/shop/a2a1920-51gcbas/)

The current camera network uses static IPv4 addresses:

| Camera serial number | IP address |
|---|---|
| 41942999 | 192.168.3.3 |
| 41950769 | 192.168.3.4 |
| 41950775 | 192.168.3.5 |
| 41979537 | 192.168.3.6 |
| 41979539 | 192.168.3.7 |
| 41979541 | 192.168.3.8 |
| 42011337 | 192.168.3.9 |
| 42011338 | 192.168.3.10 |

The acquisition computer uses `192.168.3.2` on the camera network.

### Acquisition parameters

The current high-frame-rate configuration uses the following baseline settings:

| Parameter | Current value |
|---|---|
| Resolution | 1920 × 1200 |
| Pixel format | BayerRG8 |
| Frame rate | 50 fps |
| Exposure time | 9000 µs |
| Gain | 0 dB |
| GigE packet size | 8192 bytes |
| Camera throughput limit | 125,000,000 B/s |
| Bandwidth reserve | 5% |
| Host buffers | 15 |
| Packet timeout | 40 ms |
| Frame retention | 200 ms |
| Maximum resend requests | 4 |

These values are still part of the validation process and may evolve as the full eight-camera system is stress-tested.

---

## Network architecture

Each camera is connected by Gigabit Ethernet to the **TP-Link Omada SG2210XMP-M2** PoE+ switch. The switch provides both camera connectivity and power distribution.

The eight camera streams are aggregated at the switch and transferred to the acquisition computer over a **10 Gigabit Ethernet uplink**. The acquisition computer uses a dedicated **Basler 10GigE PCIe network interface** for the camera network.

```text
Camera 1 ─┐
Camera 2 ─┤
Camera 3 ─┤
Camera 4 ─┤
Camera 5 ─┼── 1 GbE ──> PoE+ switch ── 10 GbE ──> Acquisition computer
Camera 6 ─┤
Camera 7 ─┤
Camera 8 ─┘
```

This architecture separates the eight 1 GbE camera links from the aggregated link to the recording computer and provides sufficient network capacity for simultaneous acquisition.

---

## Camera synchronization

The cameras use **Precision Time Protocol (PTP)** to maintain a common hardware clock over the Ethernet network.

[Basler documentation — Precision Time Protocol (PTP)](https://docs.baslerweb.com/precision-time-protocol)

During synchronization tests, one camera operates as the PTP master and the remaining cameras as slaves. Two-camera tests have demonstrated sub-microsecond synchronization, with measured slave offsets on the order of tens of nanoseconds under stable conditions.

The acquisition software reports the PTP state of each camera so that synchronization can be checked before recording starts.

---

## Acquisition computer

The dedicated acquisition computer is responsible for:

- configuring and opening the eight cameras;
- establishing and monitoring PTP synchronization;
- receiving the simultaneous GigE image streams;
- converting raw Bayer frames when preview is required;
- handling and recording the acquired camera streams;
- writing video files to local storage;
- reporting camera and recording status.

The computer is located outside the animal room to reduce noise, heat and disturbance and to simplify access during recording sessions.

---

## Thermal monitoring

Camera temperature is monitored by the acquisition software. In a room at approximately **25 °C**, the cameras have been measured between **50 and 54 °C**.

The Basler ace 2 cameras are industrial cameras designed for continuous operation. Although MarmoRoomRecord does not record continuously, the cameras remain powered on continuously between recording sessions. For this reason, camera temperature is monitored continuously in the acquisition interface so that abnormal thermal behaviour can be detected during day-to-day operation.

---

## Validation status

The current system has been validated for the main acquisition and recording workflow:

- [x] Eight-camera network operation and communication tests
- [x] Video writing tests for recording sessions up to **1 hour**
- [x] Scheduled recording executed correctly over **several consecutive days without intervention**
- [x] Recording journal/history available for all completed sessions
- [x] Video viewer tested and operational
- [x] Diagnostic tools tested and operational
- [ ] **ntfy notifications on the Joseph Aiguier campus** — still to be validated, as access to the ntfy service may be restricted by the local eduroam/network configuration

Further validation will continue during routine experimental use.
