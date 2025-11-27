import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { gsap } from 'gsap';

export default function Confirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state || {
        firstName: 'Guest',
        lastName: '',
        checkIn: new Date().toISOString().split('T')[0],
        checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        guests: 2,
        roomType: 'Deluxe Suite',
        email: 'guest@example.com',
        phone: ''
    };

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    // Mock pricing
    const prices = {
        'Deluxe Suite': 500,
        'Ocean View Room': 750,
        'Presidential Suite': 1500,
        'Penthouse': 3000
    };

    const [totalAmount, setTotalAmount] = useState(0);
    const [nights, setNights] = useState(1);

    useEffect(() => {
        // Calculate nights and total
        const start = new Date(bookingData.checkIn);
        const end = new Date(bookingData.checkOut);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

        setNights(diffDays);
        setTotalAmount(diffDays * (prices[bookingData.roomType] || 500));

        // Animation
        gsap.fromTo(".confirmation-container",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
    }, [bookingData]);

    const validateForm = () => {
        const newErrors = {};
        if (paymentMethod === 'card') {
            // Simple mock validation for card
            // In a real app, we'd check card number format, etc.
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBookNow = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);

            // Scroll to top to show success message clearly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    };

    if (isSuccess) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center px-4 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-luxury-gold/10 blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="text-center z-10 max-w-2xl p-12 glass-card-dark rounded-2xl border border-luxury-gold/20">
                        <div className="w-20 h-20 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-4xl font-serif text-luxury-ivory mb-4">Reservation Confirmed</h2>
                        <p className="text-luxury-ivory/70 mb-8 leading-relaxed">
                            Thank you, {bookingData.firstName}. Your stay at The Hollywood has been secured.
                            A confirmation email has been sent to {bookingData.email}.
                        </p>
                        <div className="bg-white/5 p-6 rounded-xl mb-8 text-left">
                            <div className="flex justify-between mb-2">
                                <span className="text-luxury-ivory/50 text-sm">Reservation ID</span>
                                <span className="text-luxury-gold font-mono">#HW-{Math.floor(Math.random() * 100000)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-luxury-ivory/50 text-sm">Amount Paid</span>
                                <span className="text-luxury-ivory">${totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-luxury-gold hover:bg-luxury-gold-light text-white px-8 py-3 rounded-lg transition-all duration-300 text-sm tracking-widest uppercase font-medium"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#0A0A0C] pt-40 pb-20 px-4 relative overflow-x-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="confirmation-container max-w-6xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-serif text-luxury-ivory mb-2 text-center">Complete Your Reservation</h1>
                    <p className="text-luxury-ivory/50 text-center mb-12 text-sm tracking-widest uppercase">Secure Payment</p>

                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Left Column: Booking Summary */}
                        <div className="lg:col-span-1">
                            <div className="glass-card-dark p-8 rounded-2xl border border-white/10 sticky top-32">
                                <h3 className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-6 pb-2 border-b border-white/10">Booking Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <p className="text-luxury-ivory/50 text-xs uppercase tracking-wider mb-1">Guest</p>
                                        <p className="text-luxury-ivory font-medium">{bookingData.firstName} {bookingData.lastName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-luxury-ivory/50 text-xs uppercase tracking-wider mb-1">Check-in</p>
                                            <p className="text-luxury-ivory">{bookingData.checkIn}</p>
                                        </div>
                                        <div>
                                            <p className="text-luxury-ivory/50 text-xs uppercase tracking-wider mb-1">Check-out</p>
                                            <p className="text-luxury-ivory">{bookingData.checkOut}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-luxury-ivory/50 text-xs uppercase tracking-wider mb-1">Room</p>
                                            <p className="text-luxury-ivory">{bookingData.roomType}</p>
                                        </div>
                                        <div>
                                            <p className="text-luxury-ivory/50 text-xs uppercase tracking-wider mb-1">Guests</p>
                                            <p className="text-luxury-ivory">{bookingData.guests}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-6 space-y-3">
                                    <div className="flex justify-between text-luxury-ivory/70 text-sm">
                                        <span>{bookingData.roomType} x {nights} nights</span>
                                        <span>${totalAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-luxury-ivory/70 text-sm">
                                        <span>Taxes & Fees (10%)</span>
                                        <span>${(totalAmount * 0.1).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-luxury-gold text-lg font-serif pt-4 border-t border-white/10 mt-4">
                                        <span>Total Due</span>
                                        <span>${(totalAmount * 1.1).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Payment Details */}
                        <div className="lg:col-span-2">
                            <div className="glass-card-dark p-8 md:p-10 rounded-2xl border border-white/10">
                                <h3 className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-8 pb-2 border-b border-white/10">Payment Method</h3>

                                <form onSubmit={handleBookNow}>
                                    {/* Payment Method Selector */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                                        {['Card', 'UPI', 'Netbanking', 'Wallet', 'Cash'].map((method) => (
                                            <label
                                                key={method}
                                                className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${paymentMethod === method.toLowerCase()
                                                        ? 'bg-luxury-gold/10 border-luxury-gold text-luxury-gold'
                                                        : 'bg-transparent border-white/10 text-luxury-ivory/60 hover:border-white/30'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value={method.toLowerCase()}
                                                    checked={paymentMethod === method.toLowerCase()}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="hidden"
                                                />
                                                <span className="text-sm font-medium tracking-wide uppercase">{method}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Dynamic Payment Fields */}
                                    <div className="mb-10 min-h-[200px]">
                                        {paymentMethod === 'card' && (
                                            <div className="space-y-6 animate-fadeIn">
                                                <div className="group">
                                                    <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2">Card Number</label>
                                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border-b border-white/20 py-3 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="group">
                                                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2">Expiry Date</label>
                                                        <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-white/20 py-3 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors" />
                                                    </div>
                                                    <div className="group">
                                                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2">CVV</label>
                                                        <input type="text" placeholder="123" className="w-full bg-transparent border-b border-white/20 py-3 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors" />
                                                    </div>
                                                </div>
                                                <div className="group">
                                                    <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2">Cardholder Name</label>
                                                    <input type="text" placeholder="Name on card" className="w-full bg-transparent border-b border-white/20 py-3 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors" />
                                                </div>
                                            </div>
                                        )}

                                        {paymentMethod === 'upi' && (
                                            <div className="space-y-6 animate-fadeIn">
                                                <div className="group">
                                                    <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2">UPI ID</label>
                                                    <input type="text" placeholder="username@bank" className="w-full bg-transparent border-b border-white/20 py-3 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors" />
                                                </div>
                                                <p className="text-luxury-ivory/50 text-sm">A payment request will be sent to your UPI app.</p>
                                            </div>
                                        )}

                                        {/* Add other payment method UIs as needed */}
                                        {(paymentMethod !== 'card' && paymentMethod !== 'upi') && (
                                            <div className="flex items-center justify-center h-full text-luxury-ivory/50 text-sm italic">
                                                Proceed to book. You will be redirected to complete payment.
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-6 border-t border-white/10">
                                        <button
                                            type="button"
                                            onClick={() => navigate(-1)}
                                            className="text-luxury-ivory/60 hover:text-luxury-ivory text-xs tracking-widest uppercase transition-colors"
                                        >
                                            Back to Details
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`bg-luxury-gold hover:bg-luxury-gold-light text-white px-12 py-4 rounded-lg transition-all duration-300 text-xs tracking-[0.2em] uppercase font-medium hover:shadow-[0_0_30px_rgba(200,169,98,0.4)] transform hover:-translate-y-1 flex items-center gap-3 ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                'Book Now'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
