# Quick Start

This guide explains how to start the MarmoVR setup and run a standard experiment.

## Before you begin

The following elements must already be available:

* A valid camera calibration
* A trained DeepLabCut model
* A functional Unreal project
* A marmoset (or a puppet for testing)

---

## Step 1 – Power on the setup

Turn on the three power strips:

1. Power strip located on the floor between the cave and the control desk.
2. Power strip located above the bottom tray of the setup.
3. Power strip located on the vertical bar near the cave entrance.

![Power strip 1](../assets/marmovr/Power%20strip%201.jpg)

![Power strip 2](../assets/marmovr/Power%20strip%202.jpg)

![Power strip 3](../assets/marmovr/Power%20strip%203.jpg)

The setup lights should switch on.

---

## Step 2 – Start the Tracking PC

Boot the Tracking PC on the Linux partition.

1. Press the power button.
2. Select **Ubuntu** in the boot menu.
3. Login using:

```text
User: User
Password: ouistiti
```

![Tracking PC](../assets/marmovr/PC%20turn%20on.jpg)

---

## Step 3 – Start the Rendering PC

Boot the Rendering PC under Windows.

Login using:

```text
User: User
Password: ouistiti
```

---

## Step 4 – Prepare cameras and projectors

Remove the lens covers from all four Ximea cameras.

⚠️ Do not modify camera orientation. Any camera movement may require a full recalibration of the system.

![Camera covers](../assets/marmovr/Ximea%20camera%20lens%20cover.jpg)

Remove the optical covers from the three projectors.

![Projector cover](../assets/marmovr/VP%20remove%20cover.jpg)

Turn on all projectors.

![Projector power](../assets/marmovr/VP%20turn%20on.jpg)

---

## Step 5 – Start the Tracking module

Turn off all room lights except the two LED strips of the setup.

Open the Tracking project on the Tracking PC.

Launch:

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

![Tracking interface](../assets/marmovr/Tracking%20UI%20running.png)

If:

```text
controller = UE
```

the experiment will be started from Unreal Engine.

---

## Step 6 – Start the Rendering module

On the Rendering PC:

1. Start **nDisplay Listener**
2. Start **nDisplay Launcher**
3. Select the correct configuration
4. Press **Run**

![nDisplay launcher](../assets/marmovr/UE%20nDisplay%20launcher.png)

---

## Step 7 – Configure the experiment

In the Unreal Engine experiment interface:

* Select the experiment
* Select the monkey ID
* Select the experimental condition

Then:

1. Press **Start Experiment**
2. Verify that all virtual objects are correctly positioned
3. Verify that the sliding door is closed
4. Press **New References**

This updates the background reference images used by the tracking system.

![Experiment interface](../assets/marmovr/UE%20experiment%20interface%20\(filled\).png)

---

## Step 8 – Release the marmoset

The setup is now ready.

Place the marmoset inside the cave and start the experiment.

For testing purposes, a puppet can be used instead of a live animal.

![Marmoset puppet](../assets/marmovr/Puppet%20in%20the%20cave.jpg)

---

## Shutdown

At the end of the session:

1. Stop the experiment from Unreal Engine.
2. Stop the Tracking software.
3. Turn off projectors.
4. Shut down both computers.
5. Replace projector covers.
6. Replace camera lens covers.
7. Turn off all power strips.
