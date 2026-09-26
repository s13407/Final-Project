import React from 'react';
import { StudentProfile } from '../types';
import { Compass, Sparkles, User, Database, LogOut, MapPin } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'quiz' | 'direct' | 'universities' | 'careers' | 'dashboard';
  setActiveTab: (tab: 'home' | 'quiz' | 'direct' | 'universities' | 'careers' | 'dashboard') => void;
  currentUser: StudentProfile | null;
  onOpenAuth: () => void;
  onOpenSupabaseModal: () => void;
  onLogout: () => void;
  isSupabaseConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenSupabaseModal,
  onLogout,
  isSupabaseConnected
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-100/80 bg-white/85 backdrop-blur-md transition-colors shadow-[0_2px_15px_-3px_rgba(99,102,241,0.06)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Wordmark with Joyful Gradient & Playful Icon */}
        <button
          onClick={() => setActiveTab('home')}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 text-white shadow-md shadow-indigo-500/25 transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <span className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              PathCode
            </span>
            <span className="hidden sm:block text-[10px] font-semibold tracking-wider uppercase text-indigo-500 -mt-1">
              Decode & Discover
            </span>
          </div>
        </button>

        {/* Navigation links with mood-brightening active styles */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors hover:text-indigo-600 relative py-1 ${
              activeTab === 'home' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            Home
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors hover:text-indigo-600 relative py-1 ${
              activeTab === 'quiz' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            CALIPS Assessment
            {activeTab === 'quiz' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('direct')}
            className={`transition-colors hover:text-indigo-600 relative py-1 ${
              activeTab === 'direct' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            I Know My Interest
            {activeTab === 'direct' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('universities')}
            className={`transition-colors hover:text-indigo-600 relative py-1 ${
              activeTab === 'universities' ? 'text-indigo-600 font-bold' : ''
            }`}
          >
            Universities
            {activeTab === 'universities' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className={`transition-colors hover:text-indigo-600 relative py-1 ${
              activeTab === 'careers' ? 'text-indigo-600 font-bold' : ''
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
              className={`transition-colors hover:text-indigo-600 relative py-1 ${
                activeTab === 'dashboard' ? 'text-indigo-600 font-bold' : ''
              }`}
            >
              Dashboard
              {activeTab === 'dashboard' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
              )}
            </button>
          )}
        </nav>

        {/* Primary User Actions */}
        <div className="flex items-center gap-3">
          {/* Supabase Status Pill */}
          <button
            onClick={onOpenSupabaseModal}
            title={isSupabaseConnected ? 'Connected to live Supabase database' : 'Using resilient storage mirror with RLS'}
            className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-xs"
          >
            <Database className="h-3.5 w-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Supabase</span>
            <span className={`h-2 w-2 rounded-full ${isSupabaseConnected ? 'bg-emerald-500 ring-2 ring-emerald-300' : 'bg-amber-400'}`} />
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-800 hover:bg-indigo-100 transition-colors shadow-xs"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
                {currentUser.preferredCountry && (
                  <span className="hidden lg:flex items-center gap-0.5 text-[10px] text-indigo-500 font-medium bg-indigo-100/70 px-1.5 py-0.5 rounded-full">
                    <MapPin className="h-2.5 w-2.5" />
                    <span>{currentUser.preferredCountry.split(' ')[0]}</span>
                  </span>
                )}
              </button>
              <button
                onClick={onLogout}
                title="Sign out"
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Student Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-150 bg-white/95 px-4 py-2 text-xs font-medium text-slate-600 gap-4 no-scrollbar">
        <button
          onClick={() => setActiveTab('home')}
          className={`whitespace-nowrap ${activeTab === 'home' ? 'text-indigo-600 font-bold' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`whitespace-nowrap ${activeTab === 'quiz' ? 'text-indigo-600 font-bold' : ''}`}
        >
          CALIPS Quiz
        </button>
        <button
          onClick={() => setActiveTab('direct')}
          className={`whitespace-nowrap ${activeTab === 'direct' ? 'text-indigo-600 font-bold' : ''}`}
        >
          Know Interest
        </button>
        <button
          onClick={() => setActiveTab('universities')}
          className={`whitespace-nowrap ${activeTab === 'universities' ? 'text-indigo-600 font-bold' : ''}`}
        >
          Universities
        </button>
        <button
          onClick={() => setActiveTab('careers')}
          className={`whitespace-nowrap ${activeTab === 'careers' ? 'text-indigo-600 font-bold' : ''}`}
        >
          Career Library
        </button>
        {currentUser && (
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap ${activeTab === 'dashboard' ? 'text-indigo-600 font-bold' : ''}`}
          >
            Dashboard
          </button>
        )}
      </div>
    </header>
  );
};
