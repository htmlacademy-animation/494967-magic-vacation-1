`use strict`;

import * as THREE from "three";

export default class Setup3D {
  constructor(options) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = document.getElementById(options.canvas);
    this.color = options.color;
    this.alpha = options.alpha;
    this.far = options.far;
    this.near = options.near;
    this.aspectRatio = this.width / this.height;
    this.fov = 35;
  }

  init() {
    this.setup();
  }

  setup() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // 1.1.1. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(this.color, this.alpha);

    // 1.1.2. Scene
    this.scene = new THREE.Scene();

    // 1.1.3. Camera
    this.camera = new THREE.PerspectiveCamera(
        this.fov,
        this.aspectRatio,
        this.near,
        this.far
    );
    this.camera.position.z = this.far;
  }

  loadTexture(data, callback) {
    const {url, width, height, position} = data;
    const manager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(manager);
    const texture = loader.load(url);

    manager.onLoad = () => {
      callback(texture, width, height, position);
    };
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
