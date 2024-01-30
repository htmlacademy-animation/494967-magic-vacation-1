export default class BackgroundInUp {
  constructor(activeScreen) {
    this.activeScreen = activeScreen;
    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);

    this.constantScreenElement = document.getElementById('constantScreen');
    this.withConstantScreen = [
      'prizes',
      'rules',
      'game'
    ];
    this.durationConstScreenAnimation = 500;
  }

  needSlideInUpConstScreen() {
    let isActiveConstScreen = this.constantScreenElement.classList.contains('active');
    return this.needConstScreen() && !isActiveConstScreen;
  }

  needConstScreen() {
    return this.withConstantScreen.indexOf(this.screenElements[this.activeScreen].id) !== -1;
  }

  needSlideOutDownConstScreen() {
    let isActiveConstScreen = this.constantScreenElement.classList.contains('active');
    return !this.needConstScreen() && isActiveConstScreen;
  }

  showConstantScreen() {
    this.constantScreenElement.classList.add('active');
  }

  hideConstantScreen() {
    this.constantScreenElement.classList.remove('active');
  }
};
