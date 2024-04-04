precision mediump float;
uniform sampler2D map;
uniform float filter;
//uniform vec2 bubblesPositions;
//uniform float bubbleRadius;
struct Bubble {
  vec2 position;
  float size;
};
uniform Bubble bubbles[3];
uniform vec2 uCanvasSize;
varying vec2 vUv;

vec3 hueShift(vec3 color, float hue) {
  const vec3 k = vec3(0.57735, 0.57735, 0.57735);
  float cosAngle = cos(hue);
  return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

/**bool inBubble(int num) {
  vec2 textureCoord = gl_FragCoord.xy / uCanvasSize;
  vec2 normalizePosition = bubbles[num].position;
  vec2 pxPosition = bubbles[num].position * uCanvasSize;
  vec2 direction = normalizePosition - textureCoord;
  float dist = distance(gl_FragCoord.xy, (pxPosition)) / length(uCanvasSize);
  return dist < bubbles[num].size;
}*/

/**void drowInBubble(int num, out gl_FragColor) {
  vec2 textureCoord = gl_FragCoord.xy / uCanvasSize;
  vec2 normalizePosition = bubbles[num].position;
  vec2 pxPosition = bubbles[num].position * uCanvasSize;
  vec2 direction = normalizePosition - textureCoord;
  float dist = distance(gl_FragCoord.xy, (pxPosition)) / length(uCanvasSize);

  gl_FragColor = texture2D(map, textureCoord + direction * pow(0.01, dist));
}*/

void main() {
  vec4 texel = texture2D(map, vUv);
  vec2 textureCoord = gl_FragCoord.xy / uCanvasSize;

  vec2 normalizePosition0 = bubbles[0].position;
  vec2 pxPosition0 = bubbles[0].position * uCanvasSize;
  vec2 direction0 = normalizePosition0 - textureCoord;
  float dist0 = distance(gl_FragCoord.xy, (pxPosition0)) / length(uCanvasSize);
  bool valid0 = dist0 < bubbles[0].size / length(uCanvasSize);

  vec2 normalizePosition1 = bubbles[1].position;
  vec2 pxPosition1 = bubbles[1].position * uCanvasSize;
  vec2 direction1 = normalizePosition1 - textureCoord;
  float dist1 = distance(gl_FragCoord.xy, (pxPosition1)) / length(uCanvasSize);
  bool valid1 = dist1 < bubbles[1].size / length(uCanvasSize);

  vec2 normalizePosition2 = bubbles[2].position;
  vec2 pxPosition2 = bubbles[2].position * uCanvasSize;
  vec2 direction2 = normalizePosition2 - textureCoord;
  float dist2 = distance(gl_FragCoord.xy, (pxPosition2)) / length(uCanvasSize);
  bool valid2 = dist2 < bubbles[2].size / length(uCanvasSize);

  float pow0 = dist0 * 30.0;
  float pow1 = dist1 * 30.0;
  float pow2 = dist2 * 30.0;

  if (valid0) {
    gl_FragColor = texture2D(map, textureCoord + direction0 * pow(BUBBLE_OFFSET, pow0));
  }
  if (valid1) {
    gl_FragColor = texture2D(map, textureCoord + direction1 * pow(BUBBLE_OFFSET, pow1));
  }
  if (valid2) {
    gl_FragColor = texture2D(map, textureCoord + direction2 * pow(BUBBLE_OFFSET, pow2));
  }
  if (!valid0 && !valid1 && !valid2) {
    gl_FragColor = texture2D(map, textureCoord);
  }

  gl_FragColor.rgb = hueShift(gl_FragColor.rgb, filter);
}
