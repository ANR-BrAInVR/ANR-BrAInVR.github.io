---
title: Installation
nav_order: 2
---

This page explains how to install NemoVR-Viewer step by step on a computer.

These installation steps only need to be completed once during the initial setup of the viewer.

After installation, launching the application only requires activating the Conda environment and running the viewer.

---

# 1. Install Anaconda

NemoVR-Viewer uses Python environments managed with **Conda**.

Download Anaconda here:

```text
https://www.anaconda.com/download
```

Install Anaconda using the default installation settings.

---

# 2. Open a terminal

On Windows, open:

```text
Anaconda Prompt
```

or:

```text
PowerShell
```

If `conda` is not recognized in PowerShell, open Anaconda Prompt once and run:

```bash
conda init powershell
```

Then close PowerShell and open it again.

---

# 3. Clone the repository

Choose a location where you want to store the project.

Example:

```bash
cd "D"
```

Clone the repository:

```bash
git clone https://github.com/ANR-BrAInVR/NemoVR-Viewer.git
```

Move into the project folder:

```bash
cd NemoVR-Viewer
```

---

# 4. (Optional) Install DeepLabCut 3

Installing **DeepLabCut 3** is **not required** to use NemoVR-Viewer.

This environment is only needed if you plan to:

* train new DeepLabCut models;
* label datasets;
* manage DeepLabCut projects.

If you only want to visualize tracking results, you can skip this section and continue directly to **Step 5**.

Create the environment:

```bash
conda create -n DLC3 python=3.12
```

Activate it:

```bash
conda activate DLC3
```

Install PyTorch:

```bash
pip install "torch==2.3.1" torchvision --index-url https://download.pytorch.org/whl/cu118
```

Install DeepLabCut:

```bash
pip install --pre deeplabcut[gui]
```

Alternatively, you can install the latest nightly version of PyTorch:

```bash
pip install --pre torch torchvision --index-url https://download.pytorch.org/whl/nightly/cu128
```

Verify that the GPU is available:

```bash
python -c "import torch; print(torch.cuda.is_available())"
```

To remove the environment:

```bash
conda remove -n DLC3 --all
```

---

# 5. Create the DLC3-live environment

This environment is **required** to run NemoVR-Viewer.

Create the environment:

```bash
conda create --name DLC3-live -c conda-forge python=3.12 numpy matplotlib pyqt opencv
```

Activate it:

```bash
conda activate DLC3-live
```

Install DeepLabCut-live:

```bash
pip install deeplabcut-live[pytorch]
```

To remove the environment:

```bash
conda remove -n DLC3-live --all
```

---

# 6. Activate the environment

Each time you want to use NemoVR-Viewer, activate the environment:

```bash
conda activate DLC3-live
```

Your terminal should now display:

```text
(DLC3-live)
```

---

# 7. Configure the results directory

Before launching the viewer, configure the location of your tracking results.

Open the project folder and locate:

```text
Settings.txt
```

Open it with any text editor.

Find the parameter:

```text
resultsDir
```

Modify it to point to your tracking results directory.

Example on a dedicated acquisition computer:

```text
resultsDir    'D:/Records'
```

Example on a development laptop:

```text
resultsDir    'C:/Users/YOUR_USERNAME/Desktop/NemoVR/Records'
```

Save the file.

Additional parameters are described in the [Settings](settings.md) page.

---

# 8. Launch the viewer

Verify that the environment is activated:

```text
(DLC3-live)
```

If necessary:

```bash
conda activate DLC3-live
```

Launch the application:

```bash
python Viewer.py
```

The NemoVR-Viewer graphical interface should now open.

A complete overview of the interface is available in the [Usage](usage.md) page.

---

# 9. Test DeepLabCut-live (Optional)

The following test verifies that **DeepLabCut-live** is correctly installed.

Activate the environment:

```bash
conda activate DLC3-live
```

Start Python:

```bash
python
```

Then run:

```python
from dlclive import DLCLive, Processor
import numpy as np
import cv2

dlc_proc = Processor()

dlc_live = DLCLive(
    "D:/INT/Devs/Setup MarmoVR/Tracking PC/NeuralNetworks/Puppets/resnet_50-pytorch/DLC_puppet_tracking_resnet_50_iteration-0_shuffle-1_snapshot-best-100.pt",
    model_type="pytorch",
    processor=dlc_proc
)

dlc_live.init_inference(np.zeros((450,450,3), dtype=np.float32))

img = cv2.imread(
    "E:/DeepLabCut projects/puppet_tracking-LV-2026-05-05/labeled-data/Trial-trial1_Cond-cond_cam1 (crop copy)/img0977.png"
)

dlc_live.get_pose(img)
```

Adapt the model path and image path to your local installation.

---

# 10. Troubleshooting

## Conda command not found

If the terminal displays:

```text
conda: command not found
```

Open **Anaconda Prompt**, or run:

```bash
conda init powershell
```

and restart PowerShell.

---

## Viewer does not start

Verify that:

```text
(DLC3-live)
```

appears at the beginning of the terminal prompt.

---

## Missing result files

Verify that:

* `resultsDir` is correctly configured;
* tracking results exist;
* the folder structure matches the expected NemoVR architecture.

---

## GPU is not detected

Run:

```bash
conda activate DLC3
python -c "import torch; print(torch.cuda.is_available())"
```

If the command returns:

```text
False
```

PyTorch cannot access the GPU.

---

# Additional resources

* [Viewer Settings](settings.md)
* [Usage Guide](usage.md)
* [Project Homepage](index.md)
* [GitHub Repository](https://github.com/ANR-BrAInVR/NemoVR-Viewer)
