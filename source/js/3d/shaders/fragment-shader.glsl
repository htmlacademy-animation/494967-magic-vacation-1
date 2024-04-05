precision mediump float;
uniform sampler2D map;
uniform float uFilter;
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

bool isInBubble(Bubble bubble) {
  vec2 textureCoord = gl_FragCoord.xy / uCanvasSize;
  vec2 normalizePosition = bubble.position;
  vec2 pxPosition = bubble.position * uCanvasSize;
  float dist = distance(gl_FragCoord.xy, (pxPosition)) / length(uCanvasSize);
  return dist < bubble.size / length(uCanvasSize) * 200.0;
}

void drawInBubble(Bubble bubble) {
  vec2 textureCoord = gl_FragCoord.xy / uCanvasSize;
  vec2 normalizePosition = bubble.position;
  vec2 pxPosition = bubble.position * uCanvasSize;
  vec2 direction = normalizePosition - textureCoord;
  float dist = distance(gl_FragCoord.xy, (pxPosition)) / length(uCanvasSize);

  gl_FragColor = texture2D(map, textureCoord + direction * pow(BUBBLE_OFFSET, dist * 30.0));
}

void main() {
  vec4 texel = texture2D(map, vUv);
  vec2 textureCoord = gl_FragCoord.xy / uCanvasSize;

  if (!isInBubble(bubbles[0]) && !isInBubble(bubbles[1]) && !isInBubble(bubbles[2])) {
    gl_FragColor = texture2D(map, textureCoord);
  }

  for (int i = 0; i < 3; i++) {
    if (isInBubble(bubbles[i])) {
      drawInBubble(bubbles[i]);
    }
  }

  gl_FragColor.rgb = hueShift(gl_FragColor.rgb, uFilter);
}
