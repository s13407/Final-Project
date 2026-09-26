import React, { useState } from 'react';
import {
  UNIVERSITY_PROGRAMS,
  POPULAR_COUNTRIES,
  POPULAR_CITIES
} from '../data/universitiesData';
import { CALIPS_CATEGORIES } from '../data/calipsData';
import { CALIPSDimension, ThemeVibe } from '../types';
import {
  Search,
  GraduationCap,
  ExternalLink,
  MapPin,
  Filter,
  Bookmark,
  Globe
} from 'lucide-react';

interface UniversityExplorerProps {
  savedUniversities?: string[];
  onToggleSaveUniversity?: (uniId: string) => void;
  preferredCity?: string;
  preferredCountry?: string;
  vibe: ThemeVibe;
}

export const UniversityExplorer: React.FC<UniversityExplorerProps> = ({
  savedUniversities = [],
  onToggleSaveUniversity,
  preferredCity,
  preferredCountry,
  vibe
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDimension, setSelectedDimension] = useState<CALIPSDimension | 'ALL'>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>(preferredCountry || 'ALL');
  const [selectedCity, setSelectedCity] = useState<string>(preferredCity || 'ALL');

  const isDark = vibe === 'cosmic' || vibe === 'emerald';

  const countries = ['ALL', ...Array.from(new Set(UNIVERSITY_PROGRAMS.map((p) => p.country)))];

  const filteredPrograms = UNIVERSITY_PROGRAMS.filter((prog) => {
    const matchesSearch =
      prog.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.programTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.keyMajors.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
      prog.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDimension =
      selectedDimension === 'ALL' || prog.calipsCodes.includes(selectedDimension);

    const matchesCountry =
      selectedCountry === 'ALL' ||
      selectedCountry.includes('Anywhere') ||
      prog.country.toLowerCase() === selectedCountry.toLowerCase();

    const matchesCity =
      selectedCity === 'ALL' ||
      selectedCity.includes('Any City') ||
      prog.city.toLowerCase().includes(selectedCity.toLowerCase()) ||
      selectedCity.toLowerCase().includes(prog.city.toLowerCase());

    return matchesSearch && matchesDimension && matchesCountry && matchesCity;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 sm:p-10 shadow-2xl text-white">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm text-white">
            <GraduationCap className="h-4 w-4" />
            <span>Global & Regional Academic Explorer</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Universities & Degree Programs
          </h1>
          <p className="text-sm sm:text-base text-purple-100 leading-relaxed max-w-xl">
            Filter institutions by your preferred study city or country, tuition tier, and CALIPS vocational code. Find the campus where you will flourish!
          </p>
        </div>

        {/* Ambient background picture */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <img
            src="/src/assets/images/campus_university_future_1790442149657.jpg"
            alt="University Campus"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-transparent" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`rounded-3xl border p-6 shadow-xl space-y-5 transition-all ${
          isDark
            ? 'bg-[#0E1424]/90 border-white/10 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search university, program, or major (e.g. NUST, IBA, AI, Economics)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-2xl border pl-10 pr-4 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:bg-white/10'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
              }`}
            />
          </div>

          {/* Country Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDark
                  ? 'bg-[#141b2d] border-white/10 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
              }`}
            >
              <option value="ALL">All Countries</option>
              {countries
                .filter((c) => c !== 'ALL')
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDark
                  ? 'bg-[#141b2d] border-white/10 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
              }`}
            >
              <option value="ALL">All Cities / Regions</option>
              {['Karachi', 'Lahore', 'Islamabad', 'London', 'Boston', 'Toronto', 'Melbourne', 'Munich', 'Singapore', 'Dubai'].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick City Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-purple-400 flex items-center gap-1 mr-1">
            <MapPin className="h-3 w-3" />
            <span>Popular Cities:</span>
          </span>
          {[
            'Karachi',
            'Lahore',
            'Islamabad',
            'London',
            'Boston',
            'Toronto',
            'Melbourne',
            'Munich'
          ].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? 'ALL' : city)}
              className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                selectedCity === city
                  ? 'bg-purple-600 text-white shadow-xs'
                  : isDark
                  ? 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* CALIPS Dimension Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setSelectedDimension('ALL')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              selectedDimension === 'ALL'
                ? 'bg-purple-600 text-white shadow-xs'
                : isDark
                ? 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Archetypes
          </button>

          {(['C', 'A', 'L', 'I', 'P', 'S'] as CALIPSDimension[]).map((dim) => {
            const cat = CALIPS_CATEGORIES[dim];
            const isSelected = selectedDimension === dim;
            return (
              <button
                key={dim}
                onClick={() => setSelectedDimension(dim)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xs'
                    : isDark
                    ? 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{dim}</span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Program Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrograms.map((prog) => {
          const isSaved = savedUniversities.includes(prog.id);
          return (
            <div
              key={prog.id}
              className={`flex flex-col justify-between rounded-2xl border p-5 transition-all hover:scale-[1.01] ${
                isDark
                  ? 'bg-[#0E1424]/90 border-white/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 text-slate-100'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 text-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-1 font-semibold text-purple-400">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {prog.city}, {prog.country}
                    </span>
                  </span>
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                      isDark
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-indigo-50 text-indigo-700'
                    }`}
                  >
                    {prog.tuitionTier}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-extrabold">
                    {prog.universityName}
                  </h3>
                  {onToggleSaveUniversity && (
                    <button
                      onClick={() => onToggleSaveUniversity(prog.id)}
                      className={`p-1 rounded-md transition-colors ${
                        isSaved ? 'text-amber-400' : 'text-slate-500 hover:text-amber-400'
                      }`}
                      title={isSaved ? 'Saved' : 'Bookmark university'}
                    >
                      <Bookmark className="h-4 w-4 fill-current" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-purple-400 mt-1">
                  {prog.programTitle}
                </div>

                <p
                  className={`mt-2.5 text-xs leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {prog.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1 text-[11px]">
                  {prog.keyMajors.map((m) => (
                    <span
                      key={m}
                      className={`rounded-md px-2 py-0.5 font-medium border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-slate-300'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className={isDark ? 'text-slate-400 text-[11px]' : 'text-slate-500 text-[11px]'}>
                  CALIPS: {prog.calipsCodes.join(', ')}
                </span>
                <a
                  href={prog.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-purple-400 hover:text-purple-300"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPrograms.length === 0 && (
        <div
          className={`rounded-3xl border border-dashed p-12 text-center ${
            isDark ? 'border-white/15 text-slate-400' : 'border-slate-300 text-slate-500'
          }`}
        >
          <GraduationCap className="mx-auto h-12 w-12 text-purple-400 mb-3" />
          <h3 className="font-display text-lg font-bold">
            No universities found for your search filters
          </h3>
          <p className="mt-1 text-xs">
            Try resetting your city, country, or keyword search to view more options.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDimension('ALL');
              setSelectedCountry('ALL');
              setSelectedCity('ALL');
            }}
            className="mt-4 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-purple-700"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
