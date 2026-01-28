'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

// Project data matching the homepage
const projects = [
    {
        id: 'devin_ai',
        title: 'Devin AI',
        categories: ['web', 'design', 'development', '3d'],
        bgColor: '#121414',
        textColor: '#ffffff',
        imageUrl: '/projects/devin_ai/home.webp',
    },
    {
        id: 'porsche_dream_machine',
        title: 'Porsche: Dream Machine',
        categories: ['concept', '3D illustration', 'mograph', 'video'],
        bgColor: '#EFD5D3',
        textColor: '#000000',
        imageUrl: '/projects/porsche_dream_machine/home.webp',
    },
    {
        id: 'synthetic_human',
        title: 'Synthetic Human',
        categories: ['web', 'design', 'development', '3d'],
        bgColor: '#9d8aff',
        textColor: '#ffffff',
        imageUrl: '/projects/synthetic_human/home.webp',
    },
    {
        id: 'spatial_fusion',
        title: 'Meta: Spatial Fusion',
        categories: ['web', 'design', 'development', '3d'],
        bgColor: '#D6C8ED',
        textColor: '#000000',
        imageUrl: '/projects/spatial_fusion/home.webp',
    },
    {
        id: 'spaace',
        title: 'Spaace - NFT Marketplace',
        categories: ['web', 'design', 'development', '3d', 'web3'],
        bgColor: '#010a16',
        textColor: '#ffece2',
        imageUrl: '/projects/spaace/home.webp',
    },
    {
        id: 'ddd_2024',
        title: 'DDD 2024',
        categories: ['web', 'design', 'development', '3d'],
        bgColor: '#261c46',
        textColor: '#ffffff',
        imageUrl: '/projects/ddd_2024/home.webp',
    },
    {
        id: 'choo_choo_world',
        title: 'Choo Choo World',
        categories: ['concept', 'web', 'game design', '3d'],
        bgColor: '#E8EEF8',
        textColor: '#000000',
        imageUrl: '/projects/choo_choo_world/home.webp',
    },
    {
        id: 'soda_experience',
        title: 'Soda Experience',
        categories: ['AR', 'development', '3d'],
        bgColor: '#E1E2E4',
        textColor: '#000000',
        imageUrl: '/projects/soda_experience/home.webp',
    },
];

// Get unique categories from all projects
const allCategories = ['all', ...Array.from(new Set(projects.flatMap(p => p.categories)))];

export default function ProjectsPage() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const projectsGridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Title animation
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: 0.2,
                }
            );
        }

        // Stagger animation for project cards
        if (projectsGridRef.current) {
            const cards = projectsGridRef.current.querySelectorAll('.project-card');
            gsap.fromTo(
                cards,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: projectsGridRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <SmoothScroll>
            <CustomCursor />
            <Header />

            <main
                style={{
                    paddingTop: 'calc(var(--base-padding-y) * 2 + 60px)',
                    paddingLeft: 'var(--base-padding-x)',
                    paddingRight: 'var(--base-padding-x)',
                    minHeight: '100vh',
                }}
            >
                {/* Page Header */}
                <section style={{ marginBottom: 'clamp(40px, 6vw, 80px)' }}>
                    <h1
                        ref={titleRef}
                        style={{
                            fontSize: 'clamp(3rem, 10vw, 8rem)',
                            fontWeight: 400,
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                            marginBottom: 'clamp(20px, 3vw, 40px)',
                        }}
                    >
                        Projects
                    </h1>
                    <p
                        style={{
                            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                            maxWidth: '600px',
                            opacity: 0.7,
                            lineHeight: 1.6,
                        }}
                    >
                        A selection of our most passionately crafted works with
                        forward-thinking clients and friends over the years.
                    </p>
                </section>

                {/* Projects Grid */}
                <section
                    ref={projectsGridRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 500px), 1fr))',
                        gap: 'clamp(20px, 3vw, 40px)',
                        marginBottom: 'clamp(60px, 8vw, 120px)',
                    }}
                >
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="project-card group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]"
                            style={{
                                backgroundColor: project.bgColor,
                                color: project.textColor,
                            }}
                        >
                            {/* Image Container */}
                            <div
                                className="relative overflow-hidden"
                                style={{ aspectRatio: '16 / 10' }}
                            >
                                <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110">
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>

                                {/* Gradient overlay */}
                                <div
                                    className="absolute inset-0 transition-opacity duration-300"
                                    style={{
                                        background: `linear-gradient(to top, ${project.bgColor}88 0%, transparent 50%)`,
                                        opacity: 0.5,
                                    }}
                                />
                            </div>

                            {/* Card Footer */}
                            <div
                                className="p-6"
                                style={{ backgroundColor: project.bgColor }}
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
                                    {project.categories.map((cat, idx) => (
                                        <span key={idx}>
                                            {cat}
                                            {idx < project.categories.length - 1 && ' • '}
                                        </span>
                                    ))}
                                </div>

                                {/* Title with arrow */}
                                <div className="flex items-center gap-3">
                                    <span
                                        className="inline-block w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150"
                                        style={{ backgroundColor: project.textColor }}
                                    />

                                    <h3
                                        className="font-medium transition-transform duration-300 group-hover:translate-x-2"
                                        style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
                                    >
                                        {project.title}
                                    </h3>

                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        className="ml-auto transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
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
                        </Link>
                    ))}
                </section>
            </main>

            <Footer />
        </SmoothScroll>
    );
}
