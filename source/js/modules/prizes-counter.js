export default class PrizesCounter {
  constructor(
      selectorId,
      values
  ) {
    this.selectorId = selectorId;
    this.values = values;
    this.fpsInterval = 1000 / 12;
    this.counter = 0;
  }

  run() {
    let nextStep = Date.now() + this.fpsInterval;
    let requestId;

    let step = () => {
      let now = Date.now();

      if (now >= nextStep) {
        this.draw();
        this.counter++;
        nextStep += this.fpsInterval;
      }
      if (!this.isFinished()) {
        requestId = requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
    cancelAnimationFrame(requestId);
  }

  draw() {
    document.getElementById(this.selectorId).innerHTML = this.values[this.counter];
  }

  isFinished() {
    return this.counter === this.values.length;
  }
}
