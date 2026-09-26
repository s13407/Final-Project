import React, { useState } from 'react';
import { UNIVERSITY_PROGRAMS, POPULAR_COUNTRIES, POPULAR_CITIES } from '../data/universitiesData';
import { CALIPS_CATEGORIES } from '../data/calipsData';
import { CALIPSDimension } from '../types';
import { Search, GraduationCap, ExternalLink, MapPin, Filter, Bookmark, Globe } from 'lucide-react';

interface UniversityExplorerProps {
  savedUniversities?: string[];
  onToggleSaveUniversity?: (uniId: string) => void;
  preferredCity?: string;
  preferredCountry?: string;
}

export const UniversityExplorer: React.FC<UniversityExplorerProps> = ({
  savedUniversities = [],
  onToggleSaveUniversity,
  preferredCity,
  preferredCountry
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDimension, setSelectedDimension] = useState<CALIPSDimension | 'ALL'>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>(preferredCountry || 'ALL');
  const [selectedCity, setSelectedCity] = useState<string>(preferredCity || 'ALL');

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
      {/* Header Banner with Fresh Campus Visual & Uplifting Mood */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 sm:p-10 shadow-xl text-white">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm text-white">
            <GraduationCap className="h-4 w-4" />
            <span>Global & Regional Academic Explorer</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Universities & Degree Programs
          </h1>
          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed max-w-xl">
            Filter institutions by your preferred study city or country, tuition tier, and CALIPS vocational code. Find the campus where you will flourish!
          </p>
        </div>

        {/* Ambient background picture */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none hidden md:block">
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

      {/* Filter and Search Bar in Bright Card */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-lg space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search university, program, or major (e.g. NUST, IBA, AI, Economics)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all font-medium"
            />
          </div>

          {/* Country Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none font-semibold transition-all"
            >
              <option value="ALL">All Countries</option>
              {countries.filter((c) => c !== 'ALL').map((c) => (
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
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none font-semibold transition-all"
            >
              <option value="ALL">All Cities / Regions</option>
              {POPULAR_CITIES.filter((city) => !city.includes('Any City')).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick City Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
            <MapPin className="h-3 w-3 text-indigo-500" />
            <span>Popular Cities:</span>
          </span>
          {['Karachi', 'Lahore', 'Islamabad', 'London', 'Boston', 'Toronto', 'Melbourne', 'Munich'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? 'ALL' : city)}
              className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                selectedCity === city
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
          {selectedCity !== 'ALL' && (
            <button
              onClick={() => setSelectedCity('ALL')}
              className="text-xs font-bold text-rose-600 hover:underline ml-2"
            >
              Clear City
            </button>
          )}
        </div>

        {/* CALIPS Dimension Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-150">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="h-3 w-3 text-slate-400" />
            <span>CALIPS Archetype:</span>
          </span>

          <button
            onClick={() => setSelectedDimension('ALL')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              selectedDimension === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Dimensions
          </button>

          {(['C', 'A', 'L', 'I', 'P', 'S'] as CALIPSDimension[]).map((dim) => {
            const cat = CALIPS_CATEGORIES[dim];
            return (
              <button
                key={dim}
                onClick={() => setSelectedDimension(dim)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedDimension === dim
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="font-extrabold">{dim}</span>
                <span className="hidden sm:inline">· {cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Program Grid in Cheerful White Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((prog) => {
          const isSaved = savedUniversities.includes(prog.id);
          return (
            <div
              key={prog.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <MapPin className="h-3 w-3 text-amber-500" />
                    <span>
                      {prog.city}, {prog.country}
                    </span>
                  </span>
                  <span className="font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                    {prog.tuitionTier}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-extrabold text-slate-900 leading-snug">
                    {prog.universityName}
                  </h3>
                  {onToggleSaveUniversity && (
                    <button
                      onClick={() => onToggleSaveUniversity(prog.id)}
                      className={`text-slate-400 hover:text-amber-500 p-1 rounded-md transition-colors ${
                        isSaved ? 'text-amber-500' : ''
                      }`}
                      title={isSaved ? 'Bookmarked' : 'Bookmark university'}
                    >
                      <Bookmark className="h-4 w-4 fill-current" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-bold text-indigo-600 mt-1">
                  {prog.programTitle}
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {prog.description}
                </p>

                {/* Key Majors */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {prog.keyMajors.map((m) => (
                    <span
                      key={m}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-150 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-slate-500 font-semibold text-[11px]">Archetypes:</span>
                  {prog.calipsCodes.map((c) => (
                    <span
                      key={c}
                      className="h-5 w-5 rounded-md flex items-center justify-center font-bold text-[10px] text-white shadow-2xs"
                      style={{ backgroundColor: CALIPS_CATEGORIES[c].accentColor }}
                      title={`${CALIPS_CATEGORIES[c].title} (${CALIPS_CATEGORIES[c].archetype})`}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <a
                  href={prog.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold"
                >
                  <span>Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
          <GraduationCap className="mx-auto h-10 w-10 text-slate-400 mb-2" />
          <h3 className="text-base font-bold text-slate-800">No programs match this search</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the city or country filters to view more programs.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDimension('ALL');
              setSelectedCountry('ALL');
              setSelectedCity('ALL');
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
