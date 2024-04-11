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

vec3 hueShift(vec3 color) {
  float hue = uFilter;
  const vec3 k = vec3(0.57735, 0.57735, 0.57735);
  float cosAngle = cos(hue);
  return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

bool isInBubble(Bubble bubble) {
  vec2 textureCoord = gl_FragCoord.xy / uCanvasSize;
  vec2 normalizePosition = bubble.position;
  vec2 pxPosition = bubble.position * uCanvasSize;
  float dist = distance(gl_FragCoord.xy, (pxPosition)) / length(uCanvasSize);
  float normBubbleRadius = bubble.size / length(uCanvasSize) * 200.0;

  return dist < normBubbleRadius;
}

void drawInBubble(inout vec4 texel, Bubble bubble) {
  vec2 textureCoord = gl_FragCoord.xy / uCanvasSize;
  vec2 normalizePosition = bubble.position;
  vec2 pxPosition = bubble.position * uCanvasSize;
  vec2 direction = normalizePosition - textureCoord;
  float dist = distance(gl_FragCoord.xy, (pxPosition)) / length(uCanvasSize);
  float normBubbleRadius = bubble.size / length(uCanvasSize) * 200.0;

  texel = texture2D(map, textureCoord + direction * pow(BUBBLE_OFFSET, dist * 30.0));

  bool isBorder = dist > normBubbleRadius - (BUBBLE_BORDER_WIDTH / length(uCanvasSize));
  const float glareDist = 0.12;
  float outsideGlareDist = normBubbleRadius - (BUBBLE_BORDER_WIDTH / length(uCanvasSize)) - glareDist / 20.0;
  float insideGlareDist = outsideGlareDist - (BUBBLE_BORDER_WIDTH / length(uCanvasSize));
  const float xOffsetGlareFromCenter = 0.1;
  const float yOffsetGlareFromCenter = 0.3;
  float xPositionOffsetGlareFromCenter = normalizePosition.x - xOffsetGlareFromCenter * normBubbleRadius * 3.0;
  float yPositionOffsetGlareFromCenter = normalizePosition.y + yOffsetGlareFromCenter * normBubbleRadius * 3.0;

  bool isGlare = dist < outsideGlareDist && dist > insideGlareDist
              && textureCoord.x < xPositionOffsetGlareFromCenter
              && textureCoord.y > yPositionOffsetGlareFromCenter;

  if (isBorder || isGlare) {
    //texel = vec4(1.0, 1.0, 1.0, 0.15);
    texel = vec4(texel.rgb * 1.1, 0.15);
  }
}

void main() {
  vec2 textureCoord = gl_FragCoord.xy / uCanvasSize;
  vec4 texel = texture2D(map, textureCoord);

  if (!isInBubble(bubbles[0]) && !isInBubble(bubbles[1]) && !isInBubble(bubbles[2])) {
    gl_FragColor = texture2D(map, textureCoord);
  }

  for (int i = 0; i < 3; i++) {
    if (isInBubble(bubbles[i])) {
      drawInBubble(texel, bubbles[i]);
    }
  }

  gl_FragColor = texel;
  gl_FragColor.rgb = hueShift(gl_FragColor.rgb);
}
