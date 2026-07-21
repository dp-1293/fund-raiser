import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Sparkles, TrendingUp, Users, Award, ArrowRight, Play, CheckCircle, Flame, Globe } from 'lucide-react';
import { api } from '../services/api';
import { Campaign } from '../types';
import { CampaignCard } from '../components/campaigns/CampaignCard';
import { DonationModal } from '../components/donation/DonationModal';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState<Campaign[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campRes, catRes]: any[] = await Promise.all([
          api.get('/campaigns?featured=true'),
          api.get('/campaigns/categories'),
        ]);
        if (campRes.success) setFeaturedCampaigns(campRes.data);
        if (catRes.success) setCategories(catRes.data);
      } catch (err) {
        console.error('Home data error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDonateOpen(true);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Transparent Fundraising Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
            >
              Empowering Every <span className="gradient-text">Donation</span> to Save Lives
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Connect directly with verified medical, education, child support, women empowerment, and community causes with 100% financial auditability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link to="/campaigns" className="gradient-btn px-8 py-4 rounded-2xl text-base font-bold flex items-center gap-3 w-full sm:w-auto justify-center shadow-xl shadow-sky-500/25">
                <Heart className="w-5 h-5 fill-white" />
                <span>Explore Active Causes</span>
              </Link>
              <Link to="/register" className="px-8 py-4 rounded-2xl text-base font-bold bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-all w-full sm:w-auto justify-center flex items-center gap-2">
                <span>Start a Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <div className="pt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified 501(c)(3) NGOs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-sky-400" />
                <span>Instant Tax Receipts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>Global Multi-Currency</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Animated Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 border border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight gradient-text">₹25 Cr+</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Total Funds Raised</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight gradient-text">148,000+</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Generous Donors</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight gradient-text">4,850+</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Verified Campaigns</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight gradient-text">99.8%</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Success & Relief Rate</div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Browse by Cause Categories</h2>
          <p className="text-slate-400 text-sm mt-2">Support dedicated channels tailored to medical healthcare, education, children, women empowerment, and community development.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/campaigns?category=${cat.id}`}
              className="glass-card p-6 rounded-2xl text-center space-y-3 hover:border-sky-500/40 hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:bg-sky-500/20 group-hover:border-sky-400 text-sky-400 flex items-center justify-center mx-auto transition-colors shadow-lg">
                <Heart className="w-6 h-6" />
              </div>
              <span className="block text-sm font-bold text-slate-200 group-hover:text-sky-400 truncate">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">How FundRaise Pro Works</h2>
          <p className="text-slate-400 text-sm mt-2">Simple, transparent, and direct philanthropy in 4 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Explore Causes', desc: 'Browse verified medical, education, child support, women empowerment, and community campaigns.' },
            { step: '02', title: 'Donate Securely', desc: 'Contribute via Stripe, Razorpay, or instant UPI QR Code.' },
            { step: '03', title: 'Track Real-Time Impact', desc: 'Receive live updates, photos, and progress milestones.' },
            { step: '04', title: 'Instant Tax Receipt', desc: 'Download 501(c)(3) tax deductible certificates instantly.' },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl relative space-y-3">
              <span className="text-4xl font-extrabold text-sky-500/30">{item.step}</span>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Modal Trigger */}
      <DonationModal
        campaign={selectedCampaign}
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />
    </div>
  );
};
