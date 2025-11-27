import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxHero Component - Redesigned
 * 
 * Elegant hero section with:
 * - Large serif typography
 * - Background image parallax
 * - Soft gradient overlay
 * - Integrated booking widget
 */
const ParallaxHero = ({
    backgroundImage = '/hero-rooftop.jpg',
    title = 'Explore The Hollywood',
    subtitle = 'Where skyline whispers meet curated cocktails.',
    children
}) => {
    const heroRef = useRef(null);
    const bgRef = useRef(null);
    const contentRef = useRef(null);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Initial fade-in animation
        const tl = gsap.timeline({
            onComplete: () => setIsLoaded(true)
        });

        // Set initial state
        gsap.set(contentRef.current, {
            opacity: 0,
            y: 40
        });

        tl.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3
        });

        // Parallax scroll effects
        const ctx = gsap.context(() => {
            // Background parallax - subtle movement
            gsap.to(bgRef.current, {
                yPercent: 25,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                    invalidateOnRefresh: true
                }
            });

            // Content parallax on scroll - movement only, no fade
            gsap.to(contentRef.current, {
                y: -50, // Parallax movement
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
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-screen min-h-[700px] overflow-hidden will-change-transform"
            style={{
                scrollSnapAlign: 'start',
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Background Image Layer */}
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

            {/* Elegant Gradient Overlay */}
            <div
                className="absolute inset-0 will-change-opacity"
                style={{
                    background: 'linear-gradient(to top, rgba(10, 10, 12, 0.7) 0%, rgba(10, 10, 12, 0.3) 50%, rgba(10, 10, 12, 0.5) 100%)'
                }}
            />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-between z-10 pt-32 pb-12">
                {/* Main Content - Centered */}
                <div className="flex-1 flex items-center justify-center w-full">
                    <div
                        ref={contentRef}
                        className="text-center text-white px-4 max-w-5xl will-change-transform"
                    >
                        {/* Main Heading - Large Elegant Serif */}
                        <h1
                            className="hero-title text-luxury-ivory mb-6"
                            style={{
                                fontFamily: 'Playfair Display, serif',
                                fontWeight: 400,
                                fontSize: 'clamp(48px, 8vw, 96px)',
                                lineHeight: 1.15,
                                letterSpacing: '2px',
                                fontStyle: 'italic'
                            }}
                        >
                            {title}
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="text-lg md:text-xl max-w-2xl mx-auto font-light text-luxury-ivory/90 mb-8"
                            style={{
                                lineHeight: '1.8',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {subtitle}
                        </p>
                    </div>
                </div>

                {/* Booking Widget - Bottom */}
                <div className="w-full">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default ParallaxHero;
