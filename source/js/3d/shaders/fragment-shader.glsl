precision mediump float;
uniform sampler2D map;
uniform float filter;
varying vec2 vUv;

vec3 hueShift(vec3 color, float hue) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hue);
    return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {
  vec4 color = texture2D(map, vUv);

  gl_FragColor = color;
  gl_FragColor.rgb = hueShift(color.rgb, filter);
}
