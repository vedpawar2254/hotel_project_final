import React, { useState } from 'react';

/**
 * BookingWidget Component
 * Elegant booking bar for the hero section
 */
const BookingWidget = () => {
    const [date, setDate] = useState('Add date');
    const [type, setType] = useState('Restaurant');
    const [guests, setGuests] = useState('Number of guests');

    const handleBooking = (e) => {
        e.preventDefault();
        alert(`Booking: ${guests} for ${type} on ${date}`);
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <form
                onSubmit={handleBooking}
                className="glass-card-dark rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-end justify-between"
                style={{
                    background: 'rgba(10, 10, 12, 0.65)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(200, 169, 98, 0.15)'
                }}
            >
                {/* Date Input */}
                <div className="flex-1 w-full md:w-auto">
                    <label
                        htmlFor="booking-date"
                        className="block text-xs tracking-[0.2em] text-luxury-ivory/60 mb-3 uppercase font-medium"
                    >
                        Date
                    </label>
                    <input
                        id="booking-date"
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        onFocus={(e) => e.target.type = 'date'}
                        className="w-full bg-transparent border-b border-luxury-ivory/20 px-2 py-2 text-luxury-ivory focus:border-luxury-gold focus:outline-none transition-colors duration-300"
                        style={{ fontSize: '16px' }}
                    />
                </div>

                {/* Type Select */}
                <div className="flex-1 w-full md:w-auto">
                    <label
                        htmlFor="booking-type"
                        className="block text-xs tracking-[0.2em] text-luxury-ivory/60 mb-3 uppercase font-medium"
                    >
                        Type
                    </label>
                    <select
                        id="booking-type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full bg-transparent border-b border-luxury-ivory/20 px-2 py-2 text-luxury-ivory focus:border-luxury-gold focus:outline-none transition-colors duration-300 cursor-pointer"
                        style={{ fontSize: '16px' }}
                    >
                        <option value="Restaurant" className="bg-luxury-charcoal">Restaurant</option>
                        <option value="Rooftop Bar" className="bg-luxury-charcoal">Rooftop Bar</option>
                        <option value="Private Event" className="bg-luxury-charcoal">Private Event</option>
                    </select>
                </div>

                {/* Guests Select */}
                <div className="flex-1 w-full md:w-auto">
                    <label
                        htmlFor="booking-guests"
                        className="block text-xs tracking-[0.2em] text-luxury-ivory/60 mb-3 uppercase font-medium"
                    >
                        Guests
                    </label>
                    <select
                        id="booking-guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-transparent border-b border-luxury-ivory/20 px-2 py-2 text-luxury-ivory focus:border-luxury-gold focus:outline-none transition-colors duration-300 cursor-pointer"
                        style={{ fontSize: '16px' }}
                    >
                        <option value="Number of guests" className="bg-luxury-charcoal" disabled>Number of guests</option>
                        <option value="1 guest" className="bg-luxury-charcoal">1 guest</option>
                        <option value="2 guests" className="bg-luxury-charcoal">2 guests</option>
                        <option value="3 guests" className="bg-luxury-charcoal">3 guests</option>
                        <option value="4 guests" className="bg-luxury-charcoal">4 guests</option>
                        <option value="5 guests" className="bg-luxury-charcoal">5 guests</option>
                        <option value="6+ guests" className="bg-luxury-charcoal">6+ guests</option>
                    </select>
                </div>

                {/* Booking Button */}
                <div className="flex flex-col items-end gap-2">
                    <button
                        type="submit"
                        disabled={!sessionStorage.getItem('googleToken')}
                        className={`flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-300 uppercase text-sm tracking-[0.15em] font-medium whitespace-nowrap ${sessionStorage.getItem('googleToken')
                                ? 'bg-luxury-gold hover:bg-luxury-gold-light text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        style={sessionStorage.getItem('googleToken') ? {
                            boxShadow: '0 4px 15px rgba(200, 169, 98, 0.3)'
                        } : {}}
                    >
                        <span>Booking</span>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className={`transition-transform duration-300 ${sessionStorage.getItem('googleToken') ? 'group-hover:translate-x-1' : ''}`}
                        >
                            <path
                                d="M4 10H16M16 10L11 5M16 10L11 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    {!sessionStorage.getItem('googleToken') && (
                        <p className="text-red-500 text-xs tracking-wider uppercase font-medium">
                            sign in first
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BookingWidget;
