export default () => {
  const firstDelay = 3550;
  const secondDelay = firstDelay + 500;
  const thirdDelay = secondDelay + 3200;

  /*const aPrize2 = document.getElementById('aStartPrize2');
  console.log(aPrize2);*/

  setTimeout(() => {
    document.getElementById('j-prizes-item-1').classList.add('translate');
  }, firstDelay);
  setTimeout(() => {
    document.getElementById('j-prizes-item-2').classList.add('active');
    // aPrize2.beginElement();
  }, secondDelay);
  setTimeout(() => {
    document.getElementById('j-prizes-item-3').classList.add('active');
  }, thirdDelay);
};
