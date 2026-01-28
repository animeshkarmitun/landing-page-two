'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    strength?: number; // How strongly the button follows cursor (0-1)
    radius?: number; // Activation radius in pixels
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    className = '',
    style = {},
    strength = 0.35,
    radius = 100,
    onClick,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const content = contentRef.current;
        if (!button || !content) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < radius) {
                // Calculate movement based on distance from center
                const pullStrength = 1 - distance / radius;
                const moveX = distanceX * strength * pullStrength;
                const moveY = distanceY * strength * pullStrength;

                gsap.to(button, {
                    x: moveX,
                    y: moveY,
                    duration: 0.3,
                    ease: 'power2.out',
                });

                // Inner content moves in opposite direction for depth effect
                gsap.to(content, {
                    x: moveX * 0.3,
                    y: moveY * 0.3,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)',
            });

            gsap.to(content, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)',
            });
        };

        // Listen on document for broader activation area
        document.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength, radius]);

    return (
        <div
            ref={buttonRef}
            className={`magnetic-button ${className}`}
            style={{ display: 'inline-block', willChange: 'transform', ...style }}
            onClick={onClick}
        >
            <div ref={contentRef} className="magnetic-button-content">
                {children}
            </div>
        </div>
    );
}
