import throttle from 'lodash/throttle';
import PageSwitchHandler from './page-switch-handler';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);

    this.pageSwitcher = new PageSwitchHandler();

    this.constantScreenElement = document.getElementById('constantScreen');
    this.withConstantScreen = [
      'prizes',
      'rules',
      'game'
    ];
    this.durationConstScreenAnimation = 500;
    this.delayConstScreenAnimation = 400;
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    if (this.needSlideInUpConstScreen()) {
      this.showConstantScreen();
      setTimeout(() => {
        this.changeDisplay();
        this.pageSwitcher.runAnimations(this.screenElements[this.activeScreen].id);
      }, this.delayConstScreenAnimation);
    } else if (this.needSlideOutDownConstScreen()) {
      this.hideConstantScreen();
      setTimeout(() => {
        this.changeDisplay();
        this.pageSwitcher.runAnimations(this.screenElements[this.activeScreen].id);
      }, this.delayConstScreenAnimation);
    } else {
      this.changeDisplay();
      this.pageSwitcher.runAnimations(this.screenElements[this.activeScreen].id);
    }
  }

  //TODO Fix outDown Const screen
  changeDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, 100);
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

  upLayoutConstScreen() {
    this.constantScreenElement.style['z-index'] = 2;
    let elem = document.getElementById(this.screenElements[this.activeScreen].id);
    elem.style['z-index'] = 1;
  }

  downLayoutConstScreen() {
    this.constantScreenElement.style['z-index'] = 0;
  }

  showConstantScreen() {
    this.constantScreenElement.classList.add('active');
    setTimeout(() => {
      this.downLayoutConstScreen();
    }, this.durationConstScreenAnimation)
  }

  hideConstantScreen() {
    this.upLayoutConstScreen();
    this.constantScreenElement.classList.remove('active');
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
