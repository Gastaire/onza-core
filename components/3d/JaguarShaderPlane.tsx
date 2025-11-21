"use client";
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Simplex noise function for organic marbling
const simplexNoiseGLSL = `
// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

// Curl noise for fluid motion
const curlNoiseGLSL = `
vec2 curlNoise(vec2 p, float time) {
  float eps = 0.1;
  vec2 curl = vec2(
    snoise(vec2(p.x, p.y + eps) + time * 0.1) - snoise(vec2(p.x, p.y - eps) + time * 0.1),
    snoise(vec2(p.x + eps, p.y) + time * 0.1) - snoise(vec2(p.x - eps, p.y) + time * 0.1)
  );
  return curl / (2.0 * eps);
}
`;

// Vertex shader - simple passthrough
const vertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment shader - ink marbling + reveal
const fragmentShader = `
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_radius;
uniform float u_imageAspect;
uniform float u_turbulenceIntensity;
uniform bool u_invertMask;

varying vec2 v_uv;

${simplexNoiseGLSL}
${curlNoiseGLSL}

void main() {
  vec2 uv = v_uv;
  
  // Calculate aspect ratio correction
  vec2 aspectUv = uv;
  float canvasAspect = u_resolution.x / u_resolution.y;
  
  if (canvasAspect > u_imageAspect) {
    float scale = canvasAspect / u_imageAspect;
    aspectUv.y = (aspectUv.y - 0.5) * scale + 0.5;
  } else {
    float scale = u_imageAspect / canvasAspect;
    aspectUv.x = (aspectUv.x - 0.5) * scale + 0.5;
  }
  
  // Apply marbling distortion when radius > 0 (on hover)
  vec2 distortedUv = aspectUv;
  if (u_radius > 0.0) {
    vec2 noiseUv = aspectUv * 3.0;
    vec2 curl = curlNoise(noiseUv, u_time);
    distortedUv += curl * u_turbulenceIntensity * u_radius;
  }
  
  // Sample texture
  vec4 texColor = texture2D(u_texture, distortedUv);
  
  // Calculate distance from mouse
  vec2 mouseDist = aspectUv - u_mouse;
  mouseDist.x *= u_resolution.x / u_resolution.y;
  float dist = length(mouseDist);
  
  // Create smooth circular mask
  float mask = smoothstep(u_radius + 0.05, u_radius - 0.05, dist);
  
  if (u_invertMask) {
    mask = 1.0 - mask;
  }
  
  // Desaturated/inverted version for outside cursor
  vec3 desaturated = vec3(dot(texColor.rgb, vec3(0.299, 0.587, 0.114)));
  vec3 inverted = 1.0 - desaturated;
  vec3 coloredVersion = texColor.rgb;
  
  // When not hovering (u_radius very small), show colored version
  // When hovering, mix between inverted (outside) and colored (inside cursor)
  vec3 finalColor;
  if (u_radius < 0.01) {
    // Show colored version when not hovering - make it very bright
    finalColor = coloredVersion * 2.5; // Much brighter
  } else {
    // Apply reveal effect when hovering
    finalColor = mix(inverted, coloredVersion * 1.8, mask);
  }
  
  gl_FragColor = vec4(finalColor, texColor.a);
}
`;

interface JaguarShaderPlaneProps {
  imageUrl?: string; // Optional: path to jaguar image (use local image in /public folder)
  scale?: number;
}

export default function JaguarShaderPlane({ 
  imageUrl,
  scale = 3.5
}: JaguarShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size, pointer } = useThree();
  
  // Create a procedural jaguar-like texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create a gradient with jaguar-like colors
      const gradient = ctx.createRadialGradient(512, 512, 100, 512, 512, 512);
      gradient.addColorStop(0, '#d4af37');
      gradient.addColorStop(0.3, '#8B7355');
      gradient.addColorStop(0.6, '#4a4a4a');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some spots for jaguar-like appearance
      ctx.fillStyle = '#d4af37';
      const spots = [
        { x: 0.3, y: 0.3, r: 50 },
        { x: 0.7, y: 0.3, r: 45 },
        { x: 0.5, y: 0.5, r: 60 },
        { x: 0.2, y: 0.6, r: 40 },
        { x: 0.8, y: 0.7, r: 50 },
        { x: 0.4, y: 0.8, r: 45 },
        { x: 0.15, y: 0.15, r: 35 },
        { x: 0.85, y: 0.2, r: 40 },
      ];
      
      spots.forEach(spot => {
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(spot.x * canvas.width, spot.y * canvas.height, spot.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  // State for hover animations
  const hoverState = useRef({
    isHovered: false,
    currentRadius: 0,
    targetRadius: 0,
    mousePos: new THREE.Vector2(0.5, 0.5),
    targetMousePos: new THREE.Vector2(0.5, 0.5),
    time: 0
  });
  
  // Create shader material
  const shaderMaterial = useMemo(() => {
    const imageAspect = texture.image ? texture.image.width / texture.image.height : 1;
    
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_texture: { value: texture },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        u_radius: { value: 0.0 },
        u_imageAspect: { value: imageAspect },
        u_turbulenceIntensity: { value: 0.225 },
        u_invertMask: { value: false }
      },
      transparent: true
    });
  }, [texture, size.width, size.height]);
  
  // Update resolution on resize
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  }, [size.width, size.height]);
  
  // Mouse enter/leave handlers
  const handlePointerEnter = () => {
    hoverState.current.isHovered = true;
    hoverState.current.targetRadius = 0.35;
  };
  
  const handlePointerLeave = () => {
    hoverState.current.isHovered = false;
    hoverState.current.targetRadius = 0;
  };
  
  // Animation loop
  useFrame((state, delta) => {
    if (!materialRef.current) return;
    
    const h = hoverState.current;
    
    // Update mouse position with smooth lerp
    const normalizedPointer = new THREE.Vector2(
      (pointer.x + 1) / 2,
      (pointer.y + 1) / 2
    );
    h.targetMousePos.copy(normalizedPointer);
    h.mousePos.lerp(h.targetMousePos, 0.1);
    
    // Animate radius with spring easing
    const radiusDiff = h.targetRadius - h.currentRadius;
    const springSpeed = h.isHovered ? 0.15 : 0.2; // Faster on exit
    h.currentRadius += radiusDiff * springSpeed;
    
    // Update time only when hovered (marbling only active on hover)
    if (h.isHovered && h.currentRadius > 0.01) {
      h.time += delta;
    }
    
    // Update shader uniforms
    materialRef.current.uniforms.u_mouse.value.copy(h.mousePos);
    materialRef.current.uniforms.u_radius.value = h.currentRadius;
    materialRef.current.uniforms.u_time.value = h.time;
  });
  
  return (
    <mesh
      ref={meshRef}
      scale={[scale * viewport.aspect, scale, 1]}
      position={[0, 0, 0]}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}
