'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ProjectCardWrapperProps {
    href: string;
    dataId: string;
    bgColor: string;
    textColor: string;
    imagePath?: string;
    categories: string;
    title: string;
    className?: string;
}

export default function ProjectCardWrapper({
    href,
    dataId,
    bgColor,
    textColor,
    categories,
    title,
    className = '',
}: ProjectCardWrapperProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const boundsRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const maxTilt = 8;
        const perspective = 1000;
        const scale = 1.02;
        const speed = 0.4;

        const updateBounds = () => {
            const rect = card.getBoundingClientRect();
            boundsRef.current = {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
            };
        };

        const handleMouseEnter = () => {
            updateBounds();
            gsap.to(card, {
                scale: scale,
                duration: speed,
                ease: 'power2.out',
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            const { x, y, width, height } = boundsRef.current;

            const mouseX = (e.clientX - x - width / 2) / (width / 2);
            const mouseY = (e.clientY - y - height / 2) / (height / 2);

            const rotateY = mouseX * maxTilt;
            const rotateX = -mouseY * maxTilt;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: speed,
                ease: 'power2.out',
                transformPerspective: perspective,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: speed * 1.5,
                ease: 'power3.out',
            });
        };

        card.style.transformStyle = 'preserve-3d';
        card.style.willChange = 'transform';

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
            className={`project-item project-type-website ${className}`}
            href={href}
            data-id={dataId}
            style={{
                backgroundColor: bgColor,
                color: textColor,
            }}
        >
            <div className="project-item-main">
                <div className="project-item-image" />
            </div>
            <div className="project-item-footer">
                <div className="project-item-line-1">{categories}</div>
                <div className="project-item-line-2">
                    <div className="project-item-line-2-icon" />
                    <div className="project-item-line-2-inner">{title}</div>
                </div>
            </div>
        </a>
    );
}
