import vertexShader from './shaders/vertex-shader.glsl';
import fragmentShader from './shaders/fragment-shader.glsl';
import {RawShaderMaterial} from "three/src/materials/RawShaderMaterial";

export default class CustomMaterial extends RawShaderMaterial {
  constructor(texture, shaderOptions) {
    const {filter, /* bubblesPositions, bubbleRadius, */uCanvasSize} = shaderOptions;
    super({
      uniforms: {
        map: {
          value: texture
        },
        filter: {
          value: filter
        },
        bubbles: {
          value: [
            {
              position: [0.3, 0.3],
              size: 150
            },
            {
              position: [0.5, 0.5],
              size: 50
            },
            {
              position: [0.7, 0.6],
              size: 200
            }
          ]
        },
        uCanvasSize: {
          value: uCanvasSize
        }
      },
      defines: {
        BUBBLE_OFFSET: 0.3
      },
      vertexShader,
      fragmentShader
    });
  }
}
