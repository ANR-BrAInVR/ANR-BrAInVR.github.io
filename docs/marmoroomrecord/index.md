# MarmoRoomRecord

<p align="center">
  <strong>
    Naturalistic multi-camera recording of captive marmoset groups
  </strong>
</p>

MarmoRoomRecord is a synchronized multi-camera video acquisition platform developed to record the spontaneous behaviour and social interactions of freely moving common marmosets living together in a large enriched environment.

The platform is part of the **BrAInVR** project and provides the high-resolution, multi-view video data required for long-term behavioural analysis, individual tracking and future 3D reconstruction.

## Platform overview

<p align="center">
  <img
    src="../assets/marmoroomrecord/marmoroomrecord_schematics.png"
    width="100%"
    alt="Overview of the MarmoRoomRecord indoor multi-camera platform"
  >
</p>

<p align="center">
  <em>
    Multi-camera system installed in the indoor living room of a captive marmoset group.
  </em>
</p>

Eight synchronized Basler cameras observe the room simultaneously from complementary viewpoints. The cameras stream over Gigabit Ethernet to a central PoE+ switch, while a dedicated acquisition computer receives the aggregated traffic through a 10 Gigabit Ethernet connection and records the video streams locally.

!!! note "Development status"
    MarmoRoomRecord is currently under active development. The eight-camera acquisition architecture, PTP synchronization and recording pipeline are being validated before long-duration experimental recordings.

---

## Experimental site

The system is installed at the **Mediterranean Primate Research Center (MPRC)** on the **CNRS Joseph Aiguier campus in Marseille, France**.

The recording room provides a large, enriched environment in which marmosets can move and interact as a social group, allowing behavioural data to be collected under substantially more naturalistic conditions than in conventional experimental cages.

### Related resources

- [The marmoset as a model for neuroscience](https://lejournal.cnrs.fr/nos-blogs/focus-sciences/le-marmouset-petit-genie-des-neurosciences){ target="_blank" }
- [MarmoBrain: building a new animal model](https://lejournal.cnrs.fr/nos-blogs/focus-sciences/marmobrain-ou-le-long-chemin-vers-la-construction-dun-modele-animal){ target="_blank" }

---

## Animal identification

Individuals can be recognised using complementary visual cues:

- coloured bead collars;
- distinctive physical features;
- shaved tail sections following a four-segment binary code.

These visual identifiers are intended to facilitate manual annotation and the development and validation of automatic individual tracking methods.

---

## Scientific objectives

MarmoRoomRecord is designed to:

- record spontaneous group behaviour over extended periods;
- observe several freely moving individuals simultaneously from multiple viewpoints;
- provide synchronized images for multi-view tracking and 3D reconstruction;
- quantify spatial behaviour and social interactions;
- build large video datasets for automated behavioural analysis;
- provide naturalistic behavioural data for the wider BrAInVR project and its virtual-reality experiments.

The BrAInVR project ultimately aims to combine these recordings with AI-based pose estimation, individual identification, behavioural analysis and agent-centric models.

---

## Documentation

Detailed information is available in the following pages:

- [Hardware](hardware.md) — cameras, network, synchronization and acquisition computer;
- [Software](software.md) — acquisition application, configuration, recording pipeline and monitoring.
