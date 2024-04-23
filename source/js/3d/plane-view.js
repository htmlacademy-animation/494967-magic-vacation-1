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
      uHue: 0.2,
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
    const animation = new Animation({
      func: (progress) => {
        material.uniforms.uHue.value = Math.cos((progress * 100) / 10) * -uHue;
        material.needsUpdate = true;
      },
      duration: uTimeHue,
      easing: uEasingHue
    });
    animation.start();
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
