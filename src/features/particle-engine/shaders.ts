export const particleVertexShader = `
  attribute vec3 color;
  attribute float size;
  
  uniform float uTime;
  uniform float uSize;
  uniform float uSpeed;
  uniform float uDispersion;
  uniform float uIntensity;
  uniform float uTurbulence;
  uniform float uRotation;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  uniform float uMode;
  uniform vec2 uResolution;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vColor = color;
    
    vec3 pos = position;
    float time = uTime * uSpeed;
    
    // Mode-based animations
    if (uMode < 0.5) {
      // Spherical Vortex
      float angle = time * 0.5 + pos.y * 2.0;
      float radius = length(pos.xz);
      pos.x = radius * cos(angle + time * uRotation);
      pos.z = radius * sin(angle + time * uRotation);
      pos.y += sin(time + pos.x * 3.0) * uTurbulence * 0.3;
    } else if (uMode < 1.5) {
      // Radial Explosion
      float dispersion = sin(time * uDispersion) * uIntensity;
      pos *= 1.0 + dispersion * size;
    } else if (uMode < 2.5) {
      // Turbulence
      float noise = snoise(vec3(pos * 2.0 + time * 0.5));
      pos += noise * uTurbulence * uIntensity;
    } else if (uMode < 3.5) {
      // Galaxy
      float angle = time * 0.3 + length(pos.xy) * 3.0;
      float c = cos(angle);
      float s = sin(angle);
      pos.x = pos.x * c - pos.y * s;
      pos.y = pos.x * s + pos.y * c;
      pos.z += sin(time + length(pos) * 5.0) * uTurbulence;
    } else if (uMode < 4.5) {
      // Magnetic
      vec2 mouse = uMouse * uMouseInfluence;
      float dist = distance(pos.xy, mouse);
      float force = 1.0 / (dist + 0.1);
      pos.xy += normalize(mouse - pos.xy) * force * 0.1 * uIntensity;
    } else if (uMode < 5.5) {
      // Nebula
      float noise1 = snoise(vec3(pos * 1.5 + time * 0.3));
      float noise2 = snoise(vec3(pos * 3.0 - time * 0.2));
      pos += vec3(noise1, noise2, noise1 * noise2) * uTurbulence * uIntensity;
    } else if (uMode < 6.5) {
      // Black Hole
      float dist = length(pos);
      float pull = 1.0 / (dist + 0.1) * 0.05;
      pos *= 1.0 - pull * uIntensity * sin(time);
      float angle = time * 2.0 / (dist + 0.5);
      float c = cos(angle);
      float s = sin(angle);
      pos.x = pos.x * c - pos.y * s;
      pos.y = pos.x * s + pos.y * c;
    } else if (uMode < 7.5) {
      // Plasma
      float noise = snoise(vec3(pos * 3.0 + time));
      pos += noise * uTurbulence * uIntensity;
      pos *= 1.0 + sin(time * 2.0) * 0.1;
    } else if (uMode < 8.5) {
      // Fire
      pos.y += sin(time * 2.0 + pos.x * 5.0) * uIntensity;
      pos.x += sin(time * 3.0 + pos.y * 3.0) * uTurbulence;
      pos *= 1.0 + sin(time) * 0.05;
    } else if (uMode < 9.5) {
      // Stars
      float twinkle = sin(time * 5.0 + pos.x * 10.0) * 0.5 + 0.5;
      vAlpha = twinkle * uIntensity;
    } else if (uMode < 10.5) {
      // Rain
      pos.y -= time * uDispersion * 0.5;
      if (pos.y < -2.0) pos.y = 2.0;
    } else if (uMode < 11.5) {
      // DNA
      float helix = sin(time + pos.y * 5.0) * uIntensity;
      pos.x += helix;
      pos.z += cos(time + pos.y * 5.0) * uIntensity;
    } else if (uMode < 12.5) {
      // Fractal
      float noise = snoise(vec3(pos * 4.0 + time * 0.5));
      pos += vec3(noise) * uTurbulence * uIntensity;
    } else {
      // Tunnel
      float angle = time * 0.5;
      float c = cos(angle);
      float s = sin(angle);
      pos.x = pos.x * c - pos.y * s;
      pos.y = pos.x * s + pos.y * c;
      pos.z -= time * uDispersion * 0.2;
      if (pos.z < -3.0) pos.z = 3.0;
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * size * (300.0 / -mvPosition.z);
  }
`

export const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  uniform float uIntensity;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= vAlpha > 0.0 ? vAlpha : uIntensity;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`
