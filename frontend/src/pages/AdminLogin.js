import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Star, LogIn } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (typeof detail === 'string') setError(detail);
      else if (Array.isArray(detail)) setError(detail.map(e => e.msg || JSON.stringify(e)).join(' '));
      else setError('Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#FF5722] border-2 border-slate-900 rounded-xl flex items-center justify-center neo-shadow-sm">
            <Star className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-['Outfit'] font-black text-2xl text-slate-900">ReviewBoost</span>
        </div>

        {/* Card */}
        <div className="bg-white border-2 border-slate-900 rounded-xl p-8 neo-shadow" data-testid="login-form-card">
          <h1 className="font-['Outfit'] font-bold text-2xl text-slate-900 mb-1">Admin Login</h1>
          <p className="text-slate-500 font-['Work_Sans'] mb-6">Sign in to manage your places</p>

          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl px-4 py-3 mb-4 text-red-700 text-sm font-['Work_Sans']" data-testid="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="font-['Work_Sans'] font-semibold text-slate-900">Email</Label>
              <Input
                id="email"
                data-testid="login-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@reviewboost.com"
                required
                className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans']"
              />
            </div>
            <div>
              <Label htmlFor="password" className="font-['Work_Sans'] font-semibold text-slate-900">Password</Label>
              <Input
                id="password"
                data-testid="login-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="mt-1 border-2 border-slate-300 focus:border-[#FF5722] rounded-xl h-12 font-['Work_Sans']"
              />
            </div>
            <button
              type="submit"
              data-testid="login-submit-btn"
              disabled={loading}
              className="w-full bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl px-8 py-3.5 font-bold text-lg hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all neo-shadow font-['Work_Sans'] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" strokeWidth={2.5} />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <button
          data-testid="back-to-home-btn"
          onClick={() => navigate('/')}
          className="w-full mt-4 text-slate-500 hover:text-slate-900 font-['Work_Sans'] text-sm transition-colors"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
