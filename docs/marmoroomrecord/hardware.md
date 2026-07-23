# Hardware and technical details

MarmoRoomRecord uses eight synchronized Ethernet cameras installed around the indoor marmoset living room.

The cameras are connected to a PoE+ switch. A long Cat 7 Ethernet cable links the switch to a dedicated acquisition computer located in a separate analysis room.

---

## Current configuration

| Component | Description |
|---|---|
| Cameras | 8 Basler ace 2 a2A1920-51gcBAS GigE cameras |
| Resolution | 1920 × 1200 pixels |
| Acquisition rate | 50 frames per second |
| Synchronization | Precision Time Protocol |
| Network | PoE+ switch and 10 Gigabit Ethernet link |
| Long-distance connection | Cat 7 Ethernet cable between the recording and analysis rooms |
| Acquisition computer | Dedicated computer for camera control, recording and data storage |
| Location | MPRC, CNRS Joseph Aiguier campus, Marseille |

---

## System architecture

The acquisition computer:

- configures and synchronizes the cameras;
- starts and stops recordings;
- receives the eight video streams;
- writes the acquired data to local storage.

The computer is placed outside the animal room to reduce noise, heat and disturbance.

---

## Development status

Camera positioning, long-duration acquisition, synchronization and automated tracking are currently being tested.