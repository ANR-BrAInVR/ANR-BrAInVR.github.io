# Quick Start

This guide explains how to start the MarmoVR setup and run a standard experiment.

## Before you begin

The following elements must already be available:

- A valid camera calibration
- A trained DeepLabCut model
- A functional Unreal project
- A marmoset or a puppet for testing

---

## Step 1 – Power on the setup

Turn on the three power strips:

1. Power strip located on the floor between the cave and the control desk.
2. Power strip located above the bottom tray of the setup.
3. Power strip located on the vertical bar near the cave entrance.

![Power strip located on the floor](../assets/marmovr/Power%20strip%201.jpg){ .doc-image }

![Power strip located above the bottom tray](../assets/marmovr/Power%20strip%202.jpg){ .doc-image }

![Power strip located near the cave entrance](../assets/marmovr/Power%20strip%203.jpg){ .doc-image }

The setup lights should switch on.

---

## Step 2 – Start the Tracking PC

Boot the Tracking PC on the Linux partition.

1. Press the power button.
2. Select **Ubuntu** in the boot menu.
3. Log in using:

```text
User: User
Password: ouistiti
```

![Tracking PC power button](../assets/marmovr/PC%20turn%20on.jpg){ .doc-image }

---

## Step 3 – Start the Rendering PC

Boot the Rendering PC under Windows.

Log in using:

```text
User: User
Password: ouistiti
```

---

## Step 4 – Prepare cameras and projectors

Remove the lens covers from all four Ximea cameras.

!!! warning
    Do not modify the camera orientation. Any camera movement may require a complete recalibration of the system.

![Ximea camera lens cover](../assets/marmovr/Ximea%20camera%20lens%20cover.jpg){ .doc-image }

Remove the optical covers from the three projectors.

![Removing a projector cover](../assets/marmovr/VP%20remove%20cover.jpg){ .doc-image }

Turn on all projectors.

![Projector power button](../assets/marmovr/VP%20turn%20on.jpg){ .doc-image }

---

## Step 5 – Start the Tracking module

Turn off all room lights except the two LED strips of the setup.

Open the Tracking project on the Tracking PC and launch:

```text
Tracking.py
```

using PyCharm.

If the controller parameter is set to:

```text
controller = UI
```

press:

```text
Start Experiment
```

from the Tracking interface.

![MarmoVR Tracking interface](../assets/marmovr/Tracking%20UI%20running.png){ .doc-image }

If the controller parameter is set to:

```text
controller = UE
```

the experiment will be started from Unreal Engine.

---

## Step 6 – Start the Rendering module

On the Rendering PC:

1. Start **nDisplay Listener**.
2. Start **nDisplay Launcher**.
3. Select the correct configuration.
4. Press **Run**.

![Unreal Engine nDisplay Launcher](../assets/marmovr/UE%20nDisplay%20launcher.png){ .doc-image }

---

## Step 7 – Configure the experiment

In the Unreal Engine experiment interface:

- Select the experiment.
- Select the monkey ID.
- Select the experimental condition.

Then:

1. Press **Start Experiment**.
2. Verify that all virtual objects are correctly positioned.
3. Verify that the sliding door is closed.
4. Press **New References**.

This updates the background reference images used by the tracking system.

![Unreal Engine experiment interface](../assets/marmovr/UE%20experiment%20interface%20%28filled%29.png){ .doc-image }

---

## Step 8 – Release the marmoset

The setup is now ready.

Place the marmoset inside the cave and start the experiment.

For testing purposes, a puppet can be used instead of a live animal.

![Marmoset puppet inside the MarmoVR cave](../assets/marmovr/Puppet%20in%20the%20cave.jpg){ .doc-image }

---

## Shutdown

At the end of the session:

1. Stop the experiment from Unreal Engine.
2. Stop the Tracking software.
3. Turn off the projectors.
4. Shut down both computers.
5. Replace the projector covers.
6. Replace the camera lens covers.
7. Turn off all power strips.