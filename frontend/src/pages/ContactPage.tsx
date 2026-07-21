import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Your message has been sent to our support team!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold text-white">Get in Touch With Us</h1>
        <p className="text-xs text-slate-400">Our support coordinators are available 24/7 for urgent campaign assistance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white">Send Us a Message</h3>
          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white">Message Sent</h4>
              <p className="text-xs text-slate-400">We will respond to your inquiry shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Your Name" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
              <input required type="email" placeholder="Your Email" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
              <input placeholder="Subject" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
              <textarea required placeholder="How can we assist you?" rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
              <button type="submit" className="w-full gradient-btn py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
            <Mail className="w-6 h-6 text-sky-400" />
            <div>
              <h4 className="font-bold text-white text-sm">Email Support</h4>
              <p className="text-xs text-slate-400">support@fundraisepro.org</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
            <Phone className="w-6 h-6 text-emerald-400" />
            <div>
              <h4 className="font-bold text-white text-sm">Phone Helpline</h4>
              <p className="text-xs text-slate-400">+1 (800) 555-FUND (3863)</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
            <MapPin className="w-6 h-6 text-indigo-400" />
            <div>
              <h4 className="font-bold text-white text-sm">Headquarters</h4>
              <p className="text-xs text-slate-400">100 Philanthropy Way, San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
