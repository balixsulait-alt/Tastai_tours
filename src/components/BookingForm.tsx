import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, CreditCard, ChevronRight, CheckCircle2, Copy, ArrowRight, Download, Laptop, AlertCircle, Sparkles, RefreshCw, MessageSquare } from 'lucide-react';
import { Currency, TourPackage } from '../types';
import { CURRENCY_CONVERSION, TOUR_PACKAGES } from '../data';

interface BookingFormProps {
  initialSelectedPackage: TourPackage | null;
  currency: Currency;
}

export default function BookingForm({ initialSelectedPackage, currency }: BookingFormProps) {
  // Booking Form State
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialSelectedPackage ? initialSelectedPackage.id : 'zanzibar-getaway'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('2026-07-20');
  const [groupSize, setGroupSize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'wire' | 'card' | 'momo'>('wire');
  const [payCurrency, setPayCurrency] = useState<Currency>(currency);
  
  // Card Details State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  
  // Mobile Money Details State
  const [momoProvider, setMomoProvider] = useState<'MTN' | 'Airtel'>('MTN');
  const [momoNumber, setMomoNumber] = useState('');

  // Simulation Status Loop
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'processing_otp' | 'completed' | 'failed'>('idle');
  const [paymentReceipt, setPaymentReceipt] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync package when initialSelectedPackage changes
  useEffect(() => {
    if (initialSelectedPackage) {
      setSelectedPackageId(initialSelectedPackage.id);
    }
  }, [initialSelectedPackage]);

  const activePkg = TOUR_PACKAGES.find((p) => p.id === selectedPackageId) || TOUR_PACKAGES[0];

  // Price calculations
  const calculateTotalUSD = () => {
    return activePkg.priceUSD * groupSize;
  };

  const getPriceInPayCurrency = (amountUSD: number) => {
    const rate = CURRENCY_CONVERSION[payCurrency];
    return Math.round(amountUSD * rate);
  };

  const formattedPayPrice = (amountUSD: number) => {
    const amount = getPriceInPayCurrency(amountUSD);
    const converted = amount.toLocaleString();
    switch (payCurrency) {
      case 'UGX': return `Shs ${converted}`;
      case 'KES': return `Ksh ${converted}`;
      case 'EUR': return `€${converted}`;
      case 'GBP': return `£${converted}`;
      default: return `$${converted}`;
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert('Please state your name and email correctly.');
      return;
    }

    setPaymentStatus('processing');
    
    // Simulate real 3D secure or billing validation authentication
    setTimeout(() => {
      if (paymentMethod === 'card') {
        setPaymentStatus('processing_otp');
        setTimeout(() => {
          triggerPaymentSuccess();
        }, 3000);
      } else {
        triggerPaymentSuccess();
      }
    }, 2500);
  };

  const triggerPaymentSuccess = () => {
    const totalUSD = calculateTotalUSD();
    const finalAmount = getPriceInPayCurrency(totalUSD);
    const mockRef = 'TAS-' + Math.floor(10000000 + Math.random() * 90000000);
    
    setPaymentReceipt({
      reference: mockRef,
      pkgName: activePkg.title,
      clientName: fullName,
      clientEmail: email,
      travelDate: travelDate,
      groupSize: groupSize,
      currency: payCurrency,
      amountPaid: finalAmount,
      datePaid: new Date().toLocaleDateString(),
      status: paymentMethod === 'wire' ? 'Pending Wire Verification' : 'Cleared Secured'
    });
    setPaymentStatus('completed');
  };

  const resetSimulator = () => {
    setPaymentStatus('idle');
    setPaymentReceipt(null);
  };

  return (
    <section className="py-16 bg-[#FDFBF7] text-[#2D5A27]" id="booking-payment-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] bg-[#2D5A27]/10 border border-[#E5A93B]/40 px-3.5 py-1.5 rounded-full text-[#2D5A27] font-bold tracking-widest uppercase mb-3 inline-block">
            🛡 Secure Booking Desk
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2D5A27]">
            Consult, Reserve &amp; Settle Payments
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base font-medium">
            Initiate your booking inquiry with direct multi-currency gateway settlements. Secure escrow trust certified directly by Stanbic Bank Uganda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Client Details Form & Wire routing (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-[#2D5A27]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            
            {paymentStatus === 'completed' && paymentReceipt ? (
              /* Success Receipt Overlay */
              <div className="space-y-6 text-center py-6 animate-fadeIn" id="success-receipt-card">
                <div className="h-16 w-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-md">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-black text-[#2D5A27]">Payment Sync Triggered!</h3>
                  <p className="text-sm text-gray-600 font-medium">Your reservation has been recorded on the general ledger.</p>
                </div>

                <div className="bg-[#2D5A27]/5 border border-dashed border-[#2D5A27]/20 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 font-mono text-xs text-[#2D5A27]">
                  <div className="flex justify-between border-b border-[#2D5A27]/10 pb-2">
                    <span className="text-gray-500">Receipt Ref:</span>
                    <span className="text-[#E5A93B] font-extrabold">{paymentReceipt.reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expedition:</span>
                    <span className="text-[#2D5A27] font-bold text-right max-w-[200px] truncate">{paymentReceipt.pkgName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lead Client:</span>
                    <span className="text-[#2D5A27] font-bold">{paymentReceipt.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Travel Date:</span>
                    <span className="text-[#2D5A27] font-bold">{paymentReceipt.travelDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">Total Paid:</span>
                    <span className="text-emerald-700 font-extrabold">
                      {paymentReceipt.amountPaid.toLocaleString()} {paymentReceipt.currency}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#2D5A27]/10 pt-2 text-[10px] text-gray-500 text-center col-span-full">
                    <span>Status: <b>{paymentReceipt.status}</b></span>
                    <span>{paymentReceipt.datePaid}</span>
                  </div>
                </div>

                <div className="bg-amber-50 text-amber-900 border border-amber-500/20 p-4 rounded-xl text-xs max-w-md mx-auto flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                  <p className="text-left leading-relaxed"><b>Next Step:</b> Tastai guide Joshua will ring or send a WhatsApp message to {phone} within 3 hours to confirm flight sync and accommodation layouts.</p>
                </div>

                <div className="flex justify-center space-x-3">
                  <button 
                    onClick={resetSimulator}
                    className="px-5 py-2.5 border border-[#2D5A27]/20 rounded-full hover:border-[#E5A93B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-[#2D5A27]"
                  >
                    Resubmit Fields
                  </button>
                  <button 
                    onClick={() => handleCopy(JSON.stringify(paymentReceipt, null, 2), 'receipt')}
                    className="px-5 py-2.5 bg-[#2D5A27] text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 hover:bg-[#2D5A27]/90 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>{copiedKey === 'receipt' ? 'Copied Receipt' : 'Copy Invoice Details'}</span>
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Prime Interactive Form fields */
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                
                <h3 className="font-serif text-xl font-bold border-b border-[#2D5A27]/10 pb-3 flex items-center space-x-2 text-[#2D5A27]">
                  <Sparkles className="w-5 h-5 text-[#E5A93B] animate-pulse" />
                  <span>Interactive Booking Inquiry</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Select Packages */}
                  <div className="col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">Expedition Selection:</label>
                    <select
                      value={selectedPackageId}
                      onChange={(e) => setSelectedPackageId(e.target.value)}
                      className="w-full bg-[#2D5A27]/5 text-[#2D5A27] border border-[#2D5A27]/15 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-[#E5A93B] outline-none font-semibold cursor-pointer"
                    >
                      {TOUR_PACKAGES.map((p) => (
                        <option key={p.id} value={p.id} className="bg-white text-[#2D5A27]">
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Group Numbers */}
                  <div className="col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">Group Size / Crew:</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={groupSize}
                      onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#2D5A27]/5 text-[#2D5A27] border border-[#2D5A27]/15 rounded-xl py-2 pl-3 pr-2 text-xs focus:ring-1 focus:ring-[#E5A93B] outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Participant Full Name */}
                  <div className="col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">Lead Guest Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Marcus Vance"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#2D5A27]/5 text-[#2D5A27] border border-[#2D5A27]/15 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-[#E5A93B] outline-none font-semibold placeholder-gray-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">Email (Invoices &amp; flights):</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus.vance@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#2D5A27]/5 text-[#2D5A27] border border-[#2D5A27]/15 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-[#E5A93B] outline-none font-semibold placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone / WhatsApp number */}
                  <div className="col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">WhatsApp Contact (Emergency):</label>
                    <input
                      type="tel"
                      required
                      placeholder="+256 779 726 158"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#2D5A27]/5 text-[#2D5A27] border border-[#2D5A27]/15 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-[#E5A93B] outline-none font-semibold placeholder-gray-400"
                    />
                  </div>

                  {/* Date fields */}
                  <div className="col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">Preferred Launch Date:</label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-[#2D5A27]/5 text-[#2D5A27] border border-[#2D5A27]/15 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-[#E5A93B] outline-none font-semibold"
                    />
                  </div>
                </div>

                {/* Secure Payment Mode selectors */}
                <div className="space-y-3 pt-2">
                  <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Multi-Currency Payment Instrument:</label>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {/* Wire Transfer */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wire')}
                      className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                        paymentMethod === 'wire'
                          ? 'bg-[#2D5A27]/15 border-[#E5A93B] text-[#2D5A27]'
                          : 'bg-[#2D5A27]/5 border-[#2D5A27]/10 text-gray-600 hover:text-[#2D5A27]'
                      }`}
                    >
                      <span className="block text-xs font-black font-serif">Bank Wire</span>
                      <span className="block text-[9px] text-[#2D5A27]/50 mt-1">Stanbic Escrow</span>
                    </button>

                    {/* Card payment */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[#2D5A27]/15 border-[#E5A93B] text-[#2D5A27]'
                          : 'bg-[#2D5A27]/5 border-[#2D5A27]/10 text-gray-600 hover:text-[#2D5A27]'
                      }`}
                    >
                      <span className="block text-xs font-black font-serif">Card (3DS)</span>
                      <span className="block text-[9px] text-[#2D5A27]/50 mt-1">Visa/Mastercard</span>
                    </button>

                    {/* Mobile Money */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('momo')}
                      className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                        paymentMethod === 'momo'
                          ? 'bg-[#2D5A27]/15 border-[#E5A93B] text-[#2D5A27]'
                          : 'bg-[#2D5A27]/5 border-[#2D5A27]/10 text-gray-600 hover:text-[#2D5A27]'
                      }`}
                    >
                      <span className="block text-xs font-black font-serif">Mobile Money</span>
                      <span className="block text-[9px] text-[#2D5A27]/50 mt-1">MTN / Airtel</span>
                    </button>
                  </div>
                </div>

                {/* Sub panels dynamic matching the chosen method */}
                {paymentMethod === 'card' && (
                  <div className="bg-white border border-[#2D5A27]/15 p-4 rounded-2xl space-y-3 text-xs animate-slideDown">
                    <p className="font-bold text-[#2D5A27] flex items-center space-x-1">
                      <CreditCard className="w-4 h-4 text-[#E5A93B]" />
                      <span>Simulated Standard Credit Card details</span>
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-3">
                        <input
                          type="text"
                          required
                          placeholder="Card Number (4000 1234 5678 9010)"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/10 rounded-lg py-2 px-3 text-xs text-[#2D5A27] opacity-80"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/10 rounded-lg py-2 px-3 text-xs text-[#2D5A27] opacity-80"
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="password"
                          required
                          maxLength="3"
                          placeholder="CVV"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/10 rounded-lg py-2 px-3 text-xs text-[#2D5A27] opacity-80"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'momo' && (
                  <div className="bg-white border border-[#2D5A27]/15 p-4 rounded-2xl space-y-3 text-xs animate-slideDown">
                    <p className="font-bold text-[#2D5A27] flex items-center space-x-1">
                      <Laptop className="w-4 h-4 text-[#E5A93B]" />
                      <span>MTN / Airtel Mobile Money Gateway</span>
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <select
                          value={momoProvider}
                          onChange={(e: any) => setMomoProvider(e.target.value)}
                          className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/10 rounded-lg py-2 px-3 text-xs text-[#2D5A27]"
                        >
                          <option value="MTN" className="bg-white">MTN MoMo 🇺🇬</option>
                          <option value="Airtel" className="bg-white">Airtel Money 🇺🇬 / KES 🇰🇪</option>
                        </select>
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="Phone e.g. 0779726158"
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/10 rounded-lg py-2 px-3 text-xs text-[#2D5A27] opacity-80"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'wire' && (
                  <div className="bg-[#2D5A27]/5 border border-[#2D5A27]/10 p-4 rounded-2xl space-y-2.5 text-xs text-gray-600 font-medium leading-relaxed">
                    <p className="font-bold text-[#2D5A27]">🚀 Direct Foreign &amp; Domestic Routing:</p>
                    <p className="text-[11px]">Stanbic Bank wire payments are secure, providing extreme comfort to foreign clients. No intermediate card clearing percentages.</p>
                  </div>
                )}

                {/* Submitting trigger with processing animations */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={paymentStatus === 'processing' || paymentStatus === 'processing_otp'}
                    className="w-full py-4 bg-[#E5A93B] disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#e5a93b]/95 text-white rounded-full font-bold tracking-wider uppercase text-xs shadow-sm flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                  >
                    {(paymentStatus === 'processing' || paymentStatus === 'processing_otp') ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Applying 3DS Security Layer...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4.5 h-4.5 text-white" />
                        <span>Settle Secure {formattedPayPrice(calculateTotalUSD())} Reservation</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-500 mt-2 font-mono flex items-center justify-center space-x-1">
                    <span>🔐 Certified SSL ESCROW Ledger Connection</span>
                  </p>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Routing numbers board & Transparent Banking (5 Columns) */}
          <div className="lg:col-span-4 bg-white border border-[#2D5A27]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm relative">
            
            {/* Direct Bank Details Board */}
            <div className="space-y-4">
              <span className="text-[10px] text-[#E5A93B] font-bold tracking-widest uppercase flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Stanbic Escrow Ledger</span>
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold leading-none text-[#2D5A27]">Transparent Wire Information</h3>
              <p className="text-gray-600 text-xs sm:text-xs leading-relaxed font-semibold">
                Tastai Safaris operates full board corporate routing indices. Our international accounts are backed by Ugandan Tourism Escrow safeguards.
              </p>
            </div>

            {/* Invoices bank routing listings */}
            <div className="space-y-3.5 pt-2">
              
              {/* Row 1: Bank Name */}
              <div className="bg-[#2D5A27]/5 p-3.5 rounded-xl border border-transparent flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase block">Clearing Institution</span>
                  <span className="text-[#2D5A27] font-bold font-serif">Stanbic Bank Uganda Limited</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded border border-emerald-500/20 uppercase font-mono">Verified</span>
              </div>

              {/* Row 2: Branch Name */}
              <div className="bg-[#2D5A27]/5 p-3.5 rounded-xl border border-transparent flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase block">Branch Address</span>
                  <span className="text-gray-800 font-bold font-sans">Garden City, Plot 64-86 Kitante Road</span>
                </div>
                <button 
                  id="copy-branch-btn"
                  onClick={() => handleCopy('Garden City Branch, Plot 64-86 Kitante Road, Kampala', 'branch')}
                  className="p-2 text-gray-500 hover:text-[#E5A93B]"
                >
                  <span className="text-[9px] font-bold text-[#E5A93B] block">{copiedKey === 'branch' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Row 3: Account Name */}
              <div className="bg-[#2D5A27]/5 p-3.5 rounded-xl border border-transparent flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase block">Beneficiary Entity</span>
                  <span className="text-base font-serif font-black text-[#2D5A27]">Tastai Safaris Co. Ltd</span>
                </div>
                <button 
                  id="copy-beneficiary-btn"
                  onClick={() => handleCopy('Tastai Safaris Company Limited', 'beneficiary')}
                  className="p-2 text-gray-500 hover:text-[#E5A93B]"
                >
                  <span className="text-[9px] font-bold text-[#E5A93B] block">{copiedKey === 'beneficiary' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Row 4: UGX Account */}
              <div className="bg-[#2D5A27]/5 p-3.5 rounded-xl border border-transparent flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase block">UGX Account (Local)</span>
                  <span className="text-[#2D5A27] font-mono font-bold tracking-wider">9030022354189</span>
                </div>
                <button 
                  id="copy-ugx-btn"
                  onClick={() => handleCopy('9030022354189', 'ugx')}
                  className="p-1.5 text-gray-500 hover:text-[#E5A93B] flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold">{copiedKey === 'ugx' ? 'Done' : 'Copy'}</span>
                </button>
              </div>

              {/* Row 5: USD Account */}
              <div className="bg-[#2D5A27]/5 p-3.5 rounded-xl border border-transparent flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase block">USD Account (Intl)</span>
                  <span className="text-emerald-700 font-mono font-bold tracking-wider">9030022356771</span>
                </div>
                <button 
                  id="copy-usd-btn"
                  onClick={() => handleCopy('9030022356771', 'usd')}
                  className="p-1.5 text-gray-500 hover:text-[#E5A93B] flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold">{copiedKey === 'usd' ? 'Done' : 'Copy'}</span>
                </button>
              </div>

              {/* Row 6: SWIFT Code */}
              <div className="bg-[#2D5A27]/5 p-3.5 rounded-xl border border-transparent flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase block">Interbank SWIFT Routing</span>
                  <span className="text-[#2D5A27] font-mono font-bold tracking-widest">SBICUGKAXAA</span>
                </div>
                <button 
                  id="copy-swift-btn"
                  onClick={() => handleCopy('SBICUGKAXAA', 'swift')}
                  className="p-1.5 text-gray-500 hover:text-[#E5A93B] flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold">{copiedKey === 'swift' ? 'Done' : 'Copy'}</span>
                </button>
              </div>

            </div>

            {/* Quick currency settlement rate board */}
            <div className="col-span-full border-t border-[#2D5A27]/10 pt-4 text-xs">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-2">Simulate Multi-Currency conversions</span>
              
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#2D5A27]/5 p-3 rounded-xl border border-transparent text-gray-600 font-medium">
                <div className="flex justify-between items-center">
                  <span>Pay Currency:</span>
                  <select
                    value={payCurrency}
                    onChange={(e) => setPayCurrency(e.target.value as Currency)}
                    className="bg-transparent border-none py-0 pl-1 pr-6 font-bold text-[#E5A93B] outline-none text-[11px] cursor-pointer"
                    id="pay-currency-select"
                  >
                    <option value="USD">🇺🇸 USD</option>
                    <option value="UGX">🇺🇬 UGX</option>
                    <option value="KES">🇰🇪 KES</option>
                    <option value="EUR">🇪🇺 EUR</option>
                    <option value="GBP">🇬🇧 GBP</option>
                  </select>
                </div>
                <div className="flex justify-between items-center pt-0.5">
                  <span>Calculated Amount:</span>
                  <span className="text-emerald-700 font-mono font-extrabold">{formattedPayPrice(calculateTotalUSD())}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
