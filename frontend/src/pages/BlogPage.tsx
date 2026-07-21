import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    api.get('/cms/blogs').then((res: any) => {
      if (res.success) setBlogs(res.data);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-white">Philanthropy & Impact Blog</h1>
        <p className="text-xs text-slate-400 mt-1">Stories, field reports, and insights into non-profit transparency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((b) => (
          <div key={b.id} className="glass-card rounded-3xl overflow-hidden border border-slate-800 space-y-4">
            <img src={b.coverImage} alt={b.title} className="w-full h-56 object-cover" />
            <div className="p-6 space-y-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                {b.category}
              </span>
              <h3 className="text-xl font-bold text-white leading-snug">{b.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{b.excerpt}</p>
              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-3 border-t border-slate-800">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {b.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(b.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
