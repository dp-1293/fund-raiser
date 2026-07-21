import React from 'react';

export const CampaignSkeleton: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-pulse border border-slate-800">
      <div className="h-48 bg-slate-800/80 w-full" />
      <div className="p-5 space-y-4">
        <div className="h-4 bg-slate-800/80 rounded w-1/3" />
        <div className="h-6 bg-slate-800/80 rounded w-3/4" />
        <div className="h-4 bg-slate-800/60 rounded w-full" />
        <div className="h-2.5 bg-slate-800/80 rounded-full w-full" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-slate-800/80 rounded w-1/4" />
          <div className="h-8 bg-slate-800/80 rounded-xl w-1/3" />
        </div>
      </div>
    </div>
  );
};

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`glass-card rounded-2xl p-6 border border-slate-800/80 ${className}`}>
      {children}
    </div>
  );
};
