import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Clock, ShieldCheck, Share2, MessageSquare, AlertCircle, FileText, CheckCircle, UserCheck, Flame, Download } from 'lucide-react';
import { api } from '../services/api';
import { Campaign, Donation } from '../types';
import { DonationModal } from '../components/donation/DonationModal';
import { toast } from 'react-toastify';

export const CampaignDetail: React.FC = () => {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'updates' | 'donors' | 'documents'>('story');

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      if (!slugOrId) return;
      try {
        const [cRes, dRes]: any[] = await Promise.all([
          api.get(`/campaigns/${slugOrId}`),
          api.get(`/donations/campaign/${slugOrId}`),
        ]);

        if (cRes.success) setCampaign(cRes.data);
        if (dRes.success) setDonations(dRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaignDetail();
  }, [slugOrId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 text-xs mt-3">Loading campaign details...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Campaign Not Found</h2>
        <Link to="/campaigns" className="gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold inline-block">
          Return to Campaigns
        </Link>
      </div>
    );
  }

  const percent = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100));
  const daysRemaining = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Campaign link copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title & Metadata */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 border border-sky-500/40 text-sky-400">
            {campaign.categoryName}
          </span>
          {campaign.isUrgent && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-rose-400" /> Urgent Action Needed
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{campaign.title}</h1>
      </div>

      {/* Main Grid: Media & Story (Left) + Donation Widget (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Media Image */}
          <div className="relative rounded-3xl overflow-hidden glass-card border border-slate-800">
            <img
              src={campaign.featuredImage}
              alt={campaign.title}
              className="w-full max-h-[480px] object-cover"
            />
          </div>

          {/* Organizer Card */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-sky-500/40 flex items-center justify-center font-bold text-sky-400">
                {campaign.organizerName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm font-bold text-white">
                  <span>{campaign.organizerName}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400">Verified Non-Profit Organizer</p>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 flex items-center gap-1.5 text-xs font-bold"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Nav Tabs */}
          <div className="flex border-b border-slate-800 text-sm font-bold text-slate-400 space-x-6">
            <button
              onClick={() => setActiveTab('story')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'story' ? 'border-sky-400 text-sky-400' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Campaign Story
            </button>
            <button
              onClick={() => setActiveTab('updates')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'updates' ? 'border-sky-400 text-sky-400' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Updates (2)
            </button>
            <button
              onClick={() => setActiveTab('donors')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'donors' ? 'border-sky-400 text-sky-400' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Donor Wall ({donations.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'story' && (
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {campaign.story}
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="space-y-4">
              <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className="font-bold text-sky-400">Update #2 - Medical Evaluation</span>
                  <span>2 days ago</span>
                </div>
                <h4 className="font-bold text-white text-sm">Patient Admitted to Boston Children’s ICU</h4>
                <p className="text-xs text-slate-300">Doctors have finalized pre-surgery preparations. Thank you to all donors!</p>
              </div>
            </div>
          )}

          {activeTab === 'donors' && (
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              {donations.length === 0 ? (
                <p className="text-slate-400 text-xs text-center py-4">Be the very first hero to contribute to this campaign!</p>
              ) : (
                <div className="space-y-3">
                  {donations.map((don) => (
                    <div key={don.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                          {don.donorName[0]}
                        </div>
                        <div>
                          <span className="font-bold text-white block">{don.isAnonymous ? 'Anonymous Supporter' : don.donorName}</span>
                          {don.dedicationMessage && <p className="text-slate-400 italic text-[11px]">"{don.dedicationMessage}"</p>}
                        </div>
                      </div>
                      <span className="font-extrabold text-emerald-400">₹{don.amount.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Sticky Donation Widget (1 Col) */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6 sticky top-28 shadow-2xl">
            
            {/* Raised Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-extrabold text-white">₹{campaign.raisedAmount.toLocaleString('en-IN')}</span>
                <span className="text-xs font-bold text-slate-400">Goal: ₹{campaign.targetAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                <span>{percent}% Funded</span>
                <span className="flex items-center gap-1 font-bold text-sky-400">
                  <Clock className="w-3.5 h-3.5" />
                  {daysRemaining} Days Left
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setIsDonateOpen(true)}
                className="w-full gradient-btn py-4 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Donate Now</span>
              </button>

              <button
                onClick={handleShare}
                className="w-full py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Campaign</span>
              </button>
            </div>

            {/* Tax Exemption Note */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Tax Deductible</span>
              </div>
              <p className="text-[11px] text-emerald-200/80">Every donation instantly qualifies for official 501(c)(3) tax receipt download.</p>
            </div>

          </div>
        </div>

      </div>

      {/* Donation Modal */}
      <DonationModal
        campaign={campaign}
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        onSuccess={() => {
          // Refresh campaign data
          api.get(`/campaigns/${slugOrId}`).then((res: any) => {
            if (res.success) setCampaign(res.data);
          });
        }}
      />
    </div>
  );
};
