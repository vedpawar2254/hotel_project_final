import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { HoverButton } from './ui/HoverButton';

const MenuItem = ({ setActive, active, item, children, isScrolled }) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative">
            <button className="cursor-pointer text-luxury-charcoal hover:text-luxury-gold transition-colors duration-200 text-sm tracking-wide px-4 py-2 font-medium">
                {item}
            </button>
            {active === item && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4">
                    <div
                        className={cn(
                            "rounded-lg border overflow-hidden transition-all duration-300",
                            isScrolled
                                ? "bg-white shadow-2xl border-luxury-gold/20"
                                : "bg-white/40 backdrop-blur-lg shadow-2xl border-white/30"
                        )}
                        style={{
                            animation: 'slideDown 0.3s ease-out forwards'
                        }}
                    >
                        <div className="w-max h-full p-4">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const HoveredLink = ({ children, to, ...rest }) => {
    return (
        <Link
            {...rest}
            to={to}
            className="text-luxury-charcoal/70 hover:text-luxury-gold transition-colors duration-200 block py-2 px-3 rounded-md hover:bg-luxury-ivory/50"
        >
            {children}
        </Link>
    );
};

const Menu = ({ setActive, children, isScrolled }) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className={cn(
                "relative rounded-full border flex items-center justify-center space-x-2 px-6 py-3 transition-all duration-300",
                isScrolled
                    ? "bg-white border-luxury-gold/20 shadow-lg"
                    : "bg-white/40 backdrop-blur-lg border-white/30 shadow-2xl"
            )}
        >
            {children}
        </nav>
    );
};

export default function Navbar() {
    const [active, setActive] = useState(null);
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
        <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center p-4" style={{ position: 'fixed' }}>
            <Menu setActive={setActive} isScrolled={isScrolled}>
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 px-4">
                    <div className="w-8 h-8 bg-luxury-charcoal flex items-center justify-center border border-luxury-gold rounded">
                        <span className="text-luxury-gold text-sm font-serif">TH</span>
                    </div>
                    <span className="text-luxury-charcoal font-serif text-sm tracking-wide hidden sm:block">The Hollywood</span>
                </Link>

                {/* Menu Items */}
                <MenuItem setActive={setActive} active={active} item="Stay" isScrolled={isScrolled}>
                    <div className="flex flex-col space-y-3 text-sm min-w-[200px]">
                        <HoveredLink to="/accommodations">Accommodations</HoveredLink>
                        <HoveredLink to="/offers">Special Offers</HoveredLink>
                    </div>
                </MenuItem>

                <MenuItem setActive={setActive} active={active} item="Experience" isScrolled={isScrolled}>
                    <div className="flex flex-col space-y-3 text-sm min-w-[200px]">
                        <HoveredLink to="/dining">Dining</HoveredLink>
                        <HoveredLink to="/experiences">Experiences</HoveredLink>
                    </div>
                </MenuItem>

                <MenuItem setActive={setActive} active={active} item="About" isScrolled={isScrolled}>
                    <div className="flex flex-col space-y-3 text-sm min-w-[200px]">
                        <HoveredLink to="/overview">Overview</HoveredLink>
                        <a href="#contact" className="text-taj-gray hover:text-taj-gold transition-colors duration-200 block py-2 px-3 rounded-md hover:bg-gray-50">
                            Contact
                        </a>
                    </div>
                </MenuItem>

                {/* Book Now Button */}
                <HoverButton
                    glowColor="#C5A66B"
                    backgroundColor="#9D8658"
                    textColor="#ffffff"
                    hoverTextColor="#ffffff"
                    className="ml-2"
                >
                    Book Now
                </HoverButton>
            </Menu>
        </div>
    );
}
