import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Search, Sun, Moon, User as UserIcon, LogOut, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/campaigns?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Campaigns', path: '/campaigns' },
    { name: 'Categories', path: '/categories' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 via-teal-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight gradient-text">FundRaise Pro</span>
              <span className="block text-[10px] uppercase tracking-widest text-sky-400 font-bold -mt-1">Empowering Every Donation</span>
            </div>
          </Link>

          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-64 lg:w-80">
            <input
              type="text"
              placeholder="Search medical, education, children..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/60 rounded-full py-2 pl-4 pr-10 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
            <button type="submit" className="absolute right-3 text-slate-400 hover:text-sky-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Navigation Links - Desktop */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-200 hover:text-sky-400 ${
                  location.pathname === link.path ? 'text-sky-400 font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to={user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user'}
                  className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all"
                >
                  <img src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-sky-400" />
                  <span className="text-xs font-semibold text-slate-200 max-w-[100px] truncate">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/campaigns" className="gradient-btn px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Donate Now</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="xl:hidden glass-panel border-t border-slate-800 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-300 hover:text-sky-400"
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-slate-900 text-slate-200 font-semibold">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full text-center gradient-btn py-2.5 rounded-xl text-white font-semibold">
                Register as Member / Donor
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
