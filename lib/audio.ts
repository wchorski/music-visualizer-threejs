export class AudioAnalyzer {
  #ctx: AudioContext;
  #analyzerNode: AnalyserNode;
  #sourceNode: MediaElementAudioSourceNode;

  constructor(audioElement: HTMLAudioElement) {
    this.#ctx = new AudioContext();
    this.#analyzerNode = this.#ctx.createAnalyser();
    this.#sourceNode = this.#ctx.createMediaElementSource(audioElement);

    this.#analyzerNode.minDecibels = -60;
    this.#analyzerNode.smoothingTimeConstant = 0.8;

    this.#sourceNode.connect(this.#analyzerNode);
    this.#sourceNode.connect(this.#ctx.destination);
  }

  getFFT(): Uint8Array {
    const data = new Uint8Array(this.#analyzerNode.frequencyBinCount);
    this.#analyzerNode.getByteFrequencyData(data);
    return data;
  }
}