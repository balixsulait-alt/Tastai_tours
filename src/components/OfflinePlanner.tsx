import { useState, useEffect } from 'react';
import { Smartphone, ShieldAlert, Award, Compass, Download, CheckSquare, Trash2, PhoneCall, AlertTriangle, Layers, Map, LifeBuoy } from 'lucide-react';
import { TourPackage } from '../types';
import { EMERGENCY_NUMBERS, REMOTE_SURVIVAL_GUIDE } from '../data';

interface OfflinePlannerProps {
  savedPackages: TourPackage[];
  onRemovePackage: (id: string) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
}

export default function OfflinePlanner({
  savedPackages,
  onRemovePackage,
  isOfflineMode,
  setIsOfflineMode,
}: OfflinePlannerProps) {
  const [activeOfflineTab, setActiveOfflineTab] = useState<'itineraries' | 'survival' | 'emergency'>('itineraries');
  const [activeSavedPkgId, setActiveSavedPkgId] = useState<string>('');

  useEffect(() => {
    if (savedPackages.length > 0 && !activeSavedPkgId) {
      setActiveSavedPkgId(savedPackages[0].id);
    }
  }, [savedPackages, activeSavedPkgId]);

  const activeSavedPkg = savedPackages.find((p) => p.id === activeSavedPkgId) || savedPackages[0];

  return (
    <section className="py-16 bg-[#FDFBF7] text-[#2D5A27]" id="offline-vault-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[10px] bg-[#2D5A27]/10 border border-[#E5A93B]/40 px-3.5 py-1.5 rounded-full text-[#2D5A27] font-bold tracking-widest uppercase mb-3 inline-block animate-pulse">
            📡 Offline Remote Vault
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2D5A27]">
            Remote Offline Access &amp; Wilderness Guide
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base font-medium">
            No internet in the deep savannah or gorilla jungles? No problem. Sync your trip packages beforehand to access itineraries, survival rules, and emergency lines fully local.
          </p>
        </div>

        {/* Global Network coverage Simulator banner */}
        <div className="bg-white border border-[#2D5A27]/10 rounded-3xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className={`p-4 rounded-2xl shrink-0 flex items-center justify-center text-2xl ${
              isOfflineMode 
                ? 'bg-amber-100 text-amber-900 border border-amber-500/20' 
                : 'bg-[#2D5A27]/10 text-[#2D5A27]'
            }`}>
              📡
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg font-bold text-[#2D5A27]">Network Coverage Simulator</h3>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                  isOfflineMode 
                    ? 'bg-amber-100 text-amber-900 border border-amber-500/20' 
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-500/20'
                }`}>
                  {isOfflineMode ? 'Jungle Mode Active' : 'Online Coverage'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 max-w-xl font-medium">
                {isOfflineMode 
                  ? 'Simulating zero cellular network coverage inside Bwindi Impenetrable Canopy. Only client-side local cache routes are active.'
                  : 'Connected to Tastai Kampala Server. Sinking local packages to browser LocalStorage is available.'}
              </p>
            </div>
          </div>

          <button
            id="network-simulator-toggle-btn"
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`w-full md:w-auto px-5 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center space-x-1 border ${
              isOfflineMode 
                ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500' 
                : 'bg-transparent border-[#2D5A27]/20 text-[#2D5A27] hover:bg-[#2D5A27]/5'
            }`}
          >
            <span>{isOfflineMode ? 'Re-connect Online' : 'Simulate Jungle Offline'}</span>
          </button>
        </div>

        {/* Main Vault Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sub Tabs Sidebar (4 Columns) */}
          <div className="lg:col-span-4 bg-white border border-[#2D5A27]/10 rounded-3xl p-5 space-y-4 shadow-sm">
            
            <span className="text-[10px] text-[#2D5A27]/80 font-bold tracking-widest uppercase block border-b border-[#2D5A27]/10 pb-2">
              Select Vault Module
            </span>

            <div className="flex flex-col space-y-2">
              {/* Local Itineraries */}
              <button
                id="vault-tab-itineraries"
                onClick={() => setActiveOfflineTab('itineraries')}
                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-colors flex items-center justify-between cursor-pointer ${
                  activeOfflineTab === 'itineraries' 
                    ? 'bg-[#2D5A27] text-white' 
                    : 'text-gray-600 hover:bg-[#2D5A27]/5'
                }`}
              >
                <span>Synced Itineraries</span>
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {savedPackages.length}
                </span>
              </button>

              {/* Jungle Survival Guide */}
              <button
                id="vault-tab-survival"
                onClick={() => setActiveOfflineTab('survival')}
                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-colors flex items-center justify-between cursor-pointer ${
                  activeOfflineTab === 'survival' 
                    ? 'bg-[#2D5A27] text-white' 
                    : 'text-gray-600 hover:bg-[#2D5A27]/5'
                }`}
              >
                <span>Wilderness Survival Details</span>
                <LifeBuoy className="w-4 h-4 text-[#E5A93B]" />
              </button>

              {/* Emergency lines */}
              <button
                id="vault-tab-emergency"
                onClick={() => setActiveOfflineTab('emergency')}
                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-colors flex items-center justify-between cursor-pointer ${
                  activeOfflineTab === 'emergency' 
                    ? 'bg-[#2D5A27] text-white' 
                    : 'text-gray-600 hover:bg-[#2D5A27]/5'
                }`}
              >
                <span>Radio &amp; Hot Dial List</span>
                <PhoneCall className="w-4 h-4 text-[#E5A93B]" />
              </button>
            </div>

            {/* Quick Tips panel */}
            <div className="bg-[#2D5A27]/5 p-4 rounded-2xl border-0 text-[11px] text-gray-650 font-medium space-y-2">
              <span className="text-[#2D5A27] font-bold uppercase block">Security compliance:</span>
              <p className="leading-relaxed">Offline capability utilizes <b>W3C Web Storage standards</b> to retain text schedules and emergency guides on your smartphone local state completely isolated from telecom cell mast lookups.</p>
            </div>

          </div>

          {/* Right Column: Display Panel (8 Columns) */}
          <div className="lg:col-span-8 bg-white border border-[#2D5A27]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm min-h-[400px]" id="offline-terminal">
            
            {/* =======================================
                MODULE 1: SYNCED ITINERARIES LIST
                ======================================= */}
            {activeOfflineTab === 'itineraries' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[#2D5A27]/10 pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#2D5A27]">Your Offline Air-synced Trips</h3>
                  <span className="text-[10px] text-[#2D5A27]/60 font-mono">Ledger Local Cache</span>
                </div>

                {savedPackages.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <span className="text-4xl block">📦</span>
                    <h4 className="font-serif font-bold text-[#2D5A27] text-base">Vault currently vacant</h4>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">No packages are downloaded offline yet! Visit the Tour Packages page and click &quot;Keep Offline&quot; to cache your itineraries.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Saved trips selectors info */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 scrollbar-thin">
                      {savedPackages.map((pkg) => (
                        <button
                          key={pkg.id}
                          id={`offline-pkg-sel-${pkg.id}`}
                          onClick={() => setActiveSavedPkgId(pkg.id)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors ${
                            activeSavedPkgId === pkg.id 
                              ? 'bg-[#2D5A27] text-white border border-[#E5A93B]/40' 
                              : 'bg-[#2D5A27]/5 text-gray-500 hover:text-[#2D5A27]'
                          }`}
                        >
                          {pkg.title.split(' & ')[0]}
                        </button>
                      ))}
                    </div>

                    {activeSavedPkg && (
                      <div className="space-y-4 animate-fadeIn" id="offline-pkg-display">
                        <div className="bg-[#2D5A27]/5 p-4 rounded-2xl border-0">
                          <h4 className="text-base sm:text-lg font-bold font-serif text-[#E5A93B]">{activeSavedPkg.title}</h4>
                          <p className="text-gray-600 text-xs mt-1 font-semibold">Duration constraints: <b>{activeSavedPkg.duration}</b> | Group constraints: <b>{activeSavedPkg.groupSize}</b></p>
                        </div>

                        {/* Flat quick timeline */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-mono">Downloaded Itinerary Steps:</h5>
                          {activeSavedPkg.itinerary.map((day) => (
                            <div key={day.day} className="p-4 bg-[#2D5A27]/5 rounded-xl border border-transparent space-y-2">
                              <span className="text-[10px] font-mono text-[#2D5A27] font-extrabold uppercase bg-white px-2.5 py-1 rounded border border-[#2D5A27]/15">Day {day.day}: {day.title}</span>
                              <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium">{day.description}</p>
                              
                              <div className="space-y-1 pl-1">
                                {day.activities.map((act, actIdx) => (
                                  <p key={actIdx} className="text-[11px] text-gray-500 font-semibold flex items-center space-x-1">
                                    <span>•</span>
                                    <span>{act}</span>
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Remove button */}
                        <div className="pt-2 flex justify-end">
                          <button
                            id={`remove-offline-pkg-btn-${activeSavedPkg.id}`}
                            onClick={() => {
                              onRemovePackage(activeSavedPkg.id);
                              setActiveSavedPkgId('');
                            }}
                            className="bg-transparent border border-red-200 hover:border-red-500 text-red-600 hover:bg-red-50 transition-colors px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-widest uppercase flex items-center space-x-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Purge Cache</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =======================================
                MODULE 2: WILDERNESS SURVIVAL GUIDE
                ======================================= */}
            {activeOfflineTab === 'survival' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-[#2D5A27]/10 pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#2D5A27] flex items-center space-x-1">
                    <ShieldAlert className="w-5 h-5 text-amber-500 animate-pulse" />
                    <span>Wilderness Survival Details</span>
                  </h3>
                  <span className="text-[9px] bg-amber-100 text-amber-900 border border-amber-500/20 rounded font-bold px-2 py-0.5">Must Read</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {REMOTE_SURVIVAL_GUIDE.map((guide, idx) => (
                    <div key={idx} className="bg-[#2D5A27]/5 p-5 rounded-2xl border border-transparent space-y-3 animate-fadeIn">
                      <h4 className="font-serif text-sm font-bold text-[#2D5A27] border-b border-[#2D5A27]/10 pb-2">✓ {guide.title}</h4>
                      <ul className="space-y-2 text-xs text-gray-600 font-semibold leading-relaxed">
                        {guide.tips.map((tip, tipIdx) => (
                          <li key={tipIdx} className="flex items-start space-x-1.5 leading-relaxed">
                            <span className="text-[#E5A93B] font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Important alert check */}
                <div className="bg-amber-50 text-amber-950 border border-amber-500/20 p-4 rounded-2xl space-y-1 text-xs font-semibold">
                  <p className="font-bold flex items-center space-x-1 text-[#2D5A27]">
                    <Award className="w-4.5 h-4.5 text-[#E5A93B]" />
                    <span>Emergency Survival Kit Tips:</span>
                  </p>
                  <p className="text-[11px] leading-relaxed mt-1 text-gray-600">If separated from guides, always stay directly inside your safari cruiser or high point rocks. Do not try to wander on foot. Native predators recognize stationary vehicles as non-prey outlines.</p>
                </div>
              </div>
            )}

            {/* =======================================
                MODULE 3: EMERGENCY DIAL BOARD
                ======================================= */}
            {activeOfflineTab === 'emergency' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-[#2D5A27]/10 pb-3">
                  <h3 className="font-serif text-lg font-bold text-[#2D5A27] flex items-center space-x-1.5">
                    <PhoneCall className="w-5 h-5 text-red-500 animate-bounce" />
                    <span>Radio Frequency &amp; Hot Dial List</span>
                  </h3>
                  <span className="text-[9px] bg-red-100 text-red-800 border border-red-500/20 rounded px-2 py-0.5 font-bold font-mono">Emergency</span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  These numbers are hard-configured into medical evacuation systems. Direct calls from satellite links or local SIM roaming can reach these dispatch towers.
                </p>

                <div className="divide-y divide-[#2D5A27]/10 bg-white rounded-2xl border border-[#2D5A27]/10 overflow-hidden">
                  {EMERGENCY_NUMBERS.map((emergency, idx) => (
                    <div key={idx} className="p-4 flex justify-between items-center hover:bg-[#2D5A27]/5 text-xs">
                      <div>
                        <span className="font-bold text-[#2D5A27] block text-sm">{emergency.title}</span>
                        <span className="text-[10px] text-gray-500 font-semibold">24/7 Priority Emergency Channel Support</span>
                      </div>
                      <a 
                        href={`tel:${emergency.phone.replace(/\s+/g, '')}`} 
                        className="px-4 py-2 bg-red-50 text-red-600 border border-red-500/20 rounded-xl hover:bg-red-100 hover:text-red-700 transition-colors font-mono font-bold font-sans text-[11px]"
                      >
                        {emergency.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
