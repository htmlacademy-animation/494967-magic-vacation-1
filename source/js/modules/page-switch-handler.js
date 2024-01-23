import AccentTypography from './accent-typography';

export default class PageSwitchHandler {
  constructor() {
    const introTitle = new AccentTypography('.intro__title', 'transform', 0.7);
    const introDate = new AccentTypography('.intro__date', 'transform', 0.5, 1000);
    const storyTitle = new AccentTypography('.slider__item-title', 'transform', 0.7);
    const prizesTitle = new AccentTypography('.prizes__title', 'transform', 0.7);
    const rulesTitle = new AccentTypography('.rules__title', 'transform', 0.7);
    const gameTitle = new AccentTypography('.game__title', 'transform', 0.7);

    this.scriptRunSchema = {
      top: [
        introTitle.runAnimation.bind(introTitle),
        introDate.runAnimation.bind(introDate),
      ],
      story: [
        storyTitle.runAnimation.bind(storyTitle),
      ],
      prizes: [
        prizesTitle.runAnimation.bind(prizesTitle),
      ],
      rules: [
        rulesTitle.runAnimation.bind(rulesTitle),
      ],
      game: [
        gameTitle.runAnimation.bind(gameTitle),
      ]
    };
  }


  runAnimations(sectionId) {
    if (this.scriptRunSchema[sectionId]) {
      [...this.scriptRunSchema[sectionId]].forEach((func) => func());
    }
  }
}
