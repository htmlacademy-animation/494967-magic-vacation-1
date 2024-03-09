import {SLIDER_PLANES} from "../modules/slider";

export default class ThreeBackground {
  constructor(planeView) {

    this.screenDefault = `top`;
    this.screenName = this.getScreenName();
    this.scriptRunScene = {
      top: planeView.setPlane.bind(planeView, `top`),
      story: planeView.setPlane.bind(planeView, this.getActiveSlide())
    };
  }

  getActiveSlide() {
    const slider = document.getElementById(`story`).children[0].dom7ElementDataStorage.swiper;
    return SLIDER_PLANES[slider.realIndex];
  }

  start() {
    this.runScene();

    document.addEventListener(`screenChanged`, (evt) => {
      this.screenName = evt.detail.screenName;
      this.runScene();
    });
  }

  runScene() {
    if (!Object.prototype.hasOwnProperty.call(this.scriptRunScene, this.screenName)) {
      return;
    }

    this.scriptRunScene[this.screenName]();
  }

  getScreenName() {
    const urlHash = document.location.hash;
    if (urlHash === ``) {
      return this.screenDefault;
    }

    return urlHash.replace(`#`, ``);
  }
}
