export default class GameTimer {
  constructor() {
    this.timeSelector = document.getElementById('gameTimer');
    this.countdown = new Date();
    this.maxTime = new Date(Date.now() + (1000 * 60 * 5));
  }

  run() {
    console.log('run');
    let step = (target) => {
      this.countdown.setTime(this.maxTime - Date.now());
      let minutesString = this.countdown.getUTCMinutes().toString().length === 2
        ? this.countdown.getUTCMinutes().toString()
        : '0' + this.countdown.getUTCMinutes().toString();
      let secondsString = this.countdown.getUTCSeconds().toString().length === 2
        ? this.countdown.getUTCSeconds().toString()
        : '0' + this.countdown.getUTCSeconds().toString();

      this.timeSelector.innerHTML = minutesString + ':' + secondsString;
      if (this.countdown.getUTCMinutes() > 0 || this.countdown.getUTCSeconds() > 0) {
        let requestId = requestAnimationFrame(() => step(target));
        this.saveRequestId(requestId);
      }
    }
    requestAnimationFrame(() => step(this));
    this.stopTimer();
  }

  stopTimer() {
    if (sessionStorage['gameTimerRequestId'] === 'null') return;
    cancelAnimationFrame(sessionStorage['gameTimerRequestId']);
    sessionStorage['gameTimerRequestId'] = null;
  }

  saveRequestId(requestId) {
    sessionStorage['gameTimerRequestId'] = requestId;
  }
};
