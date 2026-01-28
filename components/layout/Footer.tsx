'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isHoveredNewsletter, setIsHoveredNewsletter] = useState(false);
    const footerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        if (!footerRef.current || !titleRef.current) return;

        // Title reveal animation
        gsap.fromTo(
            titleRef.current,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Links stagger animation
        if (linksRef.current) {
            const links = linksRef.current.querySelectorAll('a');
            gsap.fromTo(
                links,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <footer
            ref={footerRef}
            id="footer"
            className="section relative"
            style={{
                backgroundColor: 'var(--color-off-white)',
                paddingTop: 'clamp(60px, 8vw, 120px)',
                paddingBottom: 'var(--base-padding-y)',
            }}
        >
            {/* Main Footer Content */}
            <div
                style={{
                    gridColumn: '1 / -1',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                    columnGap: 'var(--grid-gap)',
                    rowGap: 'clamp(40px, 6vw, 80px)',
                }}
            >
                {/* Newsletter Section */}
                <div style={{ gridColumn: 'span 6' }} className="md:col-span-6 col-span-full">
                    <h4
                        style={{
                            fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                            fontFamily: 'var(--font-family-ibm-mono)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '1rem',
                            opacity: 0.7,
                        }}
                    >
                        Subscribe to our newsletter
                    </h4>
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            className="flex-1 px-5 py-3 rounded-full border transition-all duration-300"
                            style={{
                                backgroundColor: 'transparent',
                                borderColor: isHoveredNewsletter ? 'var(--color-blue)' : 'var(--color-grey-blue)',
                                outline: 'none',
                                fontSize: '0.875rem',
                            }}
                            onFocus={() => setIsHoveredNewsletter(true)}
                            onBlur={() => setIsHoveredNewsletter(false)}
                        />
                        <button
                            type="submit"
                            className="group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
                            style={{
                                backgroundColor: 'var(--color-black)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-blue)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-black)')}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                            >
                                <path
                                    d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </form>
                </div>

                {/* Labs CTA */}
                <div style={{ gridColumn: 'span 6' }} className="md:col-span-6 col-span-full flex items-end justify-end">
                    <Link
                        href="https://labs.renai.co"
                        target="_blank"
                        className="group flex items-center justify-between px-6 py-4 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor: 'var(--color-black)',
                            color: 'white',
                            width: 'auto',
                            minWidth: '200px',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-grey-blue)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-black)')}
                    >
                        <div className="flex items-center gap-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="8" />
                            </svg>
                            <span className="font-medium text-sm uppercase tracking-wide">Labs</span>
                        </div>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="transition-transform duration-300 group-hover:translate-x-1"
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
                </div>

                {/* Big Title */}
                <div style={{ gridColumn: '1 / -1', marginTop: 'clamp(20px, 4vw, 60px)' }}>
                    <h2
                        ref={titleRef}
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 8rem)',
                            fontWeight: 400,
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Let&apos;s grow together
                    </h2>
                </div>

                {/* Bottom Links Row */}
                <div
                    ref={linksRef}
                    style={{
                        gridColumn: '1 / -1',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        gap: 'clamp(20px, 3vw, 40px)',
                        paddingTop: 'clamp(30px, 4vw, 60px)',
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                    }}
                >
                    {/* Address */}
                    <a
                        href="https://goo.gl/maps/x9evc1NxZocjrM947"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition-opacity hover:opacity-70"
                        style={{
                            fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                            lineHeight: 1.6,
                        }}
                    >
                        Suite 29 Marsh Street
                        <br />
                        Bristol, BS1 4AA
                        <br />
                        United Kingdom
                    </a>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        <a
                            href="https://twitter.com/lusionltd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-opacity hover:opacity-70"
                            style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
                        >
                            Twitter / X
                        </a>
                        <a
                            href="https://www.instagram.com/lusionltd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-opacity hover:opacity-70"
                            style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.linkedin.com/company/lusionltd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-opacity hover:opacity-70"
                            style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
                        >
                            LinkedIn
                        </a>
                    </div>

                    {/* Contact Emails */}
                    <div className="flex flex-col gap-2">
                        <a
                            href="mailto:hello@renai.co"
                            className="transition-opacity hover:opacity-70"
                            style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
                        >
                            hello@renai.co
                        </a>
                        <a
                            href="mailto:business@renai.co"
                            className="transition-opacity hover:opacity-70"
                            style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
                        >
                            business@renai.co
                        </a>
                    </div>

                    {/* Labs Link */}
                    <a
                        href="https://labs.renai.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-70"
                        style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
                    >
                        R&D: labs.renai.co
                    </a>
                </div>

                {/* Copyright */}
                <div
                    style={{
                        gridColumn: '1 / -1',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: 'clamp(20px, 2vw, 40px)',
                        fontSize: 'clamp(0.625rem, 0.8vw, 0.75rem)',
                        opacity: 0.5,
                    }}
                >
                    <span>© {new Date().getFullYear()} Renai. All rights reserved.</span>
                    <span>Designed with ♥ in Bristol</span>
                </div>
            </div>
        </footer>
    );
}
