import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';

export default function Booking() {
    const [bookingType, setBookingType] = useState('rooms'); // 'rooms' or 'tables'

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkInTime: '14:00',
        checkOut: '',
        checkOutTime: '11:00',
        guests: '2',
        roomType: 'Deluxe Suite',
        specialRequests: ''
    });

    const [duration, setDuration] = useState(0);

    // Calculate duration when dates change
    useEffect(() => {
        if (formData.checkIn && formData.checkOut) {
            const start = new Date(`${formData.checkIn}T${formData.checkInTime}`);
            const end = new Date(`${formData.checkOut}T${formData.checkOutTime}`);

            // Calculate difference in milliseconds
            const diffTime = end - start;

            // Convert to days (rounding up to ensure any part of a day counts, 
            // but effectively we want "nights". 
            // Standard hotel logic: 1 night is usually until next day checkout.
            // If diff is negative (checkout before checkin), duration is 0.
            if (diffTime <= 0) {
                setDuration(0);
            } else {
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setDuration(diffDays);
            }
        }
    }, [formData.checkIn, formData.checkOut, formData.checkInTime, formData.checkOutTime]);

    // Animation on mount
    useEffect(() => {
        gsap.fromTo(".booking-container",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Booking saved:", data);
                navigate("/confirmation", { state: formData });
            } else {
                alert(data.message || "Something went wrong.");
            }

        } catch (error) {
            console.error("POST Error:", error);
            alert("Server unreachable. Try again later.");
        }
    };



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
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Section 1: Personal Details */}
                            <div className="space-y-6">
                                <h3 className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-6 border-b border-white/10 pb-2">
                                    Guest Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors"
                                            placeholder="+91 XXXXXXXXXX"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Stay/Reservation Details */}
                            <div className="space-y-6 pt-4">
                                <h3 className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-6 border-b border-white/10 pb-2">
                                    {bookingType === 'rooms' ? 'Stay Details' : 'Reservation Details'}
                                </h3>

                                {bookingType === 'rooms' ? (
                                    <>
                                        {/* Room Booking Fields */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Check-in Date</label>
                                                <input
                                                    type="date"
                                                    name="checkIn"
                                                    value={formData.checkIn}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                                                    required
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Check-in Time</label>
                                                <input
                                                    type="time"
                                                    name="checkInTime"
                                                    value={formData.checkInTime}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Duration</label>
                                                <select
                                                    name="checkOut"
                                                    value={formData.checkOut}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                                                    required
                                                >
                                                    <option value="">Select Duration</option>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => (
                                                        <option key={num} value={num}>{num} Night{num > 1 ? 's' : ''}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Guests</label>
                                                <select
                                                    name="guests"
                                                    value={formData.guests}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                                                >
                                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Room Type</label>
                                                <select
                                                    name="roomType"
                                                    value={formData.roomType}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                                                >
                                                    <option value="Deluxe Suite">Deluxe Suite</option>
                                                    <option value="Ocean View Room">Ocean View Room</option>
                                                    <option value="Presidential Suite">Presidential Suite</option>
                                                    <option value="Penthouse">Penthouse</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Table Booking Fields */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Reservation Date</label>
                                                <input
                                                    type="date"
                                                    name="checkIn"
                                                    value={formData.checkIn}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                                                    required
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Dining Time</label>
                                                <input
                                                    type="time"
                                                    name="checkInTime"
                                                    value={formData.checkInTime}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Party Size</label>
                                                <select
                                                    name="guests"
                                                    value={formData.guests}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Seating Preference</label>
                                                <select
                                                    name="roomType"
                                                    value={formData.roomType}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                                                >
                                                    <option value="Indoor">Indoor</option>
                                                    <option value="Outdoor Terrace">Outdoor Terrace</option>
                                                    <option value="Window View">Window View</option>
                                                    <option value="Private Dining Room">Private Dining Room</option>
                                                </select>
                                            </div>
                                            <div className="group">
                                                <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Occasion</label>
                                                <select
                                                    name="checkOut"
                                                    value={formData.checkOut}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                                                >
                                                    <option value="">Select Occasion</option>
                                                    <option value="Birthday">Birthday</option>
                                                    <option value="Anniversary">Anniversary</option>
                                                    <option value="Business Dinner">Business Dinner</option>
                                                    <option value="Romantic Dinner">Romantic Dinner</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-8 flex flex-col items-end gap-2">
                                <button
                                    type="submit"
                                    disabled={!sessionStorage.getItem('googleToken')}
                                    className={`px-10 py-4 rounded-lg transition-all duration-300 text-xs tracking-[0.2em] uppercase font-medium ${sessionStorage.getItem('googleToken')
                                            ? 'bg-luxury-gold hover:bg-luxury-gold-light text-white hover:shadow-[0_0_30px_rgba(200,169,98,0.4)] transform hover:-translate-y-1'
                                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Confirm Reservation
                                </button>
                                {!sessionStorage.getItem('googleToken') && (
                                    <p className="text-red-500 text-xs tracking-wider uppercase font-medium">
                                        sign in first
                                    </p>
                                )}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
