import throttle from 'lodash/throttle';
import PageSwitchHandler from './page-switch-handler';
import FooterNote from "./footer-note";
import BackgroundInUp from "./background-in-up";
import {getClassNameSlider} from './slider';
import GameTimer from "./game-timer";

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
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      const currentPosition = this.activeScreen;
      this.reCalculateActiveScreenPosition(evt.deltaY);
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
    history.pushState(null, null, `/#${this.screenElements[this.activeScreen].id}`);
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
    this.changeSliderClass();
    const backgroundInUp = new BackgroundInUp(this.activeScreen);
    let needDelay = 0;
    if (backgroundInUp.needSlideInUpConstScreen()) {
      backgroundInUp.showConstantScreen();
      needDelay = backgroundInUp.durationConstScreenAnimation;
    } else if (backgroundInUp.needSlideOutDownConstScreen()) {
      backgroundInUp.hideConstantScreen();
    }
    setTimeout(() => {
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
        if (backgroundInUp.withConstantScreen.indexOf(screen.id) !== -1) {
          screen.style[`z-index`] = 2;
        }
      });
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      this.screenElements[this.activeScreen].classList.add(`active`);
      this.afterChangeScreen();
    }, needDelay);
  }

  afterChangeScreen() {
    this.pageSwitcher.runAnimations(this.screenElements[this.activeScreen].id);
    const footerNote = new FooterNote(this.screenElements[this.activeScreen].id);
    footerNote.run();

    const gameTimer = new GameTimer();
    if (this.screenElements[this.activeScreen].id === `game`) {
      gameTimer.run();
    } else {
      gameTimer.stopTimer();
    }
  }

  changeSliderClass() {
    if (this.screenElements[this.activeScreen].id === `story`) {
      const index = [...document.querySelectorAll(`.swiper-slide`)].findIndex((elem) => {
        return elem.classList.contains(`swiper-slide-active`);
      });
      document.body.classList.add(getClassNameSlider(index));
    } else {
      document.body.classList.remove(`slide1`, `slide2`, `slide3`, `slide4`);
    }
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
