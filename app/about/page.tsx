'use client';

import { useEffect, useRef, useState } from 'react';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Counter animation hook
function useCountUp(target: number, duration: number = 2, startOnView: boolean = true) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!startOnView || !ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    let start = 0;
                    const increment = target / (duration * 60);

                    const animate = () => {
                        start += increment;
                        if (start < target) {
                            setCount(Math.floor(start));
                            requestAnimationFrame(animate);
                        } else {
                            setCount(target);
                        }
                    };
                    animate();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration, startOnView]);

    return { count, ref };
}

// Award item component
function AwardItem({ count, label, prefix = '' }: { count: number; label: string; prefix?: string }) {
    const { count: animatedCount, ref } = useCountUp(count);

    return (
        <div ref={ref} className="award-item">
            <span className="award-count">{prefix}{animatedCount.toString().padStart(3, '0')}</span>
            <span className="award-label">{label}</span>
        </div>
    );
}

// Service category component
function ServiceCategory({ title, services }: { title: string; services: string[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="service-category">
            <button
                className="service-category-header"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4>{title}</h4>
                <span className={`service-toggle ${isOpen ? 'open' : ''}`}>+</span>
            </button>
            <div className={`service-list ${isOpen ? 'open' : ''}`}>
                {services.map((service, idx) => (
                    <div key={idx} className="service-item">- {service}</div>
                ))}
            </div>
        </div>
    );
}

export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Intro text animation
        if (introRef.current) {
            gsap.fromTo(
                introRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: introRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const services = {
        Strategy: ['Experience Strategy', 'Technology Strategy', 'Creative Direction', 'Discovery', 'Research'],
        Creative: ['Art Direction', 'UX/UI Design', 'Motion Design', 'Game Design', 'Illustration'],
        Tech: ['WebGL Development', 'Web Development', 'Unity/Unreal', 'Interactive Installations', 'VR/AR'],
        Production: ['Procedural Modeling', '3D Asset Creation', '3D Asset Optimization', 'Animation', '3D Pipeline'],
    };

    const articles = [
        { title: 'Porsche Newsroom - Driven By Dream', url: 'https://newsroom.porsche.com' },
        { title: 'Wallpaper - Driven by Dreams', url: 'https://www.wallpaper.com' },
        { title: 'Opera North - The Turn of the Screw', url: 'https://www.operanorth.co.uk' },
    ];

    const talks = [
        { event: 'Digital Design Days', date: 'Oct 2024', location: 'Milan' },
        { event: 'Awwwards Conf', date: 'Oct 2023', location: 'Amsterdam' },
        { event: 'KIKK Festival', date: 'Oct 2023', location: 'Namur' },
        { event: 'Awwwards Conf', date: 'Oct 2022', location: 'Amsterdam' },
        { event: 'Grow Paris', date: 'Nov 2018', location: 'Paris' },
    ];

    return (
        <SmoothScroll>
            <CustomCursor />
            <Header />

            <div id="page-container">
                <div id="page-container-inner">
                    <div id="about" className="page">

                        {/* Hero Section */}
                        <section ref={heroRef} id="about-hero" className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                            <p
                                ref={introRef}
                                style={{
                                    gridColumn: '1 / -1',
                                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                                    lineHeight: 1.5,
                                    maxWidth: '900px',
                                }}
                            >
                                As a result of our diverse experience, we are able to think creatively and find new solutions to problems, providing clients with memorable, purpose-driven experiences that cut through the noise and connect where it matters, which leaves lasting impressions that form enduring connections between brands and consumers.
                            </p>
                        </section>

                        {/* Awards Section */}
                        <section id="about-awards" className="section">
                            <h3 className="section-label">Awards</h3>
                            <div className="awards-total">
                                <AwardItem count={58} label="" />
                            </div>

                            <div className="awards-grid">
                                <div className="awards-category">
                                    <h4 className="awards-category-title">Awwwards</h4>
                                    <AwardItem count={1} label="Site of the Year" prefix="0" />
                                    <AwardItem count={1} label="Developer Site of the Year" prefix="0" />
                                    <AwardItem count={1} label="Site of the Month" prefix="0" />
                                    <AwardItem count={10} label="Site of the Day" prefix="0" />
                                    <AwardItem count={16} label="Honorable Mention" prefix="0" />
                                </div>

                                <div className="awards-category">
                                    <h4 className="awards-category-title">FWA</h4>
                                    <AwardItem count={1} label="Site of the Year" prefix="0" />
                                    <AwardItem count={2} label="Site of the Month" prefix="0" />
                                    <AwardItem count={17} label="Site of the Day" prefix="0" />
                                </div>

                                <div className="awards-category">
                                    <h4 className="awards-category-title">CSSDA</h4>
                                    <AwardItem count={1} label="Site of the Year" prefix="0" />
                                    <AwardItem count={1} label="Agency Site of the Year" prefix="0" />
                                </div>

                                <div className="awards-category">
                                    <h4 className="awards-category-title">Other</h4>
                                    <AwardItem count={2} label="Webby Winner" prefix="0" />
                                    <AwardItem count={1} label="Lovie Winner" prefix="0" />
                                    <AwardItem count={1} label="Drum Awards for Design" prefix="0" />
                                    <AwardItem count={1} label="CommArts Best-in-show" prefix="0" />
                                </div>
                            </div>
                        </section>

                        {/* Articles Section */}
                        <section id="about-articles" className="section">
                            <h3 className="section-label">Articles</h3>
                            <div className="articles-count">03</div>
                            <div className="articles-list">
                                {articles.map((article, idx) => (
                                    <a
                                        key={idx}
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="article-item"
                                    >
                                        {article.title}
                                    </a>
                                ))}
                            </div>
                        </section>

                        {/* Talks Section */}
                        <section id="about-talks" className="section">
                            <h3 className="section-label">Talks</h3>
                            <div className="talks-count">5</div>
                            <div className="talks-list">
                                {talks.map((talk, idx) => (
                                    <div key={idx} className="talk-item">
                                        <span className="talk-event">{talk.event}</span>
                                        <span className="talk-meta">{talk.date} {talk.location}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Services Section */}
                        <section id="about-services" className="section">
                            <div className="services-grid">
                                {Object.entries(services).map(([category, items]) => (
                                    <ServiceCategory key={category} title={category} services={items} />
                                ))}
                            </div>
                        </section>

                        {/* Footer */}
                        <Footer />

                    </div>
                </div>
            </div>
        </SmoothScroll>
    );
}
