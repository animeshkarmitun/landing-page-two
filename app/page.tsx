// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import SmoothScroll from '@/components/layout/SmoothScroll';
// import CustomCursor from '@/components/ui/CustomCursor';
// import Image from 'next/image';

// export default function Home() {
// const [currentImageIndex, setCurrentImageIndex] = useState(0);
// const images = ['/images/renai1.jpeg', '/images/renai2.jpeg', '/images/renai3.jpeg'];
// const [menuOpen, setMenuOpen] = useState(false);
// const [soundOn, setSoundOn] = useState(false);

// // Animation states
// const [headlineText, setHeadlineText] = useState('');
// const [subtitleText, setSubtitleText] = useState('');
// const [scrollText, setScrollText] = useState('');
// const [crossCount, setCrossCount] = useState(0);
// const [showButtons, setShowButtons] = useState(false);

// const fullHeadline = "Let's Grow with Renai";
// const fullSubtitle = "We create beauty as a vacation";
// const scrollWords = ['scroll', 'to', 'explore'];

// useEffect(() => {
//     // Headline animation - character by character
//     let headlineIndex = 0;
//     const headlineInterval = setInterval(() => {
//         if (headlineIndex <= fullHeadline.length) {
//             setHeadlineText(fullHeadline.slice(0, headlineIndex));
//             headlineIndex++;
//         } else {
//             clearInterval(headlineInterval);
//             // Start subtitle after headline
//             startSubtitleAnimation();
//         }
//     }, 50); // 50ms per character

//     return () => clearInterval(headlineInterval);
// }, []);

// const startSubtitleAnimation = () => {
//     let subtitleIndex = 0;
//     const subtitleInterval = setInterval(() => {
//         if (subtitleIndex <= fullSubtitle.length) {
//             setSubtitleText(fullSubtitle.slice(0, subtitleIndex));
//             subtitleIndex++;
//         } else {
//             clearInterval(subtitleInterval);
//             // Start scroll text after subtitle
//             startScrollAnimation();
//         }
//     }, 40);
// };

// const startScrollAnimation = () => {
//     let wordIndex = 0;
//     const scrollInterval = setInterval(() => {
//         if (wordIndex < scrollWords.length) {
//             setScrollText(prev => prev + (prev ? ' ' : '') + scrollWords[wordIndex]);
//             wordIndex++;
//         } else {
//             clearInterval(scrollInterval);
//             // Start cross marks
//             startCrossAnimation();
//         }
//     }, 200); // 200ms per word
// };

// const startCrossAnimation = () => {
//     let count = 0;
//     const crossInterval = setInterval(() => {
//         if (count < 4) {
//             setCrossCount(count + 1);
//             count++;
//         } else {
//             clearInterval(crossInterval);
//             // Show buttons last
//             setShowButtons(true);
//         }
//     }, 150); // 150ms per cross
// };

// const handleImageClick = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
// };

//     return (
//         <SmoothScroll>
//             <CustomCursor />

//             {/* Header - Integrated */}
//             <header className="fixed top-0 left-0 right-0 z-50">
//                 <div className="flex items-center justify-between px-12 py-4 md:py-6">
//                     {/* Logo */}
//                     <Link
//                         href="/"
//                         className="text-xl md:text-2xl font-normal tracking-tight hover:opacity-70 transition-opacity flex-shrink-0"
//                     >
//                         Renai
//                     </Link>

//                     {/* Right Side Buttons */}
//                     <div className={`flex items-center gap-3 transition-opacity duration-500 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
//                         {/* Sound Button */}
//                         <button
//                             onClick={() => setSoundOn(!soundOn)}
//                             className="hidden md:flex w-11 h-11 items-center justify-center rounded-full hover:bg-white transition-colors"
//                             style={{ backgroundColor: '#e4e6ef' }}
//                             aria-label="Toggle sound"
//                         >
//                             {soundOn ? (
//                                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                                     <path
//                                         d="M2 9 Q 4.5 5, 7 9 T 12 9 T 17 9"
//                                         stroke="currentColor"
//                                         strokeWidth="1.5"
//                                         fill="none"
//                                         className="animate-pulse"
//                                     />
//                                 </svg>
//                             ) : (
//                                 <svg width="18" height="2" viewBox="0 0 18 2" fill="none">
//                                     <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5" />
//                                 </svg>
//                             )}
//                         </button>

//                         {/* Let's Talk Button */}
//                         <Link href="mailto:hello@renai.co">
//                             <button
//                                 className="group relative flex items-center justify-center gap-2 h-11 text-white rounded-full transition-all duration-300 text-xs md:text-sm font-medium uppercase overflow-hidden"
//                                 style={{ backgroundColor: '#2b2e3a', paddingLeft: '20px', paddingRight: '20px', minWidth: '140px' }}
//                                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0016ec'}
//                                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2b2e3a'}
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     width="16"
//                                     height="16"
//                                     fill="none"
//                                     viewBox="0 0 16 16"
//                                     className="absolute left-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
//                                 >
//                                     <path
//                                         stroke="currentColor"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
//                                     />
//                                 </svg>
//                                 <span className="relative transition-all duration-300 group-hover:translate-x-2">
//                                     LET&apos;S TALK
//                                 </span>
//                                 <span className="w-1.5 h-1.5 bg-white rounded-full absolute right-5 group-hover:scale-0 group-hover:opacity-0 transition-all duration-300"></span>
//                             </button>
//                         </Link>

//                         {/* Menu Button */}
//                         <button
//                             onClick={() => setMenuOpen(!menuOpen)}
//                             className="flex items-center gap-3 pl-4 pr-4 h-11 hover:bg-white transition-colors rounded-full text-xs md:text-sm font-medium uppercase"
//                             style={{ backgroundColor: '#e4e6ef', paddingLeft: '20px', paddingRight: '16px' }}
//                         >
//                             <span className="transition-all duration-300">
//                                 {menuOpen ? 'CLOSE' : 'MENU'}
//                             </span>
//                             <div className={`flex gap-0.5 transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
//                                 <span className="w-1 h-1 bg-black rounded-full"></span>
//                                 <span className="w-1 h-1 bg-black rounded-full"></span>
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//             </header>

//             {/* Menu Dropdown */}
//             <div
//                 className={`fixed top-0 right-0 w-full md:w-96 h-screen bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
//             >
//                 <div className="flex flex-col h-full pt-32 px-8 pb-8">
//                     <nav className="flex-1">
//                         <ul className="space-y-6">
//                             <li className="group">
//                                 <Link
//                                     href="/"
//                                     className="flex items-center justify-between text-2xl font-normal hover:opacity-70 transition-opacity"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     <span>HOME</span>
//                                     <span className="w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                 </Link>
//                             </li>
//                             <li className="group">
//                                 <Link
//                                     href="/work"
//                                     className="flex items-center justify-between text-2xl font-normal hover:opacity-70 transition-opacity"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     <span>WORK</span>
//                                     <span className="w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                 </Link>
//                             </li>
//                             <li className="group">
//                                 <Link
//                                     href="/about"
//                                     className="flex items-center justify-between text-2xl font-normal hover:opacity-70 transition-opacity"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     <span>ABOUT</span>
//                                     <span className="w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                 </Link>
//                             </li>
//                             <li className="group">
//                                 <Link
//                                     href="/contact"
//                                     className="flex items-center justify-between text-2xl font-normal hover:opacity-70 transition-opacity"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     <span>CONTACT</span>
//                                     <span className="w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                                 </Link>
//                             </li>
//                         </ul>
//                     </nav>

//                     <div className="border-t border-gray-200 pt-8 mb-8">
//                         <h3 className="text-xl mb-4">Subscribe to our newsletter</h3>
//                         <form className="flex gap-2">
//                             <input
//                                 type="email"
//                                 placeholder="Your email"
//                                 className="flex-1 px-4 py-3 rounded-full bg-gray-100 border border-gray-200 focus:outline-none text-sm"
//                                 style={{ borderColor: '#e5e7eb' }}
//                                 onFocus={(e) => e.currentTarget.style.borderColor = '#0016ec'}
//                                 onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
//                             />
//                             <button
//                                 type="submit"
//                                 className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
//                                 style={{ backgroundColor: '#0016ec' }}
//                                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2b2e3a'}
//                                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0016ec'}
//                             >
//                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                                     <path
//                                         d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
//                                         stroke="white"
//                                         strokeWidth="2"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                     />
//                                 </svg>
//                             </button>
//                         </form>
//                     </div>

//                     <Link
//                         href="https://labs.renai.co"
//                         target="_blank"
//                         className="flex items-center justify-between px-6 py-4 bg-black text-white rounded-full transition-colors group"
//                         style={{ backgroundColor: '#000' }}
//                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2b2e3a'}
//                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000'}
//                     >
//                         <div className="flex items-center gap-3">
//                             <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
//                                 <circle cx="12" cy="12" r="10" />
//                             </svg>
//                             <span className="text-sm font-medium">RENAI LABS</span>
//                         </div>
//                         <svg
//                             width="16"
//                             height="16"
//                             viewBox="0 0 16 16"
//                             fill="none"
//                             className="transition-transform duration-300 group-hover:translate-x-1"
//                         >
//                             <path
//                                 d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
//                                 stroke="white"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             />
//                         </svg>
//                     </Link>
//                 </div>
//             </div>

//             <div id="page-container">
//                 <div id="page-container-inner">
//                     <div id="home" className="page">

//                         {/* Hero Section */}
// <section id="home-hero" className="section">
//     <h1 id="home-hero-title">
//         {headlineText}
//         {headlineText.length === fullHeadline.length && (
//             <>
//                 <br />
//                 <span style={{ fontSize: '0.5em', opacity: 0.8 }}>{subtitleText}</span>
//             </>
//         )}
//     </h1>
//     <div
//         id="home-hero-visual-container"
//         style={{ position: 'relative', cursor: 'pointer', borderRadius: '24px', overflow: 'hidden' }}
//         onClick={handleImageClick}
//     >
//         <Image
//             src={images[currentImageIndex]}
//             alt={`Renai showcase ${currentImageIndex + 1}`}
//             fill
//             style={{ objectFit: 'cover' }}
//             priority
//         />
//     </div>
//     <div id="home-hero-scroll-container">
//         <div id="home-hero-scroll-container-crosses">
//             {[...Array(4)].map((_, i) => (
//                 <div
//                     key={i}
//                     className="home-hero-scroll-container-cross"
//                     style={{
//                         opacity: i < crossCount ? 1 : 0,
//                         transition: 'opacity 0.3s ease'
//                     }}
//                 ></div>
//             ))}
//         </div>
//         <div id="home-hero-scroll">{scrollText}</div>
//     </div>
// </section>

//                         {/* Reel Section */}
//                         <section id="home-reel" className="section">
//                             <h4 id="home-reel-title">
//                                 <div id="home-reel-title-inner">
//                                     <div id="home-reel-title-line-1">Beyond Visions</div>
//                                     <div id="home-reel-title-line-2">Into Reality</div>
//                                 </div>
//                             </h4>
//                             <div id="home-reel-video-container">
//                                 <video
//                                     id="home-reel-video"
//                                     autoPlay
//                                     loop
//                                     muted
//                                     playsInline
//                                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                                 >
//                                     <source src="/videos/reel.mp4" type="video/mp4" />
//                                 </video>
//                             </div>
//                         </section>

//                         {/* Featured Work Section */}
//                         <section id="home-featured-work" className="section">
//                             <div id="home-featured-work-header">
//                                 <h3 id="home-featured-work-title">Featured Work</h3>
//                                 <a href="/work" id="home-featured-work-link">
//                                     View All Work
//                                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                                         <path
//                                             d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
//                                             stroke="currentColor"
//                                             strokeWidth="2"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                         />
//                                     </svg>
//                                 </a>
//                             </div>
//                             <div id="home-featured-work-list">
//                                 {/* Featured work items would go here */}
//                             </div>
//                         </section>

//                     </div>
//                 </div>
//             </div>
//         </SmoothScroll>
//     );
// }

'use client';

import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Dynamic import for WebGL scene to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/webgl/HeroScene'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e]" />
});

export default function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = ['/images/renai1.jpeg', '/images/renai2.jpeg', '/images/renai3.jpeg'];
    const [menuOpen, setMenuOpen] = useState(false);
    const [soundOn, setSoundOn] = useState(false);

    // Animation states
    const [headlineText, setHeadlineText] = useState('');
    const [subtitleText, setSubtitleText] = useState('');
    const [scrollText, setScrollText] = useState('');
    const [crossCount, setCrossCount] = useState(0);
    const [showButtons, setShowButtons] = useState(false);

    const fullHeadline = "Let's Grow with Renai";
    const fullSubtitle = "We create beauty as a vacation";
    const scrollWords = ['scroll', 'to', 'explore'];

    // Refs for GSAP animation
    const image1Ref = useRef<HTMLDivElement>(null);
    const image2Ref = useRef<HTMLDivElement>(null);
    const image3Ref = useRef<HTMLDivElement>(null);

    // Refs for reel section scroll animations
    const reelSectionRef = useRef<HTMLElement>(null);
    const reelLine1Ref = useRef<HTMLDivElement>(null);
    const reelLine2Ref = useRef<HTMLDivElement>(null);

    // GSAP stacking animation on mount
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        // Animate all 3 images from below to stacked center
        tl.from(image1Ref.current, {
            y: 600,
            rotation: -25,
            scale: 0.8,
            opacity: 0,
            duration: 1.8,
            ease: 'power3.out',
        })
            .from(image2Ref.current, {
                y: 650,
                rotation: 0,
                scale: 0.9,
                opacity: 0,
                duration: 1.8,
                ease: 'power3.out',
            }, '-=1.5') // Overlap with previous animation
            .from(image3Ref.current, {
                y: 700,
                rotation: 25,
                scale: 0.8,
                opacity: 0,
                duration: 1.8,
                ease: 'power3.out',
            }, '-=1.5'); // Overlap with previous animation

        return () => {
            tl.kill();
        };
    }, []);

    // Reel section scroll animations
    useEffect(() => {
        // Register ScrollTrigger plugin
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        if (!reelSectionRef.current || !reelLine1Ref.current || !reelLine2Ref.current) return;

        // Entry animation - text slides up from below when section enters viewport
        gsap.fromTo(
            [reelLine1Ref.current, reelLine2Ref.current],
            {
                y: 100,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: reelSectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Scroll progress animation - text moves right as user scrolls
        gsap.to(reelLine1Ref.current, {
            x: 200,
            scrollTrigger: {
                trigger: reelSectionRef.current,
                start: 'top 50%',
                end: 'bottom 20%',
                scrub: 1,
            },
        });

        // Line 2 stays on the left - no scroll animation


        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useEffect(() => {
        // Headline animation - character by character
        let headlineIndex = 0;
        const headlineInterval = setInterval(() => {
            if (headlineIndex <= fullHeadline.length) {
                setHeadlineText(fullHeadline.slice(0, headlineIndex));
                headlineIndex++;
            } else {
                clearInterval(headlineInterval);
                // Start subtitle after headline
                startSubtitleAnimation();
            }
        }, 50); // 50ms per character

        return () => clearInterval(headlineInterval);
    }, []);

    const startSubtitleAnimation = () => {
        let subtitleIndex = 0;
        const subtitleInterval = setInterval(() => {
            if (subtitleIndex <= fullSubtitle.length) {
                setSubtitleText(fullSubtitle.slice(0, subtitleIndex));
                subtitleIndex++;
            } else {
                clearInterval(subtitleInterval);
                // Start scroll text after subtitle
                startScrollAnimation();
            }
        }, 40);
    };

    const startScrollAnimation = () => {
        let wordIndex = 0;
        const scrollInterval = setInterval(() => {
            if (wordIndex < scrollWords.length) {
                setScrollText(prev => prev + (prev ? ' ' : '') + scrollWords[wordIndex]);
                wordIndex++;
            } else {
                clearInterval(scrollInterval);
                // Start cross marks
                startCrossAnimation();
            }
        }, 200); // 200ms per word
    };

    const startCrossAnimation = () => {
        let count = 0;
        const crossInterval = setInterval(() => {
            if (count < 4) {
                setCrossCount(count + 1);
                count++;
            } else {
                clearInterval(crossInterval);
                // Show buttons last
                setShowButtons(true);
            }
        }, 150); // 150ms per cross
    };

    const handleImageClick = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <SmoothScroll>
            <CustomCursor />
            <Header />

            <div id="page-container">
                <div id="page-container-inner">
                    <div id="home" className="page">

                        {/* Hero Section */}
                        <section id="home-hero" className="section">
                            <h1 id="home-hero-title">
                                {headlineText}
                                {headlineText.length === fullHeadline.length && (
                                    <>
                                        <br />
                                        <span style={{ fontSize: '0.5em', opacity: 0.8 }}>{subtitleText}</span>
                                    </>
                                )}
                            </h1>
                            <div
                                id="home-hero-visual-container"
                                style={{ position: 'relative', cursor: 'pointer', borderRadius: '24px', height: '600px', overflow: 'hidden' }}
                                onClick={handleImageClick}
                            >
                                {/* WebGL Background */}
                                <HeroScene />

                                {/* Image 1 - Bottom layer */}
                                <div
                                    ref={image1Ref}
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        zIndex: 1,
                                        transform: 'translateY(15px)',
                                    }}
                                >
                                    <Image
                                        src={images[(currentImageIndex + 0) % images.length]}
                                        alt="Renai showcase 1"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        priority
                                    />
                                </div>

                                {/* Image 2 - Middle layer */}
                                <div
                                    ref={image2Ref}
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        zIndex: 2,
                                        transform: 'translateY(8px)',
                                    }}
                                >
                                    <Image
                                        src={images[(currentImageIndex + 1) % images.length]}
                                        alt="Renai showcase 2"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        priority
                                    />
                                </div>

                                {/* Image 3 - Top layer */}
                                <div
                                    ref={image3Ref}
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        zIndex: 3,
                                        transform: 'translateY(0px)',
                                    }}
                                >
                                    <Image
                                        src={images[(currentImageIndex + 2) % images.length]}
                                        alt="Renai showcase 3"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        priority
                                    />
                                </div>
                            </div>
                            <div id="home-hero-scroll-container">
                                <div id="home-hero-scroll-container-crosses">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="home-hero-scroll-container-cross"
                                            style={{
                                                opacity: i < crossCount ? 1 : 0,
                                                transition: 'opacity 0.3s ease'
                                            }}
                                        ></div>
                                    ))}
                                </div>
                                <div id="home-hero-scroll">{scrollText}</div>
                            </div>
                        </section>

                        {/* Reel Section */}
                        <section id="home-reel" className="section" ref={reelSectionRef}>
                            <h4 id="home-reel-title">
                                <div id="home-reel-title-inner">
                                    <div id="home-reel-title-line-1" ref={reelLine1Ref} style={{ whiteSpace: 'nowrap', overflow: 'visible', paddingLeft: 0 }}>Beyond Visions</div>
                                    <div id="home-reel-title-line-2" ref={reelLine2Ref}>Within Reach</div>
                                </div>
                            </h4>

                            {/* Animated Curved Lines - REMOVED */}

                            <div id="home-reel-content" style={{ overflow: 'visible' }}>
                                <h2 id="home-reel-desc">
                                    Welcome to Renai Holdings. Renai is a family run business that has been operating in the garments industry for over 30 years. With sustainability at its core, Renai is on a mission to accelerate the sustainable revolution.
                                </h2>
                                <a id="home-reel-cta" href="/about" target="_blank" style={{ opacity: 1, display: 'flex', position: 'relative' }}>
                                    <span id="home-reel-cta-dot"></span>
                                    <span id="home-reel-cta-text">About us</span>
                                    <span id="home-reel-cta-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"></path>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                            <div id="home-reel-thumb-wrapper" style={{ height: 'auto', top: '0', marginBottom: '2rem' }}>
                                <div id="home-reel-thumb" style={{ height: 'auto', paddingTop: '56.25%', position: 'relative' }}>
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                            zIndex: 10
                                        }}
                                        src="/videos/Ideas.mp4"
                                    >
                                        <source src="/videos/Ideas.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                            <div id="home-reel-container">
                                <div id="home-reel-container-inner">
                                    <div id="home-reel-video-container">
                                        <div id="home-reel-video-container-decoration">
                                            <div id="home-reel-video-container-top">
                                                <div id="home-reel-video-container-crosses">
                                                    <div className="home-reel-video-container-cross"></div>
                                                    <div className="home-reel-video-container-cross"></div>
                                                    <div className="home-reel-video-container-cross"></div>
                                                    <div className="home-reel-video-container-cross"></div>
                                                    <div className="home-reel-video-container-cross"></div>
                                                </div>
                                            </div>
                                            <div id="home-reel-video-container-bottom">
                                                <div id="home-reel-video-container-crosses">
                                                    <div className="home-reel-video-container-cross"></div>
                                                    <div className="home-reel-video-container-cross"></div>
                                                    <div className="home-reel-video-container-cross"></div>
                                                    <div className="home-reel-video-container-cross"></div>
                                                    <div className="home-reel-video-container-cross"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="home-reel-video-placeholder">
                                            <div id="home-reel-video-title">Play Reel</div>
                                        </div>
                                        <button id="home-reel-video-watch-btn" aria-label="Watch reel button">
                                            <div id="home-reel-video-watch-btn-base"></div>
                                            <div id="home-reel-video-watch-btn-background"></div>
                                            <svg id="home-reel-video-watch-btn-svg" xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                                fill="none" viewBox="0 0 36 36">
                                                <path fill="currentColor"
                                                    d="M7 7.29c0-1.5 1.59-2.466 2.92-1.776l20.656 10.71c1.439.747 1.439 2.805 0 3.552L9.92 30.486C8.589 31.176 7 30.21 7 28.71V7.29Z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Featured Work Section */}
                        <section id="home-featured" className="section">
                            <div id="home-featured-title-top">
                                <div id="home-featured-title-wrapper">
                                    <h4 id="home-featured-title">Featured Work</h4>
                                </div>
                                <div id="home-featured-disclaimer">
                                    a Selection of our most passionately crafted works with
                                    forward-thinking clients and friends over the years.
                                </div>
                            </div>
                            <div className="project-list">
                                <a className="project-item project-type-website" href="/projects/devin_ai" data-id="devin_ai"
                                    data-color-bg="#121414" data-color-text="#ffffff" data-color-shadow="0.9">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">
                                            web • design • development • 3d
                                        </div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">Devin AI</div>
                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" href="/projects/porsche_dream_machine"
                                    data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000"
                                    data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">
                                            concept • 3D illustration • mograph • video
                                        </div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                Porsche: Dream Machine
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" href="/projects/synthetic_human"
                                    data-id="synthetic_human" data-color-bg="#9d8aff" data-color-text="#ffffff" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">
                                            web • design • development • 3d
                                        </div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                Synthetic Human
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" href="/projects/spatial_fusion" data-id="spatial_fusion"
                                    data-color-bg="#D6C8ED" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">
                                            web • design • development • 3d
                                        </div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                Meta: Spatial Fusion
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" href="/projects/spaace" data-id="spaace"
                                    data-color-bg="#010a16" data-color-text="#ffece2" data-color-shadow="0.85">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">
                                            web • design • development • 3d • web3
                                        </div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                Spaace - NFT Marketplace
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" href="/projects/ddd_2024" data-id="ddd_2024"
                                    data-color-bg="#261c46" data-color-text="#ffffff" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">
                                            web • design • development • 3d
                                        </div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">DDD 2024</div>
                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" href="/projects/choo_choo_world"
                                    data-id="choo_choo_world" data-color-bg="#E8EEF8" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">
                                            concept • web • game design • 3d
                                        </div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                Choo Choo World
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" href="/projects/soda_experience"
                                    data-id="soda_experience" data-color-bg="#E1E2E4" data-color-text="#000000" data-color-shadow="0.85">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">AR • development • 3d</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                Soda Experience
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <a id="home-featured-cta" href="/projects" target="_blank">
                                <span id="home-featured-cta-dot"></span>
                                <span id="home-featured-cta-text">See all projects</span>
                                <span id="home-featured-cta-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"></path>
                                    </svg>
                                </span>
                            </a>
                        </section>

                        {/* Footer */}
                        <Footer />

                    </div>
                </div>
            </div>
        </SmoothScroll>
    );
}