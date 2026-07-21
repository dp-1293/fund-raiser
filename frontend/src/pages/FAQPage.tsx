import React, { useEffect, useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../services/api';

export const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    api.get('/cms/faqs').then((res: any) => {
      if (res.success) setFaqs(res.data);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <HelpCircle className="w-12 h-12 text-sky-400 mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h1>
        <p className="text-xs text-slate-400">Everything you need to know about donations, tax exemption, and campaign safety.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={faq.id} className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left font-bold text-white text-sm flex justify-between items-center hover:text-sky-400"
            >
              <span>{faq.question}</span>
              {openIndex === idx ? <ChevronUp className="w-4 h-4 text-sky-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs text-slate-300 border-t border-slate-800/60 pt-3 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
