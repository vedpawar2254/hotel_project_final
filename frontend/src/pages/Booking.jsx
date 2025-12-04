import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import RoomBookingForm from '../components/RoomBookingForm';
import TableBookingForm from '../components/TableBookingForm';

export default function Booking() {
    const [bookingType, setBookingType] = useState('rooms'); // 'rooms' or 'tables'

    // Animation on mount
    useEffect(() => {
        gsap.fromTo(".booking-container",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
    }, []);

    return (
        <>
            {/* Booking Type Navbar */}
            <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between pt-8 pb-4 px-6 bg-gradient-to-b from-[#0A0A0C] to-transparent">
                {/* Back Button */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-luxury-ivory/80 hover:text-luxury-gold transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-medium group"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    >
                        <path
                            d="M16 10H4M4 10L9 5M4 10L9 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="hidden sm:inline">Back</span>
                </Link>

                {/* Logo */}
                <Link to="/" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="The Hollywood"
                            className="h-8 md:h-12 w-auto"
                            style={{
                                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
                            }}
                        />
                        <span
                            className="text-luxury-ivory font-serif text-xl md:text-2xl tracking-wide hidden sm:block"
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

                {/* Booking Type Selector */}
                <div className="glass-card-dark rounded-full p-2 shadow-lg flex gap-2">
                    <button
                        onClick={() => setBookingType('rooms')}
                        className={`px-8 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 ${bookingType === 'rooms'
                            ? 'bg-luxury-gold text-white shadow-[0_0_20px_rgba(200,169,98,0.4)]'
                            : 'text-luxury-ivory/60 hover:text-luxury-ivory'
                            }`}
                    >
                        Rooms
                    </button>
                    <button
                        onClick={() => setBookingType('tables')}
                        className={`px-8 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 ${bookingType === 'tables'
                            ? 'bg-luxury-gold text-white shadow-[0_0_20px_rgba(200,169,98,0.4)]'
                            : 'text-luxury-ivory/60 hover:text-luxury-ivory'
                            }`}
                    >
                        Tables
                    </button>
                </div>
            </div>

            <div className="min-h-screen w-full bg-[#0A0A0C] flex items-center justify-center pt-40 pb-12 px-4 relative overflow-x-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="booking-container w-full max-w-[90%] relative z-10">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-serif text-luxury-ivory mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {bookingType === 'rooms' ? 'Reserve Your Stay' : 'Reserve Your Table'}
                        </h1>
                        <p className="text-luxury-ivory/60 text-sm tracking-[0.2em] uppercase">
                            {bookingType === 'rooms' ? 'Experience the elevated escape' : 'An exquisite dining experience awaits'}
                        </p>
                    </div>

                    <div
                        className="glass-card-dark rounded-2xl p-8 md:p-12 shadow-2xl"
                        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
                    >
                        {bookingType === 'rooms' ? <RoomBookingForm /> : <TableBookingForm />}
                    </div>
                </div>
            </div>
        </>
    );
}

