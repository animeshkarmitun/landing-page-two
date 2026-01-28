'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import FactoryIcon from '@/public/icons/FactoryIcon';
import CornerIcon from '@/public/icons/CornerIcon';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [soundOn, setSoundOn] = useState(false);
    const pathname = usePathname();

    // Refs for GSAP animations
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<HTMLUListElement>(null);
    const menuFooterRef = useRef<HTMLDivElement>(null);

    // GSAP animation for menu open/close
    useEffect(() => {
        if (!menuOverlayRef.current || !menuContentRef.current) return;

        const overlay = menuOverlayRef.current;
        const content = menuContentRef.current;
        const links = menuLinksRef.current?.querySelectorAll('li');
        const footer = menuFooterRef.current;

        if (menuOpen) {
            // Opening animation
            const tl = gsap.timeline();

            // Overlay fade in with blur
            tl.set(overlay, { display: 'flex' })
                .fromTo(
                    overlay,
                    { opacity: 0, backdropFilter: 'blur(0px)' },
                    { opacity: 1, backdropFilter: 'blur(12px)', duration: 0.5, ease: 'power2.out' }
                )
                // Content scale and fade
                .fromTo(
                    content,
                    { scale: 0.95, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
                    '-=0.3'
                );

            // Stagger links
            if (links && links.length > 0) {
                tl.fromTo(
                    links,
                    { y: 60, opacity: 0, rotateX: -15 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.7,
                        stagger: 0.08,
                        ease: 'power3.out',
                    },
                    '-=0.4'
                );
            }

            // Footer fade in
            if (footer) {
                tl.fromTo(
                    footer,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
                    '-=0.3'
                );
            }
        } else {
            // Closing animation
            const tl = gsap.timeline();

            tl.to(content, { scale: 0.98, opacity: 0, duration: 0.3, ease: 'power2.in' })
                .to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2')
                .set(overlay, { display: 'none' });
        }
    }, [menuOpen]);

    const menuItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About us' },
        { href: '/projects', label: 'Projects' },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center justify-between" style={{ padding: 'var(--base-padding-y) var(--base-padding-x)' }}>
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl md:text-2xl font-normal tracking-tight hover:opacity-70 transition-opacity flex-shrink-0"
                    >
                        Renai
                    </Link>

                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Sound Button */}
                        <button
                            onClick={() => setSoundOn(!soundOn)}
                            className="hidden md:flex w-11 h-11 items-center justify-center rounded-full hover:bg-white transition-colors"
                            style={{ backgroundColor: '#e4e6ef' }}
                            aria-label="Toggle sound"
                        >
                            {soundOn ? (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path
                                        d="M2 9 Q 4.5 5, 7 9 T 12 9 T 17 9"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                        className="animate-pulse"
                                    />
                                </svg>
                            ) : (
                                <svg width="18" height="2" viewBox="0 0 18 2" fill="none">
                                    <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            )}
                        </button>

                        {/* Let's Talk Button - Magnetic */}
                        <MagneticButton strength={0.3} radius={80}>
                            <Link href="mailto:hello@lusion.co">
                                <button
                                    className="group relative flex items-center gap-4 h-11 rounded-full transition-all duration-500 text-xs md:text-sm font-medium uppercase overflow-hidden bg-black text-white shadow-md"
                                    style={{ backgroundColor: '#000000', padding: '1em 1.5em 1em 1.625em', boxShadow: '0 6px 10px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.04)' }}
                                >
                                    <span
                                        className="absolute left-4 flex items-center justify-center h-5 w-5 text-white rounded-full -translate-x-12 transition-all duration-400 group-hover:translate-x-0 z-20"
                                        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)' }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="none"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
                                            />
                                        </svg>
                                    </span>

                                    <span
                                        className="relative z-20 transition-all duration-400 group-hover:translate-x-6"
                                        style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
                                    >
                                        LET&apos;S TALK
                                    </span>

                                    <span
                                        className="inline-block relative w-2 h-2 bg-white rounded-full z-10 transition-all duration-400 group-hover:scale-[40] group-hover:bg-[#0016ec]"
                                        style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
                                    ></span>
                                </button>
                            </Link>
                        </MagneticButton>

                        {/* Menu Button - Magnetic */}
                        <MagneticButton strength={0.25} radius={70}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center gap-3 pl-4 pr-4 h-11 hover:bg-white transition-colors rounded-full text-xs md:text-sm font-medium uppercase"
                                style={{ backgroundColor: menuOpen ? '#ffffff' : '#e4e6ef', paddingLeft: '20px', paddingRight: '16px' }}
                            >
                                <span className="transition-all duration-300">
                                    {menuOpen ? 'CLOSE' : 'MENU'}
                                </span>
                                <div className={`flex gap-0.5 transition-transform duration-300 ${menuOpen ? 'rotate-45' : ''}`}>
                                    <span className="w-1 h-1 bg-black rounded-full"></span>
                                    <span className="w-1 h-1 bg-black rounded-full"></span>
                                </div>
                            </button>
                        </MagneticButton>
                    </div>
                </div>
            </header>

            {/* Full-Screen Menu Overlay */}
            <div
                ref={menuOverlayRef}
                className="fixed inset-0 z-40 hidden"
                style={{
                    backgroundColor: 'rgba(232, 230, 245, 0.92)',
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setMenuOpen(false);
                }}
            >
                <div
                    ref={menuContentRef}
                    className="flex flex-col items-center justify-center h-full w-full"
                    style={{ perspective: '1000px' }}
                >
                    {/* Main Navigation Links */}
                    <nav className="text-center">
                        <ul ref={menuLinksRef} className="space-y-2 md:space-y-4">
                            {menuItems.map((item, index) => (
                                <li key={index} style={{ transformStyle: 'preserve-3d' }}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="group inline-flex items-center gap-4 transition-all duration-300 hover:opacity-70"
                                    >
                                        <span
                                            className="font-normal tracking-tight"
                                            style={{
                                                fontSize: 'clamp(3rem, 10vw, 7rem)',
                                                lineHeight: 1.1,
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                        {pathname === item.href && (
                                            <span
                                                className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full"
                                                style={{ marginTop: '0.5em' }}
                                            ></span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer Section */}
                    <div
                        ref={menuFooterRef}
                        className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row items-center justify-between gap-6"
                        style={{
                            padding: 'var(--base-padding-y) var(--base-padding-x)',
                        }}
                    >
                        {/* Newsletter Subscription */}
                        <div className="flex flex-col gap-2">
                            <span
                                className="text-xs uppercase tracking-widest opacity-60"
                                style={{ fontFamily: 'var(--font-family-ibm-mono)' }}
                            >
                                Subscribe to our newsletter
                            </span>
                            <form className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="px-4 py-2 rounded-full bg-white/50 border border-black/10 focus:border-black/30 focus:outline-none text-sm transition-colors"
                                    style={{ minWidth: '200px' }}
                                />
                                <button
                                    type="submit"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-[#0016ec] transition-colors"
                                >
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </div>

                        {/* Labs CTA */}
                        <Link
                            href="https://labs.lusion.co"
                            target="_blank"
                            className="flex items-center justify-between px-6 py-4 bg-black text-white rounded-full transition-colors group hover:bg-[#2b2e3a]"
                            style={{ minWidth: '200px' }}
                        >
                            <div className="flex items-center gap-3">
                                <FactoryIcon />
                                <span className="font-medium text-sm uppercase">Labs</span>
                            </div>
                            <CornerIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}