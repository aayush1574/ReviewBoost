import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Copy, ExternalLink, MapPin, Check } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ReviewPage() {
  const { slug } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const { data } = await axios.get(`${API}/public/place/${slug}`);
        setPlace(data);
      } catch {
        setError('Place not found');
      }
      setLoading(false);
    };
    fetchPlace();
  }, [slug]);

  const handleCopyAndRedirect = async (review, index) => {
    try {
      await navigator.clipboard.writeText(review.text);
      setCopiedIndex(index);
      // Track copy event
      axios.post(`${API}/public/place/${slug}/copy`).catch(() => {});
      // Open Google review page after a short delay
      setTimeout(() => {
        window.open(place.google_review_url, '_blank');
      }, 800);
    } catch {
      // Fallback copy
      const textarea = document.createElement('textarea');
      textarea.value = review.text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      axios.post(`${API}/public/place/${slug}/copy`).catch(() => {});
      setTimeout(() => {
        window.open(place.google_review_url, '_blank');
      }, 800);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="w-8 h-8 border-4 border-[#FF5722] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6">
        <div className="bg-white border-2 border-slate-900 rounded-xl p-8 neo-shadow text-center max-w-md">
          <Star className="w-12 h-12 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
          <h1 className="font-['Outfit'] font-bold text-xl text-slate-900 mb-2">Place Not Found</h1>
          <p className="text-slate-500 font-['Work_Sans']">This QR code may be invalid or expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col pb-32" data-testid="review-page">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/1f204189-95ff-4ea5-8545-7bd787e7a5a3/images/a57d8c4ae558f2d7de7617a6be46bb6c61dd7c949f658b9fc375ab9c0ba82b5a.png)` }}
        />
        <div className="absolute inset-0 bg-[#FDFBF7]/70 backdrop-blur-sm" />
        <div className="relative px-6 pt-8 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#FF5722] border-2 border-slate-900 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-['Outfit'] font-bold text-sm text-slate-900">ReviewBoost</span>
          </div>
          {place.image_url && (
            <img src={place.image_url} alt={place.name} className="w-full h-40 object-cover rounded-xl border-2 border-slate-900 neo-shadow-sm mb-4" />
          )}
          <h1 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-slate-900 mb-1" data-testid="review-page-title">{place.name}</h1>
          <div className="flex items-center gap-2 text-sm text-slate-600 font-['Work_Sans']">
            <span className="bg-[#FFD54F] text-slate-900 border border-slate-900 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">{place.category}</span>
            {place.address && (
              <span className="flex items-center gap-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                {place.address}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-4 py-4">
        <p className="text-sm text-slate-500 font-['Work_Sans'] mb-4 text-center">
          Tap a review to copy it, then post it on Google
        </p>
        <div className="space-y-4">
          {place.reviews?.map((review, index) => (
            <div
              key={index}
              data-testid={`review-card-${index}`}
              onClick={() => handleCopyAndRedirect(review, index)}
              className={`bg-white border-2 rounded-2xl p-5 cursor-pointer transition-all ${
                copiedIndex === index
                  ? 'border-[#064E3B] bg-[#A7F3D0] copy-pulse neo-shadow-sm'
                  : 'border-slate-900 neo-shadow hover:-translate-y-1'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <Star
                    key={s}
                    className={`w-5 h-5 star-animate ${s < review.rating ? 'text-[#FFD54F] fill-[#FFD54F]' : 'text-slate-200'}`}
                    strokeWidth={2}
                    style={{ animationDelay: `${s * 80}ms` }}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-slate-700 font-['Work_Sans'] text-base leading-relaxed mb-4">{review.text}</p>

              {/* Action */}
              <div className={`flex items-center gap-2 text-sm font-semibold font-['Work_Sans'] ${
                copiedIndex === index ? 'text-[#064E3B]' : 'text-[#FF5722]'
              }`}>
                {copiedIndex === index ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                    Copied! Opening Google Reviews...
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" strokeWidth={2.5} />
                    Tap to copy & post on Google
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FDFBF7]/90 backdrop-blur-md border-t-2 border-slate-900 flex flex-col gap-3 z-50" data-testid="sticky-cta">
        <a
          href={place.google_review_url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="post-review-google-btn"
          className="w-full bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl px-8 py-4 font-bold text-lg hover:-translate-y-0.5 transition-all neo-shadow font-['Work_Sans'] flex items-center justify-center gap-2 text-center"
        >
          <ExternalLink className="w-5 h-5" strokeWidth={2.5} />
          Post Review on Google
        </a>
        <p className="text-xs text-slate-400 font-['Work_Sans'] text-center">Pick a review above, then paste it on Google</p>
      </div>
    </div>
  );
}
