import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Award, CheckCircle, Heart, HeartPulse, GraduationCap, 
  Baby, UserCheck, Users, ArrowRight, ShieldCheck, ExternalLink, Sparkles, Send, Filter
} from 'lucide-react';
import { toast } from 'react-toastify';

export const CategoriesPage: React.FC = () => {
  const categoriesList = [
    {
      id: 'cat-1',
      name: 'Medical',
      description: 'Emergency surgeries, pediatric heart procedures, cancer chemotherapy & mobile ICU healthcare assistance.',
      icon: HeartPulse,
      count: 3,
      raised: '₹21.75 Lakhs',
      donors: '1,274 Donors',
      badgeColor: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
      btnColor: 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300',
    },
    {
      id: 'cat-2',
      name: 'Education',
      description: 'Digital computer labs, STEM scholarships for young women, and village library infrastructure.',
      icon: GraduationCap,
      count: 3,
      raised: '₹10.80 Lakhs',
      donors: '935 Donors',
      badgeColor: 'from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30',
      btnColor: 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300',
    },
    {
      id: 'cat-3',
      name: 'Children',
      description: 'Daily protein meals for orphaned children, safe street shelters, and special needs physical therapy.',
      icon: Baby,
      count: 3,
      raised: '₹10.25 Lakhs',
      donors: '1,130 Donors',
      badgeColor: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
      btnColor: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300',
    },
    {
      id: 'cat-4',
      name: 'Women Empowerment',
      description: 'Sewing machine vocational kits, maternal health checkup clinics, and girls self-defense bootcamps.',
      icon: UserCheck,
      count: 3,
      raised: '₹9.30 Lakhs',
      donors: '1,095 Donors',
      badgeColor: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30',
      btnColor: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300',
    },
    {
      id: 'cat-5',
      name: 'Community',
      description: 'Clean solar drinking water plants, village LED street lights, and organic farming skill hubs.',
      icon: Users,
      count: 3,
      raised: '₹14.65 Lakhs',
      donors: '1,430 Donors',
      badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      btnColor: 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 uppercase tracking-wider">
          Cause Categories
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Browse Causes by Impact Area</h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Select a cause category below to discover verified campaigns, direct NGO initiatives, and real-time donation progress.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesList.map((cat) => {
          const IconComp = cat.icon;
          return (
            <div
              key={cat.id}
              className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10 transition-all group"
            >
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.badgeColor} border flex items-center justify-center shadow-lg`}>
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900 border border-slate-800 text-slate-300">
                    {cat.count} Campaigns
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white group-hover:text-sky-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total Impact Raised</span>
                    <span className="font-extrabold text-white text-sm">{cat.raised}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Active Community</span>
                    <span className="font-bold text-sky-400 text-xs">{cat.donors}</span>
                  </div>
                </div>

                <Link
                  to={`/campaigns?category=${cat.id}`}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-700/50 transition-all ${cat.btnColor}`}
                >
                  <span>Explore {cat.name} Campaigns</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const EventsPage: React.FC = () => {
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  const events = [
    {
      id: 'event-1',
      title: 'Global Telethon 2026: Pediatric Open-Heart Surgeries Gala',
      date: 'Aug 15, 2026 • 6:00 PM IST',
      type: 'Virtual & Live Stream',
      location: 'New Delhi & Online Stream',
      description: 'A 6-hour live charity telethon with medical experts and celebrity advocates raising ₹1 Crore for pediatric cardiac surgeries at AIIMS.',
      organizer: 'Care India Foundation',
      badge: 'Featured Telethon',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'event-2',
      title: 'National Rural Education & Digital Literacy Summit',
      date: 'Sep 05, 2026 • 10:00 AM IST',
      type: 'In-Person Conference',
      location: 'Koramangala Convention Center, Bengaluru',
      description: 'Gathering 500+ NGO leaders, educators, and IT sponsors to deploy computer labs in 100 village schools.',
      organizer: 'Shiksha & Mahila Seva NGO',
      badge: 'Conference',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'event-3',
      title: 'Women Entrepreneurship & Sewing Kit Handover Ceremony',
      date: 'Oct 12, 2026 • 11:30 AM IST',
      type: 'Community Gathering',
      location: 'Ranchi Town Hall, Jharkhand',
      description: 'Distribution of 150 electric sewing machines and micro-grants to rural women graduates of our tailoring program.',
      organizer: 'Shiksha & Mahila Seva NGO',
      badge: 'Community Outreach',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleRegister = (id: string, title: string) => {
    setRegisteredEventId(id);
    toast.success(`Registered successfully for "${title}"! Check your email for pass details.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
          Fundraising & Philanthropy Events
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Upcoming Global Events</h1>
        <p className="text-slate-300 text-sm">Join virtual telethons, NGO summits, and community distribution drives empowering lives nationwide.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {events.map((evt) => (
          <div key={evt.id} className="glass-card rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between group hover:border-emerald-500/40 transition-all">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                  {evt.badge}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Calendar className="w-4 h-4" />
                  <span>{evt.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white leading-snug">{evt.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{evt.description}</p>
                <div className="pt-2 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> {evt.location}</div>
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Hosted by {evt.organizer}</div>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => handleRegister(evt.id, evt.title)}
                disabled={registeredEventId === evt.id}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  registeredEventId === evt.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'gradient-btn text-white shadow-lg shadow-sky-500/20'
                }`}
              >
                {registeredEventId === evt.id ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Pass Issued & Registered</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Register Free Entry</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SuccessStories: React.FC = () => {
  const stories = [
    {
      id: 'story-1',
      title: 'Little Aarav’s Successful Cardiac Surgery at AIIMS',
      category: 'Medical',
      amountRaised: '₹5,00,000 Raised',
      donorsCount: '342 Donors',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      summary: '6-year-old Aarav successfully underwent open-heart surgery at AIIMS Delhi and is now fully recovered, attending school happily.',
      quote: '"We had no hope of affording ₹5 Lakhs. FundRaise Pro donors saved our son’s life!" - Aarav’s Father',
    },
    {
      id: 'story-2',
      title: 'Solar Water Filtration Unit Operating in 10 Villages',
      category: 'Community',
      amountRaised: '₹8,00,000 Raised',
      donorsCount: '620 Donors',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
      summary: '8,000+ villagers in water-scarce Bundelkhand now have daily access to clean, solar-purified drinking water.',
      quote: '"No more waterborne illness in our village! Women save 3 hours of daily fetching walks." - Village Pradhan',
    },
    {
      id: 'story-3',
      title: '25 Computers & Solar Power Installed in Gaya Village School',
      category: 'Education',
      amountRaised: '₹4,00,000 Raised',
      donorsCount: '260 Donors',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      summary: '400 rural students are now learning Python coding and digital literacy with daily hands-on lab access.',
      quote: '"I want to be a software developer! Having computers in our school is a dream come true." - Sunita (14 yrs)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 uppercase tracking-wider">
          Real Impact & Success Stories
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Lives Changed by Your Generosity</h1>
        <p className="text-slate-300 text-sm">Every rupee donated on FundRaise Pro goes directly to audited, verified ground-level impact.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((st) => (
          <div key={st.id} className="glass-card rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between p-6 space-y-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img src={st.image} alt={st.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500 text-white shadow-lg">
                  100% Fully Funded
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-400 font-bold">{st.category}</span>
                <span className="font-extrabold text-emerald-400">{st.amountRaised}</span>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">{st.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{st.summary}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs italic text-slate-300">
              {st.quote}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PartnersPage: React.FC = () => {
  const [partnerApplied, setPartnerApplied] = useState(false);

  const partners = [
    { name: 'Care India Foundation', role: 'Medical & Pediatric Aid', reg: 'NGO-884920-IND', taxId: '80G-AAATC5019E' },
    { name: 'Shiksha & Mahila Seva NGO', role: 'Education & Women Welfare', reg: 'NGO-119284-IND', taxId: '80G-BBBTC44102' },
    { name: 'Jal Shakti Seva Foundation', role: 'Rural Drinking Water & Sanitation', reg: 'NGO-445891-IND', taxId: '80G-CCCTC88109' },
    { name: 'Gramin Seva NGO', role: 'Sustainable Agriculture & Seed Banks', reg: 'NGO-992014-IND', taxId: '80G-DDDTC33211' },
  ];

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerApplied(true);
    toast.success('Partner verification inquiry submitted successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
          Institutional Alliances
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Verified NGO & Corporate Partners</h1>
        <p className="text-slate-300 text-sm">We partner exclusively with government-registered 80G tax-exempt non-profit organizations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partners.map((p, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto font-extrabold text-xl">
              {p.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{p.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{p.role}</p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div>Reg: <span className="text-slate-200 font-mono">{p.reg}</span></div>
              <div>Tax ID: <span className="text-emerald-400 font-mono">{p.taxId}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Registration Form */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-white">Register as a Partner NGO</h3>
          <p className="text-xs text-slate-400">Get your organization verified for instant 0% platform fee fundraising campaigns.</p>
        </div>

        {partnerApplied ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-white">Verification Inquiry Submitted</h4>
            <p className="text-xs text-slate-400">Our compliance team will inspect your 80G certificate within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handlePartnerSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Organization Name" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
              <input required placeholder="Registration Number" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input required type="email" placeholder="Official Email" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
              <input required placeholder="Phone / WhatsApp" className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200" />
            </div>
            <button type="submit" className="w-full gradient-btn py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Submit NGO Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

