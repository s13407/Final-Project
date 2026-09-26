import React, { useState } from 'react';
import { AssessmentResult, CALIPSDimension } from '../types';
import { CALIPS_CATEGORIES } from '../data/calipsData';
import { UNIVERSITY_PROGRAMS, filterUniversitiesByLocation, POPULAR_COUNTRIES, POPULAR_CITIES } from '../data/universitiesData';
import {
  Printer,
  RotateCcw,
  Sparkles,
  ExternalLink,
  BookOpen,
  Briefcase,
  Layers,
  Wrench,
  GraduationCap,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  Share2,
  MapPin,
  Globe,
  SlidersHorizontal
} from 'lucide-react';

interface ResultsViewProps {
  result: AssessmentResult;
  onRetake: () => void;
  onSaveToProfile?: () => void;
  savedCareers?: string[];
  onToggleSaveCareer?: (career: string) => void;
  savedUniversities?: string[];
  onToggleSaveUniversity?: (uniId: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onRetake,
  savedCareers = [],
  onToggleSaveCareer,
  savedUniversities = [],
  onToggleSaveUniversity
}) => {
  const [selectedDimension, setSelectedDimension] = useState<CALIPSDimension>(
    result.rankedCategories[0]
  );
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic location filter state (initialized from assessment answer)
  const [filterCountry, setFilterCountry] = useState<string>(
    result.preferredCountry || 'Anywhere / Global'
  );
  const [filterCity, setFilterCity] = useState<string>(
    result.preferredCity || 'Any City / Flexible'
  );
  const [showAllUniversities, setShowAllUniversities] = useState(false);

  const top3Codes = result.pathCode.split('') as CALIPSDimension[];
  const primaryCat = CALIPS_CATEGORIES[top3Codes[0]];
  const secondaryCat = CALIPS_CATEGORIES[top3Codes[1]];
  const tertiaryCat = CALIPS_CATEGORIES[top3Codes[2]];

  // 1. First get all programs matching user's top CALIPS triad
  const dimensionMatchedUnis = UNIVERSITY_PROGRAMS.filter((prog) =>
    prog.calipsCodes.some((code) => top3Codes.includes(code))
  );

  // 2. Filter programs according to student's chosen city/country
  const locationFilteredUnis = showAllUniversities
    ? dimensionMatchedUnis
    : filterUniversitiesByLocation(dimensionMatchedUnis, filterCountry, filterCity);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 print:py-0 print:px-0">
      {/* Educational Notice Banner */}
      <div className="flex items-center gap-3 rounded-2xl border border-indigo-200 bg-white/90 px-5 py-3.5 text-xs text-slate-700 shadow-sm print:border-none print:bg-transparent">
        <ShieldCheck className="h-5 w-5 shrink-0 text-indigo-600" />
        <p>
          <strong className="text-indigo-900 font-bold">Exploratory Guidance Notice:</strong> PathCode is designed as an interactive career-exploration tool to uncover possibilities and spark curiosity—not a rigid or definitive prediction of your life journey.
        </p>
      </div>

      {/* Hero Badge & Decoded PathCode in Mood-Brightening Colors */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/30 p-8 sm:p-10 shadow-xl print:border-slate-300 print:bg-white print:text-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <span className="flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-indigo-800">
                <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
                <span>Assessment Completed · Decoded PathCode</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-mono text-slate-500 font-semibold">{new Date(result.createdAt).toLocaleDateString()}</span>
              {result.preferredCity && result.preferredCity !== 'Any City / Flexible' && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs">
                  <MapPin className="h-3 w-3 text-emerald-600" />
                  <span>Target: {result.preferredCity} ({result.preferredCountry})</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-baseline gap-4">
              <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent print:text-black">
                {result.pathCode}
              </h1>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 print:text-indigo-800">
                {result.primaryArchetype}
              </div>
            </div>

            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed print:text-slate-700">
              Your dominant triad combines <strong>{primaryCat.title} ({primaryCat.archetype})</strong>,{' '}
              <strong>{secondaryCat.title} ({secondaryCat.archetype})</strong>, and{' '}
              <strong>{tertiaryCat.title} ({tertiaryCat.archetype})</strong>. This code indicates high synergy for interdisciplinary roles balancing problem-solving with creative leadership.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
              >
                <Printer className="h-4 w-4 text-slate-600" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
              >
                <Share2 className="h-4 w-4 text-indigo-600" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Results'}</span>
              </button>
              <button
                onClick={onRetake}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <RotateCcw className="h-4 w-4 text-slate-500" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* Triad Badges */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-3 text-center">
            {top3Codes.map((code, idx) => {
              const cat = CALIPS_CATEGORIES[code];
              const score = result.scores[code];
              return (
                <div
                  key={code}
                  className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm backdrop-blur-sm print:border-slate-300"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Tier 0{idx + 1}
                  </span>
                  <div
                    className="font-display text-4xl font-extrabold my-1"
                    style={{ color: cat.accentColor }}
                  >
                    {code}
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate print:text-black">
                    {cat.title}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 truncate">
                    {cat.archetype}
                  </div>
                  <div className="mt-2 text-xs font-mono font-bold text-indigo-700 bg-indigo-50 py-1 rounded-md">
                    {score}/10 pts
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Six Dimensions Breakdown Visualizer */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-lg print:border-slate-300 print:bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-5">
          <div>
            <h2 className="font-display text-xl font-extrabold text-slate-900 print:text-black">
              CALIPS 6-Dimension Score Analysis
            </h2>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Ranked from your highest personal resonance to lowest
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Total Possible: 10 points per dimension
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.rankedCategories.map((code, idx) => {
            const cat = CALIPS_CATEGORIES[code];
            const score = result.scores[code];
            const percentage = (score / 10) * 100;
            const isTop3 = top3Codes.includes(code);

            return (
              <div
                key={code}
                onClick={() => setSelectedDimension(code)}
                className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                  selectedDimension === code
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-150 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-xl font-display text-sm font-extrabold text-white shadow-xs"
                      style={{ backgroundColor: cat.accentColor }}
                    >
                      {code}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {cat.title}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {cat.archetype}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-slate-900">
                      {score} / 10
                    </div>
                    <div className="text-[10px] font-semibold text-indigo-700">
                      Rank #{idx + 1} {isTop3 && '· Triad'}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full transition-all duration-500 shadow-2xs"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: cat.accentColor
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Dimension Deep Dive (From the Reference Materials) */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-lg print:border-slate-300 print:bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-6">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl font-display text-2xl font-bold text-white shadow-md"
              style={{ backgroundColor: CALIPS_CATEGORIES[selectedDimension].accentColor }}
            >
              {selectedDimension}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Dimension Deep Dive · Selected Profile
              </div>
              <h3 className="font-display text-2xl font-extrabold text-slate-900 print:text-black">
                {CALIPS_CATEGORIES[selectedDimension].title} — {CALIPS_CATEGORIES[selectedDimension].archetype}
              </h3>
            </div>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 print:hidden">
            {(['C', 'A', 'L', 'I', 'P', 'S'] as CALIPSDimension[]).map((dim) => (
              <button
                key={dim}
                onClick={() => setSelectedDimension(dim)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedDimension === dim
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dim} · {CALIPS_CATEGORIES[dim].archetype}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative Description */}
        <p className="mt-4 text-sm text-slate-700 italic border-l-4 border-indigo-500 pl-4 py-1 leading-relaxed bg-indigo-50/30 rounded-r-xl print:text-slate-800">
          "{CALIPS_CATEGORIES[selectedDimension].description}"
        </p>

        {/* 4 Core Pillars from the reference sheets */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. In-Demand Careers Today */}
          <div className="rounded-2xl border border-sky-150 bg-sky-50/40 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 mb-3">
              <Briefcase className="h-4 w-4 text-sky-600" />
              <span>In-Demand Careers Today</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-800">
              {CALIPS_CATEGORIES[selectedDimension].inDemandCareers.map((career) => {
                const isSaved = savedCareers.includes(career);
                return (
                  <li
                    key={career}
                    className="flex items-center justify-between rounded-xl bg-white p-2.5 shadow-2xs border border-sky-100 hover:border-sky-300 transition-colors"
                  >
                    <span className="font-semibold text-slate-800">{career}</span>
                    {onToggleSaveCareer && (
                      <button
                        onClick={() => onToggleSaveCareer(career)}
                        className={`text-xs p-1 rounded-lg transition-colors ${
                          isSaved ? 'text-amber-500' : 'text-slate-400 hover:text-slate-700'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Save career to profile'}
                      >
                        <Bookmark className="h-4 w-4 fill-current" />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 2. Related Majors & Programs */}
          <div className="rounded-2xl border border-rose-150 bg-rose-50/40 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 mb-3">
              <BookOpen className="h-4 w-4 text-rose-600" />
              <span>Related Majors & Programs</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-800">
              {CALIPS_CATEGORIES[selectedDimension].relatedMajors.map((major) => (
                <li key={major} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                  <span className="text-rose-500 font-bold">▸</span>
                  <span className="font-medium">{major}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Career Clusters */}
          <div className="rounded-2xl border border-amber-150 bg-amber-50/40 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
              <Layers className="h-4 w-4 text-amber-600" />
              <span>Career Clusters</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-800">
              {CALIPS_CATEGORIES[selectedDimension].careerClusters.map((cluster) => (
                <li key={cluster} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-amber-100 shadow-2xs">
                  <span className="text-amber-500 font-bold">✦</span>
                  <span className="font-medium">{cluster}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Skills to Build Now */}
          <div className="rounded-2xl border border-emerald-150 bg-emerald-50/40 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
              <Wrench className="h-4 w-4 text-emerald-600" />
              <span>Skills to Build Now</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-800">
              {CALIPS_CATEGORIES[selectedDimension].skillsToBuild.map((skill) => (
                <li key={skill} className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Target Location-Tailored Universities (The Key Requested Feature!) */}
      <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-white via-indigo-50/20 to-white p-6 sm:p-8 shadow-xl print:border-slate-300 print:bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
              <span>Tailored Degree Campuses</span>
            </div>
            <h3 className="font-display text-2xl font-extrabold text-slate-900 mt-1">
              Universities for [{result.pathCode}] in{' '}
              <span className="text-indigo-600">
                {showAllUniversities
                  ? 'All Global Locations'
                  : filterCity && filterCity !== 'Any City / Flexible'
                  ? `${filterCity}, ${filterCountry}`
                  : filterCountry !== 'Anywhere / Global'
                  ? filterCountry
                  : 'Your Target Location'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Matched with your top triad dimensions ({top3Codes.join(' · ')}) and personalized study location
            </p>
          </div>

          {/* Quick Location Switcher / Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAllUniversities(!showAllUniversities)}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-xs ${
                showAllUniversities
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{showAllUniversities ? 'Showing All Worldwide' : 'Show All Global Unis'}</span>
            </button>
          </div>
        </div>

        {/* Location selector filters bar */}
        <div className="mt-4 flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-indigo-600" />
            <span>Change Target Location:</span>
          </span>

          <select
            value={filterCountry}
            onChange={(e) => {
              setFilterCountry(e.target.value);
              setShowAllUniversities(false);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            {POPULAR_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={filterCity}
            onChange={(e) => {
              setFilterCity(e.target.value);
              setShowAllUniversities(false);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
          >
            {POPULAR_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* University Program Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {locationFilteredUnis.map((prog) => {
            const isSaved = savedUniversities.includes(prog.id);
            return (
              <div
                key={prog.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <MapPin className="h-3 w-3 text-amber-500" />
                      <span>{prog.city}, {prog.country}</span>
                    </span>
                    <span className="font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                      {prog.tuitionTier}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display text-base font-extrabold text-slate-900 print:text-black">
                      {prog.universityName}
                    </h4>
                    {onToggleSaveUniversity && (
                      <button
                        onClick={() => onToggleSaveUniversity(prog.id)}
                        className={`text-slate-400 hover:text-amber-500 p-1 rounded-md transition-colors ${
                          isSaved ? 'text-amber-500' : ''
                        }`}
                        title={isSaved ? 'Saved' : 'Bookmark university'}
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

                  {/* Key majors */}
                  <div className="mt-3 flex flex-wrap gap-1 text-[11px]">
                    {prog.keyMajors.map((m) => (
                      <span key={m} className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-700 font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-150 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] font-semibold">
                    Fits CALIPS: {prog.calipsCodes.join(', ')}
                  </span>
                  <a
                    href={prog.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {locationFilteredUnis.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
            <MapPin className="mx-auto h-8 w-8 text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">
              No specific universities matched "{filterCity}" in "{filterCountry}" for this triad.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click below to view all world-class institutions matching your {result.pathCode} profile.
            </p>
            <button
              onClick={() => setShowAllUniversities(true)}
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Show All Worldwide Matches ({dimensionMatchedUnis.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
