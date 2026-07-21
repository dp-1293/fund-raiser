import React from 'react';
import { ShieldCheck, Heart, Users, Target, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 uppercase tracking-wider">
          Our Mission & Vision
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Revolutionizing Philanthropy With Total Transparency</h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          FundRaise Pro was founded on a simple principle: every donor should know precisely how their contribution impacts real lives on the ground.
        </p>
      </div>

      {/* Grid Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">100% Verified Non-Profits</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Every NGO and individual campaign undergoes identity & financial audit verification before public launch.</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Zero Hidden Platform Fees</h3>
          <p className="text-xs text-slate-400 leading-relaxed">100% of campaign donations go directly to emergency relief and recipient healthcare needs.</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Nationwide Support Network</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Partnerships across India providing rapid response for pediatric surgeries, education, women empowerment, and community development.</p>
        </div>
      </div>

    </div>
  );
};
