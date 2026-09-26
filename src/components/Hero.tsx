import React from 'react';
import { ArrowRight, CheckCircle2, Compass, Search, Sparkles, BookOpen, GraduationCap, ShieldCheck, MapPin, Heart } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  onStartDirect: () => void;
  onExploreUniversities: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQuiz,
  onStartDirect,
  onExploreUniversities,
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Mood-Brightening Ambient Aura Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl opacity-70">
        <div
          className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-amber-300/35 via-rose-300/30 to-indigo-400/35"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Joyful Kicker Tag */}
        <div className="mb-4 flex items-center justify-center gap-2 text-xs font-bold tracking-wide text-indigo-700">
          <span className="flex items-center gap-1.5 rounded-full bg-indigo-100/90 border border-indigo-200/80 px-3.5 py-1 text-indigo-800 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
            <span>CALIPS Archetype Model</span>
            <span aria-hidden="true" className="text-indigo-300">·</span>
            <span>Gen-Z Career Discovery</span>
            <span aria-hidden="true" className="text-indigo-300">·</span>
            <span className="text-emerald-700 font-semibold">Location-Tailored Unis</span>
          </span>
        </div>

        {/* Primary Headline with Mood-Brightening Gradient */}
        <div className="text-center">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl [text-wrap:balance]">
            Decode your interest.{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Discover your direction.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed [text-wrap:balance]">
            Overwhelmed by countless career paths and confusing majors? PathCode decodes your unique strengths across 6 core dimensions, pinpointing in-demand jobs, skills to build, and top university programs in your dream city or country.
          </p>

          {/* Thoughtful Career-Exploration Disclaimer Banner */}
          <div className="mx-auto mt-6 inline-flex max-w-xl items-center gap-2.5 rounded-2xl border border-indigo-200/70 bg-white/80 px-4 py-2.5 text-xs text-indigo-900 shadow-sm backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-600" />
            <span>
              <strong>Note for Students:</strong> PathCode is an exploratory guidance platform designed to inspire you, not a rigid prescription of your future.
            </span>
          </div>
        </div>

        {/* The Two Main Interactive Options */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Option 1: Discover My Career (60-Question CALIPS Assessment) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-b from-white via-indigo-50/20 to-white p-8 shadow-lg transition-all duration-300 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/15">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-800">
                  <Sparkles className="h-3 w-3 text-indigo-600" />
                  Option 01 · Full Self-Assessment
                </span>
                <span className="text-xs font-medium text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                  60 Questions · ~6 Mins
                </span>
              </div>

              <h2 className="font-display mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
                Discover My Career
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Take the full 60-question True/False CALIPS assessment (10 questions per dimension). Decode your personalized 3-letter PathCode and unlock university recommendations customized to your preferred study city or country!
              </p>

              {/* 6 Dimension Badges in Cheerful Fresh Colors */}
              <div className="mt-6 grid grid-cols-3 gap-2.5 text-xs font-semibold">
                <div className="flex items-center gap-2 rounded-xl bg-sky-50 border border-sky-200 p-2.5 text-sky-900 shadow-2xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500 text-white font-bold text-[11px]">C</span>
                  <span className="truncate">The Organizer</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-rose-900 shadow-2xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-rose-500 text-white font-bold text-[11px]">A</span>
                  <span className="truncate">The Creator</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-amber-900 shadow-2xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 text-white font-bold text-[11px]">L</span>
                  <span className="truncate">The Leader</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-indigo-50 border border-indigo-200 p-2.5 text-indigo-900 shadow-2xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500 text-white font-bold text-[11px]">I</span>
                  <span className="truncate">The Analyst</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-emerald-900 shadow-2xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500 text-white font-bold text-[11px]">P</span>
                  <span className="truncate">The Doer</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-purple-50 border border-purple-200 p-2.5 text-purple-900 shadow-2xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500 text-white font-bold text-[11px]">S</span>
                  <span className="truncate">The Helper</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-5 border-t border-slate-200/80">
              <button
                onClick={onStartQuiz}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-5 py-4 text-sm font-bold text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Start CALIPS Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Option 2: I Know My Interest (Fast-Track) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-b from-white via-sky-50/20 to-white p-8 shadow-lg transition-all duration-300 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/15">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-800">
                  <Search className="h-3 w-3 text-sky-600" />
                  Option 02 · Fast-Track Match
                </span>
                <span className="text-xs font-medium text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                  Direct Entry · Instant
                </span>
              </div>

              <h2 className="font-display mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
                I Know My Interest
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Already know what subject or field excites you? Skip the quiz! Enter your interest, department, and preferred study city or country to instantly receive tailored career matches, skills, and university options.
              </p>

              {/* Feature Highlights */}
              <div className="mt-6 space-y-2.5 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                  <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                  <span>Choose any target department (CS, Business, Arts, Engineering, Health)</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                  <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Filter programs in your favorite city or country (Karachi, London, Boston, etc.)</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                  <Sparkles className="h-4 w-4 text-purple-600 shrink-0" />
                  <span>Instant PathCode archetype computation with skills roadmap</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-5 border-t border-slate-200/80">
              <button
                onClick={onStartDirect}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-sky-700 border-2 border-sky-400/80 hover:bg-sky-50 hover:border-sky-500 active:scale-[0.99] transition-all shadow-sm"
              >
                <Search className="h-4 w-4" />
                <span>Enter Interests & Dream City Directly</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fresh Visual Showcase Section */}
        <div className="mt-16 rounded-3xl border border-indigo-100 bg-white/85 p-6 lg:p-8 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                <GraduationCap className="h-3.5 w-3.5 text-amber-600" />
                <span>Global & Local Campuses</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Find universities that match your rhythm & location
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you plan to study locally in Karachi, Islamabad, or Lahore, or aim for premier institutions across London, Boston, Toronto, or Munich, PathCode pairs your vocational archetype directly with world-class degrees.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={onExploreUniversities}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  <span>Browse Campus Explorer by City</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-slate-200 relative group aspect-[16/9] shadow-md bg-indigo-50">
              <img
                src="/src/assets/images/campus_university_future_1790442149657.jpg"
                alt="Modern University Campus"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white font-medium flex items-center justify-between">
                <span>Personalized Recommendations Across 10+ Global & Local Hubs</span>
                <span className="font-mono text-amber-300 font-bold">PathCode Directory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
