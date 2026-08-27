import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Star, RefreshCw, QrCode, Copy, ExternalLink, Download, Trash2, Settings, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TONE_LABELS = {
  casual: { label: "Casual", desc: "Friendly & relaxed", color: "#FFD54F" },
  formal: { label: "Formal", desc: "Professional & polished", color: "#A7F3D0" },
  enthusiastic: { label: "Enthusiastic", desc: "Energetic & exciting", color: "#FF5722" },
};

export default function PlaceDetail() {
  const { id } = useParams();
  const { getHeaders } = useAuth();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState('');
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editGoogleReviewUrl, setEditGoogleReviewUrl] = useState('');
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImageUrl, setEditImageUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const qrRef = useRef(null);

  const qrUrl = place ? `${window.location.origin}/r/${place.slug}` : '';

  const fetchPlace = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/places/${id}`, { headers: getHeaders(), withCredentials: true });
      setPlace(data);
      setSelectedTone(data.tone || 'casual');
      setEditName(data.name || '');
      setEditCategory(data.category || '');
      setEditAddress(data.address || '');
      setEditDescription(data.description || '');
      setEditGoogleReviewUrl(data.google_review_url || '');
      setEditImageUrl(data.image_url || '');
    } catch {
      navigate('/admin/places');
    }
    setLoading(false);
  }, [id, getHeaders, navigate]);

  useEffect(() => {
    fetchPlace();
  }, [fetchPlace]);

  const handleUpdatePlace = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', editName);
      formData.append('category', editCategory);
      formData.append('address', editAddress);
      formData.append('description', editDescription);
      formData.append('google_review_url', editGoogleReviewUrl);
      formData.append('tone', selectedTone);
      
      if (editImageFile) {
        formData.append('image', editImageFile);
      } else {
        formData.append('image_url', editImageUrl);
      }

      const { data } = await axios.put(`${API}/places/${id}`, formData, {
        headers: {
          ...getHeaders(),
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      setPlace(data);
      setEditImageUrl(data.image_url);
      alert('Place details updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update place details');
    }
    setSaving(false);
  };

  const regenerateReviews = async (tone) => {
    setRegenerating(true);
    try {
      const { data } = await axios.post(`${API}/places/${id}/regenerate-reviews`, { tone: tone || selectedTone }, { headers: getHeaders(), withCredentials: true });
      setPlace(prev => ({ ...prev, reviews: data.reviews, tone: data.tone }));
      setSelectedTone(data.tone);
    } catch {
      alert('Failed to regenerate reviews');
    }
    setRegenerating(false);
  };

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 512, 512);
      ctx.drawImage(img, 0, 0, 512, 512);
      const a = document.createElement('a');
      a.download = `${place.name}-qr-code.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const deletePlace = async () => {
    if (!window.confirm('Delete this place permanently?')) return;
    try {
      await axios.delete(`${API}/places/${id}`, { headers: getHeaders(), withCredentials: true });
      navigate('/admin/places');
    } catch {
      alert('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="w-8 h-8 border-4 border-[#FF5722] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!place) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b-2 border-slate-900 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF5722] border-2 border-slate-900 rounded-xl flex items-center justify-center neo-shadow-sm">
            <Star className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-['Outfit'] font-black text-xl text-slate-900">GoogleBoost</span>
        </div>
        <button
          data-testid="back-to-places-detail-btn"
          onClick={() => navigate('/admin/places')}
          className="text-slate-500 hover:text-slate-900 transition-colors p-2 flex items-center gap-1 text-sm font-['Work_Sans']"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          Back
        </button>
      </nav>

      <div className="p-6 md:p-8 lg:p-12 max-w-5xl mx-auto">
        {/* Place Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold font-['Work_Sans'] uppercase tracking-wider text-[#FF5722] bg-[#FF5722]/10 px-2 py-0.5 rounded-full">{place.category}</span>
            </div>
            <h1 className="font-['Outfit'] font-black text-3xl text-slate-900 mb-2" data-testid="place-detail-name">{place.name}</h1>
            {place.address && <p className="text-slate-500 font-['Work_Sans'] mb-2">{place.address}</p>}
            {place.description && <p className="text-slate-600 font-['Work_Sans']">{place.description}</p>}
            <div className="flex items-center gap-4 mt-4 text-sm font-['Work_Sans']">
              <span className="flex items-center gap-1 text-slate-500"><QrCode className="w-4 h-4" />{place.total_scans} scans</span>
              <span className="flex items-center gap-1 text-slate-500"><Copy className="w-4 h-4" />{place.total_copies} copies</span>
            </div>
          </div>
          <button
            data-testid="delete-place-detail-btn"
            onClick={deletePlace}
            className="self-start text-red-500 border-2 border-red-200 rounded-xl px-4 py-2 hover:bg-red-50 hover:border-red-500 transition-all flex items-center gap-2 text-sm font-['Work_Sans']"
          >
            <Trash2 className="w-4 h-4" strokeWidth={2.5} />
            Delete
          </button>
        </div>

        <Tabs defaultValue="qr" className="space-y-6">
          <TabsList className="bg-white border-2 border-slate-900 rounded-xl p-1 neo-shadow-sm">
            <TabsTrigger value="qr" className="font-['Work_Sans'] font-semibold rounded-lg data-[state=active]:bg-[#FF5722] data-[state=active]:text-white">QR Code</TabsTrigger>
            <TabsTrigger value="reviews" className="font-['Work_Sans'] font-semibold rounded-lg data-[state=active]:bg-[#FF5722] data-[state=active]:text-white">Reviews ({place.reviews?.length || 0})</TabsTrigger>
            <TabsTrigger value="edit" className="font-['Work_Sans'] font-semibold rounded-lg data-[state=active]:bg-[#FF5722] data-[state=active]:text-white">Edit Details</TabsTrigger>
          </TabsList>

          <TabsContent value="qr">
            <div className="bg-white border-2 border-slate-900 rounded-xl p-8 neo-shadow text-center">
              <h2 className="font-['Outfit'] font-bold text-xl mb-4">Scan QR Code</h2>
              <div ref={qrRef} className="inline-block p-6 bg-white border-2 border-slate-900 rounded-2xl neo-shadow-sm mb-4">
                <QRCodeSVG value={qrUrl} size={200} level="H" />
              </div>
              <p className="text-sm text-slate-500 font-['Work_Sans'] mb-4 break-all">{qrUrl}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  data-testid="download-qr-btn"
                  onClick={downloadQR}
                  className="bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl px-6 py-2.5 font-semibold neo-shadow-sm hover:-translate-y-0.5 transition-all font-['Work_Sans'] flex items-center gap-2"
                >
                  <Download className="w-4 h-4" strokeWidth={2.5} />
                  Download QR
                </button>
                <button
                  data-testid="copy-qr-link-btn"
                  onClick={() => { navigator.clipboard.writeText(qrUrl); }}
                  className="bg-white text-slate-900 border-2 border-slate-900 rounded-xl px-6 py-2.5 font-semibold neo-shadow-sm hover:-translate-y-0.5 transition-all font-['Work_Sans'] flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" strokeWidth={2.5} />
                  Copy Link
                </button>
                <a
                  data-testid="preview-qr-link"
                  href={`/r/${place.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-slate-900 border-2 border-slate-900 rounded-xl px-6 py-2.5 font-semibold neo-shadow-sm hover:-translate-y-0.5 transition-all font-['Work_Sans'] flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                  Preview
                </a>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {/* Tone Selector */}
              <div className="bg-white border-2 border-slate-900 rounded-xl p-5 neo-shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#FF5722]" strokeWidth={2.5} />
                  <h3 className="font-['Outfit'] font-bold text-lg">Review Tone</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {Object.entries(TONE_LABELS).map(([key, t]) => (
                    <button
                      key={key}
                      data-testid={`tone-${key}-btn`}
                      onClick={() => setSelectedTone(key)}
                      className={`border-2 rounded-xl p-3 text-left transition-all font-['Work_Sans'] ${
                        selectedTone === key
                          ? 'border-slate-900 neo-shadow-sm'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                      style={selectedTone === key ? { borderTopColor: t.color, borderTopWidth: '4px' } : {}}
                    >
                      <div className="font-semibold text-sm text-slate-900">{t.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500 font-['Work_Sans']">
                    Current: <span className="font-semibold text-slate-900">{TONE_LABELS[place.tone || 'casual']?.label}</span>
                  </div>
                  <button
                    data-testid="regenerate-reviews-btn"
                    onClick={() => regenerateReviews(selectedTone)}
                    disabled={regenerating}
                    className="bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl px-5 py-2.5 font-semibold neo-shadow-sm hover:-translate-y-0.5 transition-all font-['Work_Sans'] flex items-center gap-2 text-sm disabled:opacity-60"
                  >
                    <RefreshCw className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`} strokeWidth={2.5} />
                    {regenerating ? 'Generating...' : 'Generate Reviews'}
                  </button>
                </div>
              </div>

              {/* Review Cards */}
              <h2 className="font-['Outfit'] font-bold text-xl">Generated Reviews ({place.reviews?.length || 0})</h2>
              {place.reviews?.map((review, i) => (
                <div key={i} className="bg-white border-2 border-slate-900 rounded-xl p-5 neo-shadow-sm">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className={`w-5 h-5 ${s < review.rating ? 'text-[#FFD54F] fill-[#FFD54F]' : 'text-slate-200'}`} strokeWidth={2} />
                    ))}
                  </div>
                  <p className="text-slate-700 font-['Work_Sans'] leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <form onSubmit={handleUpdatePlace} className="space-y-6" data-testid="edit-place-form">
              <div className="bg-white border-2 border-slate-900 rounded-xl p-6 neo-shadow space-y-5">
                <div>
                  <Label className="font-['Work_Sans'] font-semibold text-slate-900">Business Name *</Label>
                  <Input
                    data-testid="edit-place-name-input"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="e.g. Grand Palace Hotel"
                    required
                    className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans']"
                  />
                </div>

                <div>
                  <Label className="font-['Work_Sans'] font-semibold text-slate-900">Category *</Label>
                  <Select value={editCategory} onValueChange={(val) => setEditCategory(val)}>
                    <SelectTrigger className="mt-1 border-2 border-slate-300 rounded-xl h-12 font-['Work_Sans']">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salon">Salons & Spas</SelectItem>
                      <SelectItem value="restaurant">Restaurants</SelectItem>
                      <SelectItem value="cafe">Cafes</SelectItem>
                      <SelectItem value="hotel">Hotels & Resorts</SelectItem>
                      <SelectItem value="hospital">Hospitals & Clinics</SelectItem>
                      <SelectItem value="nail_salon">Nail Art Studios</SelectItem>
                      <SelectItem value="service">Service Providers</SelectItem>
                      <SelectItem value="store">Retail Stores</SelectItem>
                      <SelectItem value="grocery">Grocery Store</SelectItem>
                      <SelectItem value="clothes">Clothing Boutique</SelectItem>
                      <SelectItem value="gym">Gyms & Fitness Centers</SelectItem>
                      <SelectItem value="real_estate">Real Estate Agencies</SelectItem>
                      <SelectItem value="education">Educational Institutions</SelectItem>
                      <SelectItem value="event_planner">Event Planners</SelectItem>
                      <SelectItem value="ecommerce">E-commerce Sellers</SelectItem>
                      <SelectItem value="marketing">Marketers</SelectItem>
                      <SelectItem value="corporate">Corporate Offices</SelectItem>
                      <SelectItem value="freelance">Freelancers & Small Business Owners</SelectItem>
                      <SelectItem value="other">Other / General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-['Work_Sans'] font-semibold text-slate-900">Address</Label>
                  <Input
                    data-testid="edit-place-address-input"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="e.g. 123 Main St, New York"
                    className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans']"
                  />
                </div>

                <div>
                  <Label className="font-['Work_Sans'] font-semibold text-slate-900">Description</Label>
                  <Textarea
                    data-testid="edit-place-description-input"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Describe your business..."
                    className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl min-h-[100px] font-['Work_Sans']"
                  />
                </div>

                <div>
                  <Label className="font-['Work_Sans'] font-semibold text-slate-900">Google Maps Review Link</Label>
                  <Input
                    data-testid="edit-place-review-url-input"
                    value={editGoogleReviewUrl}
                    onChange={(e) => setEditGoogleReviewUrl(e.target.value)}
                    placeholder="https://g.page/r/..."
                    className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans']"
                  />
                </div>

                <div>
                  <Label className="font-['Work_Sans'] font-semibold text-slate-900">Cover Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditImageFile(e.target.files[0])}
                    className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans'] bg-white"
                  />
                  {editImageUrl && !editImageFile && (
                    <div className="mt-2 text-xs text-slate-500 font-['Work_Sans'] flex items-center gap-2">
                      <span>Current cover image:</span>
                      <a href={editImageUrl} target="_blank" rel="noopener noreferrer" className="text-[#FF5722] hover:underline font-semibold">View Image</a>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl py-4 font-bold text-lg hover:-translate-y-0.5 transition-all neo-shadow font-['Work_Sans'] flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving ? 'Saving changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
