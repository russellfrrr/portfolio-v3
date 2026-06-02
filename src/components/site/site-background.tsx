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

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 centered = uv - 0.5;
    centered.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse;
    vec2 mouseAspect = mouse - 0.5;
    mouseAspect.x *= u_resolution.x / u_resolution.y;

    float mouseDistance = length(centered - mouseAspect);
    float mouseField = smoothstep(0.78, 0.0, mouseDistance);
    float horizon = smoothstep(0.18, 0.78, uv.y);
    float sunCore = smoothstep(0.48, 0.0, length(vec2(centered.x * 0.86, uv.y - 0.08)));
    float sunHalo = smoothstep(0.95, 0.0, length(vec2(centered.x * 0.72, uv.y - 0.0)));
    float haze = smoothstep(0.65, 0.0, abs(uv.y - 0.38));
    float banding = 0.5 + 0.5 * sin((uv.y * 26.0) + sin(uv.x * 5.0) * 0.8 + u_time * 0.28);
    float fineGrain = hash(floor(gl_FragCoord.xy * 0.42) + floor(u_time * 1.5));

    vec3 black = vec3(0.0);
    vec3 cream = vec3(0.957, 0.937, 0.890);
    vec3 oxblood = vec3(0.435, 0.114, 0.141);
    vec3 ember = vec3(0.72, 0.19, 0.11);

    vec3 color = mix(black, oxblood * 0.18, horizon);
    color += oxblood * sunHalo * 0.34;
    color += ember * sunCore * 0.28;
    color += cream * sunCore * 0.045;
    color += cream * haze * banding * 0.028;
    color += oxblood * mouseField * 0.12;
    color += cream * mouseField * 0.018;
    color += cream * (fineGrain - 0.5) * 0.018;

    float vignette = smoothstep(1.22, 0.14, length(centered));
    color *= vignette + 0.2;

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,transparent_68%,rgba(0,0,0,0.52)_100%)]" />
    </div>
  );
};
