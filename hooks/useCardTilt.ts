'use client';

import { useRef, useEffect, RefObject } from 'react';
import { gsap } from 'gsap';

interface TiltConfig {
    maxTilt?: number;
    perspective?: number;
    scale?: number;
    speed?: number;
    easing?: string;
}

export function useCardTilt<T extends HTMLElement>(
    config: TiltConfig = {}
): RefObject<T | null> {
    const {
        maxTilt = 10,
        perspective = 1000,
        scale = 1.02,
        speed = 0.4,
        easing = 'power2.out',
    } = config;

    const elementRef = useRef<T>(null);
    const bounds = useRef({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const updateBounds = () => {
            const rect = element.getBoundingClientRect();
            bounds.current = {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
            };
        };

        const handleMouseEnter = () => {
            updateBounds();
            gsap.to(element, {
                scale: scale,
                duration: speed,
                ease: easing,
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            const { x, y, width, height } = bounds.current;

            // Calculate position relative to element center (normalized -1 to 1)
            const mouseX = (e.clientX - x - width / 2) / (width / 2);
            const mouseY = (e.clientY - y - height / 2) / (height / 2);

            // Calculate rotation (inverted for natural feel)
            const rotateY = mouseX * maxTilt;
            const rotateX = -mouseY * maxTilt;

            gsap.to(element, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: speed,
                ease: easing,
                transformPerspective: perspective,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: speed * 1.5,
                ease: 'power3.out',
            });
        };

        // Set initial transform style
        element.style.transformStyle = 'preserve-3d';
        element.style.willChange = 'transform';

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [maxTilt, perspective, scale, speed, easing]);

    return elementRef;
}

// Alternative: Component wrapper for easier use
interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    config?: TiltConfig;
}

export function TiltCard({
    children,
    className = '',
    as: Component = 'div',
    config = {}
}: TiltCardProps) {
    const ref = useCardTilt<HTMLDivElement>(config);

    return (
        <div ref= { ref } className = { className } >
            { children }
            </div>
    );
}
