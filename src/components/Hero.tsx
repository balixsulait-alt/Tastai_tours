import { useState, useEffect } from 'react';
import { Compass, Calendar, ArrowRight, Play, ArrowLeft, ArrowUpRight, Award, Flame, Users, CheckCircle } from 'lucide-react';

interface HeroProps {
  onExplorePackages: () => void;
  onBookConsultation: () => void;
}

export default function Hero({ onExplorePackages, onBookConsultation }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Excellence in Travel & Safari Experiences',
      subtitle: 'DISCOVER IMMERSIVE EAST AFRICA',
      description: 'Catering to international couples, families, and local weekenders seeking high-end, completely transparent packages. No hidden fees. Only authentic encounters.',
      badge: '★ Best Luxury Operator 2026',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80', // Safari Sunset
      tags: ['Wildlife Safaris', 'Cultural Dances', 'Local Guides'],
      highlightText: '5 Days Magical Zanzibar Getaways starting at $1,250'
    },
    {
      title: 'Turquoise Waters & Coral Island Snorkeling',
      subtitle: 'AUTHENTIC ZANZIBAR ESCAPE',
      description: 'Glide on crystal-clear kayaks, feed century-old Aldabra giant tortoises, swim with wild dolphins off Mnemba reefs, and rev high on Jet Car desert beaches.',
      badge: '🌊 Crystal Clear Shores',
      image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1920&q=80', // Zanzibar Beach
      tags: ['Clear Kayaking', 'Swahili Feasts', 'Sea Turtle Swims'],
      highlightText: 'Full-board Airbnb & premium flights included'
    },
    {
      title: 'Trek with Mountain Gorillas',
      subtitle: 'MISTY EQUATORIAL RAINFORESTS',
      description: 'Climb deep into the ancient jungle canopy of Bwindi to match eyes with silverback gorilla families. An unforgettable journey of connection and raw nature.',
      badge: '🦍 Lifetime Encounter',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80', // Ugandan Wildlife
      tags: ['Bwindi canopy', 'Batwa Tribe Guide', '100% Permit Sync'],
      highlightText: 'Expert forest rangers and official tracking certificates'
    }
  ];

  // Rotate slides automatically every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative min-h-[90vh] bg-[#FDFBF7] overflow-hidden flex items-center" id="hero-slider-section">
      
      {/* Background Images with Zoom & Crossfade animation */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? 'opacity-25 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transition-transform duration-[8000ms]`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Elegant vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-[#FDFBF7]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/90 via-[#FDFBF7]/40 to-transparent" />
        </div>
      ))}

      {/* Decorative Warm Ochre Sunset Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#E5A93B]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-[#2D5A27]/10 blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 w-full text-[#2D5A27]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Slide Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#2D5A27] border border-[#E5A93B]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white animate-bounce">
              <span className="text-[#E5A93B] font-bold">★</span>
              <span>{slides[activeSlide].badge}</span>
            </div>

            {/* Slide Subheading */}
            <p className="font-serif text-[#E5A93B] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
              {slides[activeSlide].subtitle}
            </p>

            {/* Slide Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6.5xl font-black leading-tight tracking-tight text-[#2D5A27] max-w-3xl italic">
              {slides[activeSlide].title.split('&').map((chunk, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-[#E5A93B] block sm:inline"> &amp; </span>}
                  {chunk}
                </span>
              ))}
            </h1>

            {/* Slide Description */}
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-sans font-medium">
              {slides[activeSlide].description}
            </p>

            {/* In-slide Itinerary Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {slides[activeSlide].tags.map((tag, i) => (
                <span key={i} className="text-xs font-bold px-3 py-1.5 bg-[#2D5A27]/5 border border-[#2D5A27]/10 text-[#2D5A27] rounded-full">
                  ✓ {tag}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="hero-explore-packages-btn"
                onClick={onExplorePackages}
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-[#2D5A27] hover:bg-[#2D5A27]/90 text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg border border-[#E5A93B]/20 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Explore Packages</span>
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </button>

              <button
                id="hero-book-consult-btn"
                onClick={onBookConsultation}
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-[#E5A93B] hover:bg-[#E5A93B]/90 text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm border border-transparent cursor-pointer"
              >
                <span>Book Free Consultation</span>
                <Calendar className="w-4 h-4 group-hover:text-emerald-100 transition-colors" />
              </button>
            </div>

            {/* Subtext Highlight Grid */}
            <div className="pt-6 border-t border-[#2D5A27]/10 flex items-center space-x-3 text-xs sm:text-sm text-gray-500">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
              <span>
                <b className="text-[#E5A93B]">Hot Deal:</b> {slides[activeSlide].highlightText}
              </span>
            </div>

          </div>

          {/* Quick High-End Side Badge / Trust Factor panel */}
          <div className="lg:col-span-4 hidden lg:block bg-white/95 backdrop-blur-sm p-6 rounded-3xl border border-[#2D5A27]/10 space-y-4 text-[#2D5A27] shadow-md">
            <h3 className="font-serif text-lg text-[#2D5A27] font-bold border-b border-[#2D5A27]/10 pb-2 flex items-center justify-between">
              <span>Why Tastai Safaris?</span>
              <Award className="w-5 h-5 text-[#E5A93B]" />
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2D5A27]">Zero Hidden Charges</h4>
                  <p className="text-[11px] text-gray-600">Uncompromised absolute honesty. Inclusions cover flights, entry fees, taxes, full-board accommodation as stated.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2D5A27]">Licensed Local Guides</h4>
                  <p className="text-[11px] text-gray-600">Our indigenous Swahili and Ugandan field guides speak deep local histories, animal tracking, and hidden beach bays.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Compass className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2D5A27]">End-to-End Coordination</h4>
                  <p className="text-[11px] text-gray-600">We manage airline ticket sync, airport ground transfers, medical extraction cover, national park entry clearances.</p>
                </div>
              </div>
            </div>

            {/* Simple interactive slider bullets */}
            <div className="flex justify-center space-x-2 pt-2 border-t border-[#2D5A27]/10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  id={`slide-bullet-${i}`}
                  onClick={() => setActiveSlide(i)}
                  className={`h-2 transition-all duration-300 ${
                    activeSlide === i ? 'w-8 bg-[#E5A93B] rounded-full' : 'w-2 bg-gray-300 rounded-full hover:bg-[#2D5A27]'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Slide Navigation Buttons at the bottom right */}
      <div className="absolute bottom-6 right-6 flex space-x-3 z-20">
        <button
          id="prev-slide-btn"
          onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="p-3 bg-white/95 hover:bg-[#2D5A27] text-[#2D5A27] hover:text-white border border-[#2D5A27]/10 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          id="next-slide-btn"
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          className="p-3 bg-white/95 hover:bg-[#2D5A27] text-[#2D5A27] hover:text-white border border-[#2D5A27]/10 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
