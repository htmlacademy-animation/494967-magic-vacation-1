export default () => {
  let timeSelector = document.getElementById('gameTimer'),
    countdown = new Date(),
    maxTime = new Date(Date.now() + (1000 * 60 * 5)),
    requestId;

  function step() {
    countdown.setTime(maxTime - Date.now());
    let minutesString = countdown.getUTCMinutes().toString().length === 2
      ? countdown.getUTCMinutes().toString()
      : '0' + countdown.getUTCMinutes().toString();
    let secondsString = countdown.getUTCSeconds().toString().length === 2
      ? countdown.getUTCSeconds().toString()
      : '0' + countdown.getUTCSeconds().toString();

    timeSelector.innerHTML = minutesString + ':' + secondsString;
    if (countdown.getUTCHours() > 0 || countdown.getUTCMinutes() > 0 || countdown.getUTCSeconds() > 0) {
      requestId = requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
  cancelAnimationFrame(requestId);
};
