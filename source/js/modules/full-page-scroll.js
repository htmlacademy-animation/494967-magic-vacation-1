import throttle from 'lodash/throttle';
import PageSwitchHandler from './page-switch-handler';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;
    this.withConstantScreen = [
      'prizes',
      'rules',
      'game'
    ];

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);

    this.pageSwitcher = new PageSwitchHandler();
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
    this.pageSwitcher.runAnimations(this.screenElements[this.activeScreen].id);
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    let delay = 400;

    if (this.needShowConstantScreen(this.screenElements[this.activeScreen].id)) {
      setTimeout(() => {
        this.changeDisplay();
      }, delay);
    } else {
      this.changeDisplay();
    }
  }

  changeDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
      if (this.withConstantScreen.indexOf(screen.id) !== -1) {
        screen.style['z-index'] = 2;
      }
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, 100);
  }

  needShowConstantScreen(activeScreen) {
    let isActiveConstScreen = document.getElementById('constantScreen').classList.contains('active');
    let needConstScreen = this.withConstantScreen.indexOf(activeScreen) !== -1;

    if ((needConstScreen && isActiveConstScreen) || (!needConstScreen && !isActiveConstScreen)) return false;
    if (needConstScreen) {
      this.showConstantScreen();
      return true;
    }
    this.hideConstantScreen();
    return false;
  }

  showConstantScreen() {
    document.getElementById('constantScreen').classList.add('active');
  }

  hideConstantScreen() {
    document.getElementById('constantScreen').classList.remove('active');
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
