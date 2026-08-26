import { useNavigate } from 'react-router-dom';
import { Star, QrCode, Copy, ExternalLink, ArrowRight, Zap, BarChart3, Shield, Mail, Phone, MessageCircle } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b-2 border-slate-900 px-6 py-4 flex justify-between items-center" data-testid="landing-nav">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF5722] border-2 border-slate-900 rounded-xl flex items-center justify-center neo-shadow-sm">
            <Star className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-['Outfit'] font-black text-xl text-slate-900">GoogleBoost</span>
        </div>
        <button
          data-testid="nav-admin-login-btn"
          onClick={() => navigate('/admin/login')}
          className="bg-white text-slate-900 border-2 border-slate-900 rounded-xl px-6 py-2.5 font-semibold hover:bg-slate-50 transition-all hover:-translate-y-0.5 neo-shadow-sm font-['Work_Sans']"
        >
          Admin Login
        </button>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFD54F] border-2 border-slate-900 rounded-full px-4 py-1.5 mb-6 neo-shadow-sm">
              <Zap className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-sm font-semibold font-['Work_Sans'] uppercase tracking-wider">AI-Powered Reviews</span>
            </div>
            <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-6">
              Boost Your Google Reviews<br />
              <span className="text-[#FF5722]">Effortlessly</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 font-['Work_Sans'] leading-relaxed mb-8 max-w-lg">
              Generate AI-crafted reviews for your business. Customers scan a QR code, pick a review, and post it on Google in seconds. No friction, maximum impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                data-testid="hero-get-started-btn"
                onClick={() => navigate('/admin/login')}
                className="bg-[#FF5722] text-white border-2 border-slate-900 rounded-xl px-8 py-4 font-bold text-lg hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all neo-shadow font-['Work_Sans']"
              >
                Get Started Free
                <ArrowRight className="inline ml-2 w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://static.prod-images.emergentagent.com/jobs/1f204189-95ff-4ea5-8545-7bd787e7a5a3/images/078d701678c89ed5695f4d9a073128c1cdff6a44f906d319522e665e8be30e3f.png"
              alt="QR Review System"
              className="w-full rounded-2xl border-2 border-slate-900 neo-shadow"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-12 lg:px-20 py-16 bg-white border-y-2 border-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl lg:text-4xl text-center text-slate-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: QrCode, title: "Add Your Business", desc: "List your hotel, restaurant, or shop. A unique QR code is generated instantly.", step: "01" },
              { icon: Copy, title: "Customer Scans QR", desc: "Customers see AI-generated reviews ready to copy. One tap is all it takes.", step: "02" },
              { icon: ExternalLink, title: "Post on Google", desc: "Review is copied and they're taken straight to your Google review page.", step: "03" },
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-slate-900 rounded-xl p-6 neo-shadow hover:-translate-y-1 transition-all" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[#FF5722] font-['Outfit'] font-black text-3xl">{item.step}</div>
                  <item.icon className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
                </div>
                <h3 className="font-['Outfit'] font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-slate-600 font-['Work_Sans']">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "AI-Generated Reviews", desc: "Smart, natural-sounding reviews tailored to your business type and name.", color: "#FFD54F" },
            { icon: BarChart3, title: "Analytics Dashboard", desc: "Track QR scans, reviews copied, and see which places perform best.", color: "#A7F3D0" },
            { icon: Shield, title: "One-Click Flow", desc: "Zero friction for customers. Scan, copy, post. It's that simple.", color: "#FFD54F" },
          ].map((item, i) => (
            <div key={i} className="bg-white border-2 border-slate-900 rounded-xl p-6 neo-shadow" style={{ borderTopColor: item.color, borderTopWidth: '4px' }}>
              <div className={`w-12 h-12 rounded-xl border-2 border-slate-900 flex items-center justify-center mb-4`} style={{ backgroundColor: item.color }}>
                <item.icon className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
              </div>
              <h3 className="font-['Outfit'] font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-slate-600 font-['Work_Sans']">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us */}
      <section className="px-6 md:px-12 lg:px-20 py-16 bg-[#FDFBF7]" id="contact">
        <div className="max-w-4xl mx-auto bg-white border-2 border-slate-900 rounded-2xl p-8 md:p-12 neo-shadow">
          <div className="text-center mb-10">
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-slate-900 mb-4">Get in Touch</h2>
            <p className="text-slate-600 font-['Work_Sans'] text-lg max-w-xl mx-auto">
              Have questions or need help setting up GoogleBoost? We're here to help you supercharge your Google reviews!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col items-center p-6 bg-slate-50 border-2 border-slate-900 rounded-xl text-center hover:-translate-y-1 transition-all neo-shadow-sm">
              <Phone className="w-8 h-8 text-[#FF5722] mb-4" strokeWidth={2} />
              <h3 className="font-['Outfit'] font-bold text-xl mb-3 text-slate-900">Call Us</h3>
              <div className="text-slate-600 font-['Work_Sans'] font-medium space-y-2">
                <p>Aayush purohit: <br/><a href="tel:7225083904" className="text-[#FF5722] hover:underline text-lg">7225083904</a></p>
                <p>Rituraj suryawanshi: <br/><a href="tel:7089956401" className="text-[#FF5722] hover:underline text-lg">7089956401</a></p>
              </div>
            </div>

            <div className="flex flex-col items-center p-6 bg-slate-50 border-2 border-slate-900 rounded-xl text-center hover:-translate-y-1 transition-all neo-shadow-sm">
              <Mail className="w-8 h-8 text-[#FFD54F] mb-4" strokeWidth={2} />
              <h3 className="font-['Outfit'] font-bold text-xl mb-3 text-slate-900">Email Us</h3>
              <p className="text-slate-600 font-['Work_Sans'] font-medium">
                <a href="mailto:supernovaind00@gmail.com" className="text-slate-900 hover:text-[#FF5722] transition-colors break-all text-lg">
                  supernovaind00@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="https://wa.me/917225083904"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white border-2 border-slate-900 rounded-xl px-8 py-4 font-bold text-lg hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all neo-shadow font-['Work_Sans']"
            >
              <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-slate-900 px-6 py-8 text-center bg-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="w-5 h-5 text-[#FF5722]" strokeWidth={2.5} />
          <span className="font-['Outfit'] font-bold text-lg">GoogleBoost</span>
        </div>
        <p className="text-slate-500 text-sm font-['Work_Sans']">AI-Powered Review Management for Local Businesses</p>
      </footer>
    </div>
  );
}
