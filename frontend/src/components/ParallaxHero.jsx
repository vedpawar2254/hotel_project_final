import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxHero Component
 * 
 * A luxury parallax hero section with:
 * - Background image parallax (slower scroll)
 * - Foreground content parallax (varied speeds)
 * - Rounded bottom corners on scroll
 * - Cinematic fade-in animations
 * 
 * @param {string} backgroundImage - URL of the hero background image
 * @param {string} logo - URL of the logo image
 * @param {string} title - Main heading text
 * @param {string} subtitle - Subtitle text
 * @param {React.ReactNode} children - Additional content (e.g., navigation links)
 */
const ParallaxHero = ({
    backgroundImage = '/hero-rooftop.jpg',
    logo = '/logo.png',
    title = 'THE HOLLYWOOD',
    subtitle = 'Where skyline whispers meet curated cocktails.',
    children
}) => {
    const heroRef = useRef(null);
    const bgRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const overlayRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Ensure elements are visible before animating
        if (logoRef.current) logoRef.current.style.opacity = '0';
        if (titleRef.current) titleRef.current.style.opacity = '0';
        if (subtitleRef.current) subtitleRef.current.style.opacity = '0';

        // Initial fade-in animation on mount
        const tl = gsap.timeline({
            onComplete: () => setIsLoaded(true)
        });

        tl.from(logoRef.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'all' // Clear inline styles after animation
        })
            .from(titleRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            }, '-=0.6')
            .from(subtitleRef.current, {
                opacity: 0,
                y: 15,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            }, '-=0.5');

        // Parallax scroll effects
        const ctx = gsap.context(() => {
            // Background parallax - moves slower (0.5x speed)
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5, // Smooth scrubbing
                    invalidateOnRefresh: true
                }
            });

            // Logo parallax - moves at 0.3x speed (slowest) - NO FADE
            gsap.to(logoRef.current, {
                yPercent: -15,
                // opacity removed - logo stays fully visible
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5
                }
            });

            // Title parallax - moves at 0.5x speed with gentle fade
            gsap.to(titleRef.current, {
                yPercent: -30,
                opacity: 0.2, // Fade to 20% instead of 0
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5
                }
            });

            // Subtitle parallax - moves at 0.7x speed (faster) with gentle fade
            gsap.to(subtitleRef.current, {
                yPercent: -50,
                opacity: 0.1, // Fade to 10% instead of 0
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });

            // Rounded corners on scroll
            gsap.to(heroRef.current, {
                borderBottomLeftRadius: '80px',
                borderBottomRightRadius: '80px',
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '+=300',
                    scrub: 1.5
                }
            });

            // Overlay fade on scroll
            gsap.to(overlayRef.current, {
                opacity: 0.9,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });

        return () => {
            ctx.revert(); // Cleanup GSAP context
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-screen min-h-[600px] overflow-hidden will-change-transform"
            style={{
                scrollSnapAlign: 'start',
                transformStyle: 'preserve-3d',
                zIndex: 1
            }}
        >
            {/* Background Image Layer - Parallax */}
            <div
                ref={bgRef}
                className="absolute inset-0 w-full h-[120%] will-change-transform"
                style={{
                    top: '-10%',
                    transformStyle: 'preserve-3d'
                }}
            >
                <img
                    src={backgroundImage}
                    alt="Luxury Restaurant Hero"
                    className="w-full h-full object-cover"
                    style={{
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                    }}
                />
            </div>

            {/* Gradient Overlay - Darkens on scroll */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 will-change-opacity"
                style={{ opacity: 0.6 }}
            />

            {/* Foreground Content - Multi-layer Parallax */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center text-white px-4 max-w-4xl">
                    {/* Static subtitle - Above logo */}
                    <p className="text-xs md:text-sm tracking-[0.3em] text-luxury-gold mb-6 uppercase font-medium">
                        CULINARY EXCELLENCE
                    </p>

                    {/* Logo - Slowest parallax */}
                    <div
                        ref={logoRef}
                        className="mb-4 will-change-transform"
                    >
                        <img
                            src={logo}
                            alt={title}
                            className="mx-auto w-48 md:w-64 lg:w-80 drop-shadow-2xl"
                            style={{
                                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.45))',
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden'
                            }}
                            onError={(e) => {
                                console.error('Logo failed to load:', logo);
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>

                    {/* Title - Medium parallax */}
                    <h1
                        ref={titleRef}
                        className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 tracking-[0.15em] will-change-transform"
                        style={{
                            fontWeight: 500,
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden'
                        }}
                    >
                        {title}
                    </h1>

                    {/* Subtitle text - Faster parallax */}
                    <p
                        ref={subtitleRef}
                        className="text-base md:text-lg max-w-2xl mx-auto mb-8 font-light will-change-transform"
                        style={{
                            lineHeight: '1.8',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {subtitle}
                    </p>

                    {/* Additional Content */}
                    {children}
                </div>
            </div>

            {/* Bottom fade for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-ivory via-luxury-ivory/50 to-transparent pointer-events-none z-20" />
        </section>
    );
};

export default ParallaxHero;
