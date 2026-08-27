import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { ArrowLeft, Star, Save, Building2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PLACEHOLDER_IMAGES = {
  hotel: "https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGZhY2FkZXxlbnwwfHx8fDE3NzY1MzYyMTB8MA&ixlib=rb-4.1.0&q=85",
  restaurant: "https://images.unsplash.com/photo-1685040235380-a42a129ade4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MHx8fHwxNzc2NTM2MjEwfDA&ixlib=rb-4.1.0&q=85",
  cafe: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
  grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
  clothes: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop",
  salon: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop",
  store: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=600&auto=format&fit=crop",
  hospital: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop",
  nail_salon: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop",
  service: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
  real_estate: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop",
  education: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
  event_planner: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
  ecommerce: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=600&auto=format&fit=crop",
  marketing: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  corporate: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
  freelance: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
  other: "https://images.unsplash.com/photo-1521791136364-7986c2953e15?q=80&w=600&auto=format&fit=crop",
};

export default function AddPlace() {
  const { getHeaders } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', category: 'restaurant', description: '', address: '', google_review_url: '', image_url: '', tone: 'casual' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    setError('');

    try {
      const { data } = await axios.post(`${API}/upload`, formData, {
        headers: {
          ...getHeaders(),
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      setForm((prev) => ({ ...prev, image_url: data.url }));
    } catch (err) {
      console.error(err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.google_review_url) {
      setError('Name and Google Review URL are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = { ...form };
      if (!payload.image_url) {
        payload.image_url = PLACEHOLDER_IMAGES[form.category] || PLACEHOLDER_IMAGES.other;
      }
      await axios.post(`${API}/places`, payload, { headers: getHeaders(), withCredentials: true });
      navigate('/admin/places');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create place');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b-2 border-slate-900 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF5722] border-2 border-slate-900 rounded-xl flex items-center justify-center neo-shadow-sm">
            <Star className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-['Outfit'] font-black text-xl text-slate-900">GoogleBoost</span>
        </div>
        <button
          data-testid="back-to-places-btn"
          onClick={() => navigate('/admin/places')}
          className="text-slate-500 hover:text-slate-900 transition-colors p-2 flex items-center gap-1 text-sm font-['Work_Sans']"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          Back
        </button>
      </nav>

      <div className="p-6 md:p-8 lg:p-12 max-w-2xl mx-auto">
        <h1 className="font-['Outfit'] font-black text-3xl text-slate-900 mb-2">Add New Place</h1>
        <p className="text-slate-500 font-['Work_Sans'] mb-8">Fill in the details to generate AI reviews and a QR code</p>

        {error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl px-4 py-3 mb-6 text-red-700 text-sm font-['Work_Sans']" data-testid="add-place-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" data-testid="add-place-form">
          <div className="bg-white border-2 border-slate-900 rounded-xl p-6 neo-shadow space-y-5">
            <div>
              <Label className="font-['Work_Sans'] font-semibold text-slate-900">Business Name *</Label>
              <Input
                data-testid="place-name-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Grand Palace Hotel"
                required
                className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans']"
              />
            </div>

            <div>
              <Label className="font-['Work_Sans'] font-semibold text-slate-900">Category *</Label>
              <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
                <SelectTrigger data-testid="place-category-select" className="mt-1 border-2 border-slate-300 rounded-xl h-12 font-['Work_Sans']">
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
              <Label className="font-['Work_Sans'] font-semibold text-slate-900">Description</Label>
              <Textarea
                data-testid="place-description-input"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of the business"
                className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl font-['Work_Sans'] min-h-[80px]"
              />
            </div>

            <div>
              <Label className="font-['Work_Sans'] font-semibold text-slate-900">Address</Label>
              <Input
                data-testid="place-address-input"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. 123 Main Street, City"
                className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans']"
              />
            </div>

            <div>
              <Label className="font-['Work_Sans'] font-semibold text-slate-900">Review Tone</Label>
              <Select value={form.tone} onValueChange={(val) => setForm({ ...form, tone: val })}>
                <SelectTrigger data-testid="place-tone-select" className="mt-1 border-2 border-slate-300 rounded-xl h-12 font-['Work_Sans']">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual — Friendly & relaxed</SelectItem>
                  <SelectItem value="formal">Formal — Professional & polished</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic — Energetic & exciting</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400 font-['Work_Sans'] mt-1">Choose the voice that matches your brand</p>
            </div>

            <div>
              <Label className="font-['Work_Sans'] font-semibold text-slate-900">Google Review URL *</Label>
              <Input
                data-testid="place-google-url-input"
                value={form.google_review_url}
                onChange={(e) => setForm({ ...form, google_review_url: e.target.value })}
                placeholder="https://g.page/r/..."
                required
                className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans']"
              />
              <p className="text-xs text-slate-400 font-['Work_Sans'] mt-1">Paste the direct Google review link for your business</p>
            </div>

            <div>
              <Label className="font-['Work_Sans'] font-semibold text-slate-900">Shop Image</Label>
              <div className="mt-2 flex items-center gap-4">
                {form.image_url && (
                  <img
                    src={form.image_url}
                    alt="Preview"
                    className="w-16 h-16 object-cover border-2 border-slate-900 rounded-xl neo-shadow-sm"
                  />
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans'] p-2 flex items-center bg-white"
                  />
                  <p className="text-xs text-slate-400 font-['Work_Sans'] mt-1">
                    {uploading ? "Uploading image..." : "Upload a photo of your shop, or leave empty to use a default placeholder"}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <button
            type="submit"
            data-testid="submit-place-btn"
            disabled={loading}
            className="w-full bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl px-8 py-4 font-bold text-lg hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all neo-shadow font-['Work_Sans'] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" strokeWidth={2.5} />
            {loading ? 'Creating...' : 'Create Place & Generate Reviews'}
          </button>
        </form>
      </div>
    </div>
  );
}
