import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Plus, QrCode, Copy, Star, Building2, ArrowLeft, Trash2, Settings, LogOut } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminPlaces() {
  const { getHeaders, logout } = useAuth();
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const { data } = await axios.get(`${API}/places`, { headers: getHeaders(), withCredentials: true });
      setPlaces(data);
    } catch (err) {
      console.error('Failed to fetch places', err);
    }
    setLoading(false);
  };

  const deletePlace = async (id) => {
    if (!window.confirm('Are you sure you want to delete this place?')) return;
    try {
      await axios.delete(`${API}/places/${id}`, { headers: getHeaders(), withCredentials: true });
      setPlaces(places.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete place');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="w-8 h-8 border-4 border-[#FF5722] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
        <div className="flex items-center gap-3">
          <button
            data-testid="back-to-dashboard-btn"
            onClick={() => navigate('/admin/dashboard')}
            className="text-slate-500 hover:text-slate-900 transition-colors p-2 flex items-center gap-1 text-sm font-['Work_Sans']"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            Dashboard
          </button>
          <button data-testid="logout-btn-places" onClick={handleLogout} className="text-slate-500 hover:text-slate-900 transition-colors p-2">
            <LogOut className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Outfit'] font-black text-3xl text-slate-900">Your Places</h1>
            <p className="text-slate-500 font-['Work_Sans'] mt-1">{places.length} place{places.length !== 1 ? 's' : ''} listed</p>
          </div>
          <button
            data-testid="add-new-place-btn"
            onClick={() => navigate('/admin/places/new')}
            className="bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl px-6 py-3 font-bold hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all neo-shadow font-['Work_Sans'] flex items-center gap-2"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            Add Place
          </button>
        </div>

        {places.length === 0 ? (
          <div className="bg-white border-2 border-slate-900 rounded-xl p-12 neo-shadow text-center">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="font-['Outfit'] font-bold text-xl text-slate-900 mb-2">No places yet</h2>
            <p className="text-slate-500 font-['Work_Sans'] mb-6">Add your first hotel or restaurant to get started</p>
            <button
              data-testid="add-first-place-btn"
              onClick={() => navigate('/admin/places/new')}
              className="bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl px-6 py-3 font-bold neo-shadow hover:-translate-y-0.5 transition-all font-['Work_Sans']"
            >
              Add Your First Place
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="places-grid">
            {places.map((place) => (
              <div key={place.id} className="bg-white border-2 border-slate-900 rounded-xl neo-shadow overflow-hidden hover:-translate-y-1 transition-all">
                {/* Image */}
                {place.image_url ? (
                  <img src={place.image_url} alt={place.name} className="w-full h-40 object-cover border-b-2 border-slate-900" />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-[#FFD54F] to-[#FF5722] border-b-2 border-slate-900 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-white" strokeWidth={2} />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold font-['Work_Sans'] uppercase tracking-wider text-[#FF5722] bg-[#FF5722]/10 px-2 py-0.5 rounded-full">{place.category}</span>
                    {place.tone && (
                      <span className="text-xs font-medium font-['Work_Sans'] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full capitalize">{place.tone}</span>
                    )}
                  </div>
                  <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 mb-1">{place.name}</h3>
                  {place.address && <p className="text-sm text-slate-500 font-['Work_Sans'] mb-3">{place.address}</p>}
                  <div className="flex items-center gap-4 text-sm font-['Work_Sans'] text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><QrCode className="w-4 h-4" />{place.total_scans} scans</span>
                    <span className="flex items-center gap-1"><Copy className="w-4 h-4" />{place.total_copies} copies</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      data-testid={`manage-place-${place.id}`}
                      onClick={() => navigate(`/admin/places/${place.id}`)}
                      className="flex-1 bg-white text-slate-900 border-2 border-slate-900 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-50 transition-all font-['Work_Sans'] flex items-center justify-center gap-1"
                    >
                      <Settings className="w-4 h-4" strokeWidth={2.5} />
                      Manage
                    </button>
                    <button
                      data-testid={`delete-place-${place.id}`}
                      onClick={() => deletePlace(place.id)}
                      className="text-red-500 border-2 border-red-200 rounded-lg px-3 py-2 hover:bg-red-50 hover:border-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
