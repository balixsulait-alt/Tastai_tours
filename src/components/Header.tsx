import { useState, useEffect } from 'react';
import { Compass, Menu, X, Bell, Shield, Info, Smartphone, RefreshCw, Layers } from 'lucide-react';
import { Currency, FlightAlert } from '../types';
import Logo from './Logo';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  notifications: FlightAlert[];
  markNotificationsRead: () => void;
  onOpenConsultation: () => void;
}

export default function Header({
  activePage,
  setActivePage,
  currency,
  setCurrency,
  notifications,
  markNotificationsRead,
  onOpenConsultation,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const currencyNames: Record<Currency, string> = {
    USD: '🇺🇸 USD ($)',
    UGX: '🇺🇬 UGX (Shs)',
    KES: '🇰🇪 KES (Ksh)',
    EUR: '🇪🇺 EUR (€)',
    GBP: '🇬🇧 GBP (£)',
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'map', label: 'East Africa Map' },
    { id: 'offline', label: 'Offline Itinerary' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#2D5A27]/10 text-[#2D5A27] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand Layout */}
          <div 
            onClick={() => setActivePage('home')} 
            className="flex items-center cursor-pointer select-none group focus:outline-none"
            id="logo-container"
          >
            <Logo size="sm" mode="light" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activePage === item.id || (item.id === 'packages' && activePage.startsWith('package-'))
                    ? 'bg-[#2D5A27] text-white border-b-2 border-[#E5A93B]'
                    : 'text-[#2D5A27]/80 hover:bg-[#2D5A27]/5 hover:text-[#2D5A27]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Header Controls (Currency, Notifications, CTA) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Multi-Currency Dropdown Selector */}
            <div className="relative">
              <button
                id="currency-dropdown-toggle"
                onClick={() => {
                  setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center space-x-1.5 px-3 py-2 bg-[#2D5A27]/5 border border-[#2D5A27]/15 rounded-lg hover:border-[#E5A93B] hover:bg-[#2D5A27]/10 transition-all cursor-pointer text-sm font-semibold text-[#2D5A27]"
              >
                <span>{currencyNames[currency]}</span>
              </button>
              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-[#FDFBF7] border border-[#2D5A27]/15 rounded-xl shadow-2xl py-1 z-50 overflow-hidden"
                  id="currency-menu"
                >
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase text-[#2D5A27]/80 tracking-widest border-b border-[#2D5A27]/10 bg-[#2D5A27]/5">Ref Rates</p>
                  {(Object.keys(currencyNames) as Currency[]).map((c) => (
                    <button
                      key={c}
                      id={`currency-select-${c.toLowerCase()}`}
                      onClick={() => {
                        setCurrency(c);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#2D5A27]/10 transition-colors flex items-center justify-between ${
                        currency === c ? 'text-[#E5A93B] bg-[#2D5A27]/5 font-bold' : 'text-[#2D5A27]/80'
                      }`}
                    >
                      <span>{currencyNames[c]}</span>
                      {currency === c && <Compass className="w-3.5 h-3.5 animate-spin" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Simulating Real-time Push Notifications Bell */}
            <div className="relative">
              <button
                id="notification-bell-btn"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsCurrencyDropdownOpen(false);
                  if (unreadCount > 0) {
                    markNotificationsRead();
                  }
                }}
                className="p-2 bg-[#2D5A27]/5 border border-[#2D5A27]/15 rounded-lg hover:border-[#E5A93B] text-[#2D5A27] hover:bg-[#2D5A27]/10 transition-all cursor-pointer relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 bg-[#FDFBF7] border border-[#2D5A27]/20 rounded-xl shadow-2xl z-50 overflow-hidden"
                  id="notification-dropdown"
                >
                  <div className="bg-[#2D5A27]/10 p-3 border-b border-[#2D5A27]/10 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#2D5A27]">Travel Desk Alerts</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5A93B]/10 text-[#E5A93B] border border-[#E5A93B]/20">Live Simulator</span>
                  </div>
                  <div className="divide-y divide-[#2D5A27]/10 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-xs">
                        No active gates or guide changes. Realtime safari updates will display here.
                      </div>
                    ) : (
                      notifications.map((alert) => (
                        <div 
                          key={alert.id} 
                          className={`p-3 text-xs transition-colors hover:bg-[#2D5A27]/5 ${
                            !alert.read ? 'bg-[#2D5A27]/5 border-l-2 border-[#E5A93B]' : ''
                          }`}
                        >
                          <div className="flex justify-between font-bold text-[#2D5A27]">
                            <span>{alert.title}</span>
                            <span className="text-[9px] text-gray-400 font-mono">{alert.timestamp}</span>
                          </div>
                          <p className="text-gray-600 mt-1 leading-relaxed">{alert.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t border-[#2D5A27]/10 text-center bg-[#2D5A27]/5">
                    <button 
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-[10px] font-bold text-[#2D5A27] hover:underline"
                    >
                      Dismiss System Board
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct CTA */}
            <button
              id="header-consultation-btn"
              onClick={onOpenConsultation}
              className="px-6 py-2 bg-[#E5A93B] hover:bg-[#e5a93b]/90 text-white rounded-full text-xs font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95"
            >
              Consult Expert
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Currency selector directly inside mobile bar */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent border-0 text-[#2D5A27] font-bold text-xs focus:ring-0 mr-1 cursor-pointer"
              id="mobile-currency-select"
            >
              <option value="USD" className="bg-[#FDFBF7] text-[#2D5A27]">USD ($)</option>
              <option value="UGX" className="bg-[#FDFBF7] text-[#2D5A27]">UGX (Shs)</option>
              <option value="KES" className="bg-[#FDFBF7] text-[#2D5A27]">KES (Ksh)</option>
              <option value="EUR" className="bg-[#FDFBF7] text-[#2D5A27]">EUR (€)</option>
              <option value="GBP" className="bg-[#FDFBF7] text-[#2D5A27]">GBP (£)</option>
            </select>

            {/* Alert bell inside mobile bar */}
            <button
              id="mobile-notification-btn"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                if (unreadCount > 0) markNotificationsRead();
              }}
              className="p-2 bg-[#2D5A27]/5 border border-[#2D5A27]/15 rounded-lg text-[#2D5A27] relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center scale-90">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-[#2D5A27]/5 border border-[#2D5A27]/15 rounded-lg text-[#2D5A27]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Alerts Board directly embedded below top bar if toggled */}
      {isNotificationsOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#2D5A27]/15 max-h-60 overflow-y-auto px-4 py-3 shadow-inner">
          <div className="text-[10px] font-bold text-[#2D5A27] uppercase tracking-wider mb-2 flex justify-between">
            <span>Travel Desk Updates</span>
            <span>Real-time</span>
          </div>
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-xs text-gray-500">No active travel alerts.</p>
            ) : (
              notifications.map((alert) => (
                <div key={alert.id} className="p-2.5 bg-[#2D5A27]/5 rounded border border-[#2D5A27]/10 text-xs">
                  <div className="flex justify-between font-bold text-[#2D5A27]">
                    <span>{alert.title}</span>
                    <span className="text-[8px] text-gray-400 font-mono">{alert.timestamp}</span>
                  </div>
                  <p className="text-gray-600 mt-0.5">{alert.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-t border-[#2D5A27]/10 shadow-2xl px-4 pt-2 pb-6 space-y-2" id="mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                activePage === item.id || (item.id === 'packages' && activePage.startsWith('package-'))
                  ? 'bg-[#2D5A27] text-white border-l-4 border-[#E5A93B]'
                  : 'text-[#2D5A27]/80 hover:bg-[#2D5A27]/5 hover:text-[#2D5A27]'
              }`}
            >
              <span>{item.label}</span>
              <Compass className="w-4 h-4 text-gray-500 shrink-0" />
            </button>
          ))}
          <div className="pt-4 border-t border-[#2D5A27]/10 flex flex-col space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 bg-[#E5A93B] hover:bg-[#e5a93b]/95 text-white rounded-full text-center font-bold tracking-wider uppercase text-sm shadow-md transition-colors"
            >
              Consult Expert Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
