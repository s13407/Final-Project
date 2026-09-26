import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'quiz' | 'direct' | 'universities' | 'careers' | 'dashboard') => void;
  onOpenSupabase: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSupabase }) => {
  return (
    <footer className="border-t border-indigo-100 bg-white/90 text-slate-600 py-12 mt-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-xs">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-display text-xl font-extrabold text-slate-900">
                PathCode
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              "Decode your interest. Discover your direction." Designed for Gen-Z students navigating careers, majors, and universities across Pakistan and worldwide.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-slate-600 font-bold">
            <button onClick={() => onNavigate('home')} className="hover:text-indigo-600 transition-colors">
              Home
            </button>
            <button onClick={() => onNavigate('quiz')} className="hover:text-indigo-600 transition-colors">
              CALIPS 60-Q Assessment
            </button>
            <button onClick={() => onNavigate('direct')} className="hover:text-indigo-600 transition-colors">
              I Know My Interest
            </button>
            <button onClick={() => onNavigate('universities')} className="hover:text-indigo-600 transition-colors">
              Universities
            </button>
            <button onClick={() => onNavigate('careers')} className="hover:text-indigo-600 transition-colors">
              Taxonomy Library
            </button>
            <button onClick={onOpenSupabase} className="hover:text-indigo-600 transition-colors">
              Supabase & RLS
            </button>
          </div>
        </div>

        {/* Disclaimer box */}
        <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 text-xs text-slate-600">
          <ShieldCheck className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-indigo-900 font-bold">Important Educational Disclaimer:</strong> PathCode is structured strictly as an exploratory guidance framework adapted from the Holland/CALIPS vocational interest taxonomy. It is designed to spark discovery and highlight potential paths, not to act as a definitive prediction or guarantee of any student's future.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium pt-4 border-t border-slate-150">
          <span>&copy; {new Date().getFullYear()} PathCode. All rights reserved.</span>
          <span className="font-semibold text-slate-500">Conventional · Artistic · Leadership · Investigative · Practical · Social</span>
        </div>
      </div>
    </footer>
  );
};
