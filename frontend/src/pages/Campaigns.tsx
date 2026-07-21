import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Flame, Heart } from 'lucide-react';
import { api } from '../services/api';
import { Campaign, Category } from '../types';
import { CampaignCard } from '../components/campaigns/CampaignCard';
import { CampaignSkeleton } from '../components/common/LoadingSkeleton';
import { DonationModal } from '../components/donation/DonationModal';

export const Campaigns: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [sortOption, setSortOption] = useState<string>('trending');
  const [urgentOnly, setUrgentOnly] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res: any = await api.get('/campaigns/categories');
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        let url = `/campaigns?sort=${sortOption}`;
        if (selectedCategory) url += `&category=${selectedCategory}`;
        if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
        if (urgentOnly) url += `&urgent=true`;

        const res: any = await api.get(url);
        if (res.success) setCampaigns(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, [selectedCategory, searchQuery, sortOption, urgentOnly]);

  const handleOpenDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDonateOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Explore Verified Causes</h1>
        <p className="text-slate-400 text-sm mt-1">Discover, filter, and support lifesaving healthcare, education, children, women empowerment, and community initiatives.</p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by title, location or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs font-bold text-slate-300 focus:outline-none focus:border-sky-500"
              >
                <option value="trending">Trending Causes</option>
                <option value="most_funded">Most Funded</option>
                <option value="ending_soon">Ending Soon</option>
                <option value="newest">Newly Added</option>
              </select>
            </div>

          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === ''
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Grid Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <CampaignSkeleton key={i} />
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl border border-slate-800 space-y-4">
          <Heart className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-extrabold text-white">No campaigns found</h3>
          <p className="text-xs text-slate-400">Try broadening your search query or resetting active filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('');
              setSearchQuery('');
              setUrgentOnly(false);
            }}
            className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((camp) => (
            <CampaignCard key={camp.id} campaign={camp} onDonateClick={handleOpenDonate} />
          ))}
        </div>
      )}

      {/* Donation Modal */}
      <DonationModal
        campaign={selectedCampaign}
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />
    </div>
  );
};
