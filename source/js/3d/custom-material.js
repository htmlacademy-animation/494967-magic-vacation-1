import vertexShader from './shaders/vertex-shader.glsl';
import fragmentShader from './shaders/fragment-shader.glsl';
import {RawShaderMaterial} from "three/src/materials/RawShaderMaterial";

export default class CustomMaterial extends RawShaderMaterial {
  constructor(texture, filter) {
    super({
      uniforms: {
        map: {
          value: texture
        },
        filter: {
          value: filter
        }
      },
      vertexShader,
      fragmentShader
    });
  }
}
