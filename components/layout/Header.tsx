
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FactoryIcon from '@/public/icons/FactoryIcon';
import CornerIcon from '@/public/icons/CornerIcon';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [soundOn, setSoundOn] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 ">
                <div className="flex items-center justify-between" style={{ padding: 'var(--base-padding-y) var(--base-padding-x)' }}>
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl md:text-2xl font-normal tracking-tight hover:opacity-70 transition-opacity flex-shrink-0"
                    >
                        Renai
                    </Link>

                    {/* Headline Text in Center */}
                    {/* <div className="hidden lg:flex flex-1 items-left justify-center px-8">
                        <h1 className="text-lg xl:text-xl font-normal leading-tight text-center max-w-xl">
                            Let's Grow with Renai
                            <br />
                            <span className="text-primary">We create beauty as a vacation</span>
                        </h1>
                    </div> */}

                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Sound Button with Wave Animation */}
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

                        {/* Let's Talk Button - Premium Style with Dot Expansion */}
                        <Link href="mailto:hello@lusion.co">
                            <button
                                className="group relative flex items-center gap-4 h-11 rounded-full transition-all duration-500 text-xs md:text-sm font-medium uppercase overflow-hidden bg-black text-white shadow-md"
                                style={{ backgroundColor: '#000000', padding: '1em 1.5em 1em 1.625em', boxShadow: '0 6px 10px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.04)' }}
                            >
                                {/* Arrow - slides in from left on hover */}
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
                                        className="transition-colors duration-500"
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

                                {/* Text - slides right on hover */}
                                <span
                                    className="relative z-20 transition-all duration-400 group-hover:translate-x-6"
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
                                >
                                    LET&apos;S TALK
                                </span>

                                {/* Animated Dot - expands on hover (right side) */}
                                <span
                                    className="inline-block relative w-2 h-2 bg-white rounded-full z-10 transition-all duration-400 group-hover:scale-[40] group-hover:bg-[#0016ec]"
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
                                ></span>
                            </button>
                        </Link>

                        {/* Menu Button - Light Background */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center gap-3 pl-4 pr-4 h-11 hover:bg-white transition-colors rounded-full text-xs md:text-sm font-medium uppercase"
                            style={{ backgroundColor: '#e4e6ef', paddingLeft: '20px', paddingRight: '16px' }}
                        >
                            <span className="transition-all duration-300">
                                {menuOpen ? 'CLOSE' : 'MENU'}
                            </span>
                            <div className={`flex gap-0.5 transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
                                <span className="w-1 h-1 bg-black rounded-full"></span>
                                <span className="w-1 h-1 bg-black rounded-full"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Dropdown - Compact Card Style */}
            <div
                className={`fixed top-0 right-0 z-40 transform transition-all duration-300 ease-in-out ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
                    }`}
                style={{
                    marginTop: 'calc(var(--base-padding-y) + 60px)',
                    marginRight: 'var(--base-padding-x)',
                }}
            >
                {/* Navigation Card */}
                <div
                    className="bg-white rounded-xl shadow-2xl overflow-hidden mb-4"
                    style={{
                        width: '300px',
                        borderRadius: '12px',
                    }}
                >
                    {/* Navigation Links */}
                    <nav className="px-8 pt-8 pb-8">
                        <ul className="space-y-3">
                            <li className="group">
                                <Link
                                    href="/"
                                    className="flex items-center justify-between py-3 px-8 -mx-6 text-lg font-normal rounded-full transition-all group-hover:bg-[#e8e6f5]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span>HOME</span>
                                    {pathname === '/' ? (
                                        <span className="w-2 h-2 bg-black rounded-full"></span>
                                    ) : (
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path
                                                d="M7 4L13 10L7 16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                            <li className="group">
                                <Link
                                    href="/about"
                                    className="flex items-center justify-between py-3 px-8 -mx-6 text-lg font-normal rounded-full transition-all group-hover:bg-[#e8e6f5]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span>ABOUT US</span>
                                    {pathname === '/about' ? (
                                        <span className="w-2 h-2 bg-black rounded-full"></span>
                                    ) : (
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path
                                                d="M7 4L13 10L7 16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                            <li className="group">
                                <Link
                                    href="/projects"
                                    className="flex items-center justify-between py-3 px-8 -mx-6 text-lg font-normal rounded-full transition-all group-hover:bg-[#e8e6f5]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span>PROJECTS</span>
                                    {pathname === '/projects' ? (
                                        <span className="w-2 h-2 bg-black rounded-full"></span>
                                    ) : (
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path
                                                d="M7 4L13 10L7 16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                            <li className="group">
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-between py-3 px-8 -mx-6 text-lg font-normal rounded-full transition-all group-hover:bg-[#e8e6f5]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span>CONTACT</span>
                                    {pathname === '/contact' ? (
                                        <span className="w-2 h-2 bg-black rounded-full"></span>
                                    ) : (
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path
                                                d="M7 4L13 10L7 16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Labs Button - Separate Element */}
                <Link
                    href="https://labs.lusion.co"
                    target="_blank"
                    className="flex items-center justify-between px-6 py-4 bg-black text-white rounded-xl transition-colors group shadow-2xl"
                    style={{
                        backgroundColor: '#000',
                        width: '300px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2b2e3a'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000'}
                >
                    <div className="flex items-center gap-3">
                        <FactoryIcon />
                        <span className="font-medium text-xl text-white">FACTORY</span>
                    </div>
                    <CornerIcon />
                </Link>
            </div>

            {/* Backdrop - subtle overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/10 z-30 backdrop-blur-sm"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </>
    );
}