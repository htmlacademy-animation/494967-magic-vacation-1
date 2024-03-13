import vertexShader from './shaders/vertex-shader.js';
import fragmentShader from './shaders/fragment-shader.js';
import {RawShaderMaterial} from "three/src/materials/RawShaderMaterial";

export default class CustomMaterial extends RawShaderMaterial {
  constructor(texture) {
    super({
      uniforms: {
        map: {
          value: texture
        }
      },
      vertexShader,
      fragmentShader
    });
  }
}
