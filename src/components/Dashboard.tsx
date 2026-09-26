import React, { useState } from 'react';
import { StudentProfile, AssessmentResult } from '../types';
import { UNIVERSITY_PROGRAMS, POPULAR_COUNTRIES, POPULAR_CITIES } from '../data/universitiesData';
import { SUPABASE_RLS_SQL } from '../lib/supabase';
import {
  User,
  Building,
  Mail,
  Calendar,
  Layers,
  Clock,
  Bookmark,
  Database,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  ExternalLink,
  MapPin,
  Edit2
} from 'lucide-react';

interface DashboardProps {
  currentUser: StudentProfile;
  assessments: AssessmentResult[];
  onSelectAssessment: (result: AssessmentResult) => void;
  onOpenSupabaseModal: () => void;
  onStartQuiz: () => void;
  onUpdateProfile?: (updated: StudentProfile) => void;
  isSupabaseConnected: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  assessments,
  onSelectAssessment,
  onOpenSupabaseModal,
  onStartQuiz,
  onUpdateProfile,
  isSupabaseConnected
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'saved' | 'rls'>('history');
  const [copiedSql, setCopiedSql] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [newCountry, setNewCountry] = useState(currentUser.preferredCountry || 'Pakistan');
  const [newCity, setNewCity] = useState(currentUser.preferredCity || 'Karachi');

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_RLS_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSaveLocation = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        ...currentUser,
        preferredCountry: newCountry,
        preferredCity: newCity
      });
    }
    setIsEditingLocation(false);
  };

  const savedUnis = UNIVERSITY_PROGRAMS.filter((p) =>
    currentUser.savedUniversities?.includes(p.id)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Student Profile Card in Luminous White & Violet Gradient */}
      <div className="rounded-3xl border border-indigo-200 bg-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md text-2xl font-bold font-display">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-extrabold text-slate-900">
                  {currentUser.name}
                </h1>
                <span className="rounded-full bg-indigo-100 text-indigo-800 px-3 py-0.5 text-xs font-bold">
                  Student
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3.5 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                  <Mail className="h-3.5 w-3.5 text-slate-500" />
                  <span>{currentUser.email}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                  <Building className="h-3.5 w-3.5 text-slate-500" />
                  <span>{currentUser.school}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>{currentUser.age} yrs</span>
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                  <Layers className="h-3.5 w-3.5 text-slate-500" />
                  <span>{currentUser.department}</span>
                </span>

                {/* Target Study Location Tag */}
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  <span>
                    Target Location: {currentUser.preferredCity || 'Karachi'}, {currentUser.preferredCountry || 'Pakistan'}
                  </span>
                  <button
                    onClick={() => setIsEditingLocation(!isEditingLocation)}
                    className="ml-1 text-emerald-700 hover:text-emerald-900"
                    title="Change preferred study location"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onStartQuiz}
              className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/25 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>New Assessment</span>
            </button>
            <button
              onClick={onOpenSupabaseModal}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
            >
              <Database className="h-3.5 w-3.5 text-emerald-600" />
              <span>Supabase Settings</span>
            </button>
          </div>
        </div>

        {/* Inline Location Editor */}
        {isEditingLocation && (
          <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-indigo-150 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs font-bold text-slate-700">Update Dream Study Destination:</span>
              <select
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800"
              >
                {POPULAR_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="City (e.g. Karachi, Lahore, London)..."
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800"
              />
              <button
                onClick={handleSaveLocation}
                className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
              >
                Save Location
              </button>
              <button
                onClick={() => setIsEditingLocation(false)}
                className="text-xs text-slate-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'history'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Assessment History ({assessments.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'saved'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Saved Careers & Unis ({currentUser.savedCareers?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('rls')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'rls'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Supabase & RLS Security
        </button>
      </div>

      {/* Tab 1: Assessment History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {assessments.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <Clock className="mx-auto h-10 w-10 text-slate-400 mb-2" />
              <h3 className="font-display text-base font-bold text-slate-800">
                No past assessments recorded yet
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Complete the 60-question CALIPS assessment to generate your personalized 3-letter PathCode.
              </p>
              <button
                onClick={onStartQuiz}
                className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm"
              >
                <span>Take CALIPS Assessment Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {assessments.map((a) => (
                <div
                  key={a.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>{new Date(a.createdAt).toLocaleString()}</span>
                      <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        Saved in Supabase
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-4xl font-extrabold text-indigo-700">
                        {a.pathCode}
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {a.primaryArchetype}
                      </span>
                    </div>

                    {/* Target location if recorded */}
                    {a.preferredCity && (
                      <div className="mt-2 text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-500" />
                        <span>Location: {a.preferredCity}, {a.preferredCountry}</span>
                      </div>
                    )}

                    {/* Mini score badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {a.rankedCategories.map((c) => (
                        <div
                          key={c}
                          className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-semibold text-slate-700"
                        >
                          <span className="font-bold text-slate-900">{c}:</span> {a.scores[c]}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-150 flex items-center justify-end">
                    <button
                      onClick={() => onSelectAssessment(a)}
                      className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <span>View Full Career Report</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Careers & Universities */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Saved Careers */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-amber-500" />
              <span>Saved Career Paths ({currentUser.savedCareers?.length || 0})</span>
            </h3>

            {(!currentUser.savedCareers || currentUser.savedCareers.length === 0) ? (
              <p className="text-xs text-slate-500">
                You haven't bookmarked any careers yet. You can bookmark careers directly from your assessment results or the Career Library.
              </p>
            ) : (
              <ul className="space-y-2">
                {currentUser.savedCareers.map((c) => (
                  <li
                    key={c}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-xs font-semibold text-slate-800 border border-slate-150"
                  >
                    <span>{c}</span>
                    <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      Bookmarked
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Bookmarked Universities */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Building className="h-4 w-4 text-indigo-600" />
              <span>Bookmarked Universities ({savedUnis.length})</span>
            </h3>

            {savedUnis.length === 0 ? (
              <p className="text-xs text-slate-500">
                No universities bookmarked yet. Explore the University Finder to save prospective programs.
              </p>
            ) : (
              <ul className="space-y-3">
                {savedUnis.map((u) => (
                  <li
                    key={u.id}
                    className="rounded-2xl bg-slate-50 p-3.5 text-xs flex flex-col justify-between border border-slate-150"
                  >
                    <div className="font-bold text-slate-900">{u.universityName}</div>
                    <div className="text-indigo-600 text-[11px] font-semibold">{u.programTitle}</div>
                    <div className="mt-2 flex items-center justify-between text-slate-500 text-[10px]">
                      <span>{u.city}, {u.country}</span>
                      <a
                        href={u.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline flex items-center gap-0.5 font-bold"
                      >
                        Visit portal <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Supabase & Row Level Security (RLS) Documentation */}
      {activeTab === 'rls' && (
        <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Enterprise Supabase Architecture · Row Level Security</span>
              </div>
              <h3 className="font-display text-xl font-extrabold text-slate-900 mt-1">
                PostgreSQL Schema & Security Policies
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Each student's profile, preferred study location, and assessment results are partitioned by auth UID. Authenticated students can only read and write their own records.
              </p>
            </div>

            <button
              onClick={handleCopySql}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
            >
              {copiedSql ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>SQL Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy RLS Migration SQL</span>
                </>
              )}
            </button>
          </div>

          <div className="relative rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-96">
            <pre>{SUPABASE_RLS_SQL}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
