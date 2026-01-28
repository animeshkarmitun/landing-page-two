'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Particle shader for organic glowing effect
const particleVertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uMouse;
  
  attribute float aScale;
  attribute float aRandomness;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Mouse influence
    float distToMouse = length(modelPosition.xy - uMouse);
    float mouseInfluence = 1.0 - smoothstep(0.0, 2.0, distToMouse);
    
    // Organic movement
    float angle = atan(position.y, position.x);
    float distFromCenter = length(position.xy);
    
    // Wave-like motion
    modelPosition.x += sin(uTime * 0.5 + angle * 3.0) * 0.1 * distFromCenter;
    modelPosition.y += cos(uTime * 0.4 + angle * 2.0) * 0.1 * distFromCenter;
    modelPosition.z += sin(uTime * 0.3 + aRandomness * 10.0) * 0.2;
    
    // Mouse repulsion
    vec2 direction = normalize(modelPosition.xy - uMouse);
    modelPosition.xy += direction * mouseInfluence * 0.5;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * (1.0 + mouseInfluence * 0.5) * (1.0 / -viewPosition.z);
    
    // Color based on position and movement
    float hue = 0.6 + sin(angle + uTime * 0.1) * 0.1;
    vColor = vec3(0.4 + mouseInfluence * 0.3, 0.5 + mouseInfluence * 0.2, 1.0);
    vAlpha = 0.6 + mouseInfluence * 0.4;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    // Soft circle
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
    strength = pow(strength, 1.5);
    
    // Glow effect
    vec3 glowColor = vColor * 1.5;
    
    gl_FragColor = vec4(glowColor, strength * vAlpha);
  }
`;

interface ParticlesProps {
  count?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count = 3000, mouse }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Generate particle positions and attributes
  const [positions, scales, randomness] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical distribution for organic feel
      const radius = Math.random() * 3 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = (Math.random() - 0.5) * 2;
      
      scales[i] = Math.random() * 0.5 + 0.5;
      randomness[i] = Math.random();
    }
    
    return [positions, scales, randomness];
  }, [count]);
  
  // Custom shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 50 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);
  
  // Animation loop
  useFrame((state) => {
    if (mesh.current && shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Convert normalized mouse to scene coordinates
      shaderMaterial.uniforms.uMouse.value.set(
        mouse.current.x * viewport.width * 0.5,
        mouse.current.y * viewport.height * 0.5
      );
      
      // Gentle rotation
      mesh.current.rotation.z = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  return (
    <points ref={mesh} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={randomness.length}
          array={randomness}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <Particles mouse={mouse} count={2500} />
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
