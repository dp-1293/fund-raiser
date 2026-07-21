import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CreditCard, QrCode, CheckCircle2, Download, Sparkles, User, Mail, MessageSquare } from 'lucide-react';
import { Campaign } from '../../types';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

interface DonationModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ campaign, isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState<number | string>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [gateway, setGateway] = useState<'UPI' | 'RAZORPAY' | 'STRIPE'>('UPI');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [dedicationMessage, setDedicationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedDonation, setCompletedDonation] = useState<any | null>(null);

  if (!isOpen || !campaign) return null;

  const presets = [100, 500, 1000, 2500, 5000];

  const finalAmount = customAmount ? parseFloat(customAmount) : typeof amount === 'number' ? amount : 500;

  const handleSubmitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    setIsSubmitting(true);
    try {
      const res: any = await api.post('/donations', {
        campaignId: campaign.id,
        amount: finalAmount,
        donorName: donorName || 'Desh Seva Donor',
        donorEmail: donorEmail || 'donor@example.com',
        isAnonymous,
        isRecurring,
        paymentGateway: gateway,
        dedicationMessage,
      });

      if (res.success && res.data) {
        setCompletedDonation(res.data);
        toast.success(`Thank you! Your donation of ₹${finalAmount.toLocaleString('en-IN')} was processed!`);
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      toast.error(err.message || 'Donation failed to process');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadReceipt = () => {
    if (completedDonation) {
      window.open(`/api/donations/receipt/${completedDonation.id}/pdf`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {completedDonation ? (
          /* Payment Success View */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white">Donation Successful!</h3>
              <p className="text-sm text-slate-400 mt-1">
                You have contributed <span className="text-emerald-400 font-bold">₹{completedDonation.amount.toLocaleString('en-IN')}</span> to <span className="text-white font-medium">"{campaign.title}"</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono text-sky-400 font-bold">{completedDonation.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Section 80G Receipt No:</span>
                <span className="font-mono text-emerald-400 font-bold">{completedDonation.receiptNumber || 'RCPT-IND-80G'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="font-bold text-slate-200">{completedDonation.paymentGateway}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleDownloadReceipt}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-sky-500/40 text-sky-400 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download 80G Tax Receipt (PDF)</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 gradient-btn py-3 px-4 rounded-xl text-xs font-bold"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Donation Form View */
          <form onSubmit={handleSubmitDonation} className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Make a Lifesaving Impact in India</span>
              </div>
              <h2 className="text-xl font-extrabold text-white line-clamp-1">{campaign.title}</h2>
            </div>

            {/* Recurring Toggle */}
            <div className="flex rounded-2xl bg-slate-900/90 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setIsRecurring(false)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  !isRecurring ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Give One-Time
              </button>
              <button
                type="button"
                onClick={() => setIsRecurring(true)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  isRecurring ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Give Monthly 💖
              </button>
            </div>

            {/* Amount Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Select Amount (INR - ₹)</label>
              <div className="grid grid-cols-5 gap-2">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setAmount(val);
                      setCustomAmount('');
                    }}
                    className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                      amount === val && !customAmount
                        ? 'bg-sky-500/20 border-sky-400 text-sky-400 shadow-md shadow-sky-500/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>

              <div className="relative pt-1">
                <span className="absolute left-3.5 top-3.5 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  placeholder="Custom Amount in INR"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl py-2.5 pl-8 pr-4 text-xs font-bold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Payment Gateway</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setGateway('UPI')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold transition-all ${
                    gateway === 'UPI'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span>Instant UPI QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGateway('RAZORPAY')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold transition-all ${
                    gateway === 'RAZORPAY'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Razorpay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGateway('STRIPE')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold transition-all ${
                    gateway === 'STRIPE'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-400'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Card / Stripe</span>
                </button>
              </div>
            </div>

            {/* Donor Info & Dedication */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
                <input
                  type="email"
                  placeholder="Email for 80G Tax Receipt"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <textarea
                placeholder="Write an encouraging note or dedication message..."
                rows={2}
                value={dedicationMessage}
                onChange={(e) => setDedicationMessage(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 resize-none"
              />

              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-800 text-sky-500 focus:ring-0"
                />
                <span>Make my donation anonymous on the public donor wall</span>
              </label>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-btn py-3.5 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25"
            >
              {isSubmitting ? (
                <span>Processing Secure Payment...</span>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Complete ₹{finalAmount.toLocaleString('en-IN')} Donation</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Section 80G Tax Exempt Eligible & PCI-DSS Encrypted</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
