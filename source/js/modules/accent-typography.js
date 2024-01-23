export default class AccentTypography {
  constructor(
    elementSelector,
    property,
    duration,
    startDelayAnimation = 100
  ) {
    this.elementSelector = elementSelector;
    this.property = property;
    this.element = document.querySelector(this.elementSelector);
    this.duration = duration;
    this.startDelayAnimation = startDelayAnimation;
    this.delayEveryLine = 300;
    this.timingFunction = 'cubic-bezier(0.17, 0.82, 0.35, 1.06)';
  }

  getDelay() {
    const num = Math.random() / 3;
    return num.toFixed(1);
  }

  isOneLine() {
    const lineHeight = parseInt(window.getComputedStyle(this.element, null).getPropertyValue("line-height"));
    const blockHeight = this.element.offsetHeight;
    const min = Math.floor(lineHeight - (lineHeight / 3));
    const max = Math.floor(lineHeight + (lineHeight / 3));
    return blockHeight > min && blockHeight < max;
  }

  createLetter(letter) {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.transition = `${this.property} ${this.duration}s ${this.timingFunction} ${this.getDelay()}s`;
    if (letter === ' ') span.classList.add('anim-title-space');
    return span;
  }

  prepareText() {
    if (!this.screenIsActive()) return;

    if (this.isOneLine()) {
      const text = this.element.textContent;

      const content = Array.from(text).reduce((fragment, letter) => {
        fragment.appendChild(this.createLetter(letter))
        return fragment;
      }, document.createDocumentFragment());

      const contentContainer = document.createElement(`span`);
      contentContainer.classList.add('anim-title__word');
      contentContainer.appendChild(content);

      this.element.innerHTML = ``;
      this.element.appendChild(contentContainer);

      setTimeout(() => {
        contentContainer.classList.add('active');
      }, this.startDelayAnimation);
    } else {
      const text = this.element.textContent.split(' ').filter((letter) => letter !== ' ');

      const content = text.reduce((fragmentParent, word) => {
        const wordElement = Array.from(word).reduce((fragment, letter) => {
          fragment.appendChild(this.createLetter(letter))
          return fragment;
        }, document.createDocumentFragment());
        const wordContainer = document.createElement(`span`);
        wordContainer.classList.add('anim-title__word');
        wordContainer.appendChild(wordElement);
        fragmentParent.appendChild(wordContainer);
        return fragmentParent;
      }, document.createDocumentFragment());

      this.element.innerHTML = ``;
      this.element.appendChild(content);

      setTimeout(() => {
        let delaySpan = 0;
        this.element.querySelectorAll('.anim-title__word').forEach((elem) => {
          if (delaySpan === 0) {
            elem.classList.add('active');
          } else {
            setTimeout(() => {
              elem.classList.add('active');
            }, delaySpan);
          }
          delaySpan += this.delayEveryLine;
        });
      }, this.startDelayAnimation);
    }

  }

  screenIsActive() {
    return !document.querySelector(this.elementSelector).closest('.screen').classList.contains('screen--hidden');
  }

  runAnimation() {
    if (!this.element) return;

    this.prepareText();
  }

  destroyAnimation() {
    this.element.classList.remove('active');
  }
};
