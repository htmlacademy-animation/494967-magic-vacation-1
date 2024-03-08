import Swiper from "swiper";

export const SLIDER_PLANES = {
  0: `story1`,
  1: `story1`,
  2: `story2`,
  3: `story2`,
  4: `story3`,
  5: `story3`,
  6: `story4`,
  7: `story4`,
};

export default (planeView) => {
  let storySlider;

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            planeView.setPlane(SLIDER_PLANES[storySlider.activeIndex]);
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            planeView.setPlane(SLIDER_PLANES[storySlider.activeIndex]);
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }

    function setBodyStoryClass() {
      let className = getClassNameSlider(storySlider.activeIndex);

      document.body.classList.remove(`slide1`, `slide2`, `slide3`, `slide4`);
      document.body.classList.add(className);
    }

    setBodyStoryClass();
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};

export function getClassNameSlider(index) {
  switch (index) {
    case 0:
    case 1:
      return `slide1`;
    case 2:
    case 3:
      return `slide2`;
    case 4:
    case 5:
      return `slide3`;
    case 6:
    case 7:
      return `slide4`;
    default:
      return `slide1`;
  }
}
