import init, { WasmPitchDetector } from "./wasm-audio/wasm_audio.js";

var numAudioSamplesPerAnalysis;
var sampleRate;
var detector;
const power_thresh = 3;
const clarity_thresh = 0.7;
const pick_thresh = 0.95;

onmessage = function (event) {
	if (event.data.type === "send-wasm-module") {
		init(WebAssembly.compile(event.data.wasmBytes)).then(() => {
			postMessage({ type: "wasm-module-loaded" });
		});
	} else if (event.data.type === "init-detector") {
		sampleRate = event.data.sampleRate;
		numAudioSamplesPerAnalysis = event.data.numSamples;
		detector = WasmPitchDetector.new(sampleRate, numAudioSamplesPerAnalysis, power_thresh, clarity_thresh, pick_thresh);
		postMessage({ type: "initalized" });
	} else if (event.data.type === "audio") {
		const player = event.data.player;
		const result = detector.detect_pitch(event.data.samples);
		postMessage({ type: "pitch", pitch: result, player: player });
	}
};
