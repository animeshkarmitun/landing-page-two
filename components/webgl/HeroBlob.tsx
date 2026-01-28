'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Blob() {
    const meshRef = useRef<THREE.Mesh>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Track mouse position
    useMemo(() => {
        if (typeof window !== 'undefined') {
            const handleMouseMove = (e: MouseEvent) => {
                mouseRef.current = {
                    x: (e.clientX / window.innerWidth) * 2 - 1,
                    y: -(e.clientY / window.innerHeight) * 2 + 1,
                };
            };
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Smooth rotation based on mouse
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            mouseRef.current.y * 0.3,
            0.05
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            mouseRef.current.x * 0.3 + time * 0.1,
            0.05
        );

        // Subtle floating animation
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    });

    return (
        <mesh ref={meshRef} scale={2.5}>
            <icosahedronGeometry args={[1, 4]} />
            <MeshDistortMaterial
                color="#6366f1"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
                envMapIntensity={1}
            />
        </mesh>
    );
}

export default function HeroBlob() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.6,
            pointerEvents: 'none'
        }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} />
                <Blob />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
