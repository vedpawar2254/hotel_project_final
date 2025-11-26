import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export function HoverButton({
    children,
    glowColor = '#9D8658',
    backgroundColor = '#9D8658',
    textColor = '#ffffff',
    hoverTextColor = '#ffffff',
    className = '',
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={cn(
                "relative px-8 py-3 text-sm tracking-widest uppercase font-medium rounded-full transition-all duration-300 overflow-hidden",
                className
            )}
            style={{
                backgroundColor: backgroundColor,
                color: isHovered ? hoverTextColor : textColor,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Glow effect */}
            <span
                className="absolute inset-0 rounded-full transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}, 0 0 60px ${glowColor}`,
                }}
            />

            {/* Shimmer effect */}
            <span
                className="absolute inset-0 rounded-full transition-transform duration-700"
                style={{
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                    transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                }}
            />

            {/* Button text */}
            <span className="relative z-10">{children}</span>
        </button>
    );
}
