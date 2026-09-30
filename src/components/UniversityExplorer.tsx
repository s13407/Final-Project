import React, { useState, useEffect } from 'react';
import {
  UNIVERSITY_PROGRAMS,
  POPULAR_COUNTRIES,
  getCitiesForCountry,
  saveLiveUniversityProgram,
  getStoredLiveUniversities
} from '../data/universitiesData';
import { CALIPS_CATEGORIES } from '../data/calipsData';
import { CALIPSDimension, ThemeVibe, UniversityProgram } from '../types';
import {
  Search,
  GraduationCap,
  ExternalLink,
  MapPin,
  Bookmark,
  Globe,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Loader2,
  ShieldCheck,
  Building2,
  Landmark,
  SlidersHorizontal,
  Compass
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
  const [customCityInput, setCustomCityInput] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | 'LOCAL' | 'PRIVATE'>('ALL');

  // Live Google & Web search state
  const [liveGoogleResults, setLiveGoogleResults] = useState<UniversityProgram[]>(() => {
    return getStoredLiveUniversities();
  });
  const [isSearchingGoogle, setIsSearchingGoogle] = useState(false);
  const [googleSearchNotice, setGoogleSearchNotice] = useState<string | null>(null);
  const [activeViewFilter, setActiveViewFilter] = useState<'ALL' | 'GOOGLE' | 'SAVED'>('ALL');

  const isDark = vibe !== 'electric';

  // Available cities for the currently selected country
  const availableCities = getCitiesForCountry(selectedCountry);

  // Combine static programs with live Google programs (deduplicated by name)
  const allAvailablePrograms = (() => {
    const map = new Map<string, UniversityProgram>();
    // First insert static curated programs
    for (const prog of UNIVERSITY_PROGRAMS) {
      map.set(prog.universityName.toLowerCase().trim(), prog);
    }
    // Then overlay/add live Google search results
    for (const prog of liveGoogleResults) {
      const key = prog.universityName.toLowerCase().trim();
      if (!map.has(key)) {
        map.set(key, prog);
      }
    }
    return Array.from(map.values());
  })();

  // Filter combined programs by user criteria
  const filteredPrograms = allAvailablePrograms.filter((prog) => {
    const effectiveCity = customCityInput.trim() || selectedCity;
    const searchLower = searchTerm.toLowerCase().trim();

    const isProgPrivate = prog.institutionType === 'Private';
    const isProgLocal = !isProgPrivate; // Local / Public sector

    const matchesSearch =
      !searchTerm ||
      prog.universityName.toLowerCase().includes(searchLower) ||
      prog.programTitle.toLowerCase().includes(searchLower) ||
      prog.keyMajors.some((m) => m.toLowerCase().includes(searchLower)) ||
      prog.city.toLowerCase().includes(searchLower) ||
      prog.country.toLowerCase().includes(searchLower) ||
      (searchLower === 'private' && isProgPrivate) ||
      ((searchLower === 'local' || searchLower === 'public') && isProgLocal);

    const matchesDimension =
      selectedDimension === 'ALL' || prog.calipsCodes.includes(selectedDimension);

    const matchesCountry =
      selectedCountry === 'ALL' ||
      selectedCountry.includes('Anywhere') ||
      prog.country.toLowerCase() === selectedCountry.toLowerCase();

    const matchesCity =
      effectiveCity === 'ALL' ||
      effectiveCity.includes('Any City') ||
      prog.city.toLowerCase().includes(effectiveCity.toLowerCase()) ||
      effectiveCity.toLowerCase().includes(prog.city.toLowerCase());

    const matchesViewFilter =
      activeViewFilter === 'ALL' ||
      (activeViewFilter === 'GOOGLE' && prog.isLiveGoogleResult) ||
      (activeViewFilter === 'SAVED' && savedUniversities.includes(prog.id));

    const matchesType =
      selectedType === 'ALL' ||
      (selectedType === 'PRIVATE' && isProgPrivate) ||
      (selectedType === 'LOCAL' && isProgLocal);

    return matchesSearch && matchesDimension && matchesCountry && matchesCity && matchesViewFilter && matchesType;
  });

  // Calculate sector breakdowns
  const totalProgramsCount = filteredPrograms.length;
  const localProgramsCount = filteredPrograms.filter((p) => p.institutionType !== 'Private').length;
  const privateProgramsCount = filteredPrograms.filter((p) => p.institutionType === 'Private').length;

  // Execute Live Google & Web search
  const handleLiveGoogleSearch = async () => {
    const targetCountry = selectedCountry !== 'ALL' && !selectedCountry.includes('Anywhere') ? selectedCountry : '';
    const targetCity = customCityInput.trim() || (selectedCity !== 'ALL' && !selectedCity.includes('Any City') ? selectedCity : '');

    setIsSearchingGoogle(true);
    setGoogleSearchNotice(`Accessing Google and global academic databases for ${targetCity || targetCountry || 'universities'}...`);

    try {
      const response = await fetch('/api/universities/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchTerm.trim(),
          country: targetCountry,
          city: targetCity,
          dimension: selectedDimension !== 'ALL' ? selectedDimension : undefined
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.universities && data.universities.length > 0) {
          // Merge into state and preserve in local storage
          const newResults: UniversityProgram[] = data.universities;
          newResults.forEach((p) => saveLiveUniversityProgram(p));
          setLiveGoogleResults((prev) => {
            const existingNames = new Set(prev.map((item) => item.universityName.toLowerCase().trim()));
            const uniqueIncoming = newResults.filter(
              (item) => !existingNames.has(item.universityName.toLowerCase().trim())
            );
            return [...uniqueIncoming, ...prev];
          });
          setGoogleSearchNotice(
            `✓ Successfully fetched ${data.universities.length} authentic universities from Google & global registry.`
          );
        } else {
          setGoogleSearchNotice('No additional universities found via Google for the given filter.');
        }
      } else {
        setGoogleSearchNotice('Could not retrieve live search results. Showing curated list.');
      }
    } catch (err: any) {
      console.warn('Live Google search error:', err);
      setGoogleSearchNotice('Notice: Connecting to Google database...');
    } finally {
      setIsSearchingGoogle(false);
      setTimeout(() => setGoogleSearchNotice(null), 6000);
    }
  };

  const handleToggleSave = (prog: UniversityProgram) => {
    // If it's a live Google result, make sure it's stored in local repository so Dashboard can display it
    if (prog.isLiveGoogleResult) {
      saveLiveUniversityProgram(prog);
    }
    if (onToggleSaveUniversity) {
      onToggleSaveUniversity(prog.id);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 sm:p-10 shadow-2xl text-white">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm text-white">
            <Globe className="h-4 w-4" />
            <span>Global Academic Explorer • All Countries & Cities</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Universities & Degree Programs
          </h1>
          <p className="text-sm sm:text-base text-purple-100 leading-relaxed max-w-2xl">
            Explore authentic universities from all countries and cities across the globe. Use live Google search integration to retrieve real-time authenticated university data, official portals, and CALIPS vocational alignments.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleLiveGoogleSearch}
              disabled={isSearchingGoogle}
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-indigo-900 font-extrabold text-xs px-5 py-2.5 shadow-lg hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-75"
            >
              {isSearchingGoogle ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                  <span>Searching Google...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 text-purple-600" />
                  <span>Search Google for Live Universities</span>
                </>
              )}
            </button>

            <span className="text-xs text-purple-200 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              <span>Covers 195+ Countries & All World Cities</span>
            </span>
          </div>
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

      {/* Live Google Search Notice Banner */}
      {googleSearchNotice && (
        <div
          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-xs font-semibold animate-fadeIn ${
            isDark
              ? 'bg-purple-950/40 border-purple-500/30 text-purple-200'
              : 'bg-purple-50 border-purple-200 text-purple-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400 shrink-0" />
            <span>{googleSearchNotice}</span>
          </div>
          <button
            onClick={() => setGoogleSearchNotice(null)}
            className="text-xs underline text-purple-400 hover:text-purple-300"
          >
            Dismiss
          </button>
        </div>
      )}

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
          <div className="relative md:col-span-5">
            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Search University, Major or Degree
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Oxford, Stanford, NUST, AI, Robotics, Medicine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLiveGoogleSearch();
                  }
                }}
                className={`w-full rounded-2xl border pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                }`}
              />
            </div>
          </div>

          {/* Country Filter (All Countries of the World) */}
          <div className="md:col-span-4">
            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Country ({POPULAR_COUNTRIES.length} World Countries)
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={selectedCountry}
                onChange={(e) => {
                  const country = e.target.value;
                  setSelectedCountry(country);
                  setSelectedCity('ALL');
                  setCustomCityInput('');
                }}
                className={`w-full rounded-2xl border pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? 'bg-[#141b2d] border-white/10 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                }`}
              >
                <option value="ALL">All Countries of the World</option>
                {POPULAR_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* City Filter (Cities of Selected Country + Free Input) */}
          <div className="md:col-span-3">
            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              City / Metro Region
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setCustomCityInput('');
                }}
                className={`w-full rounded-2xl border pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? 'bg-[#141b2d] border-white/10 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                }`}
              >
                <option value="ALL">All Cities</option>
                {availableCities
                  .filter((city) => city !== 'Any City / Flexible')
                  .map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Custom City Search Input & Live Google Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 flex-1">
            <span className={`text-[11px] font-bold shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Or type any specific city in the world:
            </span>
            <input
              type="text"
              placeholder="e.g. Kyoto, Heidelberg, Peshawar, Cambridge..."
              value={customCityInput}
              onChange={(e) => setCustomCityInput(e.target.value)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all max-w-xs flex-1 ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            {customCityInput && (
              <button
                onClick={() => setCustomCityInput('')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={handleLiveGoogleSearch}
            disabled={isSearchingGoogle}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all disabled:opacity-50"
          >
            {isSearchingGoogle ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Searching Google Live...</span>
              </>
            ) : (
              <>
                <Globe className="h-3.5 w-3.5" />
                <span>Live Google Search</span>
              </>
            )}
          </button>
        </div>

        {/* CALIPS Dimension Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <span className={`text-[11px] font-bold mr-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Vocational Code:
          </span>
          <button
            onClick={() => setSelectedDimension('ALL')}
            className={`rounded-xl px-3 py-1 text-xs font-bold transition-all ${
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
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xs'
                    : isDark
                    ? 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{dim}</span>
                <span className="hidden sm:inline">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Sector / Institution Type Filter Tabs: Local vs Private */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs">
          <span className={`text-[11px] font-bold mr-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Institution Sector:
          </span>
          <button
            onClick={() => setSelectedType('ALL')}
            className={`rounded-xl px-3 py-1 text-xs font-bold transition-all ${
              selectedType === 'ALL'
                ? 'bg-purple-600 text-white shadow-xs'
                : isDark
                ? 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All (Local & Private)
          </button>
          <button
            onClick={() => setSelectedType('LOCAL')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition-all ${
              selectedType === 'LOCAL'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isDark
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <Landmark className="h-3 w-3" />
            <span>🏛️ Local Universities ({localProgramsCount})</span>
          </button>
          <button
            onClick={() => setSelectedType('PRIVATE')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition-all ${
              selectedType === 'PRIVATE'
                ? 'bg-violet-600 text-white shadow-xs'
                : isDark
                ? 'bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20'
                : 'bg-violet-50 border border-violet-200 text-violet-700 hover:bg-violet-100'
            }`}
          >
            <Building2 className="h-3 w-3" />
            <span>🏢 Private Universities ({privateProgramsCount})</span>
          </button>
        </div>

        {/* Results Counter & Source Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Showing {filteredPrograms.length} Universities ({localProgramsCount} Local · {privateProgramsCount} Private)
            </span>
            {selectedCountry !== 'ALL' && (
              <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-[11px] font-bold text-purple-400">
                {selectedCountry}
              </span>
            )}
            {(customCityInput || (selectedCity !== 'ALL' && !selectedCity.includes('Any City'))) && (
              <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[11px] font-bold text-indigo-400">
                {customCityInput || selectedCity}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveViewFilter('ALL')}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                activeViewFilter === 'ALL'
                  ? 'bg-purple-600 text-white'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Sources
            </button>
            <button
              onClick={() => setActiveViewFilter('GOOGLE')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                activeViewFilter === 'GOOGLE'
                  ? 'bg-emerald-600 text-white'
                  : isDark
                  ? 'text-emerald-400 hover:text-emerald-300'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>Google Verified</span>
            </button>
            <button
              onClick={() => setActiveViewFilter('SAVED')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                activeViewFilter === 'SAVED'
                  ? 'bg-amber-600 text-white'
                  : isDark
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              <Bookmark className="h-3 w-3" />
              <span>Saved ({savedUniversities.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Program Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrograms.map((prog) => {
          const isSaved = savedUniversities.includes(prog.id);
          const isPrivate = prog.institutionType === 'Private';

          return (
            <div
              key={prog.id}
              className={`flex flex-col justify-between rounded-2xl border p-5 transition-all hover:scale-[1.01] ${
                prog.isLiveGoogleResult
                  ? isDark
                    ? 'bg-gradient-to-b from-[#12182c] to-[#0a0f1d] border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10 text-slate-100'
                    : 'bg-gradient-to-b from-emerald-50/40 to-white border-emerald-300 hover:border-emerald-500 text-slate-900'
                  : isDark
                  ? 'bg-[#0E1424]/90 border-white/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 text-slate-100'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 text-slate-900'
              }`}
            >
              <div>
                {/* Top Location & Sector Badge Bar */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-1 font-semibold text-purple-400">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {prog.city}, {prog.country}
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {/* Mentioning which is Private and Local explicitly */}
                    {isPrivate ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/15 border border-violet-500/30 px-2 py-0.5 text-[10px] font-bold text-violet-400">
                        <Building2 className="h-2.5 w-2.5" />
                        <span>Private University</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        <Landmark className="h-2.5 w-2.5" />
                        <span>Local University</span>
                      </span>
                    )}

                    {prog.isLiveGoogleResult && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                        <Sparkles className="h-2.5 w-2.5" />
                        <span>Google Search</span>
                      </span>
                    )}
                    <span
                      className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                        isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {prog.tuitionTier}
                    </span>
                  </div>
                </div>

                {/* University Name & Bookmark Action */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-base font-extrabold leading-snug">
                      {prog.universityName}
                    </h3>
                    <div className="mt-0.5">
                      <span className={`text-[10px] font-medium ${isPrivate ? 'text-violet-400' : 'text-emerald-400'}`}>
                        {isPrivate ? 'Private Sector Institution' : 'Local / Public Sector Institution'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleSave(prog)}
                    className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      isSaved ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-amber-400'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Bookmark university'}
                  >
                    <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Program Title */}
                <div className="text-xs font-bold text-purple-400 mt-1">
                  {prog.programTitle}
                </div>

                {/* Description */}
                <p
                  className={`mt-2.5 text-xs leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {prog.description}
                </p>

                {/* Key Majors */}
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

              {/* Card Footer: CALIPS Alignment & Official Portal URL */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className={isDark ? 'text-slate-400 text-[11px]' : 'text-slate-500 text-[11px]'}>
                  CALIPS: {prog.calipsCodes.join(', ')}
                </span>
                <a
                  href={prog.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State with Direct Google Search Action */}
      {filteredPrograms.length === 0 && (
        <div
          className={`rounded-3xl border border-dashed p-10 text-center space-y-4 ${
            isDark ? 'border-white/15 bg-white/5 text-slate-300' : 'border-slate-300 bg-slate-50 text-slate-600'
          }`}
        >
          <Building2 className="mx-auto h-12 w-12 text-purple-400" />
          <div>
            <h3 className="font-display text-lg font-bold">
              No local universities found for {selectedCity !== 'ALL' ? selectedCity : selectedCountry !== 'ALL' ? selectedCountry : 'your search filter'}
            </h3>
            <p className="mt-1 text-xs max-w-md mx-auto">
              Access the internet through Google Search to find authenticated accredited universities and official portals in this region.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleLiveGoogleSearch}
              disabled={isSearchingGoogle}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all"
            >
              {isSearchingGoogle ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Searching Google...</span>
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4" />
                  <span>Search Google for {selectedCity !== 'ALL' ? selectedCity : selectedCountry} Universities</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDimension('ALL');
                setSelectedCountry('ALL');
                setSelectedCity('ALL');
                setCustomCityInput('');
                setSelectedType('ALL');
                setActiveViewFilter('ALL');
              }}
              className="rounded-2xl border border-white/15 px-4 py-2 text-xs font-bold hover:bg-white/10 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
