export default class LoadingImages {
  constructor() {
    this.sourcesImages = {
      'prizes': ['img/prize1.svg', 'img/prize2.svg', 'img/prize3.svg']
    };
  }

  preload() {
    for (let screen in this.sourcesImages) {
      this.sourcesImages[screen].forEach((source) => {
        let imgElement = document.createElement("img");
        imgElement.src = source;
      })
    }
  }
};
