import React, { useEffect, useState } from 'react';
import { Heart, Download, Award, ShieldCheck, Clock, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Donation } from '../types';

export const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDonations = async () => {
      try {
        const res: any = await api.get('/donations/my-donations');
        if (res.success) setDonations(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDonations();
  }, []);

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile Banner */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
            alt={user?.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-400 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{user?.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified 501(c)(3) Supporter</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-extrabold text-white">₹{totalDonated.toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Total Contribution</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-2xl font-extrabold text-white">{donations.length}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Causes Supported</div>
          </div>
        </div>
      </div>

      {/* Donation History & PDF Downloads Table */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Your Donation History & Tax Receipts</h3>
        </div>

        {loading ? (
          <div className="text-center py-8 text-slate-400 text-xs">Loading donation history...</div>
        ) : donations.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <Heart className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs">You haven't made any donations yet. Support your first cause today!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Campaign Title</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Tax Receipt PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white max-w-xs truncate">{d.campaignTitle}</td>
                    <td className="p-3 text-slate-400">{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 font-extrabold text-emerald-400">₹{d.amount.toLocaleString('en-IN')} INR</td>
                    <td className="p-3 font-mono text-sky-400">{d.paymentGateway}</td>
                    <td className="p-3">
                      <a
                        href={`/api/donations/receipt/${d.id}/pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-sky-500/40 text-sky-400 hover:bg-slate-800 font-bold text-[11px]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
