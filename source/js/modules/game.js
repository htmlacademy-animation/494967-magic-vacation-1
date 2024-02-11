export default class GameTimer {
  constructor() {
    this.timeSelector = document.getElementById(`gameTimer`);
    this.countdown = new Date();
    this.maxTime = new Date(Date.now() + (1000 * 60 * 5));
    this.pastTime = ``;
    this.currentTime = ``;
  }

  run() {
    this.calculateTime();
    let step = (target) => {
      this.calculateTime();

      if (this.currentTime !== this.pastTime) {
        this.draw();
      }
      if (!this.isFinished()) {
        let requestId = requestAnimationFrame(step.bind(this, target));
        this.saveRequestId(requestId);
      }
    };
    requestAnimationFrame(step.bind(this));
    this.stopTimer();
  }

  isFinished() {
    return this.countdown.getUTCMinutes() === 0 && this.countdown.getUTCSeconds() === 0;
  }

  calculateTime() {
    this.countdown.setTime(this.maxTime - Date.now());
    let minutesString = this.countdown.getUTCMinutes().toString().length === 2
      ? this.countdown.getUTCMinutes().toString()
      : `0` + this.countdown.getUTCMinutes().toString();
    let secondsString = this.countdown.getUTCSeconds().toString().length === 2
      ? this.countdown.getUTCSeconds().toString()
      : `0` + this.countdown.getUTCSeconds().toString();
    this.currentTime = minutesString + `:` + secondsString;
  }

  draw() {
    this.timeSelector.innerHTML = this.currentTime;
    this.pastTime = this.currentTime;
  }

  stopTimer() {
    if (sessionStorage[`gameTimerRequestId`] === `null`) {
      return;
    }
    cancelAnimationFrame(sessionStorage[`gameTimerRequestId`]);
    sessionStorage[`gameTimerRequestId`] = null;
  }

  saveRequestId(requestId) {
    sessionStorage[`gameTimerRequestId`] = requestId;
  }
}
