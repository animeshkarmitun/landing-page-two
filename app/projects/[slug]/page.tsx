'use client';

import { useEffect, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

// Project data
const projects = [
    {
        id: 'devin_ai',
        title: 'Devin AI',
        subtitle: 'The world\'s first fully autonomous AI software engineer',
        categories: ['web', 'design', 'development', '3d'],
        bgColor: '#121414',
        textColor: '#ffffff',
        imageUrl: '/projects/devin_ai/home.webp',
        description: 'We partnered with Cognition Labs to create an immersive digital experience showcasing Devin, the groundbreaking AI software engineer. The project features advanced 3D visualizations and interactive elements that bring the AI\'s capabilities to life.',
        year: '2024',
        client: 'Cognition Labs',
        services: ['Web Design', 'Development', '3D Animation', 'Creative Direction'],
    },
    {
        id: 'porsche_dream_machine',
        title: 'Porsche: Dream Machine',
        subtitle: 'A visual journey through automotive excellence',
        categories: ['concept', '3D illustration', 'mograph', 'video'],
        bgColor: '#EFD5D3',
        textColor: '#000000',
        imageUrl: '/projects/porsche_dream_machine/home.webp',
        description: 'An exploration of Porsche\'s design philosophy through stunning 3D illustrations and motion graphics. This conceptual project captures the essence of automotive dreams and engineering precision.',
        year: '2024',
        client: 'Porsche',
        services: ['Concept Design', '3D Illustration', 'Motion Graphics', 'Video Production'],
    },
    {
        id: 'synthetic_human',
        title: 'Synthetic Human',
        subtitle: 'Exploring the boundaries between human and artificial',
        categories: ['web', 'design', 'development', '3d'],
        bgColor: '#9d8aff',
        textColor: '#ffffff',
        imageUrl: '/projects/synthetic_human/home.webp',
        description: 'A thought-provoking digital experience that blurs the lines between organic and synthetic. Through cutting-edge WebGL technology, we created an interactive journey into the future of human-machine integration.',
        year: '2024',
        client: 'Meta Research',
        services: ['Web Design', 'WebGL Development', '3D Character Design', 'UX Strategy'],
    },
    {
        id: 'spatial_fusion',
        title: 'Meta: Spatial Fusion',
        subtitle: 'Reimagining spatial computing interfaces',
        categories: ['web', 'design', 'development', '3d'],
        bgColor: '#D6C8ED',
        textColor: '#000000',
        imageUrl: '/projects/spatial_fusion/home.webp',
        description: 'Working with Meta\'s Reality Labs, we developed an interactive showcase for next-generation spatial computing. The experience demonstrates how digital and physical worlds seamlessly merge.',
        year: '2024',
        client: 'Meta',
        services: ['Web Design', '3D Development', 'Spatial UI', 'Interactive Experience'],
    },
    {
        id: 'spaace',
        title: 'Spaace - NFT Marketplace',
        subtitle: 'The future of digital collectibles',
        categories: ['web', 'design', 'development', '3d', 'web3'],
        bgColor: '#010a16',
        textColor: '#ffece2',
        imageUrl: '/projects/spaace/home.webp',
        description: 'A premium NFT marketplace that combines elegant design with blockchain technology. We crafted an intuitive platform that makes buying and selling digital art accessible and enjoyable.',
        year: '2023',
        client: 'Spaace',
        services: ['Web3 Development', 'UI/UX Design', 'Smart Contracts', 'Brand Identity'],
    },
    {
        id: 'ddd_2024',
        title: 'DDD 2024',
        subtitle: 'Digital Design Days conference experience',
        categories: ['web', 'design', 'development', '3d'],
        bgColor: '#261c46',
        textColor: '#ffffff',
        imageUrl: '/projects/ddd_2024/home.webp',
        description: 'The official digital experience for Digital Design Days 2024. We created an immersive conference website that captures the energy and creativity of the design community.',
        year: '2024',
        client: 'DDD Conference',
        services: ['Web Design', 'Event Branding', '3D Graphics', 'Interactive Development'],
    },
    {
        id: 'choo_choo_world',
        title: 'Choo Choo World',
        subtitle: 'An imaginative train adventure game',
        categories: ['concept', 'web', 'game design', '3d'],
        bgColor: '#E8EEF8',
        textColor: '#000000',
        imageUrl: '/projects/choo_choo_world/home.webp',
        description: 'A whimsical browser-based game that takes players on a magical train journey through fantastical landscapes. Combining nostalgic aesthetics with modern web technology.',
        year: '2023',
        client: 'Internal Project',
        services: ['Game Design', 'Web Development', '3D Art', 'Sound Design'],
    },
    {
        id: 'soda_experience',
        title: 'Soda Experience',
        subtitle: 'Bringing beverages to life through AR',
        categories: ['AR', 'development', '3d'],
        bgColor: '#E1E2E4',
        textColor: '#000000',
        imageUrl: '/projects/soda_experience/home.webp',
        description: 'An augmented reality experience that transforms ordinary soda cans into interactive entertainment. Using cutting-edge AR technology, we created engaging brand moments.',
        year: '2023',
        client: 'Beverage Brand',
        services: ['AR Development', '3D Animation', 'Mobile Experience', 'Creative Direction'],
    },
];

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const project = projects.find(p => p.id === slug);

    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero animation
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current.querySelectorAll('.animate-in'),
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.3,
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    if (!project) {
        notFound();
    }

    // Find adjacent projects for navigation
    const currentIndex = projects.findIndex(p => p.id === slug);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    return (
        <SmoothScroll>
            <CustomCursor />
            <Header />

            <main>
                {/* Hero Section */}
                <section
                    ref={heroRef}
                    className="relative min-h-screen flex flex-col justify-end"
                    style={{
                        backgroundColor: project.bgColor,
                        color: project.textColor,
                        paddingTop: 'calc(var(--base-padding-y) * 2 + 60px)',
                        paddingBottom: 'clamp(40px, 6vw, 80px)',
                        paddingLeft: 'var(--base-padding-x)',
                        paddingRight: 'var(--base-padding-x)',
                    }}
                >
                    {/* Categories */}
                    <div
                        className="animate-in mb-4"
                        style={{
                            fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                            fontFamily: 'var(--font-family-ibm-mono)',
                            textTransform: 'lowercase',
                            opacity: 0.7,
                        }}
                    >
                        {project.categories.join(' • ')}
                    </div>

                    {/* Title */}
                    <h1
                        className="animate-in"
                        style={{
                            fontSize: 'clamp(3rem, 12vw, 10rem)',
                            fontWeight: 400,
                            lineHeight: 0.95,
                            letterSpacing: '-0.03em',
                            marginBottom: 'clamp(20px, 3vw, 40px)',
                        }}
                    >
                        {project.title}
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="animate-in"
                        style={{
                            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                            maxWidth: '600px',
                            opacity: 0.8,
                        }}
                    >
                        {project.subtitle}
                    </p>
                </section>

                {/* Hero Image */}
                <section
                    style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 9',
                    }}
                >
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </section>

                {/* Project Details */}
                <section
                    ref={contentRef}
                    style={{
                        padding: 'clamp(60px, 8vw, 120px) var(--base-padding-x)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: 'var(--grid-gap)',
                    }}
                >
                    {/* Meta Info */}
                    <div style={{ gridColumn: 'span 4' }} className="md:col-span-4 col-span-12">
                        <div className="space-y-6">
                            <div>
                                <span
                                    className="block mb-1 uppercase tracking-widest"
                                    style={{
                                        fontSize: '0.75rem',
                                        fontFamily: 'var(--font-family-ibm-mono)',
                                        opacity: 0.5,
                                    }}
                                >
                                    Year
                                </span>
                                <span style={{ fontSize: '1rem' }}>{project.year}</span>
                            </div>

                            <div>
                                <span
                                    className="block mb-1 uppercase tracking-widest"
                                    style={{
                                        fontSize: '0.75rem',
                                        fontFamily: 'var(--font-family-ibm-mono)',
                                        opacity: 0.5,
                                    }}
                                >
                                    Client
                                </span>
                                <span style={{ fontSize: '1rem' }}>{project.client}</span>
                            </div>

                            <div>
                                <span
                                    className="block mb-2 uppercase tracking-widest"
                                    style={{
                                        fontSize: '0.75rem',
                                        fontFamily: 'var(--font-family-ibm-mono)',
                                        opacity: 0.5,
                                    }}
                                >
                                    Services
                                </span>
                                <ul className="space-y-1">
                                    {project.services.map((service, idx) => (
                                        <li key={idx} style={{ fontSize: '1rem' }}>
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div style={{ gridColumn: 'span 8' }} className="md:col-span-8 col-span-12">
                        <p
                            style={{
                                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                                lineHeight: 1.6,
                            }}
                        >
                            {project.description}
                        </p>
                    </div>
                </section>

                {/* Project Navigation */}
                <section
                    style={{
                        padding: 'clamp(40px, 6vw, 80px) var(--base-padding-x)',
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    {prevProject ? (
                        <Link
                            href={`/projects/${prevProject.id}`}
                            className="group flex items-center gap-3 transition-opacity hover:opacity-70"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="transition-transform group-hover:-translate-x-1"
                            >
                                <path
                                    d="M13.657 8H2.343m0 0l4.984-4.984M2.343 8l4.984 4.984"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="text-sm uppercase tracking-wide">Previous</span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    <Link
                        href="/projects"
                        className="text-sm uppercase tracking-wide transition-opacity hover:opacity-70"
                    >
                        All Projects
                    </Link>

                    {nextProject ? (
                        <Link
                            href={`/projects/${nextProject.id}`}
                            className="group flex items-center gap-3 transition-opacity hover:opacity-70"
                        >
                            <span className="text-sm uppercase tracking-wide">Next</span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="transition-transform group-hover:translate-x-1"
                            >
                                <path
                                    d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    ) : (
                        <div />
                    )}
                </section>
            </main>

            <Footer />
        </SmoothScroll>
    );
}
