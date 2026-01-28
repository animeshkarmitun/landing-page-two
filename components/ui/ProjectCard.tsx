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
    const imageRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!cardRef.current || !imageRef.current) return;

        const card = cardRef.current;
        const image = imageRef.current;

        const handleMouseEnter = () => {
            setIsHovered(true);
            gsap.to(image, {
                scale: 1.05,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            gsap.to(image, {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
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
        >
            {/* Image Container */}
            <div
                className="relative overflow-hidden"
                style={{
                    aspectRatio: '16 / 10',
                }}
            >
                <div
                    ref={imageRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ transformOrigin: 'center center' }}
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

                {/* Overlay gradient on hover */}
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: `linear-gradient(to top, ${bgColor}88 0%, transparent 50%)`,
                        opacity: isHovered ? 1 : 0.5,
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
