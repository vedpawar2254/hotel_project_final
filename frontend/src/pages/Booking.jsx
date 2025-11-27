import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { gsap } from 'gsap';

export default function Booking() {
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
            <Navbar />

            <div className="min-h-screen w-full bg-[#0A0A0C] flex items-center justify-center pt-40 pb-12 px-4 relative overflow-x-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="booking-container w-full max-w-[90%] relative z-10">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-serif text-luxury-ivory mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Reserve Your Stay
                        </h1>
                        <p className="text-luxury-ivory/60 text-sm tracking-[0.2em] uppercase">
                            Experience the elevated escape
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

                            {/* Section 2: Stay Details */}
                            <div className="space-y-6 pt-4">
                                <h3 className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-6 border-b border-white/10 pb-2">
                                    Stay Details
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Check-in</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="date"
                                                name="checkIn"
                                                value={formData.checkIn}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                                                required
                                            />
                                            <input
                                                type="time"
                                                name="checkInTime"
                                                value={formData.checkInTime}
                                                onChange={handleChange}
                                                className="w-24 bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Check-out</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="date"
                                                name="checkOut"
                                                value={formData.checkOut}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                                                required
                                            />
                                            <input
                                                type="time"
                                                name="checkOutTime"
                                                value={formData.checkOutTime}
                                                onChange={handleChange}
                                                className="w-24 bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="group">
                                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Duration</label>
                                        <div className="w-full border-b border-white/20 py-2 text-luxury-ivory/80">
                                            {duration > 0 ? `${duration} Night${duration > 1 ? 's' : ''}` : '-'}
                                        </div>
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
                            </div>

                            {/* Submit Button */}
                            <div className="pt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-luxury-gold hover:bg-luxury-gold-light text-white px-10 py-4 rounded-lg transition-all duration-300 text-xs tracking-[0.2em] uppercase font-medium hover:shadow-[0_0_30px_rgba(200,169,98,0.4)] transform hover:-translate-y-1"
                                >
                                    Confirm Reservation
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
