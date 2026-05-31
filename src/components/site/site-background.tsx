'use client';

import { useEffect, useRef } from 'react';

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float grid(vec2 uv, float scale, float thickness) {
    vec2 cells = abs(fract(uv * scale) - 0.5);
    float line = min(cells.x, cells.y);

    return 1.0 - smoothstep(0.0, thickness, line);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 centered = uv - 0.5;
    centered.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse;
    vec2 mouseAspect = mouse - 0.5;
    mouseAspect.x *= u_resolution.x / u_resolution.y;

    float mouseDistance = length(centered - mouseAspect);
    float mouseField = smoothstep(0.72, 0.0, mouseDistance);
    float ripple = sin(mouseDistance * 34.0 - u_time * 2.4) * 0.008 * mouseField;

    vec2 warped = uv + normalize(centered - mouseAspect + 0.0001) * ripple;
    warped += vec2(u_time * 0.006, -u_time * 0.004);

    float majorGrid = grid(warped, 16.0, 0.018);
    float minorGrid = grid(warped + vec2(0.17, 0.09), 48.0, 0.006);
    float diagonal = smoothstep(0.48, 0.5, abs(fract((warped.x - warped.y) * 18.0) - 0.5));
    float scanline = 0.5 + 0.5 * sin(gl_FragCoord.y * 1.85 + u_time * 2.0);
    float grain = hash(floor(gl_FragCoord.xy * 0.7) + u_time);

    vec3 black = vec3(0.0);
    vec3 cream = vec3(0.957, 0.937, 0.890);
    vec3 oxblood = vec3(0.435, 0.114, 0.141);

    vec3 color = black;
    color += cream * majorGrid * 0.035;
    color += cream * minorGrid * 0.015;
    color += cream * (1.0 - diagonal) * 0.018;
    color += oxblood * mouseField * 0.22;
    color += cream * mouseField * 0.035;
    color += cream * scanline * 0.018;
    color += cream * (grain - 0.5) * 0.025;

    float vignette = smoothstep(1.18, 0.18, length(centered));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const createShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);

    return null;
  }

  return shader;
};

const createProgram = (gl: WebGLRenderingContext) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);

    return null;
  }

  return program;
};

export const SiteBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
      stencil: false,
    });

    if (!gl) {
      return;
    }

    const program = createProgram(gl);

    if (!program) {
      return;
    }

    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    let animationFrame = 0;
    let startTime = performance.now();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(window.innerWidth * pixelRatio);
      const height = Math.floor(window.innerHeight * pixelRatio);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetMouse.x = event.clientX / window.innerWidth;
      targetMouse.y = 1 - event.clientY / window.innerHeight;
    };

    const render = (time: number) => {
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mouse.x, mouse.y);
      gl.uniform1f(timeLocation, reducedMotion ? 0 : (time - startTime) * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);
    animationFrame = window.requestAnimationFrame((time) => {
      startTime = time;
      render(time);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <canvas className="absolute inset-0 size-full" ref={canvasRef} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,transparent_58%,rgba(0,0,0,0.62)_100%)]" />
    </div>
  );
};
