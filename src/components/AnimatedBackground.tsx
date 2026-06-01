import { useEffect, useRef } from 'react';

/*
  Full-screen WebGL shader background:
  – Deep black base
  – Organic amoeba-like liquid blobs
  – Glowing thin white contour lines
  – Slow drifting, hypnotic, seamless loop
  – Minimal, monochrome, ambient wallpaper
*/

const VERTEX = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;

  // Simplex-style noise helpers
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      val += amp * snoise(p * freq);
      freq *= 2.0;
      amp *= 0.5;
    }
    return val;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = vec2(uv.x * aspect, uv.y) * 2.0;

    float t = u_time * 0.11;

    // Layered flowing noise fields for organic shapes
    float n1 = fbm(p + vec2(t * 0.7, t * 0.4));
    float n2 = fbm(p * 1.4 + vec2(-t * 0.5, t * 0.3) + n1 * 0.6);
    float n3 = fbm(p * 0.8 + vec2(t * 0.3, -t * 0.6) + n2 * 0.4);

    float field = n1 * 0.4 + n2 * 0.35 + n3 * 0.25;

    // Generate contour lines — thin glowing edges of the blobs
    float lines = 0.0;
    for (int i = 0; i < 7; i++) {
      float level = -0.72 + float(i) * 0.22;
      float dist = abs(field - level);
      // Slightly stronger contour response
      lines += 0.016 / (dist + 0.010);
    }

    // Normalize and brighten slightly
    lines = clamp(lines * 0.11, 0.0, 1.0);

    // Soft glow / blur bloom around the lines
    float glow = 0.0;
    for (int i = 0; i < 5; i++) {
      float level = -0.65 + float(i) * 0.28;
      float dist = abs(field - level);
      glow += 0.055 / (dist + 0.045);
    }
    glow = clamp(glow * 0.045, 0.0, 0.55);

    // Combine: brighter contours + softer bloom
    float brightness = lines + glow * 0.85;

    // Darken the whole field a bit so the entire background feels deeper, not just the edges
    brightness *= 0.72;

    // Monochrome cool-white tint
    vec3 color = vec3(brightness * 0.93, brightness * 0.95, brightness * 1.0);

    // Vignette — darken edges for depth
    float vig = 1.0 - length((uv - 0.5) * 0.85);
    vig = clamp(vig, 0.35, 1.0);
    color *= vig;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    // Compile shader
    function createShader(type: number, source: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, source);
      gl!.compileShader(s);
      return s;
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');

    let animId: number;
    let startTime = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = '100%';
      canvas!.style.height = '100%';
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function render() {
      const elapsed = (performance.now() - startTime) / 1000;
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, elapsed);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    resize();
    render();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.54, filter: 'blur(1.4px)' }}
    />
  );
}
