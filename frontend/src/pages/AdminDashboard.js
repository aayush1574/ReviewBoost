import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { BarChart3, QrCode, Copy, Building2, Plus, LogOut, Star, TrendingUp, Eye } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminDashboard() {
  const { user, logout, getHeaders } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${API}/analytics/overview`, { headers: getHeaders(), withCredentials: true });
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
    setLoading(false);
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
          <span className="font-['Outfit'] font-black text-xl text-slate-900">ReviewBoost</span>
          <span className="text-sm bg-[#FFD54F] border-2 border-slate-900 rounded-full px-3 py-0.5 font-semibold font-['Work_Sans'] hidden sm:inline">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            data-testid="manage-places-btn"
            onClick={() => navigate('/admin/places')}
            className="bg-white text-slate-900 border-2 border-slate-900 rounded-xl px-4 py-2 font-semibold hover:bg-slate-50 transition-all font-['Work_Sans'] text-sm flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Places</span>
          </button>
          <button
            data-testid="logout-btn"
            onClick={handleLogout}
            className="text-slate-500 hover:text-slate-900 transition-colors p-2"
          >
            <LogOut className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-slate-900 mb-1">Dashboard</h1>
          <p className="text-slate-500 font-['Work_Sans']">Welcome back, {user?.name || user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8" data-testid="stats-grid">
          {[
            { label: "Total Places", value: stats?.total_places || 0, icon: Building2, color: "#FFD54F" },
            { label: "Total QR Scans", value: stats?.total_scans || 0, icon: QrCode, color: "#FF5722" },
            { label: "Reviews Copied", value: stats?.total_copies || 0, icon: Copy, color: "#A7F3D0" },
            { label: "Scans (7 days)", value: stats?.recent_scans_7d || 0, icon: TrendingUp, color: "#FFD54F" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border-2 border-slate-900 rounded-xl p-6 neo-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl border-2 border-slate-900 flex items-center justify-center" style={{ backgroundColor: stat.color }}>
                  <stat.icon className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
                </div>
              </div>
              <div className="font-['Outfit'] font-black text-3xl text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-['Work_Sans'] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            data-testid="add-place-dashboard-btn"
            onClick={() => navigate('/admin/places/new')}
            className="bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl p-6 neo-shadow hover:-translate-y-1 transition-all text-left"
          >
            <Plus className="w-8 h-8 mb-3" strokeWidth={2.5} />
            <div className="font-['Outfit'] font-bold text-xl">Add New Place</div>
            <div className="text-white/80 font-['Work_Sans'] text-sm mt-1">List a hotel, restaurant or business</div>
          </button>
          <button
            data-testid="view-places-dashboard-btn"
            onClick={() => navigate('/admin/places')}
            className="bg-white text-slate-900 border-2 border-slate-900 rounded-xl p-6 neo-shadow hover:-translate-y-1 transition-all text-left"
          >
            <Eye className="w-8 h-8 mb-3" strokeWidth={2.5} />
            <div className="font-['Outfit'] font-bold text-xl">View All Places</div>
            <div className="text-slate-500 font-['Work_Sans'] text-sm mt-1">Manage QR codes and reviews</div>
          </button>
        </div>

        {/* Top Places */}
        {stats?.top_places?.length > 0 && (
          <div className="bg-white border-2 border-slate-900 rounded-xl p-6 neo-shadow" data-testid="top-places-section">
            <h2 className="font-['Outfit'] font-bold text-xl mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#FF5722]" strokeWidth={2.5} />
              Top Performing Places
            </h2>
            <div className="space-y-3">
              {stats.top_places.map((place, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-2 border-slate-200 rounded-xl hover:border-slate-900 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FFD54F] border-2 border-slate-900 rounded-lg flex items-center justify-center font-['Outfit'] font-bold text-sm">{i + 1}</div>
                    <div>
                      <div className="font-['Work_Sans'] font-semibold text-slate-900">{place.name}</div>
                      <div className="text-xs text-slate-500 font-['Work_Sans'] uppercase tracking-wider">{place.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-['Work_Sans']">
                    <span className="text-slate-500"><QrCode className="w-4 h-4 inline mr-1" />{place.total_scans}</span>
                    <span className="text-slate-500"><Copy className="w-4 h-4 inline mr-1" />{place.total_copies}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
