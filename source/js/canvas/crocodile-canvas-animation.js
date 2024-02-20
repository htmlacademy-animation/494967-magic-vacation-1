import Animation from "../animation.js";
import Scene2D from "./scene-2d.js";
import _ from "../easing";

const IMAGES_URLS = Object.freeze({
  key: `img/module-4/lose-images/key.png`,
  watermelon: `img/module-4/lose-images/watermelon.png`,
  flamingo: `img/module-4/lose-images/flamingo.png`,
  leaf: `img/module-4/lose-images/leaf.png`,
  snowflake: `img/module-4/lose-images/snowflake.png`,
  saturn: `img/module-4/lose-images/saturn.png`,
  crocodile: `img/module-4/lose-images/crocodile.png`,
});

const OBJECTS = Object.freeze({
  key: {
    imageId: `key`,
    x: 58,
    y: 57,
    size: 20,
    opacity: 0,
    transforms: {
      scaleX: 0.8,
      scaleY: 0.8,
    },
  },
  watermelon: {
    imageId: `watermelon`,
    x: 5,
    y: 70,
    size: 15,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: -14,
      translateX: 50,
      rotate: 60,
    },
  },

  flamingo: {
    imageId: `flamingo`,
    x: 32,
    y: 50,
    size: 20,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: 6,
      translateX: 23,
      rotate: 60,
    },
  },
  leaf: {
    imageId: `leaf`,
    x: 102,
    y: 41,
    size: 20,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: 14,
      translateX: -46,
      rotate: -40,
    },
  },
  snowflake: {
    imageId: `snowflake`,
    x: 82,
    y: 60,
    size: 15,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: -5,
      translateX: -26,
      rotate: -60,
    },
  },
  saturn: {
    imageId: `saturn`,
    x: 101,
    y: 80,
    size: 17,
    opacity: 1,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: -23,
      translateX: -43,
      rotate: 50,
    },
  },
  crocodile: {
    imageId: `crocodile`,
    x: 57,
    y: 63,
    size: 93,
    opacity: 1,
    transforms: {
      translateY: -15,
      translateX: 45,
      rotate: 15,
    },
  },
});

const LOCALS = Object.freeze({
  drop: {
    centerX: 54.4,
    centerY: 69.7,
    radius: 2.6,
    endX: 54.4,
    endY: 65,
    angle: 55,
    deltasLength: 3,
    opacity: 0,
  }
});

export default class CrocodileCanvasAnimation extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile-canvas`);
    super({
      canvas,
      objects: OBJECTS,
      locals: LOCALS,
      imagesUrls: IMAGES_URLS,
    });

    this.initLocals();
    this.afterInit = () => {
      this.objects.crocodile.before = this.drawClipKey.bind(this);
      this.objects.crocodile.after = this.drawDrop.bind(this);
    };

    this.initEventListeners();
    this.initObjects();
    this.start();
  }

  initLocals() {
    this.locals = {
      drop: {
        centerX: LOCALS.drop.centerX,
        centerY: LOCALS.drop.centerY,
        radius: LOCALS.drop.radius,
        endX: LOCALS.drop.endX,
        endY: LOCALS.drop.endY,
        angle: LOCALS.drop.angle,
        deltasLength: LOCALS.drop.deltasLength,
        opacity: LOCALS.drop.opacity
      }
    };
  }

  updateSize() {
    super.updateSize();
    this.canvas.width = this.size + 130;
  }

  initAnimations() {
    this.animations.push(
        new Animation({
          func: () => {
            this.drawScene();
          },
          duration: `infinite`,
          fps: 60,
        })
    );
    this.initKeyAnimations();
    this.initCrocodileAnimations();
    this.initShowElementsAnimations();
    this.initFallElementsAnimations();
    this.initDropAnimations();
  }

  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.transforms.scaleX = 0.8 + 0.2 * progress;
        this.objects.key.transforms.scaleY = 0.8 + 0.2 * progress;
        this.objects.key.opacity = progress;
      },
      duration: 180,
      easing: _.easeInOutSine
    }));
  }

  initCrocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.crocodile.transforms.translateY = -15 * progressReversed;
        this.objects.crocodile.transforms.translateX = 45 * progressReversed;
        this.objects.crocodile.transforms.rotate = 15 * progressReversed;
      },
      duration: 600,
      delay: 700,
      easing: _.easeInOutSine
    }));
  }

  initShowElementsAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        // flamingo
        this.objects.flamingo.transforms.scaleX = progress;
        this.objects.flamingo.transforms.scaleY = progress;
        this.objects.flamingo.transforms.translateY = 6 * progressReversed;
        this.objects.flamingo.transforms.translateX = 23 * progressReversed;
        this.objects.flamingo.transforms.rotate = 60 * progressReversed;

        // watermelon
        this.objects.watermelon.transforms.scaleX = progress;
        this.objects.watermelon.transforms.scaleY = progress;
        this.objects.watermelon.transforms.translateY = -14 * progressReversed;
        this.objects.watermelon.transforms.translateX = 50 * progressReversed;
        this.objects.watermelon.transforms.rotate = 60 * progressReversed;

        // leaf
        this.objects.leaf.transforms.scaleX = progress;
        this.objects.leaf.transforms.scaleY = progress;
        this.objects.leaf.transforms.translateY = 14 * progressReversed;
        this.objects.leaf.transforms.translateX = -35 * progressReversed;
        this.objects.leaf.transforms.rotate = -40 * progressReversed;

        // snowflake
        this.objects.snowflake.transforms.scaleX = progress;
        this.objects.snowflake.transforms.scaleY = progress;
        this.objects.snowflake.transforms.translateY = -5 * progressReversed;
        this.objects.snowflake.transforms.translateX = -20 * progressReversed;
        this.objects.snowflake.transforms.rotate = -60 * progressReversed;

        // saturn
        this.objects.saturn.transforms.scaleX = progress;
        this.objects.saturn.transforms.scaleY = progress;
        this.objects.saturn.transforms.translateY = -23 * progressReversed;
        this.objects.saturn.transforms.translateX = -43 * progressReversed;
        this.objects.saturn.transforms.rotate = 50 * progressReversed;
      },
      duration: 600,
      easing: _.easeOutQuint,
      delay: 100,
    }));
  }

  initFallElementsAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = 70 * progress;
        this.objects.watermelon.transforms.translateY = 50 * progress;
        this.objects.snowflake.transforms.translateY = 70 * progress;
        this.objects.saturn.transforms.translateY = 50 * progress;
        this.objects.leaf.transforms.translateY = 80 * progress;
      },
      duration: 500,
      easing: _.easeInQuint,
      delay: 700,
    }));
  }

  initDropAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.locals.drop.centerY = 65 + (2 * progress);
        this.locals.drop.radius = 1.3 * progress;
        this.locals.drop.deltasLength = 1.5 * progress;
        this.locals.drop.opacity = 1;
      },
      duration: 330,
      easing: _.easeInOutSine,
      delay: 1300,
      callback: () => this.dropAnimation2(),
    }));
  }

  dropAnimation1() {
    const animation = new Animation({
      func: (progress) => {
        this.locals.drop.endY = 65;
        this.locals.drop.centerY = 65 + (2 * progress);
        this.locals.drop.radius = 1.3 * progress;
        this.locals.drop.deltasLength = 1.5 * progress;
        this.locals.drop.opacity = 1;
      },
      duration: 330,
      easing: _.easeInOutSine,
      delay: 567,
      callback: () => this.dropAnimation2(),
    });
    animation.start();
  }

  dropAnimation2() {
    const animation = new Animation({
      func: (progress) => {
        this.locals.drop.angle = 55 - (10 * progress);
        this.locals.drop.centerY = 67 + (2.7 * progress);
        this.locals.drop.radius = 1.3 + (1.3 * progress);
        this.locals.drop.deltasLength = 1.5 + (1.5 * progress);
      },
      duration: 253,
      easing: _.easeInOutSine,
      callback: () => this.dropAnimation3(),
    });
    animation.start();
  }

  dropAnimation3() {
    const animation1 = new Animation({
      func: (progress) => {
        this.locals.drop.centerY = 69.7 + 10 * progress;
        this.locals.drop.endY = 65 + 10 * progress;
      },
      duration: 507,
      delay: 127,
      easing: _.easeInOutSine,
    });
    animation1.start();

    const animation2 = new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.locals.drop.centerY = this.locals.drop.centerY - (2.7 * progress);
        this.locals.drop.radius = 2.6 - (1.3 * progress);
        this.locals.drop.deltasLength = 3 - (1.5 * progress);
        this.locals.drop.opacity = progressReversed;
      },
      duration: 203,
      delay: 434,
      easing: _.easeInOutSine,
      callback: () => this.dropAnimation1(),
    });
    animation2.start();
  }

  drawDrop() {
    this.ctx.restore();
    const drop = this.locals.drop;
    const angle = drop.angle * Math.PI / 180;
    if (drop.opacity === 0) {
      return;
    }
    const s = this.size / 100;
    this.ctx.save();
    this.ctx.globalAlpha = drop.opacity;
    this.ctx.fillStyle = `#acc3ff`;
    this.ctx.beginPath();

    this.ctx.arc(
        drop.centerX * s,
        drop.centerY * s,
        drop.radius * s,
        0,
        Math.PI,
    );

    this.ctx.bezierCurveTo(
        (drop.centerX - drop.radius) * s,
        drop.centerY * s,
        (drop.endX - drop.deltasLength * Math.sin(angle)) * s,
        (drop.endY + drop.deltasLength * Math.cos(angle)) * s,
        drop.endX * s,
        drop.endY * s
    );

    this.ctx.bezierCurveTo(
        drop.endX * s,
        drop.endY * s,
        (drop.endX + drop.deltasLength * Math.sin(angle)) * s,
        (drop.endY + drop.deltasLength * Math.cos(angle)) * s,
        (drop.centerX + drop.radius) * s,
        drop.centerY * s,
    );
    this.ctx.fill();
    this.ctx.restore();
  }

  drawClipKey() {
    const {x, y, size, imageId} = this.objects.key;
    const image = this.images[imageId];

    const width = this.size * (size / 100);
    const height = (this.size * (size / 100) * image.height) / image.width;
    const keyX = this.size * (x / 100) - width / 2;
    const keyY = this.size * (y / 100) - height / 2;
    const keyRadius = width / 2;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(0, keyY);
    this.ctx.lineTo(keyX + width / 2, keyY);
    this.ctx.arc(
        keyX + keyRadius,
        keyY + keyRadius,
        keyRadius,
        Math.PI * 1.5,
        Math.PI * 0.27
    );

    this.ctx.lineTo(keyX + width, keyY + height);
    this.ctx.lineTo(keyX + width, this.canvas.height);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.closePath();
    this.ctx.clip();
  }
}
