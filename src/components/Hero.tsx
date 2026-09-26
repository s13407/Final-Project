import React from 'react';
import { ThemeVibe } from '../types';
import {
  ArrowRight,
  Compass,
  Search,
  Sparkles,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  MapPin,
  Heart,
  Database,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  onStartDirect: () => void;
  onExploreUniversities: () => void;
  vibe: ThemeVibe;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQuiz,
  onStartDirect,
  onExploreUniversities,
  vibe
}) => {
  const isDark = vibe === 'cosmic' || vibe === 'emerald';

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Mesh Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl opacity-60">
        <div
          className={`aspect-[1155/678] w-[75rem] ${
            vibe === 'emerald'
              ? 'bg-gradient-to-tr from-emerald-600/30 via-teal-500/20 to-cyan-500/30'
              : 'bg-gradient-to-tr from-purple-600/35 via-indigo-600/25 to-pink-500/30'
          }`}
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mood-Boosting Tag */}
        <div className="mb-4 flex items-center justify-center gap-2 text-xs font-bold tracking-wide">
          <span
            className={`flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-sm transition-all ${
              isDark
                ? 'bg-white/5 border-white/15 text-purple-300 backdrop-blur-md'
                : 'bg-indigo-50 border-indigo-200 text-indigo-900'
            }`}
          >
            <Sparkles className="h-4 w-4 text-purple-400 fill-purple-400 animate-pulse" />
            <span>CALIPS Archetype Model</span>
            <span className="opacity-40">·</span>
            <span>Gen-Z Career Navigator</span>
            <span className="opacity-40">·</span>
            <span className="text-emerald-400 font-semibold">Supabase Cloud Ready</span>
          </span>
        </div>

        {/* Primary Headline with Rich Radiant Gradient */}
        <div className="text-center">
          <h1
            className={`font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl [text-wrap:balance] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Decode your interest.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Discover your direction.
            </span>
          </h1>

          <p
            className={`mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed [text-wrap:balance] ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Overwhelmed by infinite career paths and confusing majors? PathCode decodes your natural strengths across 6 core dimensions, pinpointing in-demand jobs, skills to build, and top university programs in your target city or country.
          </p>

          {/* Exploratory Guidance Disclaimer */}
          <div
            className={`mx-auto mt-6 inline-flex max-w-xl items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-xs shadow-sm backdrop-blur-sm ${
              isDark
                ? 'bg-white/5 border-white/10 text-slate-300'
                : 'bg-indigo-50/80 border-indigo-200/80 text-indigo-950'
            }`}
          >
            <ShieldCheck className="h-4 w-4 shrink-0 text-purple-400" />
            <span>
              <strong>Note for Students:</strong> PathCode is an exploratory career guidance tool to reveal possibilities, not a rigid prediction of your destiny.
            </span>
          </div>
        </div>

        {/* The Two Main Interactive Options */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Option 1: Discover My Career (60-Question CALIPS Assessment) */}
          <div
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 shadow-xl transition-all duration-300 hover:scale-[1.01] ${
              isDark
                ? 'bg-[#11172A]/90 border-white/10 hover:border-purple-500/50 hover:shadow-purple-500/15'
                : 'bg-white border-indigo-200 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/15'
            }`}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  Option 01 · Full Assessment
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-slate-400'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  60 True/False · ~6 Mins
                </span>
              </div>

              <h2
                className={`font-display mt-5 text-2xl font-bold sm:text-3xl ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Discover My Career
              </h2>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Answer 10 intuitive questions for each of the 6 CALIPS dimensions. Calculate your top 3-letter PathCode and unlock university programs tailored to your dream city or country!
              </p>

              {/* 6 Dimension Badges in Cheerful Colors */}
              <div className="mt-6 grid grid-cols-3 gap-2.5 text-xs font-semibold">
                <div
                  className={`flex items-center gap-2 rounded-xl p-2.5 border transition-all ${
                    isDark
                      ? 'bg-sky-950/40 border-sky-500/30 text-sky-200'
                      : 'bg-sky-50 border-sky-200 text-sky-900'
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500 text-white font-bold text-[11px]">
                    C
                  </span>
                  <span className="truncate">The Organizer</span>
                </div>
                <div
                  className={`flex items-center gap-2 rounded-xl p-2.5 border transition-all ${
                    isDark
                      ? 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-rose-500 text-white font-bold text-[11px]">
                    A
                  </span>
                  <span className="truncate">The Creator</span>
                </div>
                <div
                  className={`flex items-center gap-2 rounded-xl p-2.5 border transition-all ${
                    isDark
                      ? 'bg-amber-950/40 border-amber-500/30 text-amber-200'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 text-white font-bold text-[11px]">
                    L
                  </span>
                  <span className="truncate">The Leader</span>
                </div>
                <div
                  className={`flex items-center gap-2 rounded-xl p-2.5 border transition-all ${
                    isDark
                      ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200'
                      : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500 text-white font-bold text-[11px]">
                    I
                  </span>
                  <span className="truncate">The Analyst</span>
                </div>
                <div
                  className={`flex items-center gap-2 rounded-xl p-2.5 border transition-all ${
                    isDark
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500 text-white font-bold text-[11px]">
                    P
                  </span>
                  <span className="truncate">The Doer</span>
                </div>
                <div
                  className={`flex items-center gap-2 rounded-xl p-2.5 border transition-all ${
                    isDark
                      ? 'bg-purple-950/40 border-purple-500/30 text-purple-200'
                      : 'bg-purple-50 border-purple-200 text-purple-900'
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500 text-white font-bold text-[11px]">
                    S
                  </span>
                  <span className="truncate">The Helper</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-5 border-t border-white/10">
              <button
                onClick={onStartQuiz}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/30 hover:opacity-95 active:scale-98 transition-all"
              >
                <span>Start 60-Question CALIPS Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Option 2: I Know My Interest (Fast-Track) */}
          <div
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 shadow-xl transition-all duration-300 hover:scale-[1.01] ${
              isDark
                ? 'bg-[#11172A]/90 border-white/10 hover:border-cyan-500/50 hover:shadow-cyan-500/15'
                : 'bg-white border-sky-200 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/15'
            }`}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  <Search className="h-3.5 w-3.5 text-cyan-400" />
                  Option 02 · Fast-Track Match
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-slate-400'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  Direct Entry · Instant
                </span>
              </div>

              <h2
                className={`font-display mt-5 text-2xl font-bold sm:text-3xl ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                I Know My Interest
              </h2>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Already have a passion like Coding, Robotics, Game Design, Business, Graphic Design, or Medicine? Skip the quiz! Enter your field and preferred study city to see matching majors and universities right away.
              </p>

              {/* Sample Quick-Tags */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {[
                  'Artificial Intelligence',
                  'Biomedical Engineering',
                  'Graphic Design',
                  'Fintech & Accounting',
                  'Psychology',
                  'Software Architecture'
                ].map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-xl border px-3 py-1.5 font-medium transition-all ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-5 border-t border-white/10">
              <button
                onClick={onStartDirect}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 active:scale-98 transition-all"
              >
                <span>Direct Interest Match & City Finder</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            className={`rounded-2xl border p-6 transition-all ${
              isDark
                ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 mb-3">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className={`font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              City & Country Filter
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Target top universities in Karachi, Lahore, Islamabad, London, Toronto, Boston, and more based on your CALIPS archetype.
            </p>
          </div>

          <div
            className={`rounded-2xl border p-6 transition-all ${
              isDark
                ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 mb-3">
              <Database className="h-5 w-5" />
            </div>
            <h3 className={`font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Supabase Persistence & RLS
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              All student assessments, profiles, and saved majors are securely synced to your Supabase PostgreSQL database with Row Level Security.
            </p>
          </div>

          <div
            className={`rounded-2xl border p-6 transition-all ${
              isDark
                ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-400 mb-3">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className={`font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Actionable Pathways
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Get a breakdown of salary tiers, related degree majors, career clusters, and high-impact skills to build today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
