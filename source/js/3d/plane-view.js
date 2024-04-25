import * as THREE from 'three';
import Setup3D from './utils/setup3d.js';
import _ from '../easing.js';
import Animation from '../animation';
import CustomMaterial from "./custom-material";

const PLANES = [
  {
    name: `top`,
    url: `img/scenes-textures/scene-0.png`,
  },
  {
    name: `story1`,
    url: `img/scenes-textures/scene-1.png`,
  },
  {
    name: `story2`,
    url: `img/scenes-textures/scene-2.png`,
    params: {
      uHue: 0.09,
      uTimeHue: 2000,
      uEasingHue: _.easeOutSine
    }
  },
  {
    name: `story3`,
    url: `img/scenes-textures/scene-3.png`,
  },
  {
    name: `story4`,
    url: `img/scenes-textures/scene-4.png`,
  }
];

const BUBBLES = [
  {
    position: [0.2, 0.6],
    size: 0.3,
    delay: 0.55
  },
  {
    position: [0.45, 0.8],
    size: 0.5,
    delay: 0.5
  },
  {
    position: [0.5, 0.5],
    size: 0.2,
    delay: 0.6
  }
];

export default class PlaneView extends Setup3D {
  constructor() {
    super({
      canvas: `animation-screen`,
      color: new THREE.Color(0x5f458c),
      alpha: 1,
      far: 1600,
      near: 1,

    });
    this.screenPlaneName = ``;
    this.planeWidth = 2048;
    this.planeHeight = 1024;
    this.planePositions = {};
    this.createPlaneObject = this.createPlaneObject.bind(this);
    this.setPlane = this.setPlane.bind(this);
  }

  init() {
    super.init();
    this.setupPlaneObjects();
    this.startAnimations();
  }

  startAnimations() {
    const animation = new Animation({
      func: () => {
        this.render();
      },
      duration: `infinite`,
      fps: 60,
    });
    animation.start();
  }

  startHueAnimation(name) {
    const {uHue, uTimeHue, uEasingHue} = this.getOptions(name);
    const plane = this.scene.children.filter((item) => {
      return item.name === name;
    });
    const material = plane[0].material;
    const animationHue = new Animation({
      func: (progress) => {
        material.uniforms.uHue.value = Math.cos((progress * 100) / 10) * -uHue;
        material.needsUpdate = true;
      },
      duration: uTimeHue,
      easing: uEasingHue
    });

    const animationBubbles = new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        const startOffsetY = 1;

        material.uniforms.bubbles.value = BUBBLES.reduce((acc, item) => {
          const amplitude = item.size / 10
          * Math.pow(progressReversed, 1)
          * Math.sin(progress * Math.PI * 35);
          const offsetX = Math.cos((progressReversed * 100) / 10) * amplitude;
          const x = item.position[0] + offsetX;
          const y = item.position[1] - startOffsetY * item.delay * 2.5 + progress * item.position[1] * 10;

          const blobParams = {
            size: item.size,
            position: new THREE.Vector2(x, y)
          };
          acc.push(blobParams);
          return acc;
        }, []);
        material.needsUpdate = true;
      },
      duration: 6000,
    });

    animationHue.start();
    animationBubbles.start();
  }

  setEffect(slideName) {
    this.startHueAnimation(slideName);
  }

  getOptions(slideName) {
    let options;

    for (let item of PLANES) {
      if (item.name !== slideName) {
        continue;
      }
      options = item.params;
      break;
    }

    return options;
  }

  createPlaneObject(texture, options) {
    const {width, height, position, name, uHue, uTimeHue, uEasingHue} = options;
    const geometry = new THREE.PlaneBufferGeometry(width, height);
    let material;
    if (uHue) {
      const shaderOptions = {
        uHue,
        uTimeHue,
        uEasingHue,
        uBubbles: BUBBLES,
        uCanvasSize: [window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio]
      };
      material = new CustomMaterial(texture, shaderOptions);
    } else {
      material = new THREE.MeshBasicMaterial({
        map: texture
      });
    }
    const plane = new THREE.Mesh(geometry, material);
    plane.name = name;
    plane.position.x = position;

    this.scene.add(plane);
    this.render();
  }

  setupPlaneObjects() {
    PLANES.forEach((item, i) => {
      this.loadTexture(
          item.url,
          this.createPlaneObject,
          {
            width: this.planeWidth,
            height: this.planeHeight,
            position: this.planeWidth * i,
            name: item.name,
            uHue: item.hasOwnProperty(`params`) ? item.params.uHue : ``,
            uTimeHue: item.hasOwnProperty(`params`) ? item.params.uTimeHue : ``,
            uEasingHue: item.hasOwnProperty(`params`) ? item.params.uEasingHue : ``
          });
      this.planePositions[item.name] = this.planeWidth * i;
    });
  }

  setPlane(name) {
    if (!this.planePositions.hasOwnProperty(name)) {
      return;
    }
    this.camera.position.x = this.planePositions[name];
    this.render();
  }
}
