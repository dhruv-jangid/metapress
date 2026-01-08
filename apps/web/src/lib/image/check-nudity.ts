import * as ort from "onnxruntime-web";

const ORT_VERSION = "1.23.2";
ort.env.wasm.wasmPaths = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT_VERSION}/dist/`;

const MODEL_PATH = "/models/320n.onnx";
const CONFIDENCE_THRESHOLD = 0.5;
const NMS_THRESHOLD = 0.45;
const MODEL_INPUT_SIZE = 320;

const LABELS = [
  "FEMALE_GENITALIA_COVERED", // 0
  "FACE_FEMALE", // 1
  "BUTTOCKS_EXPOSED", // 2
  "FEMALE_BREAST_EXPOSED", // 3
  "FEMALE_GENITALIA_EXPOSED", // 4
  "MALE_BREAST_EXPOSED", // 5
  "ANUS_EXPOSED", // 6
  "FEET_EXPOSED", // 7
  "BELLY_COVERED", // 8
  "FEET_COVERED", // 9
  "ARMPITS_COVERED", // 10
  "ARMPITS_EXPOSED", // 11
  "FACE_MALE", // 12
  "BELLY_EXPOSED", // 13
  "MALE_GENITALIA_EXPOSED", // 14
  "ANUS_COVERED", // 15
  "FEMALE_BREAST_COVERED", // 16
  "BUTTOCKS_COVERED", // 17
];

const UNSAFE_LABELS = [
  "BUTTOCKS_EXPOSED",
  "FEMALE_BREAST_EXPOSED",
  "FEMALE_GENITALIA_EXPOSED",
  "ANUS_EXPOSED",
  "MALE_GENITALIA_EXPOSED",
  "MALE_BREAST_EXPOSED", // Optional: Add depending on strictness
];

let sessionX: ort.InferenceSession | null = null;

async function loadModel() {
  if (!sessionX) {
    // We use "wasm" only. WebGL is faster but often unstable with YOLOv8 ops in browser.
    sessionX = await ort.InferenceSession.create(MODEL_PATH, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "basic",
    });
  }
  return sessionX;
}

function preprocessImage(img: HTMLImageElement, size: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  canvas.width = size;
  canvas.height = size;
  ctx.drawImage(img, 0, 0, size, size);

  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  const floats = new Float32Array(3 * size * size);

  // Normalize [0, 255] -> [0, 1] and transpose to CHW
  for (let i = 0; i < size * size; i++) {
    const pixelIndex = i * 4;
    floats[i] = data[pixelIndex] / 255.0; // R
    floats[size * size + i] = data[pixelIndex + 1] / 255.0; // G
    floats[2 * size * size + i] = data[pixelIndex + 2] / 255.0; // B
  }

  return new ort.Tensor("float32", floats, [1, 3, size, size]);
}

function iou(boxA: Array<number>, boxB: Array<number>) {
  const xA = Math.max(boxA[0], boxB[0]);
  const yA = Math.max(boxA[1], boxB[1]);
  const xB = Math.min(boxA[2], boxB[2]);
  const yB = Math.min(boxA[3], boxB[3]);

  const interArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
  const boxAArea = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1]);
  const boxBArea = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1]);

  return interArea / (boxAArea + boxBArea - interArea);
}

function processOutput(output: Float32Array) {
  let boxes: Array<Array<number>> = [];

  // YOLOv8 Output Shape: [1, 22, 2100]
  // 22 channels = 4 box coords + 18 classes
  // 2100 anchors
  const numClasses = LABELS.length; // 18
  const numAnchors = 2100;

  // The data is flattened [Batch, Channels, Anchors]
  // Stride is the jump to the next "row" (channel)
  const stride = numAnchors;

  for (let i = 0; i < numAnchors; i++) {
    // 1. Find max class score
    let maxClassScore = 0;
    let classId = -1;

    // Class probabilities start at index 4 (0,1,2,3 are box coords)
    for (let c = 0; c < numClasses; c++) {
      const score = output[(4 + c) * stride + i];
      if (score > maxClassScore) {
        maxClassScore = score;
        classId = c;
      }
    }

    // 2. Threshold check
    if (maxClassScore > CONFIDENCE_THRESHOLD) {
      const cx = output[0 * stride + i];
      const cy = output[1 * stride + i];
      const w = output[2 * stride + i];
      const h = output[3 * stride + i];

      const x1 = cx - w / 2;
      const y1 = cy - h / 2;
      const x2 = cx + w / 2;
      const y2 = cy + h / 2;

      boxes.push([x1, y1, x2, y2, maxClassScore, classId]);
    }
  }

  // 3. Non-Maximum Suppression (NMS)
  boxes.sort((a, b) => b[4] - a[4]); // Sort by score desc
  const result: Array<Array<number>> = [];

  while (boxes.length > 0) {
    const current = boxes.shift()!;
    result.push(current);
    boxes = boxes.filter((b) => iou(current, b) < NMS_THRESHOLD);
  }

  return result;
}

export async function checkNudity(file: File) {
  // 1. Load Image
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  await new Promise((res) => {
    img.onload = res;
  });

  // 2. Load Model
  const session = await loadModel();

  // 3. Preprocess
  const inputTensor = preprocessImage(img, MODEL_INPUT_SIZE);

  // 4. Run Inference
  // Use session.inputNames[0] to handle 'images' vs 'input' naming diffs automatically
  const inputs = { [session.inputNames[0]]: inputTensor };
  const outputs = await session.run(inputs);

  // 5. Post-process
  const outputName = session.outputNames[0];
  const detectionsRaw = outputs[outputName].data as Float32Array;

  const detections = processOutput(detectionsRaw);

  URL.revokeObjectURL(img.src);

  // 6. Check Safety
  const detectedUnsafe = detections.filter((d) => {
    const classId = d[5];
    const label = LABELS[classId];
    return UNSAFE_LABELS.includes(label);
  });

  if (detectedUnsafe.length > 0) {
    // const findings = detectedUnsafe.map((d) => LABELS[d[5]]);
    // throw new Error("Inappropriate content detected: " + findings.join(", "));

    throw new Error("Inappropriate content detected!");
  }

  return { safe: true, detections: detections.length };
}
