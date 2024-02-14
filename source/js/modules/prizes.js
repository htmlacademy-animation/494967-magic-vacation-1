import PrizesCounter from "./prizes-counter";

export default () => {
  const firstDelay = 3550;
  const secondDelay = firstDelay + 500;
  const thirdDelay = secondDelay + 3200;

  /* const aPrize2 = document.getElementById('aStartPrize2');
  console.log(aPrize2);*/

  showCounterBlock(`prize1CountContainer`, 2800);
  showImg(`j-prizes-item-1`, `translate`, firstDelay);
  showImg(`j-prizes-item-2`, `active`, secondDelay,
      () => {
        showCounterBlock(`prize2CountContainer`, 1500);
        runCounter(`prize2Count`, [1, 2, 3, 4, 5, 6, 7], 1700);
        // aPrize2.beginElement();
      }
  );
  showImg(`j-prizes-item-3`, `active`, thirdDelay,
      () => {
        showCounterBlock(`prize3CountContainer`, 500);
        runCounter(`prize3Count`, [11, 185, 371, 514, 821, 849, 900], 700);
      }
  );

  function showCounterBlock(selectorId, delay) {
    setTimeout(() => {
      document.getElementById(selectorId).classList.add(`active`);
    }, delay);
  }

  function showImg(selectorId, className, delay, callback = null) {
    setTimeout(() => {
      document.getElementById(selectorId).classList.add(className);
      if (callback) {
        callback();
      }
    }, delay);
  }

  function runCounter(selectorId, values, delay) {
    setTimeout(() => {
      const counter = new PrizesCounter(selectorId, values);
      counter.run();
    }, delay);
  }
};
