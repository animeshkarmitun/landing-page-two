'use client';

import { useEffect, useRef, useState } from 'react';

interface TrailPoint {
    x: number;
    y: number;
    timestamp: number;
    vx: number;
    vy: number;
}

export default function CustomCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const trailPoints = useRef<TrailPoint[]>([]);
    const lastPos = useRef({ x: 0, y: 0, time: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const dt = now - lastPos.current.time;
            const vx = dt > 0 ? (e.clientX - lastPos.current.x) / dt : 0;
            const vy = dt > 0 ? (e.clientY - lastPos.current.y) / dt : 0;

            setMousePos({ x: e.clientX, y: e.clientY });

            trailPoints.current.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: now,
                vx,
                vy
            });

            lastPos.current = { x: e.clientX, y: e.clientY, time: now };

            // Keep only recent points (last 800ms for smoother trail)
            const cutoff = now - 800;
            trailPoints.current = trailPoints.current.filter(
                point => point.timestamp > cutoff
            );
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let animationFrameId: number;
        const animate = () => {
            // Clear canvas completely to not cover content
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const now = Date.now();
            const points = trailPoints.current;

            if (points.length > 2) {
                // Draw smooth oil-like trail
                for (let i = 0; i < points.length - 1; i++) {
                    const point = points[i];
                    const nextPoint = points[i + 1];
                    const age = now - point.timestamp;
                    const progress = age / 800;
                    const opacity = Math.max(0, 1 - progress);

                    if (opacity > 0.01) {
                        // Calculate speed for dynamic width
                        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
                        const baseWidth = Math.min(120, 60 + speed * 50);
                        const width = baseWidth * opacity;

                        // Create multiple layers for oil effect
                        const layers = 3;
                        for (let layer = 0; layer < layers; layer++) {
                            const layerOffset = layer / layers;
                            const layerWidth = width * (1 - layerOffset * 0.3);
                            const layerOpacity = opacity * (0.02 - layerOffset * 0.008); // Very low visibility

                            // Iridescent oil colors - shifting hues
                            const hueShift = (age / 5 + i * 3 + layer * 30) % 360;
                            const hue1 = (200 + hueShift) % 360; // Blue-purple range
                            const hue2 = (240 + hueShift) % 360;
                            const hue3 = (280 + hueShift) % 360;

                            // Create gradient perpendicular to movement direction
                            const dx = nextPoint.x - point.x;
                            const dy = nextPoint.y - point.y;
                            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                            const perpX = -dy / dist;
                            const perpY = dx / dist;

                            const gradient = ctx.createLinearGradient(
                                point.x + perpX * layerWidth,
                                point.y + perpY * layerWidth,
                                point.x - perpX * layerWidth,
                                point.y - perpY * layerWidth
                            );

                            gradient.addColorStop(0, `hsla(${hue1}, 85%, 75%, 0)`);
                            gradient.addColorStop(0.3, `hsla(${hue2}, 90%, 80%, ${layerOpacity * 0.5})`);
                            gradient.addColorStop(0.5, `hsla(${hue2}, 95%, 85%, ${layerOpacity * 0.8})`);
                            gradient.addColorStop(0.7, `hsla(${hue3}, 90%, 80%, ${layerOpacity * 0.5})`);
                            gradient.addColorStop(1, `hsla(${hue3}, 85%, 75%, 0)`);

                            ctx.strokeStyle = gradient;
                            ctx.lineWidth = layerWidth;
                            ctx.lineCap = 'round';
                            ctx.lineJoin = 'round';

                            // Smooth bezier curve for organic flow
                            if (i === 0) {
                                ctx.beginPath();
                                ctx.moveTo(point.x, point.y);
                            }

                            if (i < points.length - 2) {
                                const midX = (point.x + nextPoint.x) / 2;
                                const midY = (point.y + nextPoint.y) / 2;
                                ctx.quadraticCurveTo(point.x, point.y, midX, midY);
                            } else {
                                ctx.lineTo(nextPoint.x, nextPoint.y);
                            }
                            ctx.stroke();
                        }
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            {/* Oil effect trail canvas */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
                style={{ mixBlendMode: 'screen' }}
            />
        </>
    );
}
