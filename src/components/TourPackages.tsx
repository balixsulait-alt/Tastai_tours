import { useState } from 'react';
import { Compass, Calendar, Users, MapPin, CheckCircle, XCircle, ChevronDown, ChevronUp, Download, Eye, Smartphone, Heart, Image as ImageIcon, Sparkles, MessageSquare, Info } from 'lucide-react';
import { Currency, TourPackage } from '../types';
import { TOUR_PACKAGES, CURRENCY_CONVERSION } from '../data';

interface TourPackagesProps {
  onSelectPackage: (pkg: TourPackage) => void;
  selectedPackageId: string | null;
  currency: Currency;
  onBookNow: (pkg: TourPackage) => void;
  onAddToOfflineItinerary: (pkg: TourPackage) => void;
  isPkgSavedInOffline: (id: string) => boolean;
}

export default function TourPackages({
  onSelectPackage,
  selectedPackageId,
  currency,
  onBookNow,
  onAddToOfflineItinerary,
  isPkgSavedInOffline,
}: TourPackagesProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Easy' | 'Moderate' | 'Challenging'>('All');
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Filter packages based on difficulty
  const filteredPackages = TOUR_PACKAGES.filter((p) => {
    return activeTab === 'All' || p.difficulty === activeTab;
  });

  // Convert and format currency
  const formatPrice = (priceUSD: number) => {
    const rate = CURRENCY_CONVERSION[currency];
    const converted = Math.round(priceUSD * rate).toLocaleString();
    
    switch (currency) {
      case 'UGX': return `Shs ${converted}`;
      case 'KES': return `Ksh ${converted}`;
      case 'EUR': return `€${converted}`;
      case 'GBP': return `£${converted}`;
      default: return `$${converted}`;
    }
  };

  const selectedPackage = TOUR_PACKAGES.find((p) => p.id === selectedPackageId);

  return (
    <section className="py-16 bg-[#FDFBF7] text-[#2D5A27]" id="tour-packages-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!selectedPackage ? (
          /* ===================================================
             GRID VIEW: BROWSE ALL PACKAGES
             =================================================== */
          <>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[10px] bg-[#2D5A27]/10 border border-[#E5A93B]/40 px-3.5 py-1.5 rounded-full text-[#2D5A27] font-bold tracking-widest uppercase mb-3 inline-block">
                ★ Best Sellers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2D5A27]">
                Our Signature Tailored Safaris &amp; Getaways
              </h2>
              <p className="mt-4 text-gray-600 text-sm sm:text-base font-medium">
                Transparent pricing with uncompromised excellence. We handle flights, transfers, tickets, full-board hotels, and guides. No hidden charges.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex justify-center space-x-2 sm:space-x-3 mb-10 overflow-x-auto pb-2">
              {(['All', 'Easy', 'Moderate', 'Challenging'] as const).map((difficulty) => (
                <button
                  key={difficulty}
                  id={`pkg-tab-filter-${difficulty.toLowerCase()}`}
                  onClick={() => setActiveTab(difficulty)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === difficulty
                      ? 'bg-[#2D5A27] text-white border border-[#E5A93B]/40 shadow-sm'
                      : 'bg-white text-[#2D5A27]/80 border border-[#2D5A27]/20 hover:bg-[#2D5A27]/5'
                  }`}
                >
                  {difficulty === 'All' ? 'All Expeditions' : `${difficulty} Pace`}
                </button>
              ))}
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => {
                const querySaved = isPkgSavedInOffline(pkg.id);
                return (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-3xl overflow-hidden border border-[#2D5A27]/10 shadow-sm hover:shadow-md hover:border-[#E5A93B]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    
                    {/* Thumbnail Image */}
                    <div className="h-64 relative overflow-hidden group">
                      <img
                        src={pkg.heroImage}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                      
                      {/* Interactive metadata badge overlays */}
                      <span className="absolute top-4 left-4 bg-white/95 text-[#2D5A27] border border-[#2D5A27]/10 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                        {pkg.duration}
                      </span>
                      
                      <span className="absolute top-4 right-4 bg-[#2D5A27]/10 text-[#2D5A27] border border-[#2D5A27]/15 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
                        {pkg.difficulty} Pace
                      </span>

                      {/* Display countries */}
                      <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-xs text-[#2D5A27] bg-white/95 px-3 py-1 rounded-full shadow-sm border border-[#2D5A27]/10">
                        <MapPin className="w-4 h-4 text-[#E5A93B]" />
                        <span className="font-bold">{pkg.countries.join(' & ')}</span>
                      </div>
                    </div>

                    {/* Card Content Information */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-[#2D5A27] hover:text-[#E5A93B] transition-colors cursor-pointer" onClick={() => onSelectPackage(pkg)}>
                          {pkg.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-xs leading-relaxed line-clamp-2 font-medium">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Flex benefits parameters */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 border-t border-b border-[#2D5A27]/10 py-3 my-2">
                        <div className="flex items-center space-x-1.5">
                          <Users className="w-3.5 h-3.5 text-[#E5A93B]" />
                          <span>Group: <b className="text-[#E5A93B]">Flexible</b></span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#2D5A27]" />
                          <span className="font-medium">All-Inclusive Sync</span>
                        </div>
                      </div>

                      {/* Ratings + Price Layout */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Pricing starts</p>
                          <span className="text-lg sm:text-xl font-serif font-black text-[#E5A93B]">
                            {formatPrice(pkg.priceUSD)}
                          </span>
                        </div>

                        {/* Interactive Ratings breakdown */}
                        <div className="text-right">
                          <div className="flex items-center justify-end text-[#E5A93B] font-bold text-xs space-x-1">
                            <span>★</span>
                            <span className="text-[#2D5A27]">{pkg.rating}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium">({pkg.reviewsCount} verified reviews)</span>
                        </div>
                      </div>

                      {/* Dynamic buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {/* Download Offline */}
                        <button
                          id={`download-offline-btn-${pkg.id}`}
                          onClick={() => onAddToOfflineItinerary(pkg)}
                          className={`py-2 px-3 border rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-1 cursor-pointer transition-colors ${
                            querySaved 
                              ? 'bg-[#2D5A27]/15 text-[#2D5A27] border-[#2D5A27]/30' 
                              : 'bg-transparent border-[#2D5A27]/20 hover:border-[#E5A93B] text-gray-600'
                          }`}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{querySaved ? 'Vaulted' : 'Keep Offline'}</span>
                        </button>

                        {/* View Program */}
                        <button
                          id={`view-itinerary-btn-${pkg.id}`}
                          onClick={() => onSelectPackage(pkg)}
                          className="py-2.5 px-3 bg-[#E5A93B] hover:bg-[#e5a93b]/90 text-white rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-1 cursor-pointer transform duration-150 active:scale-95 shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Itinerary</span>
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* ===================================================
             DYNAMIC INDIVIDUAL PAGE: DETAILED TEMPLATE FOR SELECTED TRIP
             =================================================== */
          <div className="space-y-10" id="individual-itinerary-template">
            
            {/* Back button header navigation */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#2D5A27]/10 shadow-sm">
              <button
                id="back-to-packages-btn"
                onClick={() => onSelectPackage((null as any))}
                className="px-4 py-2 bg-transparent text-[#2D5A27] hover:text-[#E5A93B] transition-colors text-xs font-bold uppercase tracking-widest flex items-center space-x-2 border border-[#2D5A27]/15 rounded-xl cursor-pointer"
              >
                <span>← Back to Expeditions</span>
              </button>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                <span>Currently Viewing:</span>
                <span className="text-[#E5A93B] font-extrabold max-w-[200px] truncate">{selectedPackage.title}</span>
              </div>
            </div>

            {/* Immersive Splendid Header banner */}
            <div className="relative rounded-3xl h-[450px] overflow-hidden shadow-sm">
              <img
                src={selectedPackage.heroImage}
                alt={selectedPackage.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-black/40 to-black/30"></div>
              
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-3 z-10">
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#2D5A27] text-white border border-[#E5A93B]/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {selectedPackage.duration}
                  </span>
                  <span className="bg-white/10 backdrop-blur-md text-[#E5A93B] border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {selectedPackage.difficulty} Pace
                  </span>
                  <span className="bg-black/40 backdrop-blur-md text-[#ffffff] border border-white/10 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Group size: {selectedPackage.groupSize}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-black">{selectedPackage.title}</h1>
                <p className="text-gray-100 text-sm sm:text-base max-w-3xl leading-relaxed">{selectedPackage.tagline}</p>
              </div>
            </div>

            {/* Core Split layout: Left Itineraries Accordions, Right booking and checklists */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Timeline & Lightbox Gallery (8 Columns) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Timeline Accordions Intro */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#2D5A27]/10 space-y-6 shadow-sm">
                  <div className="flex justify-between items-center border-b border-[#2D5A27]/10 pb-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold flex items-center space-x-2 text-[#2D5A27]">
                      <Sparkles className="w-5 h-5 text-[#E5A93B]" />
                      <span>Day-by-Day Journey Itinerary</span>
                    </h3>
                    <span className="text-[10px] text-gray-500 border border-[#2D5A27]/15 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Interactive Board</span>
                  </div>

                  {/* Dynamic Timeline Accordions */}
                  <div className="space-y-4">
                    {selectedPackage.itinerary.map((itineraryDay) => {
                      const isExpanded = expandedDay === itineraryDay.day;
                      return (
                        <div 
                          key={itineraryDay.day}
                          className={`rounded-2xl border transition-all duration-300 ${
                            isExpanded 
                              ? 'bg-[#2D5A27]/5 border-[#E5A93B]/40 shadow-sm' 
                              : 'bg-transparent border-[#2D5A27]/10 hover:border-[#2D5A27]/20'
                          }`}
                        >
                          {/* Accordion Toggle header trigger */}
                          <button
                            id={`day-toggle-btn-${itineraryDay.day}`}
                            onClick={() => setExpandedDay(isExpanded ? 0 : itineraryDay.day)}
                            className="w-full text-left px-5 py-4 flex justify-between items-center cursor-pointer"
                          >
                            <div className="flex items-center space-x-4">
                              <span className="h-10 w-10 shrink-0 rounded-full bg-[#E5A93B] text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                                {itineraryDay.day}
                              </span>
                              <div>
                                <span className="text-[9px] uppercase font-bold tracking-widest text-[#E5A93B] block">Day {itineraryDay.day} Expedition</span>
                                <h4 className="text-xs sm:text-base font-bold text-[#2D5A27] pr-2">{itineraryDay.title}</h4>
                              </div>
                            </div>
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                          </button>

                          {/* Accordion Body contents */}
                          {isExpanded && (
                            <div className="px-5 pb-5 pt-1 border-t border-[#2D5A27]/10 space-y-4 animate-fadeIn">
                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                                
                                {/* Image slide within day list */}
                                <div className="sm:col-span-4 h-36 rounded-xl overflow-hidden relative border border-[#2D5A27]/10 shrink-0">
                                  <img 
                                    src={itineraryDay.image} 
                                    alt={itineraryDay.title} 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                                    <span className="text-[9px] font-mono text-gray-300 uppercase">Interactive View</span>
                                  </div>
                                </div>

                                {/* Text descriptions */}
                                <div className="sm:col-span-8 space-y-3">
                                  <p className="text-sm text-gray-600 leading-relaxed font-sans font-medium">{itineraryDay.description}</p>
                                  
                                  <div className="space-y-1.5">
                                    <h5 className="text-[10px] text-[#E5A93B] font-bold tracking-widest uppercase mb-1">Inclusions checklist for today:</h5>
                                    {itineraryDay.activities.map((act, actIdx) => (
                                      <div key={actIdx} className="flex items-start space-x-2 text-xs text-gray-500 font-semibold">
                                        <span className="text-[#E5A93B] mt-0.5 animate-pulse">✓</span>
                                        <span>{act}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                              </div>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Lightbox Immersive Media Photo Gallery */}
                <div className="bg-white p-6 rounded-3xl border border-[#2D5A27]/10 space-y-4 shadow-sm">
                  <h3 className="font-serif text-lg font-bold flex items-center space-x-2 text-[#2D5A27]">
                    <ImageIcon className="w-5 h-5 text-[#2D5A27]" />
                    <span>Experiential Media Gallery</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Actual highlights showing giant tortoises, snorkeling, clear kayaking, and cultural interactions. Click to enlarge details.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedPackage.gallery.map((imgUrl, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="h-28 sm:h-32 rounded-xl overflow-hidden cursor-pointer border border-[#2D5A27]/10 hover:border-amber-500/40 relative group"
                        onClick={() => setActiveLightboxImage(imgUrl)}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`Gallery Highlight ${imgIdx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Lightbox Trigger overlay */}
                  {activeLightboxImage && (
                    <div 
                      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
                      onClick={() => setActiveLightboxImage(null)}
                    >
                      <button 
                        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white"
                        onClick={() => setActiveLightboxImage(null)}
                      >
                        ✕
                      </button>
                      <img 
                        src={activeLightboxImage} 
                        alt="Enlarged Highlight View" 
                        className="max-w-full max-h-[85vh] rounded-2xl object-contain border border-[#E5A93B]/20"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-6 bg-black/60 px-4 py-2 border border-[#2D5A27]/30 rounded-full text-xs text-gray-300">
                        Showing official Tastai Safari asset. Click anywhere to return.
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Pricing, Inclusions/Exclusions Checklist Panel, Action CTA (4 Columns) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Dynamic Price Calculator Card */}
                <div className="bg-white p-6 rounded-3xl border border-[#2D5A27]/10 shadow-sm space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#2D5A27]/80 font-bold block">Consolidated pricing:</span>
                    <h3 className="font-serif text-3xl font-black text-[#E5A93B] mt-1">{formatPrice(selectedPackage.priceUSD)}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 font-medium">Converted rates displayed in <b>{currency}</b></p>
                  </div>

                  <div className="bg-[#2D5A27]/5 p-4 rounded-2xl border-0 text-xs text-gray-600 leading-relaxed font-medium">
                    <p className="font-bold text-[#2D5A27]">Package Sync Guidelines:</p>
                    <p className="mt-1">Flexible itineraries, private expert local trackers, and flight synchronization. Rate includes AMREF evacuation medical cover.</p>
                  </div>

                  <div className="space-y-2">
                    {/* Instant conversion Booking */}
                    <button
                      id="pkg-detailed-book-btn"
                      onClick={() => onBookNow(selectedPackage)}
                      className="w-full py-4 bg-[#E5A93B] hover:bg-[#e5a93b]/95 text-white rounded-full text-center font-bold tracking-wider uppercase text-xs shadow-sm transition-all cursor-pointer hover:-translate-y-0.5"
                    >
                      Instant Inquiry &amp; Wire Sync
                    </button>

                    {/* Keep Offline */}
                    <button
                      id="pkg-detailed-offline-btn"
                      onClick={() => onAddToOfflineItinerary(selectedPackage)}
                      className={`w-full py-3.5 border rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer transition-colors ${
                        isPkgSavedInOffline(selectedPackage.id)
                          ? 'bg-[#2D5A27]/10 border-[#2D5A27]/20 text-[#2D5A27]'
                          : 'bg-transparent border-[#2D5A27]/15 text-[#2D5A27] hover:border-[#E5A93B]'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>{isPkgSavedInOffline(selectedPackage.id) ? 'Saved in Offline Vault' : 'Sync to Remote Access'}</span>
                    </button>
                  </div>

                  {/* Sticky WhatsApp badging helper */}
                  <div className="bg-emerald-50/50 border border-emerald-500/20 p-4 rounded-2xl flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500 text-white shrink-0">
                      <MessageSquare className="w-5 h-5 fill-white" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-[#2D5A27] uppercase tracking-wider text-[10px]">Speak to Joshua (Guide)</h4>
                      <p className="text-gray-600 text-[11px] mt-0.5">Direct chat regarding group size &amp; custom flights.</p>
                      <a 
                        href="https://wa.me/256779726158" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-emerald-600 hover:underline inline-block mt-1 font-bold"
                      >
                        WhatsApp Desk Now
                      </a>
                    </div>
                  </div>

                </div>

                {/* Explicit Inclusions & Exclusions Checklist panels */}
                <div className="bg-white p-6 rounded-3xl border border-[#2D5A27]/10 space-y-6 shadow-sm">
                  
                  {/* Inclusions */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-sm font-bold text-[#2D5A27] flex items-center space-x-1.5 pb-2 border-b border-[#2D5A27]/10">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                      <span className="tracking-wider uppercase text-xs text-emerald-600">We Cover (All-Inclusive)</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600 font-medium">
                      {selectedPackage.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-emerald-600 shrink-0 font-bold">&#10003;</span>
                          <span className="leading-tight">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="space-y-3 pt-4 border-t border-[#2D5A27]/10">
                    <h4 className="font-serif text-sm font-bold text-[#2D5A27] flex items-center space-x-1.5 pb-2 border-b border-[#2D5A27]/10">
                      <XCircle className="w-4.5 h-4.5 text-red-500" />
                      <span className="tracking-wider uppercase text-xs text-red-500 font-bold">Not Included</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-500 font-medium font-medium">
                      {selectedPackage.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-red-500 shrink-0 font-bold">&#10007;</span>
                          <span className="leading-tight">{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
