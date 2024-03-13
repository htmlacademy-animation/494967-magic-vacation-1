
import * as THREE from 'three';
import Setup3D from './utils/setup3d.js';
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
    this.planeWidth = 2048;
    this.planeHeight = 1024;
    this.planePositions = {};
    this.createPlaneObject = this.createPlaneObject.bind(this);
    this.setPlane = this.setPlane.bind(this);
  }

  init() {
    super.init();
    this.setupPlaneObjects();
  }

  createPlaneObject(texture, width, height, position) {
    const geometry = new THREE.PlaneBufferGeometry(width, height);
    const material = new CustomMaterial(texture);
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = position;

    this.scene.add(plane);
    this.render();
  }

  setupPlaneObjects() {
    PLANES.forEach((item, i) => {
      this.loadTexture({
        url: item.url,
        width: this.planeWidth,
        height: this.planeHeight,
        position: this.planeWidth * i,
      },
      this.createPlaneObject);
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
