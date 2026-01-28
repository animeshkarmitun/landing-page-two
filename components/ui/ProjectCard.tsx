'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface ProjectCardProps {
    id: string;
    title: string;
    categories: string[];
    href: string;
    imageUrl?: string;
    bgColor: string;
    textColor: string;
}

export default function ProjectCard({
    id,
    title,
    categories,
    href,
    imageUrl,
    bgColor,
    textColor,
}: ProjectCardProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!cardRef.current || !imageRef.current || !imageWrapperRef.current) return;

        const card = cardRef.current;
        const imageWrapper = imageWrapperRef.current;
        const image = imageRef.current;
        const overlay = overlayRef.current;
        const shine = shineRef.current;

        let bounds: DOMRect;

        const handleMouseEnter = () => {
            setIsHovered(true);
            bounds = card.getBoundingClientRect();

            gsap.to(image, {
                scale: 1.08,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!bounds) return;

            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;

            // Normalize to -1 to 1
            const xPercent = (mouseX / bounds.width) * 2 - 1;
            const yPercent = (mouseY / bounds.height) * 2 - 1;

            // 3D rotation (subtle tilt)
            const rotateX = yPercent * -8; // Max 8 degrees
            const rotateY = xPercent * 8;

            // Parallax offset for image (moves opposite to mouse)
            const translateX = xPercent * -15;
            const translateY = yPercent * -15;

            // Apply 3D transform to card wrapper
            gsap.to(imageWrapper, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 800,
                duration: 0.4,
                ease: 'power2.out',
            });

            // Parallax movement on inner image
            gsap.to(image, {
                x: translateX,
                y: translateY,
                duration: 0.4,
                ease: 'power2.out',
            });

            // Overlay depth movement (less than image)
            if (overlay) {
                gsap.to(overlay, {
                    x: translateX * 0.5,
                    y: translateY * 0.5,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }

            // Update shine/highlight position
            if (shine) {
                const shineX = mouseX;
                const shineY = mouseY;
                gsap.to(shine, {
                    opacity: 0.15,
                    background: `radial-gradient(circle at ${shineX}px ${shineY}px, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                    duration: 0.3,
                });
            }
        };

        const handleMouseLeave = () => {
            setIsHovered(false);

            // Reset all transforms
            gsap.to(imageWrapper, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: 'power3.out',
            });

            gsap.to(image, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
            });

            if (overlay) {
                gsap.to(overlay, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                });
            }

            if (shine) {
                gsap.to(shine, {
                    opacity: 0,
                    duration: 0.4,
                });
            }
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <a
            ref={cardRef}
            href={href}
            className="group block relative overflow-hidden rounded-2xl transition-shadow duration-300"
            style={{
                backgroundColor: bgColor,
                color: textColor,
            }}
            data-id={id}
            data-cursor-hover="true"
        >
            {/* Image Container with 3D Transform */}
            <div
                ref={imageWrapperRef}
                className="relative overflow-hidden"
                style={{
                    aspectRatio: '16 / 10',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                }}
            >
                {/* Parallax Image Layer */}
                <div
                    ref={imageRef}
                    className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)]"
                    style={{
                        transformOrigin: 'center center',
                        willChange: 'transform',
                    }}
                >
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ backgroundColor: bgColor }}
                        >
                            <span className="text-4xl font-light opacity-30">{title[0]}</span>
                        </div>
                    )}
                </div>

                {/* Overlay gradient with depth movement */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `linear-gradient(to top, ${bgColor}aa 0%, transparent 60%)`,
                        opacity: isHovered ? 1 : 0.6,
                        willChange: 'transform',
                    }}
                />

                {/* Shine highlight layer */}
                <div
                    ref={shineRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: 0,
                        mixBlendMode: 'overlay',
                    }}
                />
            </div>

            {/* Footer Content */}
            <div
                className="p-6"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                {/* Categories */}
                <div
                    className="flex flex-wrap gap-2 mb-3"
                    style={{
                        fontSize: 'clamp(0.625rem, 0.8vw, 0.75rem)',
                        fontFamily: 'var(--font-family-ibm-mono, monospace)',
                        textTransform: 'lowercase',
                        opacity: 0.7,
                    }}
                >
                    {categories.map((cat, idx) => (
                        <span key={idx}>
                            {cat}
                            {idx < categories.length - 1 && ' • '}
                        </span>
                    ))}
                </div>

                {/* Title with arrow */}
                <div className="flex items-center gap-3">
                    {/* Animated dot/icon */}
                    <span
                        className="inline-block w-2 h-2 rounded-full transition-transform duration-300"
                        style={{
                            backgroundColor: textColor,
                            transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                        }}
                    />

                    {/* Title */}
                    <h3
                        className="font-medium transition-transform duration-300"
                        style={{
                            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                            transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                        }}
                    >
                        {title}
                    </h3>

                    {/* Arrow */}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="ml-auto transition-all duration-300"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                        }}
                    >
                        <path
                            d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </a>
    );
}
