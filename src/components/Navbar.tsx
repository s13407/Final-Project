import React from 'react';
import { StudentProfile, ThemeVibe } from '../types';
import {
  Compass,
  Sparkles,
  User,
  Database,
  LogOut,
  MapPin,
  Moon,
  Sun,
  Palette
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'quiz' | 'direct' | 'universities' | 'careers' | 'dashboard';
  setActiveTab: (tab: 'home' | 'quiz' | 'direct' | 'universities' | 'careers' | 'dashboard') => void;
  currentUser: StudentProfile | null;
  onOpenAuth: () => void;
  onOpenSupabaseModal: () => void;
  onLogout: () => void;
  isSupabaseConnected: boolean;
  vibe: ThemeVibe;
  onSelectVibe: (vibe: ThemeVibe) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenSupabaseModal,
  onLogout,
  isSupabaseConnected,
  vibe,
  onSelectVibe
}) => {
  const isDark = vibe === 'cosmic' || vibe === 'emerald';

  const vibes: { id: ThemeVibe; name: string; emoji: string; color: string }[] = [
    { id: 'cosmic', name: 'Cosmic Neon', emoji: '🔮', color: 'from-purple-500 to-indigo-500' },
    { id: 'electric', name: 'Electric Pop', emoji: '⚡', color: 'from-blue-500 to-pink-500' },
    { id: 'emerald', name: 'Cyber Mint', emoji: '🌿', color: 'from-emerald-500 to-teal-500' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all ${
        isDark
          ? 'bg-[#090D16]/85 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-white/90 border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(99,102,241,0.08)]'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark with Neon Spark */}
        <button
          onClick={() => setActiveTab('home')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5" />
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-sm -z-10 group-hover:opacity-60 transition-opacity" />
          </div>
          <div>
            <span className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              PathCode
            </span>
            <span className="hidden sm:block text-[10px] font-bold tracking-widest uppercase text-purple-400 -mt-1">
              Decode Your Direction
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden lg:flex items-center gap-6 text-xs font-bold ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors py-1 relative ${
              activeTab === 'home'
                ? isDark
                  ? 'text-purple-300 font-extrabold'
                  : 'text-indigo-600 font-extrabold'
                : isDark
                ? 'hover:text-white'
                : 'hover:text-indigo-600'
            }`}
          >
            Home
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors py-1 relative ${
              activeTab === 'quiz'
                ? isDark
                  ? 'text-purple-300 font-extrabold'
                  : 'text-indigo-600 font-extrabold'
                : isDark
                ? 'hover:text-white'
                : 'hover:text-indigo-600'
            }`}
          >
            CALIPS Assessment
            {activeTab === 'quiz' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`transition-colors py-1 relative ${
              activeTab === 'direct'
                ? isDark
                  ? 'text-purple-300 font-extrabold'
                  : 'text-indigo-600 font-extrabold'
                : isDark
                ? 'hover:text-white'
                : 'hover:text-indigo-600'
            }`}
          >
            I Know My Interest
            {activeTab === 'direct' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('universities')}
            className={`transition-colors py-1 relative ${
              activeTab === 'universities'
                ? isDark
                  ? 'text-purple-300 font-extrabold'
                  : 'text-indigo-600 font-extrabold'
                : isDark
                ? 'hover:text-white'
                : 'hover:text-indigo-600'
            }`}
          >
            Universities
            {activeTab === 'universities' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className={`transition-colors py-1 relative ${
              activeTab === 'careers'
                ? isDark
                  ? 'text-purple-300 font-extrabold'
                  : 'text-indigo-600 font-extrabold'
                : isDark
                ? 'hover:text-white'
                : 'hover:text-indigo-600'
            }`}
          >
            Career Library
            {activeTab === 'careers' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            )}
          </button>
          {currentUser && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`transition-colors py-1 relative ${
                activeTab === 'dashboard'
                  ? isDark
                    ? 'text-purple-300 font-extrabold'
                    : 'text-indigo-600 font-extrabold'
                  : isDark
                  ? 'hover:text-white'
                  : 'hover:text-indigo-600'
              }`}
            >
              Dashboard
              {activeTab === 'dashboard' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
              )}
            </button>
          )}
        </nav>

        {/* Right Side: Vibe Switcher + Supabase DB Badge + User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Aesthetic Vibe Switcher */}
          <div
            className={`flex items-center p-1 rounded-full border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10'
                : 'bg-slate-100 border-slate-200'
            }`}
          >
            {vibes.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectVibe(item.id)}
                title={`Switch vibe to ${item.name}`}
                className={`flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 text-[11px] font-bold transition-all ${
                  vibe === item.id
                    ? isDark
                      ? 'bg-purple-600/80 text-white shadow-xs'
                      : 'bg-white text-indigo-700 shadow-xs'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>{item.emoji}</span>
                <span className="hidden xl:inline">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Supabase Live DB Pill */}
          <button
            onClick={onOpenSupabaseModal}
            title={
              isSupabaseConnected
                ? 'Connected to live Supabase Database (click to inspect tables)'
                : 'Supabase Database Config & Status'
            }
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
              isSupabaseConnected
                ? isDark
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 shadow-xs shadow-emerald-500/20'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                : isDark
                ? 'bg-purple-500/15 border-purple-500/30 text-purple-300 hover:bg-purple-500/25'
                : 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100'
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Supabase</span>
            <span
              className={`h-2 w-2 rounded-full ${
                isSupabaseConnected
                  ? 'bg-emerald-400 ring-2 ring-emerald-400/40 animate-pulse'
                  : 'bg-purple-400'
              }`}
            />
          </button>

          {/* User Profile or Sign In */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                  isDark
                    ? 'bg-white/5 border-white/15 text-slate-100 hover:bg-white/10'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white text-[10px] font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[90px] truncate">{currentUser.name}</span>
                {currentUser.preferredCountry && (
                  <span
                    className={`hidden sm:flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                      isDark
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    <MapPin className="h-2.5 w-2.5" />
                    <span>{currentUser.preferredCountry.split(' ')[0]}</span>
                  </span>
                )}
              </button>
              <button
                onClick={onLogout}
                title="Sign out"
                className={`rounded-full p-2 transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:bg-white/10 hover:text-white'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-purple-500/30 hover:opacity-95 active:scale-95 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Student Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Quick Bar */}
      <div
        className={`flex lg:hidden overflow-x-auto border-t px-4 py-2 text-xs font-bold gap-4 no-scrollbar ${
          isDark
            ? 'bg-[#090D16]/95 border-white/10 text-slate-300'
            : 'bg-white/95 border-slate-200 text-slate-600'
        }`}
      >
        <button
          onClick={() => setActiveTab('home')}
          className={`whitespace-nowrap ${
            activeTab === 'home'
              ? isDark
                ? 'text-purple-300 font-extrabold'
                : 'text-indigo-600 font-extrabold'
              : ''
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`whitespace-nowrap ${
            activeTab === 'quiz'
              ? isDark
                ? 'text-purple-300 font-extrabold'
                : 'text-indigo-600 font-extrabold'
              : ''
          }`}
        >
          CALIPS Quiz
        </button>
        <button
          onClick={() => setActiveTab('direct')}
          className={`whitespace-nowrap ${
            activeTab === 'direct'
              ? isDark
                ? 'text-purple-300 font-extrabold'
                : 'text-indigo-600 font-extrabold'
              : ''
          }`}
        >
          Know Interest
        </button>
        <button
          onClick={() => setActiveTab('universities')}
          className={`whitespace-nowrap ${
            activeTab === 'universities'
              ? isDark
                ? 'text-purple-300 font-extrabold'
                : 'text-indigo-600 font-extrabold'
              : ''
          }`}
        >
          Universities
        </button>
        <button
          onClick={() => setActiveTab('careers')}
          className={`whitespace-nowrap ${
            activeTab === 'careers'
              ? isDark
                ? 'text-purple-300 font-extrabold'
                : 'text-indigo-600 font-extrabold'
              : ''
          }`}
        >
          Career Library
        </button>
        {currentUser && (
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap ${
              activeTab === 'dashboard'
                ? isDark
                  ? 'text-purple-300 font-extrabold'
                  : 'text-indigo-600 font-extrabold'
                : ''
            }`}
          >
            Dashboard
          </button>
        )}
      </div>
    </header>
  );
};
