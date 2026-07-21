import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users, Flame, ShieldCheck } from 'lucide-react';
import { Campaign } from '../../types';
import { motion } from 'framer-motion';

interface CampaignCardProps {
  campaign: Campaign;
  onDonateClick?: (campaign: Campaign) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDonateClick }) => {
  const percent = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100));
  const daysRemaining = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-800/80 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300"
    >
      <div>
        {/* Cover Image & Badges */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={campaign.featuredImage}
            alt={campaign.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-sky-400 border border-sky-500/30 backdrop-blur-md">
              {campaign.categoryName || 'Emergency'}
            </span>
            {campaign.isUrgent && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500/90 text-white flex items-center gap-1 shadow-lg shadow-rose-500/30">
                <Flame className="w-3 h-3 fill-white" /> Urgent
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="truncate max-w-[140px]">{campaign.organizerName}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-full text-[11px] text-slate-300">
              <Clock className="w-3 h-3 text-sky-400" />
              <span>{daysRemaining} days left</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-3">
          <Link to={`/campaigns/${campaign.slug || campaign.id}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
              {campaign.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {campaign.summary}
          </p>
        </div>
      </div>

      {/* Progress & Donate CTA */}
      <div className="p-5 pt-0 space-y-4">
        <div>
          <div className="flex justify-between items-end mb-1.5 text-xs">
            <div>
              <span className="text-lg font-extrabold text-white">₹{campaign.raisedAmount.toLocaleString('en-IN')}</span>
              <span className="text-slate-400 ml-1">raised of ₹{campaign.targetAmount.toLocaleString('en-IN')}</span>
            </div>
            <span className="font-extrabold text-emerald-400">{percent}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/campaigns/${campaign.slug || campaign.id}`}
            className="flex-1 py-2.5 px-3 rounded-xl text-center text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            Read Story
          </Link>
          <button
            onClick={() => onDonateClick && onDonateClick(campaign)}
            className="gradient-btn py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 font-bold shadow-lg shadow-sky-500/20"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Donate</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
