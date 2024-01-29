export default class FooterNote {
  constructor(screenName) {
    this.screenName = screenName;
    this.prevPage = '';
    this.screensWithNote = ['top', 'prizes', 'rules'];
    this.moveInElement = document.getElementById(this.screenName).querySelector('.js-footer');
    this.opacityElement = document.getElementById(this.screenName).querySelector('.js-footer-note');
    this.noteElements = document.querySelectorAll('.js-footer');
    this.textElements = document.querySelectorAll('.js-footer-note');
    this.isActive = this.setActivity.bind(this);
    this.delayReset = 1000;
  }

  run() {
    this.setActivity();
    if (this.isActive && this.needNote()) {
      this.showNote();
      this.fadeInText(true);
    } else if (!this.isActive && this.needNote()) {
      this.showNote(true);
      this.fadeInText();
    } else if (this.isActive && !this.needNote()) {
      this.hideNote(true);
      setTimeout(() => {
        this.resetActive();
      }, this.delayReset)
    }
  }

  setActivity() {
    let active = false;
    this.noteElements.forEach((elem) => {
      if (elem.classList.contains('active')) {
        active = true;
      }
    });
    this.isActive = active;
  }

  showNote(transition = false) {
    this.moveInElement.classList.add('active');
    if (transition) this.moveInElement.classList.add('transition');
  }

  hideNote(transition = false) {
    if (transition) document.querySelector('.js-footer.active').classList.remove('transition');
    document.querySelector('.js-footer.active').classList.remove('active');
  }

  fadeInText(transition = false) {
    this.resetActiveText();
    this.opacityElement.classList.add('active');
    console.log(this.opacityElement);
    if (transition) this.opacityElement.classList.add('transition');
  }

  fadeOutText(transition = false) {
    this.opacityElement.classList.remove('active');
    if (transition) this.opacityElement.classList.remove('transition');
  }

  needNote(screen = this.screenName) {
    return this.screensWithNote.indexOf(this.screenName) !== -1;
  }

  resetActive() {
    this.noteElements.forEach((elem) => {
      elem.classList.remove('active', 'transition');
      elem.querySelector('.js-footer-note').classList.remove('active', 'transition');
    })
  }

  resetActiveText() {
    this.textElements.forEach((elem) => {
      elem.classList.remove('active', 'transition');
    })
  }
};
