import vertexShader from './shaders/vertex-shader.glsl';
import fragmentShader from './shaders/fragment-shader.glsl';
import {RawShaderMaterial} from "three/src/materials/RawShaderMaterial";

export default class CustomMaterial extends RawShaderMaterial {
  constructor(texture, shaderOptions) {
    const {uHue, uTimeHue, uEasingHue, uCanvasSize} = shaderOptions;
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
          value: [
            {
              position: [0.3, 0.3],
              size: 0.7
            },
            {
              position: [0.5, 0.5],
              size: 0.4
            },
            {
              position: [0.7, 0.6],
              size: 0.7
            }
          ]
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
