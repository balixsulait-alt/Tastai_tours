import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, CheckCircle, Flame, Sparkles, Filter, PlusCircle, ThumbsUp, Heart } from 'lucide-react';
import { UserReview } from '../types';
import { TESTIMONIALS } from '../data';

interface ReviewSystemProps {
  customReviews: UserReview[];
  onAddNewReview: (review: UserReview) => void;
}

export default function ReviewSystem({ customReviews, onAddNewReview }: ReviewSystemProps) {
  const [reviewsList, setReviewsList] = useState<UserReview[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form Fields
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [packageName, setPackageName] = useState('Magical Zanzibar Getaway & Cultural Tour');
  const [reviewText, setReviewText] = useState('');
  const [formTag, setFormTag] = useState('Wildlife');

  useEffect(() => {
    // Combine mock base reviews with user submitted customReviews
    const combined = [...customReviews, ...TESTIMONIALS];
    setReviewsList(combined);
  }, [customReviews]);

  // Handle Likes increment physically in local state
  const handleLike = (id: string) => {
    setReviewsList((prev) => 
      prev.map((r) => r.id === id ? { ...r, likes: r.likes + 1 } : r)
    );
  };

  const tags = ['All', 'Zanzibar', 'Wildlife', 'Gorilla', 'Luxury', 'Adventure', 'Uganda', 'Culture'];

  const filteredReviews = reviewsList.filter((r) => {
    if (selectedTag === 'All') return true;
    return r.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());
  });

  const getAverageRating = () => {
    if (reviewsList.length === 0) return 4.9;
    const total = reviewsList.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviewsList.length).toFixed(1);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !reviewText) {
      alert('Kindly provide your name and review reviewText first.');
      return;
    }

    const newRevObj: UserReview = {
      id: 'rev-user-' + Date.now(),
      author: author,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?auto=format&fit=crop&w=150&q=80`,
      rating: rating,
      date: new Date().toISOString().split('T')[0],
      packageName: packageName,
      reviewText: reviewText,
      tags: [formTag],
      verified: true,
      likes: 0
    };

    onAddNewReview(newRevObj);
    setShowAddForm(false);
    
    // reset form fields
    setAuthor('');
    setReviewText('');
    setRating(5);
  };

  return (
    <section className="py-16 bg-[#FDFBF7] text-[#2D5A27]" id="customer-reviews-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] bg-[#2D5A27]/10 border border-[#E5A93B]/40 px-3.5 py-1.5 rounded-full text-[#2D5A27] font-bold tracking-widest uppercase mb-3 inline-block">
            ★ Verified Travelers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2D5A27]">
            Client Stories &amp; Testimonials
          </h2>
          <p className="mt-4 text-gray-650 text-sm sm:text-base font-medium">
            We are proud to serve couples, families, and international corporate groups. Hear directly about their uncompromised all-inclusive experiences.
          </p>
        </div>

        {/* Aggregate Ratings & Forms trigger */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-6 sm:p-8 rounded-3xl border border-[#2D5A27]/10 shadow-sm mb-10">
          
          <div className="md:col-span-4 text-center md:text-left space-y-2 border-r-0 md:border-r border-[#2D5A27]/10 pr-0 md:pr-6">
            <h4 className="font-serif text-xs font-bold text-gray-400 uppercase tracking-widest">Aggregate Rating Score</h4>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-4xl sm:text-5xl font-serif font-black text-[#E5A93B]" id="average-review-score">{getAverageRating()}</span>
              <div>
                <div className="flex text-[#E5A93B] text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#E5A93B]" />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-bold block mt-0.5">Based on {reviewsList.length} global responses</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 text-xs text-gray-500 leading-relaxed md:px-4 font-semibold">
            <span className="font-black text-[#2D5A27] block mb-1">Authentic Audit Trails</span>
            Every response listed has completed an active Tour Itinerary with Tastai Safaris. Likes and contributions are logged dynamically on local ledger cache.
          </div>

          <div className="md:col-span-3 text-right">
            <button
              id="write-review-toggle-btn"
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full md:w-auto px-5 py-3.5 bg-[#2D5A27] hover:bg-[#2D5A27]/90 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-[#E5A93B]" />
              <span>Write Adventure Review</span>
            </button>
          </div>

        </div>

        {/* Dynamic Add Review Form */}
        {showAddForm && (
          <div className="bg-white border border-[#2D5A27]/15 rounded-3xl p-6 sm:p-8 space-y-5 animate-slideDown mb-10" id="add-review-form-container">
            <div className="flex justify-between items-center border-b border-[#2D5A27]/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#2D5A27] flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#E5A93B]" />
                <span>Submit Verified Adventure Testimony</span>
              </h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-[#2D5A27] text-sm cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Name */}
              <div className="sm:col-span-4">
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Your Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sandra Bullock"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/15 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#E5A93B] text-[#2D5A27] font-semibold"
                />
              </div>

              {/* Package Dropdown */}
              <div className="sm:col-span-4">
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Expedition Taken:</label>
                <select
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/15 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#E5A93B] text-[#2D5A27] font-semibold cursor-pointer"
                >
                  <option value="Magical Zanzibar Getaway & Cultural Tour" className="bg-white">Zanzibar Getaway</option>
                  <option value="Serengeti & Ngorongoro Premium Crater Classic" className="bg-white">Sereneti Migration</option>
                  <option value="Bwindi Impenetrable Jungle & Gorilla Trekking Classic" className="bg-white">Gorilla Trekking</option>
                </select>
              </div>

              {/* Rating Star Selection */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Rating Score:</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value) || 5)}
                  className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/15 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#E5A93B] text-[#2D5A27] font-semibold cursor-pointer"
                >
                  <option value="5" className="bg-white">★★★★★ (5 Stars)</option>
                  <option value="4" className="bg-white">★★★★☆ (4 Stars)</option>
                  <option value="3" className="bg-white">★★★☆☆ (3 Stars)</option>
                </select>
              </div>

              {/* Tag select */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Review Tag:</label>
                <select
                  value={formTag}
                  onChange={(e) => setFormTag(e.target.value)}
                  className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/15 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#E5A93B] text-[#2D5A27] font-semibold cursor-pointer"
                >
                  <option value="Zanzibar" className="bg-white">Zanzibar</option>
                  <option value="Wildlife" className="bg-white">Wildlife</option>
                  <option value="Gorilla" className="bg-white">Gorilla</option>
                  <option value="Luxury" className="bg-white">Luxury</option>
                  <option value="Adventure" className="bg-white">Adventure</option>
                </select>
              </div>

              {/* Text Area review content */}
              <div className="sm:col-span-12">
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Review Message (Min 2 sentences):</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How was the guide? Was our accommodation transparent in luxury? Describe your dolphin swim / gorilla tracking insights."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-[#2D5A27]/5 border border-[#2D5A27]/15 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#E5A93B] text-[#2D5A27] font-semibold"
                />
              </div>

              {/* Submit Form button */}
              <div className="sm:col-span-12 flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#E5A93B] text-white rounded-full font-bold uppercase text-xs hover:bg-[#e5a93b]/90 transition-colors cursor-pointer shadow-sm"
                >
                  File Verified Log
                </button>
              </div>
            </form>

          </div>
        )}

        {/* Tag Filters list */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-6 border-b border-[#2D5A27]/10 mb-8 font-sans scrollbar-thin">
          <Filter className="w-4.5 h-4.5 text-gray-400 shrink-0" />
          <span className="text-[10px] uppercase font-bold text-gray-500 shrink-0 mr-2">Filter Tag:</span>
          {tags.map((t) => (
            <button
              key={t}
              id={`review-tag-${t.toLowerCase()}`}
              onClick={() => setSelectedTag(t)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                selectedTag === t
                  ? 'bg-[#2D5A27] text-white border border-[#E5A93B]/20 shadow-sm'
                  : 'bg-[#2D5A27]/5 text-gray-600 border border-transparent hover:bg-[#2D5A27]/10'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="reviews-grid-list">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#2D5A27]/10 flex flex-col justify-between hover:border-[#E5A93B]/30 hover:shadow-md transition-all duration-300 shadow-sm text-[#2D5A27]"
            >
              
              <div className="space-y-4">
                {/* Header author info */}
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-[#E5A93B]/30 shrink-0">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold text-[#2D5A27] block">{rev.author}</span>
                      {rev.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" title="Verified Traveler" />
                      )}
                    </div>
                    <span className="text-[9px] text-gray-500 font-medium block">Traveler • verified</span>
                  </div>
                </div>

                {/* Stars + Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#E5A93B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono font-medium">{rev.date}</span>
                </div>

                {/* Package Tag Name info */}
                <p className="text-[10px] text-[#2D5A27] font-bold uppercase tracking-wider bg-[#2D5A27]/10 px-2 py-0.5 rounded inline-block">
                  {rev.packageName.split(' & ')[0]}
                </p>

                {/* Feedback text */}
                <p className="text-xs text-gray-600 leading-relaxed font-semibold">{rev.reviewText}</p>
              </div>

              {/* Likes counter bottom bar */}
              <div className="flex justify-between items-center border-t border-[#2D5A27]/10 pt-4 mt-4">
                <div className="flex flex-wrap gap-1">
                  {rev.tags.map((tag, idx) => (
                    <span key={idx} className="text-[9px] bg-[#2D5A27]/5 text-gray-500 border border-[#2D5A27]/10 px-2 py-0.5 rounded font-semibold">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Thumbs up button */}
                <button
                  id={`review-like-btn-${rev.id}`}
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center space-x-1 text-[11px] text-[#2D5A27] hover:text-[#E5A93B] transition-colors cursor-pointer bg-[#2D5A27]/5 py-1 px-2.5 rounded-full border border-[#2D5A27]/10 font-bold"
                >
                  <ThumbsUp className="w-3 h-3 text-[#2D5A27]" />
                  <span>{rev.likes} Likes</span>
                </button>
              </div>

            </div>
          ))}
          {filteredReviews.length === 0 && (
            <div className="col-span-full text-center py-12 text-xs text-gray-500 font-sans font-bold">
              No matching testimonies under the selected category.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
