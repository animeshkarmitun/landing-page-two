'use client';

import { useEffect, useRef } from 'react';

export default function FilmGrain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const generateNoise = () => {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                // Generate subtle noise - very low opacity
                const noise = Math.random() * 25;
                data[i] = noise;     // R
                data[i + 1] = noise; // G
                data[i + 2] = noise; // B
                data[i + 3] = 15;    // Alpha (very subtle)
            }

            ctx.putImageData(imageData, 0, 0);
        };

        const animate = () => {
            time++;

            // Only update every 3 frames for performance
            if (time % 3 === 0) {
                generateNoise();
            }

            animationId = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
            style={{
                mixBlendMode: 'overlay',
                opacity: 0.4,
            }}
            aria-hidden="true"
        />
    );
}
