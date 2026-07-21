import React, { useState } from 'react';
import { Users, Award, Clock, CheckCircle2, Shield, Send } from 'lucide-react';
import { toast } from 'react-toastify';

export const VolunteerPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Volunteer application submitted successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
          Volunteer Network
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Become a FundRaise Pro Volunteer Hero</h1>
        <p className="text-slate-400 text-sm">Join over 2,500 active volunteers assisting in emergency medical logistics, disaster relief packs distribution, and community support.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Form */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white">Join the Global Volunteer Corps</h3>
          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white">Application Received</h4>
              <p className="text-xs text-slate-400">Our regional coordinator will reach out to you within 24 hours!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Full Name" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
                <input required type="email" placeholder="Email Address" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="City / Location" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
                <input required placeholder="Phone Number" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
              </div>
              <textarea placeholder="Tell us about your skills (Medical aid, logistics, translation, event management...)" rows={3} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
              <button type="submit" className="w-full gradient-btn py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Application
              </button>
            </form>
          )}
        </div>

        {/* Right Stats & Badges */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white">Earn Verified Volunteer Certificates</h4>
              <p className="text-xs text-slate-400">Log your hours and receive official community service accreditation.</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white">Leaderboards & Recognition Badges</h4>
              <p className="text-xs text-slate-400">Unlock Bronze, Gold, and Platinum Hero badges as you assist campaigns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
