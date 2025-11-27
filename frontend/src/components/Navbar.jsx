import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
                ? 'bg-[#0A0A0C]/95 backdrop-blur-xl shadow-lg py-4'
                : 'bg-gradient-to-b from-black/90 to-transparent py-8'
                }`}
            style={{
                borderBottom: isScrolled ? '1px solid rgba(200, 169, 98, 0.1)' : 'none'
            }}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Top Row - Utilities & Brand */}
                <div className="flex items-center justify-between mb-6 relative">
                    {/* Left Side - Menu & Language */}
                    <div className="flex items-center gap-8">
                        <button
                            className="text-luxury-ivory/80 hover:text-luxury-gold transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-medium"
                            aria-label="Menu"
                        >
                            Menu
                        </button>
                        <div className="hidden md:flex items-center gap-2 text-luxury-ivory/60 text-[10px] tracking-widest font-medium">
                            <span className="text-luxury-gold">EN</span>
                            <span>/</span>
                            <span className="hover:text-luxury-gold transition-colors cursor-pointer">FR</span>
                        </div>
                    </div>

                    {/* Center - Brand Name */}
                    <Link
                        to="/"
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="The Hollywood"
                                className="h-12 w-auto"
                                style={{
                                    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
                                }}
                            />
                            <span
                                className="text-luxury-ivory font-serif text-2xl tracking-wide hidden sm:block"
                                style={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontWeight: 400,
                                    fontStyle: 'italic',
                                    letterSpacing: '1px'
                                }}
                            >
                                The Hollywood
                            </span>
                        </div>
                    </Link>

                    {/* Right Side - Contacts & Booking */}
                    <div className="flex items-center gap-8">
                        <Link
                            to="/contact"
                            className="hidden md:block text-luxury-ivory/80 hover:text-luxury-gold transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-medium"
                        >
                            Contacts
                        </Link>
                        <Link
                            to="/booking"
                            className="group flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-light text-white px-6 py-2.5 rounded-lg transition-all duration-300 text-xs tracking-[0.15em] uppercase font-medium"
                            style={{
                                boxShadow: '0 4px 15px rgba(200, 169, 98, 0.3)'
                            }}
                        >
                            <span>Booking</span>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <path
                                    d="M4 10H16M16 10L11 5M16 10L11 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="w-full h-px bg-luxury-ivory/10 mb-6" />

                {/* Bottom Row - Navigation Links */}
                <div className="flex items-center justify-center gap-8 md:gap-12 transition-all duration-500">
                    {[
                        { name: 'Overview', path: '/' },
                        { name: 'Accommodations', path: '/accommodations' },
                        { name: 'Dining', path: '/dining' },
                        { name: 'Experiences', path: '/experiences' },
                        { name: 'Offers', path: '/offers' }
                    ].map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:text-luxury-gold relative group ${location.pathname === link.path ? 'text-luxury-gold' : 'text-luxury-ivory/70'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-luxury-gold transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}></span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
