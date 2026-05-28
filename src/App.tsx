import { useState, useEffect } from 'react';
import { Compass, ShieldCheck, Mail, Phone, Clock, MessageSquare, Menu, MapPin, ChevronRight, CheckCircle, Award, Volume2, ShieldAlert } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AttractionsMap from './components/AttractionsMap';
import TourPackages from './components/TourPackages';
import BookingForm from './components/BookingForm';
import OfflinePlanner from './components/OfflinePlanner';
import ReviewSystem from './components/ReviewSystem';
import Footer from './components/Footer';
import { Currency, TourPackage, FlightAlert, UserReview, EastAfricanLandmark } from './types';
import { TOUR_PACKAGES } from './data';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  
  // Offline Saved Packages state
  const [savedPackages, setSavedPackages] = useState<TourPackage[]>([]);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [addedLandmarks, setAddedLandmarks] = useState<string[]>([]);

  // User Reviews local state
  const [customReviews, setCustomReviews] = useState<UserReview[]>([]);

  // Push Notifications state
  const [notifications, setNotifications] = useState<FlightAlert[]>([
    {
      id: 'alert-1',
      timestamp: '11:45 AM',
      type: 'gate',
      title: 'Flight UR420 Gate Change',
      message: 'Ural Air flight Entebbe to Zanzibar shifted to Gate 6. Boarding begins shortly.',
      read: false
    },
    {
      id: 'alert-2',
      timestamp: '11:12 AM',
      type: 'guide',
      title: 'Tastai Guide Assigned',
      message: 'Guide Captain Joshua has checked in at Stone Town private transfer bay. AC transport ready.',
      read: false
    },
    {
      id: 'alert-3',
      timestamp: '09:05 AM',
      type: 'weather',
      title: 'Zanzibar Reef Outlook',
      message: 'Mnemba private marine zone reports crystal blue skies, gentle 3-knot tides. Snorkeling optimal.',
      read: true
    }
  ]);

  // Live Toast state
  const [activeToast, setActiveToast] = useState<FlightAlert | null>(null);

  // Load state from localStorage on startup
  useEffect(() => {
    const savedOfflines = localStorage.getItem('tastai_saved_itineraries');
    if (savedOfflines) {
      try {
        const ids = JSON.parse(savedOfflines) as string[];
        const matchingPkgs = TOUR_PACKAGES.filter((p) => ids.includes(p.id));
        setSavedPackages(matchingPkgs);
      } catch (e) {
        console.error(e);
      }
    }

    const savedReviews = localStorage.getItem('tastai_user_reviews');
    if (savedReviews) {
      try {
        setCustomReviews(JSON.parse(savedReviews));
      } catch (e) {
        console.error(e);
      }
    }

    const savedLms = localStorage.getItem('tastai_saved_landmarks');
    if (savedLms) {
      try {
        setAddedLandmarks(JSON.parse(savedLms));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAddToOfflineItinerary = (pkg: TourPackage) => {
    const alreadySaved = savedPackages.some((p) => p.id === pkg.id);
    let updatedPkgs = [...savedPackages];
    
    if (alreadySaved) {
      updatedPkgs = savedPackages.filter((p) => p.id !== pkg.id);
      setActiveToast({
        id: 'toast-' + Date.now(),
        timestamp: 'Just now',
        type: 'schedule',
        title: 'Cache Purged',
        message: `"${pkg.title.split(' & ')[0]}" removed from wilderness remote vault.`,
        read: false
      });
    } else {
      updatedPkgs.push(pkg);
      setActiveToast({
        id: 'toast-' + Date.now(),
        timestamp: 'Just now',
        type: 'schedule',
        title: 'Offline Sync Successful',
        message: `"${pkg.title.split(' & ')[0]}" saved dynamically. Ready for remote remote offline access.`,
        read: false
      });
    }

    setSavedPackages(updatedPkgs);
    localStorage.setItem('tastai_saved_itineraries', JSON.stringify(updatedPkgs.map((p) => p.id)));
  };

  const handleAddCustomItinerary = (landmark: EastAfricanLandmark) => {
    const alreadySaved = addedLandmarks.includes(landmark.id);
    let updatedLms = [...addedLandmarks];

    if (alreadySaved) {
      updatedLms = addedLandmarks.filter((id) => id !== landmark.id);
      setActiveToast({
        id: 'toast-' + Date.now(),
        timestamp: 'Just now',
        type: 'schedule',
        title: 'Landmark Removed',
        message: `"${landmark.name}" purged from local survival board.`,
        read: false
      });
    } else {
      updatedLms.push(landmark.id);
      setActiveToast({
        id: 'toast-' + Date.now(),
        timestamp: 'Just now',
        type: 'schedule',
        title: 'Landmark Draft Saved',
        message: `"${landmark.name}" coordinates mapped inside of local survival board.`,
        read: false
      });
    }

    setAddedLandmarks(updatedLms);
    localStorage.setItem('tastai_saved_landmarks', JSON.stringify(updatedLms));
  };

  const handleRemovePackage = (id: string) => {
    const updated = savedPackages.filter((p) => p.id !== id);
    setSavedPackages(updated);
    localStorage.setItem('tastai_saved_itineraries', JSON.stringify(updated.map((p) => p.id)));
  };

  const isPkgSavedInOffline = (id: string) => {
    return savedPackages.some((p) => p.id === id);
  };

  const handleAddNewReview = (review: UserReview) => {
    const updatedReviews = [review, ...customReviews];
    setCustomReviews(updatedReviews);
    localStorage.setItem('tastai_user_reviews', JSON.stringify(updatedReviews));

    setActiveToast({
      id: 'toast-' + Date.now(),
      timestamp: 'Just now',
      type: 'schedule',
      title: 'Review System Sync',
      message: 'Verified traveler review parsed on local ledger cache.',
      read: false
    });
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Simulating custom notification trigger from a button
  const simulateLiveAlert = () => {
    const titles = [
      'Flight UR420 Gate Shift',
      'Local Guide Alert',
      'Zanzibar Marine Warning',
      'Gorilla Tracking Brief'
    ];
    const msgs = [
      'Outbound flight UR420 gate updated to Gate 2. Baggage claims remain safe.',
      'Guide Joshua reports clear kayak sets checked in and ready at Matemwe Bay.',
      'Dolphin pod sighted: 12 spinner dolphins active near Mnemba reefs.',
      'Bwindi rangers confirm Rushegura Gorilla family within 2km trek. Terrain stable.'
    ];
    const types: ('gate' | 'guide' | 'weather' | 'schedule')[] = ['gate', 'guide', 'weather', 'schedule'];
    
    const index = Math.floor(Math.random() * titles.length);
    const newAlert: FlightAlert = {
      id: 'alert-' + Date.now(),
      timestamp: 'Just Now',
      type: types[index],
      title: titles[index],
      message: msgs[index],
      read: false
    };

    setNotifications((prev) => [newAlert, ...prev]);
    setActiveToast(newAlert);
  };

  const handleSelectPackageByLandmark = (id: string) => {
    setSelectedPackageId(id);
    setActivePage('packages');
    // Scroll to section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNow = (pkg: TourPackage) => {
    setSelectedPackageId(pkg.id);
    setActivePage('booking');
    // Scroll to section
    setTimeout(() => {
      const el = document.getElementById('booking-payment-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenConsultation = () => {
    setActivePage('booking');
    setTimeout(() => {
      const el = document.getElementById('booking-payment-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#161814] text-gray-100 flex flex-col justify-between font-sans selection:bg-[#E5A93B] selection:text-gray-950">
      
      {/* Immersive Top-Level Sticky Navigation bar */}
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          if (page !== 'packages') {
            setSelectedPackageId(null);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currency={currency}
        setCurrency={setCurrency}
        notifications={notifications}
        markNotificationsRead={markNotificationsRead}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Main Dynamic View routing switcher */}
      <main className="flex-1">

        {/* Dynamic active screen overlays */}
        {activePage === 'home' && (
          <div className="space-y-0 animate-fadeIn">
            
            {/* Immersive high resolution Hero Slider */}
            <Hero
              onExplorePackages={() => {
                setActivePage('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookConsultation={handleOpenConsultation}
            />

            {/* About us Snapshot Grid Section */}
            <section className="py-16 bg-[#161814] text-white" id="about-us-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  
                  {/* High fidelity logo visual panel */}
                  <div className="bg-[#1C1E1A] p-8 rounded-3xl border border-[#2D5A27]/30 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-[150px] text-emerald-500 font-serif font-black select-none">
                      T
                    </div>
                    
                    <div className="space-y-6 relative z-10">
                      <span className="text-[10px] bg-[#2D5A27]/40 border border-[#E5A93B]/30 px-3 py-1 rounded-full text-[#E5A93B] font-bold tracking-widest uppercase inline-block">
                        ★ Integrity &amp; Excellence
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">Uncompromised Luxury, Local Pricing transparency</h3>
                      
                      <div className="space-y-3.5 text-xs text-gray-400">
                        <p className="leading-relaxed">Tastai Safaris was founded on a commitment of total client empowerment. We bridge the gap between complex premium travel coordination and genuine, ground-honest local prices.</p>
                        <p className="leading-relaxed">Whether planning high-end corporate packages, private couples getaways, or immersive cultural excursions, our certified guides and luxury flights operate with zero hidden charges.</p>
                      </div>

                      <div className="border-t border-[#2D5A27]/10 pt-6 flex items-center justify-between">
                        <div className="text-center bg-[#161814] p-3 rounded-xl border border-[#2D5A27]/15">
                          <span className="text-xl font-serif font-black text-[#E5A93B] block">100%</span>
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mt-1">Settle Trust</span>
                        </div>
                        <div className="text-center bg-[#161814] p-3 rounded-xl border border-[#2D5A27]/15">
                          <span className="text-xl font-serif font-black text-[#E5A93B] block">256+</span>
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mt-1">Escapes Done</span>
                        </div>
                        <div className="text-center bg-[#161814] p-3 rounded-xl border border-[#2D5A27]/15">
                          <span className="text-xl font-serif font-black text-[#E5A93B] block">Licensed</span>
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mt-1">UTB Operator</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why Choose Us checklist columns */}
                  <div className="space-y-6">
                    <span className="text-xs font-bold text-[#E5A93B] uppercase tracking-widest block font-serif">Why Travelers Pick Tastai</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">The Core Pillars of Our Travel Safeguard</h2>
                    
                    <div className="space-y-4 pt-2">
                      {/* Pillar 1 */}
                      <div className="flex items-start space-x-3.5">
                        <div className="h-8 w-8 bg-emerald-500/10 border border-emerald-500/30 font-extrabold text-[#E5A93B] text-xs flex items-center justify-center rounded-lg mt-0.5 shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">No Hidden Charges Transparency</h4>
                          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">Flights, airport AC ground transfers, Swahili excursions, national park entry fees, Airbnb full boards, and rescue insurance are completely locked on booking.</p>
                        </div>
                      </div>

                      {/* Pillar 2 */}
                      <div className="flex items-start space-x-3.5">
                        <div className="h-8 w-8 bg-emerald-500/10 border border-emerald-500/30 font-extrabold text-[#E5A93B] text-xs flex items-center justify-center rounded-lg mt-0.5 shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Expert Guides &amp; True Cultural Integration</h4>
                          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">No generic sightseeing tours. Learn survival codes directly from indigenous Batwa forest tracking units, or high-jump in local Maasai tribal warrior bomas.</p>
                        </div>
                      </div>

                      {/* Pillar 3 */}
                      <div className="flex items-start space-x-3.5">
                        <div className="h-8 w-8 bg-emerald-500/10 border border-emerald-500/30 font-extrabold text-[#E5A93B] text-xs flex items-center justify-center rounded-lg mt-0.5 shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Physical Kampala headquarters</h4>
                          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">Tastai Safaris operates dynamic physical routing branches at Plot 75 Bukoto Street, Kampala, with active interbank escrow audits verified directly.</p>
                        </div>
                      </div>
                    </div>

                    {/* Simulation Push Alerts desk controller directly in about container */}
                    <div className="pt-6 border-t border-[#2D5A27]/20 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-white uppercase">Simulate Live Flight/Guide push notifications:</h5>
                        <p className="text-[10px] text-gray-500">Test the real-time push alert desk.</p>
                      </div>
                      <button
                        id="test-sim-alert-btn"
                        onClick={simulateLiveAlert}
                        className="py-2.5 px-4 bg-transparent border-dashed border border-emerald-500/40 hover:border-[#E5A93B] text-xs text-emerald-300 font-bold rounded-xl hover:text-white transition-all duration-300 cursor-pointer"
                      >
                        ⚡ Simulate Push Alert
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* Attractions Map Preview Section */}
            <AttractionsMap
              onSelectPackageByLandmark={handleSelectPackageByLandmark}
              onAddCustomItinerary={handleAddCustomItinerary}
              addedLandmarks={addedLandmarks}
            />

            {/* Featured Best Sellers (Tour packages grid) block */}
            <TourPackages
              onSelectPackage={(pkg) => {
                if (pkg) {
                  setSelectedPackageId(pkg.id);
                  setActivePage('packages');
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }
              }}
              selectedPackageId={null}
              currency={currency}
              onBookNow={handleBookNow}
              onAddToOfflineItinerary={handleAddToOfflineItinerary}
              isPkgSavedInOffline={isPkgSavedInOffline}
            />

            {/* Inquire consultation segment directly inline */}
            <BookingForm initialSelectedPackage={null} currency={currency} />

            {/* Client story testimonials showcase snippet */}
            <ReviewSystem customReviews={customReviews} onAddNewReview={handleAddNewReview} />

          </div>
        )}

        {/* View Page: Tours */}
        {activePage === 'packages' && (
          <TourPackages
            onSelectPackage={(pkg) => {
              setSelectedPackageId(pkg ? pkg.id : null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedPackageId={selectedPackageId}
            currency={currency}
            onBookNow={handleBookNow}
            onAddToOfflineItinerary={handleAddToOfflineItinerary}
            isPkgSavedInOffline={isPkgSavedInOffline}
          />
        )}

        {/* View Page: Interaction Map */}
        {activePage === 'map' && (
          <AttractionsMap
            onSelectPackageByLandmark={handleSelectPackageByLandmark}
            onAddCustomItinerary={handleAddCustomItinerary}
            addedLandmarks={addedLandmarks}
          />
        )}

        {/* View Page: Booking Payments */}
        {activePage === 'booking' && (
          <BookingForm 
            initialSelectedPackage={TOUR_PACKAGES.find((p) => p.id === selectedPackageId) || null} 
            currency={currency} 
          />
        )}

        {/* View Page: Offline remote planner */}
        {activePage === 'offline' && (
          <OfflinePlanner
            savedPackages={savedPackages}
            onRemovePackage={handleRemovePackage}
            isOfflineMode={isOfflineMode}
            setIsOfflineMode={setIsOfflineMode}
          />
        )}

        {/* View Page: Stories Testimonials reviews */}
        {activePage === 'reviews' && (
          <ReviewSystem customReviews={customReviews} onAddNewReview={handleAddNewReview} />
        )}

      </main>

      {/* Persistent global sticky WhatsApp Badge button in absolute margins */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center space-x-2 animate-fadeIn bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 shadow-xl text-xs font-mono">
        <span className="text-[10px] bg-emerald-500 text-gray-900 font-extrabold px-1.5 py-0.5 rounded uppercase">24/7 Desk</span>
        <span className="text-gray-400">Offline Access Ready</span>
      </div>

      <div className="fixed bottom-6 right-6 z-40" id="sticky-whatsapp-badge">
        <a 
          href="https://wa.me/256779726158" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all font-sans text-xs sm:text-sm uppercase tracking-wider scale-95 hover:scale-100"
          title="Inquire directly on WhatsApp"
        >
          <span className="h-3 w-3 bg-white rounded-full animate-ping mr-0.5 inline-block sm:hidden md:inline-block"></span>
          <span>WhatsApp Chat</span>
        </a>
      </div>

      {/* Dynamic Slide toast on the screen for alerts actions */}
      {activeToast && (
        <div 
          className="fixed bottom-20 left-6 z-50 bg-[#1C1E1A] border-2 border-[#E5A93B] text-white p-4 rounded-2xl shadow-2xl max-w-sm w-full animate-slideUp font-sans"
          id="live-push-toast-notif"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl">🔔</span>
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest">{activeToast.title}</span>
                <p className="text-xs text-gray-300 font-bold">{activeToast.message}</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveToast(null)}
              className="text-gray-500 hover:text-white text-xs font-bold font-mono"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Responsive Footer sections */}
      <Footer 
        onGoToTab={(tab) => {
          setActivePage(tab);
          setSelectedPackageId(null);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }} 
      />

    </div>
  );
}
