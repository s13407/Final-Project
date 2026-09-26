import React, { useState } from 'react';
import { DEPARTMENTS, POPULAR_INTEREST_TAGS, CALIPS_CATEGORIES, getPathCodeTitle } from '../data/calipsData';
import { UNIVERSITY_PROGRAMS, filterUniversitiesByLocation, POPULAR_COUNTRIES, POPULAR_CITIES } from '../data/universitiesData';
import { CALIPSDimension, DirectInterestMatch } from '../types';
import {
  Search,
  Sparkles,
  ArrowRight,
  Briefcase,
  BookOpen,
  Layers,
  Wrench,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  MapPin,
  Globe
} from 'lucide-react';

interface DirectDecodeProps {
  onSaveResult?: (match: DirectInterestMatch) => void;
  savedCareers?: string[];
  onToggleSaveCareer?: (career: string) => void;
  savedUniversities?: string[];
  onToggleSaveUniversity?: (uniId: string) => void;
}

export const DirectDecode: React.FC<DirectDecodeProps> = ({
  onSaveResult,
  savedCareers = [],
  onToggleSaveCareer,
  savedUniversities = [],
  onToggleSaveUniversity
}) => {
  const [interest, setInterest] = useState('');
  const [department, setDepartment] = useState<string>(DEPARTMENTS[0]);
  const [field, setField] = useState('');
  const [preferredCountry, setPreferredCountry] = useState<string>('Anywhere / Global');
  const [preferredCity, setPreferredCity] = useState<string>('Any City / Flexible');
  const [customCity, setCustomCity] = useState('');
  const [matchResult, setMatchResult] = useState<DirectInterestMatch | null>(null);

  // Compute best matching PathCode from department and interest keywords
  const handleDecode = (e: React.FormEvent) => {
    e.preventDefault();

    const textCorpus = `${interest} ${department} ${field}`.toLowerCase();

    // Scoring weights based on domain keywords
    let scores: Record<CALIPSDimension, number> = {
      C: 0,
      A: 0,
      L: 0,
      I: 0,
      P: 0,
      S: 0
    };

    if (textCorpus.includes('organ') || textCorpus.includes('data') || textCorpus.includes('account') || textCorpus.includes('finance') || textCorpus.includes('system') || textCorpus.includes('compliance')) {
      scores.C += 3;
    }
    if (textCorpus.includes('art') || textCorpus.includes('design') || textCorpus.includes('game') || textCorpus.includes('creative') || textCorpus.includes('media') || textCorpus.includes('music') || textCorpus.includes('content') || textCorpus.includes('ux')) {
      scores.A += 3;
    }
    if (textCorpus.includes('lead') || textCorpus.includes('business') || textCorpus.includes('startup') || textCorpus.includes('market') || textCorpus.includes('product') || textCorpus.includes('found') || textCorpus.includes('entrepreneur')) {
      scores.L += 3;
    }
    if (textCorpus.includes('comput') || textCorpus.includes('science') || textCorpus.includes('ai') || textCorpus.includes('analyst') || textCorpus.includes('research') || textCorpus.includes('investigat') || textCorpus.includes('biotech') || textCorpus.includes('math')) {
      scores.I += 3;
    }
    if (textCorpus.includes('build') || textCorpus.includes('machin') || textCorpus.includes('engine') || textCorpus.includes('tool') || textCorpus.includes('robot') || textCorpus.includes('practic') || textCorpus.includes('hardware') || textCorpus.includes('solar')) {
      scores.P += 3;
    }
    if (textCorpus.includes('help') || textCorpus.includes('teach') || textCorpus.includes('social') || textCorpus.includes('health') || textCorpus.includes('nurs') || textCorpus.includes('people') || textCorpus.includes('counsel') || textCorpus.includes('mental')) {
      scores.S += 3;
    }

    // Default tie-breakers based on chosen department
    if (department.includes('Computer Science')) {
      scores.I += 2;
      scores.P += 1;
    } else if (department.includes('Business')) {
      scores.L += 2;
      scores.C += 1;
    } else if (department.includes('Art')) {
      scores.A += 3;
      scores.P += 1;
    } else if (department.includes('Health')) {
      scores.S += 2;
      scores.I += 1;
    } else if (department.includes('Engineering')) {
      scores.P += 2;
      scores.I += 2;
    } else if (department.includes('Social')) {
      scores.S += 3;
      scores.L += 1;
    }

    const sorted = (Object.keys(scores) as CALIPSDimension[]).sort(
      (a, b) => scores[b] - scores[a]
    );

    const primary = sorted[0];
    const secondary = sorted[1];
    const tertiary = sorted[2];
    const code = `${primary}${secondary}${tertiary}`;

    const cat1 = CALIPS_CATEGORIES[primary];
    const cat2 = CALIPS_CATEGORIES[secondary];

    const combinedCareers = Array.from(
      new Set([...cat1.inDemandCareers.slice(0, 4), ...cat2.inDemandCareers.slice(0, 4)])
    );
    const combinedMajors = Array.from(
      new Set([...cat1.relatedMajors.slice(0, 4), ...cat2.relatedMajors.slice(0, 4)])
    );
    const combinedSkills = Array.from(
      new Set([...cat1.skillsToBuild, ...cat2.skillsToBuild.slice(0, 2)])
    );
    const combinedClusters = Array.from(
      new Set([...cat1.careerClusters, ...cat2.careerClusters])
    );

    const match: DirectInterestMatch = {
      interest: interest || 'General Interest',
      department,
      field: field || department,
      computedPathCode: code,
      primaryCategory: primary,
      secondaryCategory: secondary,
      recommendedCareers: combinedCareers,
      recommendedMajors: combinedMajors,
      skillsToBuild: combinedSkills,
      clusters: combinedClusters
    };

    setMatchResult(match);
    if (onSaveResult) {
      onSaveResult(match);
    }
  };

  const finalCity = customCity.trim() || preferredCity;

  // Filter universities based on computed dimensions AND preferred city/country
  const baseMatchingUniversities = matchResult
    ? UNIVERSITY_PROGRAMS.filter((p) =>
        p.calipsCodes.some(
          (c) =>
            c === matchResult.primaryCategory ||
            c === matchResult.secondaryCategory ||
            matchResult.computedPathCode.includes(c)
        )
      )
    : [];

  const locationTailoredUniversities = filterUniversitiesByLocation(
    baseMatchingUniversities,
    preferredCountry,
    finalCity
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Disclaimer */}
      <div className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-white/90 px-5 py-3.5 text-xs text-slate-700 shadow-sm">
        <ShieldCheck className="h-5 w-5 shrink-0 text-sky-600" />
        <p>
          <strong className="text-sky-900 font-bold">Career-Exploration Notice:</strong> This direct mapping tool matches your stated passions with industry trends and academic pathways to open new doors—not as an absolute prediction.
        </p>
      </div>

      {/* Input Deck in Bright, Mood-Brightening Card */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-9 shadow-xl backdrop-blur-md">
        <div className="border-b border-slate-150 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
            <span className="flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-sky-800">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" />
              <span>Fast-Track Career Decoder · Skip 60 Questions</span>
            </span>
          </div>
          <h2 className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
            I Know My Interest
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Tell us what you are excited about, your target academic department, and which <strong>city or country</strong> you want to study in.
          </p>
        </div>

        <form onSubmit={handleDecode} className="mt-6 space-y-6">
          {/* Department Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Academic Department / Faculty
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm font-semibold text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-all"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Intended Program / Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Intended Program or Major (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Artificial Intelligence, Accounting & Finance, Graphic Design, Mechanical Tech"
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Specific Interest or Passion */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              3. Specific Interest, Passion, or Project Idea
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Building sustainable robotics, analyzing financial markets, clinical psychology..."
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Quick Inspiration Tags */}
            <div className="mt-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Popular ideas:</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {POPULAR_INTEREST_TAGS.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setInterest(tag);
                      setField(tag);
                    }}
                    className="rounded-xl border border-slate-200 bg-slate-100/80 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-sky-400 hover:bg-sky-50 hover:text-sky-800 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Study Location Preference (City & Country) */}
          <div className="rounded-2xl border-2 border-indigo-150 bg-indigo-50/40 p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <span>4. Target Study Location (City & Country)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Country Preference
                </label>
                <select
                  value={preferredCountry}
                  onChange={(e) => setPreferredCountry(e.target.value)}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
                >
                  {POPULAR_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City Preference
                </label>
                <select
                  value={preferredCity}
                  onChange={(e) => {
                    setPreferredCity(e.target.value);
                    setCustomCity('');
                  }}
                  className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
                >
                  {POPULAR_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom City Input */}
            <div>
              <input
                type="text"
                placeholder="Or type a specific city (e.g. Karachi, Lahore, London, Boston)..."
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                className="w-full rounded-xl border border-indigo-200 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Search className="h-4 w-4" />
              <span>Map My Interest to PathCode & Tailored Universities</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Deck */}
      {matchResult && (
        <div className="space-y-8 animate-fadeIn">
          {/* Decoded Archetype Summary */}
          <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-white via-sky-50/40 to-indigo-50/30 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
                  Decoded PathCode for "{matchResult.field || matchResult.interest}"
                </span>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-sky-700 to-indigo-700 bg-clip-text text-transparent">
                    {matchResult.computedPathCode}
                  </span>
                  <span className="text-xl font-bold text-slate-800">
                    {getPathCodeTitle(matchResult.computedPathCode)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-xl bg-white border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-900 shadow-2xs">
                  Primary: {CALIPS_CATEGORIES[matchResult.primaryCategory].title} ({CALIPS_CATEGORIES[matchResult.primaryCategory].archetype})
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Based on your target in <strong>{matchResult.department}</strong>, your focus anchors predominantly in{' '}
              <strong>{CALIPS_CATEGORIES[matchResult.primaryCategory].title}</strong> with secondary synergy in{' '}
              <strong>{CALIPS_CATEGORIES[matchResult.secondaryCategory].title}</strong>.
            </p>
          </div>

          {/* 4 Pillars Grid (Careers, Majors, Clusters, Skills) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. In-Demand Careers */}
            <div className="rounded-2xl border border-sky-150 bg-sky-50/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 mb-3">
                <Briefcase className="h-4 w-4 text-sky-600" />
                <span>In-Demand Careers for this Profile</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                {matchResult.recommendedCareers.map((c) => {
                  const isSaved = savedCareers.includes(c);
                  return (
                    <li
                      key={c}
                      className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-sky-100 shadow-2xs"
                    >
                      <span className="font-semibold text-slate-800">{c}</span>
                      {onToggleSaveCareer && (
                        <button
                          onClick={() => onToggleSaveCareer(c)}
                          className={`text-xs p-1 rounded-md transition-colors ${
                            isSaved ? 'text-amber-500' : 'text-slate-400 hover:text-slate-700'
                          }`}
                          title={isSaved ? 'Saved' : 'Save career to profile'}
                        >
                          <Bookmark className="h-4 w-4 fill-current" />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 2. Recommended Degree Majors */}
            <div className="rounded-2xl border border-rose-150 bg-rose-50/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 mb-3">
                <BookOpen className="h-4 w-4 text-rose-600" />
                <span>Related Majors & Academic Degrees</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                {matchResult.recommendedMajors.map((m) => (
                  <li key={m} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                    <span className="text-rose-500 font-bold">▸</span>
                    <span className="font-medium">{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Career Clusters */}
            <div className="rounded-2xl border border-amber-150 bg-amber-50/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                <Layers className="h-4 w-4 text-amber-600" />
                <span>Career Clusters</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                {matchResult.clusters.map((cl) => (
                  <li key={cl} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-amber-100 shadow-2xs">
                    <span className="text-amber-500 font-bold">✦</span>
                    <span className="font-medium">{cl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Skills to Build Now */}
            <div className="rounded-2xl border border-emerald-150 bg-emerald-50/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                <Wrench className="h-4 w-4 text-emerald-600" />
                <span>Skills to Build Now</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                {matchResult.skillsToBuild.map((sk) => (
                  <li key={sk} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{sk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location-Tailored Recommended Universities */}
          <div className="rounded-3xl border border-indigo-200 bg-white p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <GraduationCap className="h-4 w-4 text-indigo-600" />
                  <span>Matching Higher-Ed Institutions</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  University Degree Programs{' '}
                  {finalCity && finalCity !== 'Any City / Flexible'
                    ? `in ${finalCity}`
                    : preferredCountry !== 'Anywhere / Global'
                    ? `in ${preferredCountry}`
                    : 'Worldwide'}
                </h3>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {(locationTailoredUniversities.length > 0
                ? locationTailoredUniversities
                : baseMatchingUniversities
              )
                .slice(0, 6)
                .map((prog) => {
                  const isSaved = savedUniversities.includes(prog.id);
                  return (
                    <div
                      key={prog.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between hover:border-indigo-300 hover:bg-white transition-all shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <MapPin className="h-3 w-3 text-amber-500" />
                            <span>{prog.city}, {prog.country}</span>
                          </span>
                          <span className="font-mono text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded">
                            {prog.tuitionTier}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-display text-base font-bold text-slate-900">
                            {prog.universityName}
                          </h4>
                          {onToggleSaveUniversity && (
                            <button
                              onClick={() => onToggleSaveUniversity(prog.id)}
                              className={`p-1 rounded transition-colors ${
                                isSaved ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                              }`}
                              title={isSaved ? 'Saved' : 'Bookmark university'}
                            >
                              <Bookmark className="h-4 w-4 fill-current" />
                            </button>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-sky-700 mt-0.5">
                          {prog.programTitle}
                        </div>
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                          {prog.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                        <span className="text-slate-500 text-[11px] font-semibold">
                          Dimensions: {prog.calipsCodes.join(', ')}
                        </span>
                        <a
                          href={prog.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sky-700 hover:text-sky-900 font-bold"
                        >
                          <span>Website</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
