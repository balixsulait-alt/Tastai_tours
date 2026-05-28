import { useState } from 'react';
import { Compass, Info, MapPin, Search, Calendar, Award, ExternalLink, ArrowRight, Heart } from 'lucide-react';
import { EastAfricanLandmark } from '../types';
import { EAST_AFRICAN_LANDMARKS } from '../data';

interface AttractionsMapProps {
  onSelectPackageByLandmark: (packageName: string) => void;
  onAddCustomItinerary: (landmark: EastAfricanLandmark) => void;
  addedLandmarks: string[];
}

export default function AttractionsMap({
  onSelectPackageByLandmark,
  onAddCustomItinerary,
  addedLandmarks,
}: AttractionsMapProps) {
  const [selectedLandmark, setSelectedLandmark] = useState<EastAfricanLandmark>(EAST_AFRICAN_LANDMARKS[0]);
  const [filterCountry, setFilterCountry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const countries = ['All', 'Uganda', 'Tanzania', 'Kenya'];

  const filteredLandmarks = EAST_AFRICAN_LANDMARKS.filter((l) => {
    const matchesCountry = filterCountry === 'All' || l.country === filterCountry;
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <section className="py-16 bg-[#FDFBF7] text-[#2D5A27] overflow-hidden py-12" id="interactive-east-africa-map">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#2D5A27]/10 border border-[#E5A93B]/40 px-3.5 py-1.5 rounded-full text-xs text-[#2D5A27] font-bold tracking-wider uppercase mb-3">
            <Compass className="w-3 h-3 animate-spin text-[#E5A93B]" />
            <span>Interactive Cartography</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2D5A27]">
            East African Landmarks &amp; Attractions
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base font-medium">
            Click points on the interactive cartographer map, or browse landmarks below to map out your dream personalized safari.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-white p-4 rounded-2xl border border-[#2D5A27]/10 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-2">Filter Borders:</span>
            {countries.map((c) => (
              <button
                key={c}
                id={`filter-country-${c.toLowerCase()}`}
                onClick={() => setFilterCountry(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterCountry === c
                    ? 'bg-[#2D5A27] text-white border border-[#E5A93B]/40 shadow-sm'
                    : 'bg-[#2D5A27]/5 text-[#2D5A27]/85 hover:bg-[#2D5A27]/10 border border-transparent'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              id="landmark-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Serengeti, Zanzibar, Mountain..."
              className="w-full bg-white border border-[#2D5A27]/15 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-[#E5A93B] transition-colors text-[#2D5A27] placeholder-gray-400 font-semibold"
            />
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SVG Vector Map Container (Lg: 7 columns) */}
          <div className="lg:col-span-7 bg-white border border-[#2D5A27]/10 rounded-3xl p-6 relative shadow-sm overflow-hidden min-h-[450px] flex flex-col justify-between">
            
            {/* Map Header details */}
            <div className="absolute top-4 left-4 z-10 bg-[#2D5A27]/5 p-3 rounded-xl border border-[#2D5A27]/10 max-w-[200px]">
              <h4 className="font-serif text-xs font-bold text-[#2D5A27] tracking-wider uppercase">Cartographer Board</h4>
              <p className="text-[10px] text-gray-500 mt-1 font-medium">Pins denote landmark coordinates. Click to query local files.</p>
            </div>

            {/* Scale indicator */}
            <div className="absolute bottom-4 left-4 z-10 bg-[#2D5A27]/5 px-3 py-1.5 rounded-lg border border-[#2D5A27]/10 text-[9px] font-mono text-gray-500 flex items-center space-x-2">
              <span className="h-1.5 w-8 bg-emerald-600 rounded-full inline-block"></span>
              <span>1 : 2,500,000 km</span>
            </div>

            {/* Custom Interactive SVG Map */}
            <div className="w-full relative py-12 flex justify-center items-center">
              <svg className="w-full max-w-[500px] h-[380px] text-[#2D5A27]/40 drop-shadow-sm" viewBox="0 0 100 100" fill="none">
                
                {/* SVG Borders representation for Uganda, Kenya, Tanzania, Rwanda */}
                {/* Lake Victoria (Middle Heart Blue) */}
                <ellipse cx="45" cy="46" rx="9" ry="6" fill="#1e3a5f" opacity="0.1" stroke="#3b82f6" strokeWidth="0.5" className="animate-pulse" />
                <text x="45" y="47" fill="#3b82f6" fontSize="2.5" fontWeight="bold" textAnchor="middle" opacity="0.6">Lake Victoria</text>

                {/* Uganda Outline Profile (Top Left) */}
                <path d="M15,20 L38,18 L46,30 L40,50 L20,50 L12,35 Z" stroke="#2D5A27" strokeWidth="0.75" strokeDasharray="1.5" fill="#2D5A27" fillOpacity="0.04" />
                <text x="26" y="24" fill="#2D5A27" fontSize="3" fontWeight="bold" opacity="0.3">UGANDA</text>

                {/* Kenya Outline Profile (Top Right) */}
                <path d="M46,18 L82,20 L88,40 L65,58 L46,44 Z" stroke="#2D5A27" strokeWidth="0.75" strokeDasharray="1.5" fill="#2D5A27" fillOpacity="0.04" />
                <text x="68" y="28" fill="#2D5A27" fontSize="3" fontWeight="bold" opacity="0.3">KENYA</text>

                {/* Tanzania Outline Profile (Bottom Half) */}
                <path d="M20,50 L46,45 L65,58 L92,54 L95,78 L78,92 L38,90 L22,70 Z" stroke="#2D5A27" strokeWidth="0.75" strokeDasharray="1.5" fill="#2D5A27" fillOpacity="0.04" />
                <text x="52" y="78" fill="#2D5A27" fontSize="3" fontWeight="bold" opacity="0.3">TANZANIA</text>

                {/* Indian Ocean (Extreme Right) */}
                <text x="94" y="65" fill="#3b82f6" fontSize="2" fontWeight="bold" className="rotate-90 origin-center" opacity="0.3">INDIAN OCEAN</text>
                
                {/* Equator Line Indicator */}
                <line x1="5" y1="40" x2="95" y2="40" stroke="#E5A93B" strokeWidth="0.3" strokeDasharray="2 3" opacity="0.5" />
                <text x="8" y="38" fill="#E5A93B" fontSize="2" opacity="0.7">EQUATOR</text>

                {/* SVG Active Coordinate Pins */}
                {filteredLandmarks.map((landmark) => {
                  const isSelected = selectedLandmark.id === landmark.id;
                  const isAdded = addedLandmarks.includes(landmark.id);
                  return (
                    <g 
                      key={landmark.id} 
                      className="cursor-pointer group"
                      onClick={() => setSelectedLandmark(landmark)}
                    >
                      {/* Pulse effect on selection */}
                      {isSelected && (
                        <circle cx={landmark.coordinates.x} cy={landmark.coordinates.y} r="6" className="fill-[#E5A93B]/30 animate-ping" />
                      )}
                      {/* Outer boundary hover pin rings */}
                      <circle cx={landmark.coordinates.x} cy={landmark.coordinates.y} r="3" className="fill-white stroke-[#E5A93B] group-hover:stroke-[#2D5A27] transition-all duration-200" strokeWidth="1" />
                      
                      {/* Inner dot reflecting country origin */}
                      <circle cx={landmark.coordinates.x} cy={landmark.coordinates.y} r="1.5" className={isSelected ? 'fill-[#E5A93B]' : 'fill-[#2D5A27]'} />
                      
                      {/* Clean tooltip hover for desktops */}
                      <text 
                        x={landmark.coordinates.x} 
                        y={landmark.coordinates.y - 4} 
                        fill={isSelected ? '#E5A93B' : '#2D5A27'} 
                        fontSize="2.5" 
                        fontWeight="bold" 
                        textAnchor="middle"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-black duration-200 shadow"
                      >
                        {landmark.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Guide instructions overlay */}
              <div className="absolute right-4 bottom-4 text-right">
                <p className="text-[10px] text-[#2D5A27] animate-pulse font-semibold">● Click map coordinates to query details</p>
              </div>

            </div>

            {/* Quick grid list of matching search landmarks for ease of access */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border-t border-[#2D5A27]/10 pt-4 mt-auto">
              {filteredLandmarks.map((landmark) => {
                const isSelected = selectedLandmark.id === landmark.id;
                return (
                  <button
                    key={landmark.id}
                    id={`landmark-card-btn-${landmark.id}`}
                    onClick={() => setSelectedLandmark(landmark)}
                    className={`flex items-center space-x-2 text-left p-2 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'bg-[#2D5A27] text-white border-[#E5A93B]'
                        : 'bg-[#2D5A27]/5 text-[#2D5A27]/80 border-[#2D5A27]/10 hover:bg-[#2D5A27]/10'
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#E5A93B]' : 'text-[#2D5A27]'}`} />
                    <span className="truncate font-bold">{landmark.name}</span>
                  </button>
                );
              })}
              {filteredLandmarks.length === 0 && (
                <div className="col-span-full text-center py-2 text-xs text-gray-500">
                  No landmark match for filters.
                </div>
              )}
            </div>

          </div>

          {/* Attraction Information Box Presentation Card (Col: 5) */}
          <div className="lg:col-span-5 bg-white border border-[#2D5A27]/10 rounded-3xl overflow-hidden shadow-sm flex flex-col h-full" id="landmark-details-pane">
            
            {/* Image Banner */}
            <div className="h-56 relative">
              <img
                src={selectedLandmark.image}
                alt={selectedLandmark.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              
              {/* Country tag badge */}
              <span className="absolute top-4 right-4 bg-[#2D5A27]/10 text-[#2D5A27] font-bold border border-[#2D5A27]/15 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                Border: {selectedLandmark.country}
              </span>
            </div>

            {/* Core Body details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              
              <div className="space-y-2">
                <span className="text-[10px] text-[#E5A93B] font-bold tracking-widest uppercase flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>East African Wonder</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2D5A27]">{selectedLandmark.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold">{selectedLandmark.description}</p>
              </div>

              {/* Itinerary planner specification fields */}
              <div className="bg-[#2D5A27]/5 p-4 rounded-xl border border-transparent space-y-2.5 text-xs">
                
                <div className="flex justify-between items-center text-gray-600 font-semibold">
                  <span className="font-bold text-[#2D5A27] flex items-center space-x-1">
                    <Compass className="w-3.5 h-3.5 text-[#E5A93B]" />
                    <span>Special Feature:</span>
                  </span>
                  <span className="text-gray-800 text-right max-w-[180px] truncate">{selectedLandmark.elevationOrFeature}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600 font-semibold border-t border-[#2D5A27]/10 pt-2">
                  <span className="font-bold text-[#2D5A27] flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#2D5A27]" />
                    <span>Best Time:</span>
                  </span>
                  <span className="text-[#E5A93B] text-right font-extrabold">{selectedLandmark.bestTimeToVisit}</span>
                </div>

                <div className="flex justify-between items-start text-gray-600 font-semibold border-t border-[#2D5A27]/10 pt-2">
                  <span className="font-bold text-[#2D5A27] flex items-center space-x-1 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>Itinerary Sight:</span>
                  </span>
                  <span className="text-gray-800 text-right italic">{selectedLandmark.highlight}</span>
                </div>

              </div>

              {/* Interactive buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                
                {/* Add to Custom Offline Planner */}
                <button
                  id="add-custom-itinerary-btn"
                  onClick={() => onAddCustomItinerary(selectedLandmark)}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-2 border cursor-pointer ${
                    addedLandmarks.includes(selectedLandmark.id)
                      ? 'bg-[#2D5A27]/15 text-[#2D5A27] border-[#2D5A27]/30 font-bold'
                      : 'bg-transparent border-[#2D5A27]/20 hover:border-[#E5A93B] text-gray-600 font-bold'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${addedLandmarks.includes(selectedLandmark.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  <span>{addedLandmarks.includes(selectedLandmark.id) ? 'Saved to Vault' : 'Sync Offline Draft'}</span>
                </button>

                {/* Go to relative Tour Package */}
                <button
                  id="landmark-view-package-btn"
                  onClick={() => {
                    // Match the correct package based on country and keyword
                    if (selectedLandmark.id === 'zanzibar-island') {
                       onSelectPackageByLandmark('zanzibar-getaway');
                    } else if (selectedLandmark.id === 'serengeti-plains' || selectedLandmark.id === 'kilimanjaro-mt') {
                      onSelectPackageByLandmark('serengeti-migration');
                    } else if (selectedLandmark.id === 'nakuru-lake') {
                      onSelectPackageByLandmark('nakuru-flamingos');
                    } else if (selectedLandmark.id === 'kibale-forest') {
                      onSelectPackageByLandmark('kibale-primates');
                    } else if (selectedLandmark.id === 'ishasha-sector') {
                      onSelectPackageByLandmark('ishasha-lions');
                    } else {
                      // default to Gorillas/Bwindi/Murchison
                      onSelectPackageByLandmark('gorilla-bwindi');
                    }
                  }}
                  className="flex-1 py-3 px-4 bg-[#E5A93B] hover:bg-[#e5a93b]/90 text-white rounded-full text-xs font-black tracking-wider uppercase flex items-center justify-center space-x-1 shadow-sm transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Query Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
