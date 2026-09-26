import React, { useState } from 'react';
import { CALIPS_CATEGORIES } from '../data/calipsData';
import { CALIPSDimension } from '../types';
import { Briefcase, BookOpen, Layers, Wrench, Sparkles, Bookmark, CheckCircle2 } from 'lucide-react';

interface CareerLibraryProps {
  savedCareers?: string[];
  onToggleSaveCareer?: (career: string) => void;
}

export const CareerLibrary: React.FC<CareerLibraryProps> = ({
  savedCareers = [],
  onToggleSaveCareer
}) => {
  const [activeTab, setActiveTab] = useState<CALIPSDimension>('C');

  const category = CALIPS_CATEGORIES[activeTab];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
          <span className="flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-indigo-800">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
            <span>CALIPS Taxonomy · Reference Matrix</span>
          </span>
        </div>
        <h1 className="font-display mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
          Career Clusters & Taxonomy Library
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Explore all six foundational dimensions of the CALIPS framework. Unpack current job market demand, degree pathways, foundational skills, and industrial clusters.
        </p>
      </div>

      {/* Dimension Selector Tabs in Cheerful Colorful Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {(['C', 'A', 'L', 'I', 'P', 'S'] as CALIPSDimension[]).map((dim) => {
          const cat = CALIPS_CATEGORIES[dim];
          const isSelected = activeTab === dim;
          return (
            <button
              key={dim}
              onClick={() => setActiveTab(dim)}
              className={`flex flex-col items-start p-4 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className="h-8 w-8 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white shadow-xs"
                  style={{ backgroundColor: cat.accentColor }}
                >
                  {dim}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">10 Qs</span>
              </div>
              <span className="font-display font-extrabold text-sm text-slate-900 mt-3 truncate w-full">
                {cat.title}
              </span>
              <span className="text-xs font-medium text-slate-500 truncate w-full">{cat.archetype}</span>
            </button>
          );
        })}
      </div>

      {/* Active Dimension Detailed Matrix in Fresh White Card */}
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-9 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-6">
          <div className="flex items-center gap-3.5">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl font-display text-2xl font-extrabold text-white shadow-md"
              style={{ backgroundColor: category.accentColor }}
            >
              {category.code}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                CALIPS Dimension {category.code}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                {category.title} — {category.archetype}
              </h2>
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full">
            {category.tagline}
          </div>
        </div>

        {/* Narrative Description */}
        <p className="mt-4 text-sm text-slate-700 italic border-l-4 border-indigo-500 pl-4 py-2 leading-relaxed bg-indigo-50/40 rounded-r-2xl">
          "{category.description}"
        </p>

        {/* 4 Pillars Grid in Pastel Joyful Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: In Demand Careers */}
          <div className="rounded-2xl border border-sky-150 bg-sky-50/40 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 mb-3">
              <Briefcase className="h-4 w-4 text-sky-600" />
              <span>In-Demand Careers Today</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-800">
              {category.inDemandCareers.map((c) => {
                const isSaved = savedCareers.includes(c);
                return (
                  <li
                    key={c}
                    className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-sky-100 shadow-2xs hover:border-sky-300 transition-colors"
                  >
                    <span className="font-semibold text-slate-800">{c}</span>
                    {onToggleSaveCareer && (
                      <button
                        onClick={() => onToggleSaveCareer(c)}
                        className={`text-xs p-1 rounded-md transition-colors ${
                          isSaved ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
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

          {/* Pillar 2: Related Majors */}
          <div className="rounded-2xl border border-rose-150 bg-rose-50/40 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 mb-3">
              <BookOpen className="h-4 w-4 text-rose-600" />
              <span>Related Majors & Degree Programs</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-800">
              {category.relatedMajors.map((m) => (
                <li key={m} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                  <span className="text-rose-500 font-bold">▸</span>
                  <span className="font-medium">{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 3: Career Clusters */}
          <div className="rounded-2xl border border-amber-150 bg-amber-50/40 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
              <Layers className="h-4 w-4 text-amber-600" />
              <span>Career Clusters</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-800">
              {category.careerClusters.map((cl) => (
                <li key={cl} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-amber-100 shadow-2xs">
                  <span className="text-amber-500 font-bold">✦</span>
                  <span className="font-medium">{cl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 4: Skills to Build Now */}
          <div className="rounded-2xl border border-emerald-150 bg-emerald-50/40 p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
              <Wrench className="h-4 w-4 text-emerald-600" />
              <span>Skills to Build Now</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-800">
              {category.skillsToBuild.map((sk) => (
                <li key={sk} className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{sk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
