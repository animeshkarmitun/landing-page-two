'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    triggerElement?: string;
}

export default function SplitText({
    text,
    className = '',
    delay = 0,
    stagger = 0.03,
    triggerElement
}: SplitTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        if (!containerRef.current) return;

        const letters = containerRef.current.querySelectorAll('.letter');

        if (triggerElement) {
            // Scroll-triggered animation
            gsap.fromTo(
                letters,
                {
                    opacity: 0,
                    y: 50,
                    rotateX: -90,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: stagger,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: triggerElement,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        } else {
            // Immediate animation on mount
            gsap.fromTo(
                letters,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: stagger,
                    delay: delay,
                    ease: 'power2.out',
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [text, delay, stagger, triggerElement]);

    const splitIntoLetters = (text: string) => {
        return text.split('').map((char, index) => (
            <span
                key={index}
                className="letter"
                style={{
                    display: 'inline-block',
                    transformOrigin: 'bottom',
                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <div ref={containerRef} className={className} style={{ display: 'inline-block' }}>
            {splitIntoLetters(text)}
        </div>
    );
}
