import vertexShader from './shaders/vertex-shader.glsl';
import fragmentShader from './shaders/fragment-shader.glsl';
import {RawShaderMaterial} from "three/src/materials/RawShaderMaterial";

export default class CustomMaterial extends RawShaderMaterial {
  constructor(texture, shaderOptions) {
    const {uHue, uTimeHue, uEasingHue, uBubbles, uCanvasSize} = shaderOptions;
    super({
      uniforms: {
        map: {
          value: texture
        },
        uHue: {
          value: uHue
        },
        uTimeHue: {
          value: uTimeHue
        },
        uEasingHue: {
          value: uEasingHue
        },
        bubbles: {
          value: uBubbles
        },
        uCanvasSize: {
          value: uCanvasSize
        }
      },
      defines: {
        BUBBLE_OFFSET: 0.3,
        BUBBLE_BORDER_WIDTH: 1.9,
      },
      transparent: true,
      vertexShader,
      fragmentShader
    });
  }
}
