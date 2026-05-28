import { useState } from 'react';
import { Compass, Mail, Globe, PhoneCall, Copy, MapPin, Share2, Facebook, Twitter, MessageSquare, Linkedin, ExternalLink, ShieldAlert } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onGoToTab: (tab: string) => void;
}

export default function Footer({ onGoToTab }: FooterProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const shareLink = "https://www.tastaisafaris.co.ug/itinerary-share-ref-91a";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <footer className="bg-[#161814] text-gray-300 border-t border-[#2D5A27]/20 pt-16 pb-8" id="tastai-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Brand Info (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center pb-2">
              <Logo size="md" mode="dark" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Excellence in Travel &amp; Safari Experiences across East Africa. High-end, tailored international and domestic travel packages, wildlife safaris, beach getaways, cultural tours, and experiential excursions with complete transparency.
            </p>
            
            {/* Social media shares */}
            <div className="pt-2 flex items-center space-x-3 text-[#E5A93B]">
              <button 
                id="footer-share-trigger-btn"
                onClick={() => setShowShareModal(true)}
                className="flex items-center space-x-2 bg-[#2D5A27]/20 border border-[#2D5A27]/40 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider hover:border-[#E5A93B] hover:text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Custom Safari</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (2 Columns) */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-serif text-white font-bold tracking-widest uppercase">Expeditions</h4>
            <div className="flex flex-col space-y-2">
              <button onClick={() => onGoToTab('packages')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer">Tour Packages</button>
              <button onClick={() => onGoToTab('map')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer">East Africa Map</button>
              <button onClick={() => onGoToTab('offline')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer">Offline Access</button>
              <button onClick={() => onGoToTab('reviews')} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer">Verified Reviews</button>
            </div>
          </div>

          {/* Column 3: Contact Details Workspace (3 Columns) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif text-white font-bold tracking-widest uppercase">Digital Reach</h4>
            <div className="space-y-2 text-gray-400">
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#E5A93B]" />
                <a href="mailto:info@tastaisafaris.co.ug" className="hover:text-white transition-colors">info@tastaisafaris.co.ug</a>
              </div>

              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#E5A93B]" />
                <a href="https://www.tastaisafaris.co.ug" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">www.tastaisafaris.co.ug</a>
              </div>

              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-[#E5A93B]" />
                <a href="tel:+256779726158" className="hover:text-white transition-colors">+256 779 726 158</a>
              </div>

              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-[#E5A93B]" />
                <a href="tel:+256787739508" className="hover:text-white transition-colors">+256 787 739 508</a>
              </div>

            </div>
          </div>

          {/* Column 4: Physical Address (3 Columns) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif text-white font-bold tracking-widest uppercase">Bukoto Headquarters</h4>
            <p className="text-gray-400 flex items-start space-x-2">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>Plot 75 Bukoto Street, Kampala, Uganda.</span>
            </p>
            <div className="bg-[#1C1E1A] p-3 rounded-xl border border-[#2D5A27]/20 text-[10px] text-gray-500 mt-2">
              <span className="font-bold text-[#E5A93B] block uppercase mb-1">Office Hours:</span>
              Monday - Saturday: 8 AM - 6 PM (EAT). Available 24/7 on Priority Radio dispatch.
            </div>
          </div>

        </div>

        {/* Lower Border Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#2D5A27]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© 2026 Tastai Safaris Company Limited. All Rights Reserved. Excellence in Travel &amp; Safari Experiences.</p>
          <div className="flex space-x-4">
            <span>Stanbic Bank Escrow Guarded</span>
            <span>•</span>
            <span>AMREF Evacuation Covered</span>
          </div>
        </div>

      </div>

      {/* Share Custom Itinerary Dialog / Social Sharing Lightbox */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#1C1E1A] border-2 border-[#E5A93B]/40 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-2xl relative text-center">
            
            <button 
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              ✕
            </button>

            <div className="h-12 w-12 bg-[#2D5A27]/20 border border-[#E5A93B]/30 rounded-full flex items-center justify-center mx-auto text-xl">
              🤝
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold text-white">Share Selected Safari Plan</h4>
              <p className="text-xs text-gray-400">Co-plan and share transparent itineraries with family, friends, or corporate boards.</p>
            </div>

            {/* Simulated Link copy bar */}
            <div className="bg-[#161814] p-2 rounded-xl flex items-center justify-between border border-[#2D5A27]/20 text-xs">
              <span className="truncate text-gray-500 pl-2 font-mono">{shareLink}</span>
              <button 
                id="footer-share-copy-btn"
                onClick={handleCopyLink}
                className="bg-[#2D5A27] hover:bg-emerald-950 text-white p-2 rounded-lg text-[10px] font-bold uppercase transition-colors"
              >
                {copiedLink ? 'Saved' : 'Copy'}
              </button>
            </div>

            {/* Social trigger action layout */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-gray-400 text-xs text-center">
              
              <a 
                href={`https://wa.me/?text=Check out Tastai Safaris customized Zanzibar and wildlife packages: ${shareLink}`}
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-emerald-950/20 border border-emerald-500/10 rounded-xl hover:text-emerald-400 flex flex-col items-center space-y-1.5"
              >
                <MessageSquare className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                <span className="text-[10px]">WhatsApp</span>
              </a>

              <a 
                href={`mailto:?subject=Our Custom East Africa Safari Plan&body=Hey! Review our tailored travel itinerary at Tastai Safaris: ${shareLink}`}
                className="p-2 bg-amber-950/20 border border-amber-500/10 rounded-xl hover:text-[#E5A93B] flex flex-col items-center space-y-1.5"
              >
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="text-[10px]">Email</span>
              </a>

              <div 
                onClick={handleCopyLink}
                className="p-2 bg-[#2D5A27]/20 border border-emerald-500/10 rounded-xl hover:text-emerald-300 flex flex-col items-center space-y-1.5 cursor-pointer"
              >
                <Share2 className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px]">Co-Plan</span>
              </div>

              <div 
                onClick={() => {
                  alert("Link generated on the general ledger! Offline references synced.");
                  setShowShareModal(false);
                }}
                className="p-2 bg-gray-900 border border-gray-800 rounded-xl hover:text-white flex flex-col items-center space-y-1.5 cursor-pointer"
              >
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-[10px]">Public QR</span>
              </div>

            </div>

            <div className="text-[10px] text-gray-500 font-mono">
              🛡 Wire references and SWIFT transfers remain protected
            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
