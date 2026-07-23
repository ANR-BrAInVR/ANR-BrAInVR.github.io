# Post-processing

<p align="right">
  <a
    href="https://github.com/ANR-BrAInVR/MarmoVR-PostProcessing"
    target="_blank"
    rel="noopener"
  >
    GitHub repository ↗
  </a>
</p>

!!! info "Tracking PC (Linux)"
    This module runs on the [Tracking PC](../../hardware.md#tracking-pc) under Ubuntu Linux.

The MarmoVR post-processing module reprocesses recorded multi-camera experiments after acquisition.

It can perform animal detection, DeepLabCut inference, 2D pose extraction, multi-camera triangulation, behavioural variable computation and optional video export.

---

## Processing pipeline

The module can execute several operations independently or as a complete pipeline:

```text
Recorded camera videos
        ↓
Reference-image subtraction
        ↓
Animal detection and dynamic cropping
        ↓
DeepLabCut pose estimation
        ↓
2D keypoint reconstruction
        ↓
Multi-camera triangulation
        ↓
3D pose and behavioural variables
        ↓
NumPy and optional TSV result files
```

The enabled processing stages are defined in:

```text
Settings/Settings.txt
```

---

## Main functions

| Processing stage | Description |
|---|---|
| Video loading | Opens the synchronized MP4 recording produced by each camera |
| Reference generation | Loads an existing reference image or computes one by averaging frames from the video |
| Animal detection | Detects the animal by subtracting the background reference image |
| Dynamic cropping | Extracts a smaller image region centred around the detected animal |
| DeepLabCut inference | Estimates body-keypoint positions and confidence values |
| 2D reconstruction | Converts keypoints from crop coordinates to full-image coordinates |
| Triangulation | Reconstructs three-dimensional positions from multiple camera views |
| Derived variables | Computes head position, velocity, gaze direction and movement direction |
| Monitoring | Displays camera images, detections, keypoints and triangulation results |
| Data export | Saves processed results as NumPy files and optionally as TSV files |
| Video export | Saves full-frame or cropped copies with optional brightness correction |

---

## Input data

The module reads the experiment list from the results log configured by:

```text
resultsDir
resLogFilename
```

Each trial is expected to contain one video per camera:

```text
<trial_name>_cam0.mp4
<trial_name>_cam1.mp4
<trial_name>_cam2.mp4
<trial_name>_cam3.mp4
```

Depending on the selected processing stages, it may also reuse previously generated result files:

```text
<trial_name>_pos2D.npy
<trial_name>_pos2D+DLC.npy
<trial_name>_pos3D.npy
<trial_name>_pos3D+DLC.npy
```

---

## Reference images

Animal detection is based on the difference between each video frame and a reference image representing the empty cave.

The module can either:

- load a reference image saved during acquisition;
- load a generic reference image from the `References` directory;
- generate a new reference by averaging frames sampled between approximately 10% and 90% of the recording.

Generated reference images can be saved for visual validation.

The available subtraction methods are:

| Method | Operation | Typical use |
|---|---|---|
| Absolute difference | `abs(frame - reference)` | Detects both lighter and darker changes |
| Reference minus frame | `reference - frame` | Detects an animal darker than the background |
| Frame minus reference | `frame - reference` | Detects an animal lighter than the background |

---

## Animal detection and cropping

The first detection stage estimates one two-dimensional animal position in each camera view.

The processing includes:

1. grayscale conversion;
2. reference-image subtraction;
3. binary thresholding;
4. optional exclusion masking;
5. optional dynamic masking;
6. morphological opening;
7. centre estimation from image moments;
8. optional temporal averaging;
9. extraction of a fixed-size crop around the animal.

The crop position is stored as the coordinates of its upper-left corner:

```text
pos(UL)_camN
```

The approximate animal position is stored as:

```text
pos(0)_camN
```

Dynamic cropping can also use the centre of the previously inferred DeepLabCut keypoints when enough reliable keypoints are available.

---

## DeepLabCut inference

DeepLabCut Live is used to estimate animal body keypoints from each camera image.

The module supports several inference backends:

| Model type | Processing device | Notes |
|---|---|---|
| Base | GPU | Standard DeepLabCut Live inference |
| TensorRT | GPU | Optimized inference with limited GPU-memory allocation |
| TensorFlow Lite | CPU | Available but not recommended for high-performance processing |

Inference is executed concurrently for the camera views using one processing thread per camera.

The currently configured keypoints include:

- left and right ears;
- left and right eyes;
- mouth;
- left and right forepaws;
- left and right hind paws;
- tail base;
- tail middle;
- tail tip.

Each keypoint is stored with:

```text
X position
Y position
DeepLabCut confidence
```

When inference is performed on a crop, the crop offset is added to recover coordinates in the full camera image.

---

## Cyclop position

The module can compute a synthetic head-centre point named the **Cyclop**.

This point is obtained by averaging a configurable subset of head keypoints whose confidence exceeds the selected threshold.

A valid Cyclop position requires:

- a minimum number of valid keypoints;
- individual confidence values above `pThreshCyclop`.

The Cyclop can be computed:

- independently in every 2D camera view;
- directly by triangulating the 2D Cyclop positions;
- by averaging valid triangulated 3D head keypoints.

The Cyclop is used as a compact estimate of the animal's head position.

---

## Three-dimensional reconstruction

Three-dimensional positions are reconstructed from corresponding 2D observations in at least two calibrated camera views.

The module loads:

```text
Pmatrix_camN.npy
```

for the camera projection matrices, and:

```text
Pmatrix_virt2real_<camera_combination>.npy
```

for conversion from the virtual calibration frame to the physical cave coordinate system.

Triangulation is performed using a linear system solved through singular-value decomposition.

For DeepLabCut keypoints, only camera detections whose confidence exceeds `pThresh` are considered valid.

Invalid triangulations are represented by:

```text
[-1, -1, -1]
```

A configurable spatial check can reject reconstructed positions located outside the expected cave volume.

!!! warning "Current camera-combination restriction"
    The current code only authorizes the camera combinations `0__3` and `__23`.

    This is a temporary calibration-specific restriction and should be reviewed before using the module with another animal, calibration or camera configuration.

---

## Derived behavioural variables

When the required keypoints are available, the module can calculate additional behavioural variables.

### Velocity

The instantaneous Cyclop velocity is calculated from consecutive three-dimensional positions:

```text
velocity = position(t) - position(t-1)
           -----------------------------
                     Δt
```

The output contains:

- a three-dimensional velocity vector;
- the corresponding velocity norm.

### Gaze direction

The gaze direction is defined from two configurable three-dimensional keypoints.

The resulting vector is normalized and stored as:

```text
gazeDir
```

### Direction of movement

The movement direction is classified by comparing the velocity vector with the gaze vector.

| Dot product | Classification |
|---|---|
| Positive | Forward |
| Negative or zero | Backward |
| Missing input | Undefined |

---

## Monitoring

An optional OpenCV monitoring window displays the four camera views in a single panel.

Depending on the selected mode, it can show:

- full camera frames;
- cropped frames;
- crop boundaries;
- detected animal centres;
- DeepLabCut keypoints;
- confidence-dependent marker sizes;
- Cyclop positions;
- camera detection status;
- current three-dimensional triangulation coordinates.

Camera images can also be rotated independently to match their physical orientation in the MarmoVR setup.

---

## Video copies

The module can generate new copies of the recorded videos.

Available options include:

- full-frame video copies;
- cropped video copies centred on the animal;
- brightness-adjusted copies;
- MP4 export using the `mp4v` codec.

Video-copy generation can be enabled without rerunning all analysis stages.

---

## Output files

### Two-dimensional results

The 2D output contains:

- timestamps;
- frame indices;
- crop positions;
- approximate animal positions;
- Cyclop positions and probabilities;
- DeepLabCut keypoint positions and probabilities.

Example output:

```text
<trial_name>_pos2D+DLC (new).npy
```

### Three-dimensional results

The 3D output can contain:

- timestamps;
- frame indices;
- triangulated animal position;
- triangulated keypoints;
- mean confidence values;
- Cyclop position;
- Cyclop velocity;
- velocity norm;
- gaze direction;
- forward or backward movement classification.

Example output:

```text
<trial_name>_pos3D+DLC (new).npy
```

When `saveTextCopy` is enabled, equivalent tab-separated files are also produced:

```text
<trial_name>_pos2D+DLC (new).tsv
<trial_name>_pos3D+DLC (new).tsv
```

---

## Main settings

The following settings control the main processing stages:

| Setting | Purpose |
|---|---|
| `runDetect` | Run background-based animal detection |
| `runDLC` | Run DeepLabCut inference |
| `triangulate` | Reconstruct 3D positions |
| `saveVideosCopy` | Export processed video copies |
| `saveTextCopy` | Export TSV copies of NumPy results |
| `monitoring` | Display live processing output |
| `computeRefAvg` | Generate reference images from the recordings |
| `useExclMask` | Apply static exclusion masks |
| `useDynMask` | Restrict detection around the previous position |
| `dynCrop` | Centre crops using inferred keypoints |
| `filter2D` | Apply temporal averaging to detected positions |
| `pThresh` | Minimum confidence used for keypoint triangulation |
| `pThreshCyclop` | Minimum confidence used for Cyclop computation |
| `getCyclop2D` | Calculate the Cyclop in camera images |
| `getCyclop3D` | Calculate the Cyclop in 3D |
| `getVelocity` | Calculate instantaneous velocity |
| `getGazeDir` | Calculate the gaze-direction vector |
| `getMotionDir` | Classify movement as forward or backward |

Some options are enabled automatically when required by another calculation. For example, movement-direction estimation also requires velocity and gaze-direction computation.

---

## Running the module

Run the script from the MarmoVR post-processing project directory:

```bash
python PostProcessing.py
```

When started, the script:

1. changes the working directory to the script location;
2. loads `Settings/Settings.txt`;
3. validates the enabled processing stages;
4. processes every trial listed in the configured results log;
5. saves the resulting files alongside the original recordings.

---

## Debug options

Several development options are currently defined directly in the Python script:

| Option | Description |
|---|---|
| `debugLoadNewResults` | Reload generated NumPy files and optionally export TSV copies |
| `maxFramesProcessed` | Restrict processing to a limited number of frames |
| `saveRefImages` | Save newly computed reference images |

A value of `0` or less for `maxFramesProcessed` processes the complete recording.

---

## Current limitations

The current implementation includes several experimental or calibration-specific behaviours:

- camera combinations used for triangulation are hard-coded;
- some array fields use camera indices rather than physical camera numbers;
- configuration loading relies on Python `exec`;
- the same DeepLabCut Live instance is called from several threads;
- missing detections may fall back to the image centre;
- reference-image selection depends on existing acquisition files and settings;
- output filenames still include the suffix `(new)`;
- some comments and variable names still refer to an aquarium or tank from earlier system versions.

These points should be reviewed before deploying the module in a new MarmoVR configuration.

---

## Related documentation

- [Tracking PC hardware](../../hardware.md#tracking-pc)
- [Tracking module](../tracking/index.md)
- [Calibration module](../calibration/index.md)
- [Viewer module](../viewer/index.md)
- [DeepLabCut training](../../../developer-guide/deeplabcut-training.md)
- [DLC model export](../../../developer-guide/dlc-model-export.md)