import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParallaxHero from '../components/ParallaxHero';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function Overview() {
  const [people, setPeople] = useState('2');
  const [time, setTime] = useState('7:00 PM');
  const [date, setDate] = useState('Nov 23, 2025');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Smooth scroll handler for navigation links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Show back-to-top button immediately after scrolling to section
      setTimeout(() => {
        setShowBackToTop(window.scrollY > 500);
      }, 500);
    }
  };

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // Show/hide back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);

    // Initialize GSAP Smooth Scroll with snap-like behavior
    const smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      smoother?.kill();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reservation for ${people} people at ${time} on ${date}`);
  };

  return (
    <>
      {/* Navigation - Fixed outside smooth scroll wrapper */}
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="min-h-screen bg-luxury-ivory">

            {/* Parallax Hero Section */}
            <ParallaxHero
              backgroundImage="/hero-rooftop.jpg"
              logo="/logo.png"
              title="THE HOLLYWOOD"
              subtitle="Where skyline whispers meet curated cocktails. Mumbai's elevated escape."
            >
              <div className="flex items-center justify-center space-x-4 text-xs tracking-[0.25em] uppercase mt-8" style={{ fontWeight: 300 }}>
                <a
                  href="#hours"
                  onClick={(e) => handleSmoothScroll(e, '#hours')}
                  className="hover:text-luxury-gold transition-colors duration-300 cursor-pointer"
                >
                  Hours
                </a>
                <span className="text-luxury-gold">—</span>
                <a
                  href="#menus"
                  onClick={(e) => handleSmoothScroll(e, '#menus')}
                  className="hover:text-luxury-gold transition-colors duration-300 cursor-pointer"
                >
                  Menus
                </a>
                <span className="text-luxury-gold">—</span>
                <a
                  href="#events"
                  onClick={(e) => handleSmoothScroll(e, '#events')}
                  className="hover:text-luxury-gold transition-colors duration-300 cursor-pointer"
                >
                  Events
                </a>
              </div>
            </ParallaxHero>

            {/* Reservation Section */}
            <section className="section-luxury bg-luxury-ivory">
              <div className="container-luxury">
                <div className="max-w-5xl mx-auto">
                  <div className="glass-card rounded-3xl p-10 md:p-12 border border-luxury-gold/20" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)' }}>
                    <h3 className="section-title text-3xl mb-2">Reserve Your Evening</h3>
                    <div className="w-16 h-0.5 mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #C8A962, transparent)' }}></div>
                    <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 items-end justify-center">
                      <div className="flex flex-col flex-1 min-w-[140px]">
                        <label htmlFor="people" className="text-xs tracking-[0.2em] text-luxury-charcoal/70 mb-3 uppercase font-medium">Guests</label>
                        <select
                          id="people"
                          value={people}
                          onChange={(e) => setPeople(e.target.value)}
                          className="border px-5 py-3 rounded-xl focus:outline-none focus:border-luxury-gold bg-white/50 backdrop-blur-sm transition-all duration-300"
                          style={{ borderColor: '#E5D9C5' }}
                        >
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>
                      <div className="flex flex-col flex-1 min-w-[140px]">
                        <label htmlFor="time" className="text-xs tracking-[0.2em] text-luxury-charcoal/70 mb-3 uppercase font-medium">Time</label>
                        <select
                          id="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="border px-5 py-3 rounded-xl focus:outline-none focus:border-luxury-gold bg-white/50 backdrop-blur-sm transition-all duration-300"
                          style={{ borderColor: '#E5D9C5' }}
                        >
                          <option value="7:00 PM">7:00 PM</option>
                          <option value="7:30 PM">7:30 PM</option>
                          <option value="8:00 PM">8:00 PM</option>
                          <option value="8:30 PM">8:30 PM</option>
                          <option value="9:00 PM">9:00 PM</option>
                        </select>
                      </div>
                      <div className="flex flex-col flex-1 min-w-[160px]">
                        <label htmlFor="date" className="text-xs tracking-[0.2em] text-luxury-charcoal/70 mb-3 uppercase font-medium">Date</label>
                        <input
                          type="text"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="border px-5 py-3 rounded-xl focus:outline-none focus:border-luxury-gold bg-white/50 backdrop-blur-sm transition-all duration-300"
                          style={{ borderColor: '#E5D9C5' }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn-gold px-10 py-3 shimmer"
                      >
                        Secure Table
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="section-luxury bg-white" style={{ scrollSnapAlign: 'start' }}>
              <div className="container-luxury">
                <div className="max-w-3xl mx-auto text-center fade-in">
                  <p className="text-luxury-charcoal/80 text-xl leading-relaxed font-light">
                    Mumbai's chic open-air rooftop bar offers innovative cocktails and premier wine selections, with a scenic
                    view of the bay. Find yourself with a relaxed sundowner in the early evenings or come when the music's pace
                    matches the level of service.
                  </p>
                </div>
              </div>
            </section>

            {/* Hours Section */}
            <section id="hours" className="section-luxury bg-white">
              <div className="container-luxury">
                <div className="max-w-4xl mx-auto">
                  <p className="section-subtitle">OPENING HOURS</p>
                  <h3 className="section-title mb-4">Hours</h3>
                  <div className="w-24 h-0.5 mx-auto mb-12" style={{ background: 'linear-gradient(90deg, transparent, #C8A962, transparent)' }}></div>
                  <div className="space-y-6">
                    <div className="flex justify-between py-6 border-b" style={{ borderColor: '#E5D9C5' }}>
                      <span className="text-sm tracking-[0.2em] font-medium text-luxury-charcoal">DAILY</span>
                      <span className="text-sm tracking-wider text-luxury-charcoal/70">5:00 PM – 1:30 AM</span>
                    </div>
                    <div className="flex justify-between py-6 border-b" style={{ borderColor: '#E5D9C5' }}>
                      <span className="text-sm tracking-[0.2em] font-medium text-luxury-charcoal">SUNDAY BRUNCH</span>
                      <span className="text-sm tracking-wider text-luxury-charcoal/70">12:30 PM – 5:00 PM</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between py-6">
                      <span className="text-sm tracking-[0.2em] font-medium mb-3 md:mb-0 text-luxury-charcoal">PLEASE NOTE</span>
                      <span className="text-sm tracking-wider text-luxury-charcoal/60 md:text-right md:w-2/3 leading-relaxed">
                        AER IS OPEN TO GUESTS AGES 21 AND ABOVE. DRESS CODE IN EFFECT. GENTLEMEN ARE ASKED TO
                        WEAR CLOSED-TOE SHOES AND LONG PANTS.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Menus Section */}
            <section id="menus" className="section-luxury bg-luxury-ivory">
              <div className="container-luxury">
                <div className="max-w-4xl mx-auto">
                  <p className="section-subtitle">CULINARY OFFERINGS</p>
                  <h3 className="section-title mb-4">Menus</h3>
                  <div className="w-24 h-0.5 mx-auto mb-12" style={{ background: 'linear-gradient(90deg, transparent, #C8A962, transparent)' }}></div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <a href="#yacht" className="group border bg-white/50 backdrop-blur-sm p-8 rounded-xl flex justify-between items-center hover:shadow-xl transition-all duration-300" style={{ borderColor: '#E5D9C5' }}>
                      <span className="text-sm tracking-[0.2em] font-medium text-luxury-charcoal">YACHT CLUB</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-2 transition-transform duration-300" style={{ color: '#C8A962' }}>
                        <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </a>
                    <a href="#gimlet" className="group border bg-white/50 backdrop-blur-sm p-8 rounded-xl flex justify-between items-center hover:shadow-xl transition-all duration-300" style={{ borderColor: '#E5D9C5' }}>
                      <span className="text-sm tracking-[0.2em] font-medium text-luxury-charcoal">GIMLET GARDEN</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:translate-x-2 transition-transform duration-300" style={{ color: '#C8A962' }}>
                        <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Banner */}
            <section className="bg-gray-900 text-white py-12">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <p className="text-2xl font-light mb-6">Make your reservation.</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <a href="tel:912269828000" className="text-lg tracking-wider hover:underline">91 (22) 6982 8000</a>
                  <button className="bg-white text-taj-dark px-8 py-3 text-sm tracking-widest hover:bg-gray-100 transition uppercase font-medium">
                    RESERVE A TABLE
                  </button>
                </div>
              </div>
            </section>

            {/* Events Section */}
            <section id="events" className="py-16">
              <div className="max-w-4xl mx-auto px-4">
                <h3 className="text-2xl font-light text-center mb-12 tracking-wide">EVENTS</h3>
                <div className="bg-gray-50 p-8">
                  <p className="text-xs tracking-widest text-gray-600 mb-2">EVERY SUNDAY, 12:30 PM – 5:00 PM</p>
                  <h4 className="text-3xl font-light mb-4">SUNDAY BRUNCH</h4>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Experience Sundays anew with our spirited brunch featuring indulgent cocktails
                    and brunch favourites, complemented by DJ tunes or live performances and unrivalled rooftop views of the
                    Arabian Sea.
                  </p>
                  <a href="#reserve-brunch" className="text-sm tracking-wider underline hover:no-underline">RESERVE NOW</a>
                </div>
              </div>
            </section>

            {/* CTA Banner 2 */}
            <section className="bg-gray-900 text-white py-12">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <p className="text-2xl font-light mb-6">Make your reservation.</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <a href="tel:912269828000" className="text-lg tracking-wider hover:underline">91 (22) 6982 8000</a>
                  <button className="bg-white text-taj-dark px-8 py-3 text-sm tracking-widest hover:bg-gray-100 transition uppercase font-medium">
                    RESERVE A TABLE
                  </button>
                </div>
              </div>
            </section>

            {/* More Dining Options */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-light text-center mb-12 tracking-wide">MORE DINING OPTIONS</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      img: '/sanqi.jpg',
                      title: 'San:Qi',
                      desc: 'San:Qi is temporarily closed for renovations. From tandoor to woks, sushi bar to Thai cookery, our dramatic dining room takes you on a pan-Asian culinary tour, accompanied by an extensive wine list.'
                    },
                    {
                      img: '/takeaway.jpg',
                      title: 'Takeaway',
                      desc: 'Enjoy a selection of house-made treats and sweet delights from our pastry team at Four Seasons Hotel Mumbai.'
                    },
                    {
                      img: '/inroom.jpg',
                      title: 'In-Room Dining',
                      desc: 'Ideal for time-zone-hopping travellers, impromptu meetings or for a quiet, private meal, our extensive menu lets you dine in style in the comfort of your private space.'
                    },
                    {
                      img: '/opus.jpg',
                      title: 'Opus',
                      desc: 'Immerse yourself in a culinary experience that spans continents at Opus, our new art deco restaurant offering a selection of coffees on tap, single estate teas, wines and cocktails.'
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white shadow-md rounded-xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
                      style={{
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(200, 169, 98, 0.3), 0 0 0 1px rgba(200, 169, 98, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-serif mb-3 text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300">{item.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                        <a
                          href={`#${item.title.toLowerCase().replace(/\s/g, '')}`}
                          className="inline-flex items-center text-sm tracking-wider text-luxury-gold border-b border-luxury-gold hover:border-transparent transition-all duration-300 group-hover:translate-x-1"
                        >
                          DETAILS
                          <svg
                            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mx-auto mb-4">
                    <path d="M30 3L3 17V43L30 57L57 43V17L30 3Z" stroke="white" strokeWidth="0.5" fill="none" />
                    <path d="M30 17L17 24V36L30 43L43 36V24L30 17Z" stroke="white" strokeWidth="0.5" fill="none" />
                  </svg>
                  <h2 className="text-2xl font-light tracking-widest">FOUR SEASONS</h2>
                </div>

                <div className="grid md:grid-cols-4 gap-8 mb-12">
                  <div>
                    <h3 className="text-sm tracking-widest mb-4">About</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#about" className="hover:underline">ABOUT US</a></li>
                      <li><a href="#good" className="hover:underline">FOUR SEASONS FOR GOOD</a></li>
                      <li><a href="#safety" className="hover:underline">HEALTH AND SAFETY</a></li>
                      <li><a href="#careers" className="hover:underline">CAREERS</a></li>
                      <li><a href="#contact" className="hover:underline">CONTACT US</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm tracking-widest mb-4">Reservations</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#invoice" className="hover:underline">REQUEST AN INVOICE</a></li>
                      <li><a href="#find" className="hover:underline">FIND A RESERVATION</a></li>
                      <li><a href="#email" className="hover:underline">EMAIL PREFERENCES</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm tracking-widest mb-4">News</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#press" className="hover:underline">PRESS ROOM</a></li>
                      <li><a href="#openings" className="hover:underline">NEW OPENINGS</a></li>
                      <li><a href="#magazine" className="hover:underline">MAGAZINE</a></li>
                      <li><a href="#newsletter" className="hover:underline">NEWSLETTER</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm tracking-widest mb-4">More</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#jet" className="hover:underline">PRIVATE JET</a></li>
                      <li><a href="#yachts" className="hover:underline">YACHTS</a></li>
                      <li><a href="#residences" className="hover:underline">RESIDENCES</a></li>
                      <li><a href="#villas" className="hover:underline">VILLA & RESIDENCE RENTALS</a></li>
                      <li><a href="#gifts" className="hover:underline">GIFT CARDS</a></li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center space-x-6">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="white"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="white" />
                    </svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                        stroke="white" strokeWidth="1.5" />
                      <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white" />
                    </svg>
                  </a>
                </div>
              </div>
            </footer>

            {/* Back to Top Button */}
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-[90] bg-luxury-gold hover:bg-luxury-gold-light text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
                style={{
                  boxShadow: '0 8px 32px rgba(200, 169, 98, 0.4)'
                }}
                aria-label="Back to top"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}